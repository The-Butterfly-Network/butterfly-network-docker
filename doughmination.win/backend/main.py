"""
MIT License

Copyright (c) 2025 Clove Twilight

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

# ============================================================================
# IMPORTS
# ============================================================================
import os
import shutil
import aiofiles
import uuid
import json
import asyncio
import weakref
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional, Set, Dict, Any

from fastapi import FastAPI, HTTPException, Request, Depends, Security, status, File, UploadFile, WebSocket, WebSocketDisconnect, Body
from fastapi.responses import JSONResponse, FileResponse, RedirectResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.security import SecurityScopes
from jose import JWTError
from dotenv import load_dotenv

# Local imports
from pluralkit import get_system, get_members, get_fronters, set_front, create_dynamic_cofront, MAX_FRONTERS
from auth import router as auth_router, get_current_user, oauth2_scheme
from subsystems import (
    get_subsystems, get_member_tags, get_members_by_subsystem, 
    update_member_tags, add_member_tag, remove_member_tag,
    validate_subsystem_tag, initialize_default_subsystems
)
from models import (
    UserCreate, UserResponse, UserUpdate, MentalState, DynamicCofrontCreate, 
    CofrontResponse, MultiSwitchRequest, MultiSwitchResponse, SubSystem, 
    MemberTag, SubSystemFilter
)
from users import get_users, create_user, delete_user, initialize_admin_user, update_user, get_user_by_id
from metrics import get_fronting_time_metrics, get_switch_frequency_metrics

# ============================================================================
# APPLICATION SETUP
# ============================================================================
load_dotenv()

app = FastAPI()

# Initialize the admin user if no users exist
initialize_admin_user()

# Initialize sub-systems
initialize_default_subsystems()

# Default fallback avatar URL
DEFAULT_AVATAR = "https://www.yuri-lover.win/pfp/fallback_avatar.png"

# ============================================================================
# MIDDLEWARE SETUP
# ============================================================================

# File size limit middleware
class FileSizeLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method == 'POST' and '/avatar' in request.url.path:
            try:
                # 2MB in bytes
                MAX_SIZE = 2 * 1024 * 1024
                content_length = request.headers.get('content-length')
                if content_length and int(content_length) > MAX_SIZE:
                    return JSONResponse(
                        status_code=413,
                        content={"detail": "File size exceeds the limit of 2MB"}
                    )
            except:
                pass
        
        response = await call_next(request)
        return response

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",              # Local development
        "http://127.0.0.1:8080",              # Alternative local address
        "https://www.doughmination.win", # Production domain
        "http://www.doughmination.win",  # HTTP version of production domain
        "http://frontend",                    # Docker service name
        "http://frontend:80",                 # Docker service with port
        "http://doughmination.win",
        "https://doughmination.win"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add the file size limit middleware
app.add_middleware(FileSizeLimitMiddleware)

# Include login route
app.include_router(auth_router)

# Create upload directory for avatars if it doesn't exist
UPLOAD_DIR = Path("avatars")
UPLOAD_DIR.mkdir(exist_ok=True)

# Define paths for static file serving
FRONTEND_BUILD_DIR = Path("static")  # Files are copied here by Docker
STATIC_DIR = Path("static")

# Optional authentication function for public endpoints
async def get_optional_user(token: str = Security(oauth2_scheme, scopes=[])):
    try:
        return await get_current_user(token)
    except (HTTPException, JWTError):
        return None


# ============================================================================
# STATIC FILE SERVING SETUP
# ============================================================================

# Check if we have a built frontend to serve
if FRONTEND_BUILD_DIR.exists() and (FRONTEND_BUILD_DIR / "index.html").exists():
    # Copy frontend build to static directory
    if STATIC_DIR.exists() and STATIC_DIR != FRONTEND_BUILD_DIR:
        shutil.rmtree(STATIC_DIR)
        shutil.copytree(FRONTEND_BUILD_DIR, STATIC_DIR)

# Mount static files for the frontend
if STATIC_DIR.exists():
    app.mount("/assets", StaticFiles(directory=STATIC_DIR / "assets"), name="assets")

# ============================================================================
# STATIC FILE ENDPOINTS
# ============================================================================

@app.get("/robots.txt")
async def robots_txt():
    """Serve robots.txt"""
    robots_content = """User-agent: *
Allow: /

# Block common exploit attempts
Disallow: /vendor/
Disallow: /.env
Disallow: /HNAP1/
Disallow: /onvif/
Disallow: /PSIA/
Disallow: /index.php
Disallow: /eval-stdin.php

Sitemap: https://www.doughmination.win/sitemap.xml
"""
    return Response(content=robots_content, media_type="text/plain")

@app.get("/sitemap.xml")
async def sitemap_xml():
    """Serve sitemap.xml"""
    sitemap_content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.doughmination.win/</loc>
    <lastmod>2025-06-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.doughmination.win/privacy</loc>
    <lastmod>2025-06-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.doughmination.win/cookies</loc>
    <lastmod>2025-06-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>"""
    return Response(content=sitemap_content, media_type="application/xml")

@app.get("/favicon.ico")
async def favicon():
    """Serve favicon"""
    favicon_path = STATIC_DIR / "favicon.ico"
    if favicon_path.exists():
        return FileResponse(favicon_path)
    # Return a default favicon or 404
    raise HTTPException(status_code=404, detail="Favicon not found")

# ============================================================================
# WEBSOCKET CONNECTION MANAGER
# ============================================================================

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, Set[WebSocket]] = {
            "all": set(),  # All connected clients
            "authenticated": set()  # Authenticated users
        }
        # Use weakref to prevent memory leaks
        self._weak_connections = weakref.WeakSet()

    async def connect(self, websocket: WebSocket, group: str = "all"):
        await websocket.accept()
        self.active_connections[group].add(websocket)
        self._weak_connections.add(websocket)
        print(f"Client connected to group: {group}. Total connections: {len(self.active_connections[group])}")

    def disconnect(self, websocket: WebSocket, group: str = "all"):
        self.active_connections[group].discard(websocket)
        # Clean up from all groups when disconnecting
        for group_set in self.active_connections.values():
            group_set.discard(websocket)
        print(f"Client disconnected from group: {group}. Remaining connections: {len(self.active_connections[group])}")

    async def send_personal_message(self, message: str, websocket: WebSocket):
        try:
            await websocket.send_text(message)
        except Exception as e:
            print(f"Error sending personal message: {e}")
            # Remove the connection if it's broken
            self.disconnect(websocket)

    async def broadcast(self, message: str, group: str = "all"):
        """Broadcast message to all connections in a group"""
        disconnected = set()
        
        for connection in self.active_connections[group].copy():
            try:
                await connection.send_text(message)
            except WebSocketDisconnect:
                disconnected.add(connection)
            except Exception as e:
                print(f"Error broadcasting to client: {e}")
                disconnected.add(connection)
        
        # Clean up disconnected clients
        for conn in disconnected:
            self.disconnect(conn, group)

    async def broadcast_json(self, data: dict, group: str = "all"):
        """Broadcast JSON data to all connections in a group"""
        message = json.dumps(data)
        await self.broadcast(message, group)
            
    async def broadcast_to_interested_clients(self, member_ids: List[str], message_type: str, data: dict):
        """
        Broadcast a message only to clients who are interested in specific members
        This is useful for sending updates about specific cofronts
        """
        message = {
            "type": message_type,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "data": data or {},
            "related_members": member_ids
        }
        
        json_message = json.dumps(message)
        
        # For now, we'll broadcast to all authenticated clients
        # In the future, you could implement a subscription system
        # where clients subscribe to updates about specific members
        for connection in self.active_connections["authenticated"].copy():
            try:
                await connection.send_text(json_message)
            except WebSocketDisconnect:
                self.disconnect(connection, "authenticated")
            except Exception as e:
                print(f"Error broadcasting to client: {e}")
                self.disconnect(connection, "authenticated")

# Create a global connection manager instance
manager = ConnectionManager()

# ============================================================================
# WEBSOCKET ENDPOINT
# ============================================================================

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # Accept the WebSocket connection
    await manager.connect(websocket)
    
    try:
        while True:
            # Keep the connection alive
            data = await websocket.receive_text()
            
            # You can handle different message types if needed
            if data == "ping":
                await websocket.send_text("pong")
            else:
                # Handle other message types here if needed
                pass
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(websocket)

# ============================================================================
# WEBSOCKET BROADCAST HELPERS
# ============================================================================

async def broadcast_frontend_update(data_type: str, data: dict = None):
    """Broadcast an update to all connected clients"""
    message = {
        "type": data_type,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "data": data or {}
    }
    await manager.broadcast_json(message)

async def broadcast_fronting_update(fronters_data: dict):
    """Broadcast fronting member changes"""
    await broadcast_frontend_update("fronting_update", fronters_data)

async def broadcast_mental_state_update(mental_state_data: dict):
    """Broadcast mental state changes"""
    await broadcast_frontend_update("mental_state_update", mental_state_data)

async def broadcast_member_update(members_data: list):
    """Broadcast member list changes"""
    await broadcast_frontend_update("members_update", {"members": members_data})

async def broadcast_cofront_update(cofront_data: dict):
    """Broadcast when a new dynamic cofront is created or updated"""
    await broadcast_frontend_update("cofront_update", cofront_data)

# ============================================================================
# MENTAL STATE API ENDPOINTS
# ============================================================================

@app.get("/api/mental-state")
async def get_mental_state():
    """Get current mental state from database"""
    try:
        # Check if mental_state.json exists
        if os.path.exists("mental_state.json"):
            with open("mental_state.json", "r") as f:
                state_data = json.load(f)
                # Convert the string back to datetime
                state_data["updated_at"] = datetime.fromisoformat(state_data["updated_at"])
                return MentalState(**state_data)
        else:
            # Default state
            return MentalState(
                level="safe",
                updated_at=datetime.now(timezone.utc),
                notes=None
            )
    except Exception as e:
        print(f"Error loading mental state: {e}")
        return MentalState(
            level="safe",
            updated_at=datetime.now(timezone.utc),
            notes=None
        )

@app.post("/api/mental-state")
async def update_mental_state(state: MentalState, user = Depends(get_current_user)):
    """Update mental state (admin only)"""
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    try:
        state_data = state.dict()
        state_data["updated_at"] = state_data["updated_at"].isoformat()
        
        with open("mental_state.json", "w") as f:
            json.dump(state_data, f, indent=2)
        
        # Broadcast the mental state update
        await broadcast_mental_state_update(state_data)
        
        return {"success": True, "message": "Mental state updated"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update mental state: {str(e)}")

# ============================================================================
# SYSTEM AND MEMBER API ENDPOINTS
# ============================================================================

@app.get("/api/system")
async def system_info():
    try:
        # Get system data
        system_data = await get_system()
        
        # Get mental state
        mental_state_data = None
        if os.path.exists("mental_state.json"):
            with open("mental_state.json", "r") as f:
                state_data = json.load(f)
                # Convert the string back to datetime for the response
                state_data["updated_at"] = datetime.fromisoformat(state_data["updated_at"])
                mental_state_data = MentalState(**state_data)
        else:
            mental_state_data = MentalState(
                level="safe",
                updated_at=datetime.now(timezone.utc),
                notes=None
            )
        
        # Add mental state to system data
        system_data["mental_state"] = mental_state_data.dict()
        
        return system_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch system info: {str(e)}")

@app.get("/api/members")
async def members(
    subsystem: Optional[str] = None,
    include_untagged: bool = True
):
    """Get members, optionally filtered by sub-system"""
    try:
        if subsystem:
            # Validate subsystem parameter
            subsystems = get_subsystems()
            valid_labels = [s.label for s in subsystems] + ["host", "untagged"]
            if subsystem not in valid_labels:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Invalid subsystem. Valid options: {', '.join(valid_labels)}"
                )
        
        return await get_members(subsystem, include_untagged)
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch members: {str(e)}")

@app.get("/api/fronters")
async def fronters():
    try:
        return await get_fronters()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch fronters: {str(e)}")

@app.get("/api/member/{member_id}")
async def member_detail(member_id: str):
    try:
        members = await get_members()
        for member in members:
            if member["id"] == member_id or member["name"].lower() == member_id.lower():
                return member
        raise HTTPException(status_code=404, detail="Member not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch member details: {str(e)}")

# ============================================================================
# FRONTING CONTROL API ENDPOINTS
# ============================================================================

@app.post("/api/switch")
async def switch_front(request: Request, user = Depends(get_current_user)):
    try:
        body = await request.json()
        member_ids = body.get("members", [])

        if not isinstance(member_ids, list):
            raise HTTPException(status_code=400, detail="'members' must be a list of member IDs")
            
        # Enforce maximum number of fronters
        if len(member_ids) > MAX_FRONTERS:
            raise HTTPException(
                status_code=400, 
                detail=f"Cannot have more than {MAX_FRONTERS} members fronting at once"
            )

        await set_front(member_ids)
        
        # Broadcast the fronting update
        fronters_data = await get_fronters()
        await broadcast_fronting_update(fronters_data)
        
        return {"status": "success", "message": "Front updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/switch_front")
async def switch_single_front(request: Request, user = Depends(get_current_user)):
    try:
        body = await request.json()
        member_id = body.get("member_id")
        
        if not member_id:
            raise HTTPException(status_code=400, detail="member_id is required")

        result = await set_front([member_id])

        # After successful switch, broadcast the update
        if result or True:  # Broadcast even if result is None
            # Fetch the updated fronters data
            fronters_data = await get_fronters()
            await broadcast_fronting_update(fronters_data)

        return {"success": True, "message": "Front updated", "data": result}

    except HTTPException as http_exc:
        raise http_exc

    except Exception as e:
        print("Error in /api/switch_front:", e)
        raise HTTPException(status_code=500, detail=f"Failed to switch front: {str(e)}")

@app.post("/api/multi_switch")
async def switch_multiple_fronters(
    data: Dict[str, Any] = Body(...),
    user = Depends(get_current_user)
):
    """
    Switch to multiple fronters at once
    This is an alternative to /api/switch that provides more detailed feedback
    """
    try:
        member_ids = data.get("member_ids", [])
        
        if not isinstance(member_ids, list):
            raise HTTPException(status_code=400, detail="'member_ids' must be a list")
            
        # Enforce maximum number of fronters
        if len(member_ids) > MAX_FRONTERS:
            raise HTTPException(
                status_code=400, 
                detail=f"Cannot have more than {MAX_FRONTERS} members fronting at once"
            )
        
        # Get the members to show their names in the response
        all_members = await get_members()
        switching_members = []
        
        for member_id in member_ids:
            for member in all_members:
                if member.get("id") == member_id:
                    switching_members.append({
                        "id": member.get("id"),
                        "name": member.get("name"),
                        "display_name": member.get("display_name", member.get("name"))
                    })
                    break
        
        # Switch the fronters
        await set_front(member_ids)
        
        # Broadcast the fronting update
        fronters_data = await get_fronters()
        await broadcast_fronting_update(fronters_data)
        
        # Return detailed information about the switch
        return {
            "status": "success",
            "message": "Fronters updated successfully",
            "fronters": switching_members,
            "count": len(switching_members)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# COFRONT API ENDPOINTS
# ============================================================================

@app.post("/api/dynamic_cofront")
async def create_custom_cofront(
    data: Dict[str, Any] = Body(...),
    user = Depends(get_current_user)
):
    """Create a dynamic cofront from selected members"""
    try:
        member_ids = data.get("member_ids", [])
        custom_name = data.get("name")
        
        if not member_ids or len(member_ids) < 2:
            raise HTTPException(status_code=400, detail="At least 2 members are required for a cofront")
            
        if len(member_ids) > MAX_FRONTERS:
            raise HTTPException(
                status_code=400, 
                detail=f"Cannot have more than {MAX_FRONTERS} members in a cofront"
            )
        
        # Create the dynamic cofront
        cofront_data = await create_dynamic_cofront(member_ids, custom_name)
        
        # Set this cofront as the current fronter
        if data.get("set_as_current", False):
            # We'll use the member IDs directly here
            await set_front(member_ids)
            
            # Broadcast the fronting update
            fronters_data = await get_fronters()
            await broadcast_fronting_update(fronters_data)
        
        # Broadcast the cofront creation/update
        await broadcast_cofront_update({
            "action": "created",
            "cofront": cofront_data
        })
        
        return {
            "status": "success", 
            "message": "Dynamic cofront created successfully",
            "cofront": cofront_data
        }
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/cofronts")
async def get_available_cofronts(user = Depends(get_current_user)):
    """Get all available predefined cofronts"""
    try:
        # Get all members
        members = await get_members()
        
        # Filter to only get cofronts
        cofronts = [m for m in members if m.get("is_cofront")]
        
        return {
            "status": "success",
            "cofronts": cofronts
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# SUB-SYSTEM API ENDPOINTS
# ============================================================================

@app.get("/api/subsystems")
async def list_subsystems():
    """Get all available sub-systems"""
    try:
        subsystems = get_subsystems()
        return {
            "status": "success",
            "subsystems": [subsystem.dict() for subsystem in subsystems]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch sub-systems: {str(e)}")

@app.get("/api/members/by-subsystem")
async def members_by_subsystem():
    """Get members grouped by their sub-systems"""
    try:
        # Get all members without filtering
        all_members = await get_members()
        
        # Group by sub-system
        grouped_members = get_members_by_subsystem(all_members)
        
        return {
            "status": "success",
            "subsystems": grouped_members
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to group members by sub-system: {str(e)}")

@app.get("/api/members/filtered")
async def members_filtered(
    subsystem: Optional[str] = None,
    include_untagged: bool = True
):
    """Get members filtered by sub-system"""
    try:
        # Validate subsystem parameter
        if subsystem:
            subsystems = get_subsystems()
            valid_labels = [s.label for s in subsystems] + ["host", "untagged"]
            if subsystem not in valid_labels:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Invalid subsystem. Valid options: {', '.join(valid_labels)}"
                )
        
        # Get filtered members
        members = await get_members(subsystem, include_untagged)
        
        return {
            "status": "success",
            "members": members,
            "filter": {
                "subsystem": subsystem,
                "include_untagged": include_untagged
            }
        }
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch filtered members: {str(e)}")

@app.get("/api/member-tags")
async def list_member_tags(user = Depends(get_current_user)):
    """Get all member tag assignments (admin only)"""
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    try:
        member_tags = get_member_tags()
        return {
            "status": "success",
            "member_tags": member_tags
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch member tags: {str(e)}")

@app.post("/api/member-tags/{member_identifier}")
async def update_member_tag_list(
    member_identifier: str,
    tags: List[str] = Body(...),
    user = Depends(get_current_user)
):
    """Update the complete tag list for a member (admin only)"""
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    try:
        # Validate all tags
        for tag in tags:
            if not validate_subsystem_tag(tag):
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid tag '{tag}'. Must be one of: pets, valorant, vocaloids, host"
                )
        
        # Update the member's tags
        success = update_member_tags(member_identifier, tags)
        
        if success:
            # Clear member cache to reflect changes
            from cache import set_in_cache
            set_in_cache("members_raw", None, 0)
            
            return {
                "status": "success",
                "message": f"Updated tags for {member_identifier}",
                "tags": tags
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to update member tags")
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update member tags: {str(e)}")

@app.post("/api/member-tags/{member_identifier}/add")
async def add_single_member_tag(
    member_identifier: str,
    tag: str = Body(..., embed=True),
    user = Depends(get_current_user)
):
    """Add a single tag to a member (admin only)"""
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    try:
        # Validate tag
        if not validate_subsystem_tag(tag):
            raise HTTPException(
                status_code=400,
                detail=f"Invalid tag '{tag}'. Must be one of: pets, valorant, vocaloids, host"
            )
        
        # Add the tag
        success = add_member_tag(member_identifier, tag)
        
        if success:
            # Clear member cache to reflect changes
            from cache import set_in_cache
            set_in_cache("members_raw", None, 0)
            
            return {
                "status": "success",
                "message": f"Added tag '{tag}' to {member_identifier}"
            }
        else:
            return {
                "status": "info",
                "message": f"Tag '{tag}' already exists for {member_identifier}"
            }
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add member tag: {str(e)}")

@app.delete("/api/member-tags/{member_identifier}/{tag}")
async def remove_single_member_tag(
    member_identifier: str,
    tag: str,
    user = Depends(get_current_user)
):
    """Remove a single tag from a member (admin only)"""
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    try:
        # Remove the tag
        success = remove_member_tag(member_identifier, tag)
        
        if success:
            # Clear member cache to reflect changes
            from cache import set_in_cache
            set_in_cache("members_raw", None, 0)
            
            return {
                "status": "success",
                "message": f"Removed tag '{tag}' from {member_identifier}"
            }
        else:
            raise HTTPException(
                status_code=404,
                detail=f"Tag '{tag}' not found for {member_identifier}"
            )
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to remove member tag: {str(e)}")

# ============================================================================
# AUTHENTICATION API ENDPOINTS
# ============================================================================

@app.get("/api/is_admin")
async def check_admin(user = Depends(get_current_user)):
    return {"isAdmin": user.is_admin}

# ============================================================================
# USER MANAGEMENT API ENDPOINTS
# ============================================================================

@app.get("/api/users", response_model=List[UserResponse])
async def list_users(current_user = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    users = get_users()
    return [UserResponse(
        id=user.id, 
        username=user.username, 
        display_name=user.display_name, 
        is_admin=user.is_admin,
        avatar_url=getattr(user, 'avatar_url', None)
    ) for user in users]

@app.post("/api/users", response_model=UserResponse)
async def add_user(user_create: UserCreate, current_user = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    try:
        new_user = create_user(user_create)
        return UserResponse(
            id=new_user.id, 
            username=new_user.username, 
            display_name=new_user.display_name, 
            is_admin=new_user.is_admin,
            avatar_url=getattr(new_user, 'avatar_url', None)
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")

@app.delete("/api/users/{user_id}")
async def remove_user(user_id: str, current_user = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    # Prevent self-deletion
    if user_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
    
    success = delete_user(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "User deleted successfully"}

@app.put("/api/users/{user_id}")
async def update_user_info(user_id: str, user_update: UserUpdate, current_user = Depends(get_current_user)):
    # Only admins or the user themselves can update their info
    if not current_user.is_admin and current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this user")
    
    try:
        updated_user = update_user(user_id, user_update)
        if not updated_user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return UserResponse(
            id=updated_user.id,
            username=updated_user.username,
            display_name=updated_user.display_name,
            is_admin=updated_user.is_admin,
            avatar_url=getattr(updated_user, 'avatar_url', None)
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/users/{user_id}/avatar")
async def upload_user_avatar(
    user_id: str,
    avatar: UploadFile = File(...),
    current_user = Depends(get_current_user)
):
    # Only admins or the user themselves can update their avatar
    if not current_user.is_admin and current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this user")
    
    # Verify user exists
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Only allow specific file extensions
    allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif']
    
    # Get file extension and convert to lowercase
    _, file_ext = os.path.splitext(avatar.filename)
    file_ext = file_ext.lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed types are: {', '.join(allowed_extensions)}"
        )
    
    # Validate file size (2MB limit)
    MAX_SIZE = 2 * 1024 * 1024  # 2MB
    
    # First check content-length header
    content_length = int(avatar.headers.get("content-length", 0))
    if content_length > MAX_SIZE:
        raise HTTPException(
            status_code=413, 
            detail="File size exceeds the limit of 2MB"
        )
    
    try:
        # Read the file content
        contents = await avatar.read()
        file_size = len(contents)
        
        # Double-check file size
        if file_size > MAX_SIZE:
            raise HTTPException(
                status_code=413,
                detail="File size exceeds the limit of 2MB"
            )
        
        # Generate unique filename
        unique_filename = f"{user_id}_{uuid.uuid4()}{file_ext}"
        file_path = UPLOAD_DIR / unique_filename
        
        # If there's an existing avatar, try to remove it
        users = get_users()
        for i, u in enumerate(users):
            if u.id == user_id and hasattr(u, 'avatar_url') and u.avatar_url:
                old_filename = u.avatar_url.split("/")[-1]
                old_path = UPLOAD_DIR / old_filename
                try:
                    if os.path.exists(old_path):
                        os.remove(old_path)
                except Exception as e:
                    print(f"Error removing old avatar: {e}")
        
        # Save the new file
        async with aiofiles.open(file_path, 'wb') as out_file:
            await out_file.write(contents)
        
        # Get the base URL from environment variables
        base_url = os.getenv("BASE_URL", "").rstrip('/')
        if not base_url:
            # Fallback to a default URL
            base_url = "https://friends.clovetwilight3.co.uk"
        
        # Construct full avatar URL
        avatar_url = f"{base_url}/avatars/{unique_filename}"
        
        # Update user with avatar URL
        user_update = UserUpdate(avatar_url=avatar_url)
        updated_user = update_user(user_id, user_update)
        
        if not updated_user:
            raise HTTPException(status_code=500, detail="Failed to update user with avatar URL")
        
        return {"success": True, "avatar_url": avatar_url}
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print(f"Error saving avatar: {e}")
        raise HTTPException(status_code=500, detail=f"Error uploading avatar: {str(e)}")

@app.get("/avatars/{filename}")
async def get_avatar(filename: str):
    """Serve avatar images with proper content type handling"""
    file_path = UPLOAD_DIR / filename
    
    if os.path.exists(file_path) and os.path.isfile(file_path):
        # Set the appropriate media type based on file extension
        media_type = None
        if filename.lower().endswith(('.jpg', '.jpeg')):
            media_type = "image/jpeg"
        elif filename.lower().endswith('.png'):
            media_type = "image/png"
        elif filename.lower().endswith('.gif'):
            media_type = "image/gif"
        
        return FileResponse(
            path=file_path,
            media_type=media_type,
            filename=filename
        )
    
    # If not found locally, redirect to default avatar
    return RedirectResponse(url=DEFAULT_AVATAR)

# ============================================================================
# METRICS API ENDPOINTS
# ============================================================================

@app.get("/api/metrics/fronting-time")
async def fronting_time_metrics(days: int = 30, user = Depends(get_current_user)):
    """Get fronting time metrics for each member over different timeframes"""
    try:
        metrics = await get_fronting_time_metrics(days)
        return metrics
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch fronting metrics: {str(e)}")

@app.get("/api/metrics/switch-frequency")
async def switch_frequency_metrics(days: int = 30, user = Depends(get_current_user)):
    """Get switch frequency metrics over different timeframes"""
    try:
        metrics = await get_switch_frequency_metrics(days)
        return metrics
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch switch frequency metrics: {str(e)}")

# ============================================================================
# ADMIN UTILITY ENDPOINTS
# ============================================================================

@app.post("/api/admin/refresh")
async def admin_refresh(user = Depends(get_current_user)):
    """Force refresh all connected clients"""
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    
    try:
        # Broadcast refresh command
        await broadcast_frontend_update("force_refresh", {
            "message": "Admin initiated refresh"
        })
        
        return {"success": True, "message": "Refresh broadcast sent"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to broadcast refresh: {str(e)}")
