from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional, Literal
import asyncio
import aiohttp
import time
import json
from datetime import datetime, timedelta
import logging
from contextlib import asynccontextmanager
import ssl
import certifi

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Status types
StatusType = Literal["online", "offline", "warning", "unknown"]

class SiteStatus(BaseModel):
    domain: str
    display_name: str
    status: StatusType
    response_time: Optional[int] = None
    uptime_24h: Optional[float] = None
    uptime_7d: Optional[float] = None
    uptime_30d: Optional[float] = None
    last_checked: str
    last_online: Optional[str] = None
    ssl_valid: Optional[bool] = None
    ssl_expires: Optional[str] = None
    status_code: Optional[int] = None
    error_message: Optional[str] = None

class OverallStatusResponse(BaseModel):
    overall_status: StatusType
    total_sites: int
    online_sites: int
    warning_sites: int
    offline_sites: int
    last_updated: str

class StatusResponse(BaseModel):
    overall: OverallStatusResponse
    sites: List[SiteStatus]

# Domain to display name mapping
DOMAIN_DISPLAY_NAMES = {
    'discord.butterfly-network.win': 'Discord Markdown',
    'www.alextlm.co.uk': 'Clove Nytrix',
    'www.butterfly-network.win': 'Butterfly Network',
    'www.clove-portfolio.win': 'Portfolio',
    'www.clovetwilight3.co.uk': 'Clove Twilight',
    'www.doughmination.win': 'Doughmination System™',
    'www.hunt-rix.rocks': 'Huntr/x',
    'www.iwantedthislongdomainnamesoibroughtit.win': 'Calendar',
    'www.lgbwitht.win': 'Social Media',
    'www.mazeymoos.com': 'Gaming Site',
    'www.mc-svg.win': 'SVG Minecraft',
    'www.myluminarasystem.pro': 'Luminara Systems',
    'www.themidnightcyan.win': 'Athena McKillian',
    'www.themotorbikeone.win': 'Jessa Twilight',
    'www.trans4trans.win': 'Trans4Trans Letters',
    'www.transgamers.org': 'TransGamers',
    'www.unifiedgaming-systems.co.uk': 'Unified Gaming Systems Ltd',
    'www.yaoi-lover.win': 'Yaoi Cheat Sheets',
    'www.yuri-lover.win': 'Yuri CDN File',
}

DOMAINS_TO_MONITOR = list(DOMAIN_DISPLAY_NAMES.keys())

class StatusChecker:
    def __init__(self):
        self.status_cache: Dict[str, Dict] = {}
        self.history: Dict[str, List[Dict]] = {}
        self.last_check_time = None
        
    async def check_site(self, session: aiohttp.ClientSession, domain: str) -> Dict:
        """Check a single site's status"""
        start_time = time.time()
        result = {
            'domain': domain,
            'status': 'unknown',
            'response_time': None,
            'status_code': None,
            'ssl_valid': None,
            'ssl_expires': None,
            'error_message': None,
            'timestamp': datetime.utcnow().isoformat()
        }
        
        # Try HTTPS first, then HTTP
        protocols = ['https', 'http']
        
        for protocol in protocols:
            url = f"{protocol}://{domain}"
            try:
                timeout = aiohttp.ClientTimeout(total=30, connect=10)
                
                async with session.get(
                    url, 
                    timeout=timeout,
                    allow_redirects=True,
                    ssl=ssl.create_default_context(cafile=certifi.where())
                ) as response:
                    response_time = int((time.time() - start_time) * 1000)
                    result.update({
                        'response_time': response_time,
                        'status_code': response.status,
                        'timestamp': datetime.utcnow().isoformat()
                    })
                    
                    # Check SSL certificate for HTTPS
                    if protocol == 'https':
                        try:
                            # If we successfully made an HTTPS request, SSL is working
                            result['ssl_valid'] = True
                            
                            # Try to get additional SSL certificate info if available
                            if hasattr(response, 'transport') and response.transport:
                                ssl_info = response.transport.get_extra_info('ssl_object')
                                if ssl_info:
                                    try:
                                        peer_cert = ssl_info.getpeercert()
                                        if peer_cert and 'notAfter' in peer_cert:
                                            result['ssl_expires'] = peer_cert['notAfter']
                                    except Exception as cert_error:
                                        logger.warning(f"Could not get certificate expiry for {domain}: {cert_error}")
                        except Exception as ssl_error:
                            logger.warning(f"SSL validation failed for {domain}: {ssl_error}")
                            result['ssl_valid'] = False
                    
                    # Determine status based on response code and time
                    if 200 <= response.status < 400:
                        if response_time < 2000:  # Less than 2 seconds
                            result['status'] = 'online'
                        else:  # Slow response
                            result['status'] = 'warning'
                    elif 400 <= response.status < 500:
                        result['status'] = 'warning'  # Client error but server responding
                    else:
                        result['status'] = 'offline'  # Server error
                    
                    break  # Success, don't try other protocol
                    
            except asyncio.TimeoutError:
                result.update({
                    'status': 'offline',
                    'error_message': 'Connection timeout',
                    'response_time': int((time.time() - start_time) * 1000)
                })
                # If HTTPS failed with timeout, mark SSL as invalid
                if protocol == 'https':
                    result['ssl_valid'] = False
            except aiohttp.ClientConnectorError as e:
                result.update({
                    'status': 'offline',
                    'error_message': f'Connection failed: {str(e)[:100]}',
                    'response_time': int((time.time() - start_time) * 1000)
                })
                # If HTTPS failed with connection error, mark SSL as invalid
                if protocol == 'https':
                    result['ssl_valid'] = False
            except Exception as e:
                result.update({
                    'status': 'unknown',
                    'error_message': f'Unexpected error: {str(e)[:100]}',
                    'response_time': int((time.time() - start_time) * 1000)
                })
                # If HTTPS failed with unexpected error, mark SSL as invalid
                if protocol == 'https':
                    result['ssl_valid'] = False
        
        return result
    
    async def check_all_sites(self) -> None:
        """Check all monitored sites"""
        logger.info("Starting status check for all sites")
        
        connector = aiohttp.TCPConnector(
            limit=20,  # Max connections
            limit_per_host=5,  # Max connections per host
            ttl_dns_cache=300,  # DNS cache TTL
            use_dns_cache=True,
        )
        
        timeout = aiohttp.ClientTimeout(total=30, connect=10)
        
        async with aiohttp.ClientSession(
            connector=connector,
            timeout=timeout,
            headers={'User-Agent': 'Butterfly-Network-Status-Monitor/1.0'}
        ) as session:
            tasks = [self.check_site(session, domain) for domain in DOMAINS_TO_MONITOR]
            results = await asyncio.gather(*tasks, return_exceptions=True)
            
            for result in results:
                if isinstance(result, Exception):
                    logger.error(f"Error checking site: {result}")
                    continue
                    
                domain = result['domain']
                self.status_cache[domain] = result
                
                # Store in history
                if domain not in self.history:
                    self.history[domain] = []
                
                self.history[domain].append(result)
                
                # Keep only last 30 days of history (assuming checks every 5 minutes)
                max_history = 30 * 24 * 12  # 30 days * 24 hours * 12 checks per hour
                if len(self.history[domain]) > max_history:
                    self.history[domain] = self.history[domain][-max_history:]
        
        self.last_check_time = datetime.utcnow()
        logger.info("Completed status check for all sites")
    
    def calculate_uptime(self, domain: str, hours: int) -> Optional[float]:
        """Calculate uptime percentage for the given time period"""
        if domain not in self.history:
            return None
            
        since = datetime.utcnow() - timedelta(hours=hours)
        relevant_checks = [
            check for check in self.history[domain]
            if datetime.fromisoformat(check['timestamp']) > since
        ]
        
        if not relevant_checks:
            return None
            
        online_checks = len([
            check for check in relevant_checks 
            if check['status'] in ['online', 'warning']
        ])
        
        return round((online_checks / len(relevant_checks)) * 100, 2)
    
    def get_status_response(self) -> StatusResponse:
        """Get formatted status response"""
        sites = []
        
        for domain in DOMAINS_TO_MONITOR:
            if domain in self.status_cache:
                cache_data = self.status_cache[domain]
                
                # Find last time the site was online
                last_online = None
                if domain in self.history:
                    for check in reversed(self.history[domain]):
                        if check['status'] == 'online':
                            last_online = check['timestamp']
                            break
                
                site_status = SiteStatus(
                    domain=domain,
                    display_name=DOMAIN_DISPLAY_NAMES.get(domain, domain),
                    status=cache_data['status'],
                    response_time=cache_data.get('response_time'),
                    uptime_24h=self.calculate_uptime(domain, 24),
                    uptime_7d=self.calculate_uptime(domain, 24 * 7),
                    uptime_30d=self.calculate_uptime(domain, 24 * 30),
                    last_checked=cache_data['timestamp'],
                    last_online=last_online,
                    ssl_valid=cache_data.get('ssl_valid'),
                    ssl_expires=cache_data.get('ssl_expires'),
                    status_code=cache_data.get('status_code'),
                    error_message=cache_data.get('error_message')
                )
            else:
                # No data available yet
                site_status = SiteStatus(
                    domain=domain,
                    display_name=DOMAIN_DISPLAY_NAMES.get(domain, domain),
                    status='unknown',
                    last_checked=datetime.utcnow().isoformat()
                )
            
            sites.append(site_status)
        
        # Calculate overall status
        online_count = len([s for s in sites if s.status == 'online'])
        warning_count = len([s for s in sites if s.status == 'warning'])
        offline_count = len([s for s in sites if s.status == 'offline'])
        
        if offline_count > len(sites) * 0.2:  # More than 20% offline
            overall_status = 'offline'
        elif offline_count > 0 or warning_count > 0:
            overall_status = 'warning'
        else:
            overall_status = 'online'
        
        overall = OverallStatusResponse(
            overall_status=overall_status,
            total_sites=len(sites),
            online_sites=online_count,
            warning_sites=warning_count,
            offline_sites=offline_count,
            last_updated=self.last_check_time.isoformat() if self.last_check_time else datetime.utcnow().isoformat()
        )
        
        return StatusResponse(overall=overall, sites=sites)

# Global status checker instance
status_checker = StatusChecker()

async def periodic_check():
    """Background task to periodically check site status"""
    while True:
        try:
            await status_checker.check_all_sites()
            await asyncio.sleep(300)  # Check every 5 minutes
        except Exception as e:
            logger.error(f"Error in periodic check: {e}")
            await asyncio.sleep(60)  # Wait 1 minute before retry

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting Butterfly Network Status Monitor Backend")
    
    # Perform initial check
    await status_checker.check_all_sites()
    
    # Start background task
    task = asyncio.create_task(periodic_check())
    
    yield
    
    # Shutdown
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        pass
    logger.info("Shutdown complete")

# Create FastAPI app
app = FastAPI(
    title="Butterfly Network Status Monitor",
    description="Backend API for monitoring Butterfly Network domain status",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_model=StatusResponse)
async def get_status():
    """Get current status of all monitored sites"""
    return status_checker.get_status_response()

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "last_check": status_checker.last_check_time.isoformat() if status_checker.last_check_time else None
    }

@app.post("/check")
async def manual_check(background_tasks: BackgroundTasks):
    """Trigger a manual status check"""
    background_tasks.add_task(status_checker.check_all_sites)
    return {"message": "Status check initiated"}

@app.get("/site/{domain}")
async def get_site_status(domain: str):
    """Get detailed status for a specific domain"""
    if domain not in DOMAINS_TO_MONITOR:
        raise HTTPException(status_code=404, detail="Domain not monitored")
    
    if domain not in status_checker.status_cache:
        raise HTTPException(status_code=404, detail="No status data available")
    
    cache_data = status_checker.status_cache[domain]
    
    # Get recent history
    recent_history = []
    if domain in status_checker.history:
        recent_history = status_checker.history[domain][-100:]  # Last 100 checks
    
    return {
        "domain": domain,
        "display_name": DOMAIN_DISPLAY_NAMES.get(domain, domain),
        "current_status": cache_data,
        "uptime": {
            "24h": status_checker.calculate_uptime(domain, 24),
            "7d": status_checker.calculate_uptime(domain, 24 * 7),
            "30d": status_checker.calculate_uptime(domain, 24 * 30),
        },
        "recent_history": recent_history
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8010,
        reload=True,
        log_level="info"
    )