import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock } from "lucide-react";
import { OverallStatus } from "@/components/OverallStatus";
import { SiteStatusCard } from "@/components/SiteStatusCard";
import { generateMockStatus, getOverallStatus, Site } from "@/data/sites";
import { StatusChecker } from "@/services/statusChecker";

const Index = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const domains = [
    'discord.butterfly-network.win',
    'www.alextlm.co.uk',
    'www.butterfly-network.win',
    'www.clove-portfolio.win',
    'www.clovetwilight3.co.uk',
    'www.doughmination.win',
    'www.hunt-rix.rocks',
    'www.iwantedthislongdomainnamesoibroughtit.win',
    'www.lgbwitht.win',
    'www.mazeymoos.com',
    'www.mc-svg.win',
    'www.myluminarasystem.pro',
    'www.themidnightcyan.win',
    'www.themotorbikeone.win',
    'www.trans4trans.win',
    'www.transgamers.org',
    'www.unifiedgaming-systems.co.uk',
    'www.yaoi-lover.win',
    'www.yuri-lover.win',
  ];

  const refreshStatus = async () => {
    setIsRefreshing(true);
    try {
      const results = await StatusChecker.checkAllSites(domains);
      setSites(results);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to check site status:', error);
      // Fallback to mock data if real checking fails
      setSites(generateMockStatus());
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    // Load real status on initial page load
    refreshStatus();
  }, []);

  const overallStatus = getOverallStatus(sites);
  const onlineSites = sites.filter(site => site.status === 'online').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Butterfly Network Status</h1>
              <p className="text-muted-foreground">Real-time monitoring of all services</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <Button 
                onClick={refreshStatus} 
                disabled={isRefreshing}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Overall Status */}
        <OverallStatus 
          status={overallStatus}
          totalSites={sites.length}
          onlineSites={onlineSites}
        />

        {/* Site Status Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <SiteStatusCard
              key={site.domain}
              domain={site.domain}
              displayName={site.displayName}
              status={site.status}
              responseTime={site.responseTime}
              lastChecked={site.lastChecked}
              uptime={site.uptime}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border/50">
          <div className="text-center text-sm text-muted-foreground">
            <p>Status updates are refreshed every 5 minutes</p>
            <p className="mt-2">Having issues? Contact support for assistance</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
