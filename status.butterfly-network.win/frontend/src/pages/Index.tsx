// src/pages/Index.tsx - Updated to use backend API
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock, AlertCircle, Wifi, WifiOff } from "lucide-react";
import { OverallStatus } from "@/components/OverallStatus";
import { StatusBadge } from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import { statusApi, BackendStatusResponse, BackendSiteStatus } from "@/services/statusApi";

const Index = () => {
  const [statusData, setStatusData] = useState<BackendStatusResponse | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Connection Restored",
        description: "You're back online. Refreshing status...",
      });
      refreshStatus();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Connection Lost",
        description: "You're currently offline. Status may be outdated.",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  const refreshStatus = async (showToast = false) => {
    if (!isOnline) {
      toast({
        title: "No Connection",
        description: "Cannot refresh while offline",
        variant: "destructive",
      });
      return;
    }

    setIsRefreshing(true);
    setError(null);
    
    try {
      const data = await statusApi.getStatus();
      setStatusData(data);
      setLastUpdated(new Date());
      
      if (showToast) {
        toast({
          title: "Status Updated",
          description: `Checked ${data.sites.length} sites successfully`,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Failed to refresh status:', error);
      
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const triggerManualCheck = async () => {
    if (!isOnline) {
      toast({
        title: "No Connection",
        description: "Cannot trigger check while offline",
        variant: "destructive",
      });
      return;
    }

    try {
      await statusApi.triggerManualCheck();
      toast({
        title: "Check Initiated",
        description: "Manual status check has been triggered. Results will update shortly.",
      });
      
      // Refresh after a short delay to get updated results
      setTimeout(() => refreshStatus(), 3000);
    } catch (error) {
      toast({
        title: "Failed to Trigger Check",
        description: "Could not initiate manual status check",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Load initial status
    refreshStatus();

    // Set up periodic refresh every 30 seconds
    const interval = setInterval(() => {
      if (isOnline && !isRefreshing) {
        refreshStatus();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isOnline]);

  // Convert backend data to frontend format
  const convertToFrontendSite = (backendSite: BackendSiteStatus) => ({
    domain: backendSite.domain,
    displayName: backendSite.display_name,
    status: backendSite.status,
    responseTime: backendSite.response_time,
    lastChecked: new Date(backendSite.last_checked).toLocaleTimeString(),
    uptime: backendSite.uptime_30d, // Use 30-day uptime for the card display
    uptime24h: backendSite.uptime_24h,
    uptime7d: backendSite.uptime_7d,
    uptime30d: backendSite.uptime_30d,
    lastOnline: backendSite.last_online ? new Date(backendSite.last_online).toLocaleString() : undefined,
    sslValid: backendSite.ssl_valid,
    sslExpires: backendSite.ssl_expires,
    statusCode: backendSite.status_code,
    errorMessage: backendSite.error_message,
  });

  const sites = statusData ? statusData.sites.map(convertToFrontendSite) : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                Butterfly Network Status
                {!isOnline && <WifiOff className="w-5 h-5 text-destructive" />}
                {isOnline && <Wifi className="w-5 h-5 text-green-500" />}
              </h1>
              <p className="text-muted-foreground">
                {isOnline ? "Real-time monitoring of all services" : "Offline - status may be outdated"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
              <Button 
                onClick={() => refreshStatus(true)} 
                disabled={isRefreshing || !isOnline}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                onClick={triggerManualCheck} 
                disabled={isRefreshing || !isOnline}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                Manual Check
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">Connection Error</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Overall Status */}
        {statusData && (
          <OverallStatus 
            status={statusData.overall.overall_status}
            totalSites={statusData.overall.total_sites}
            onlineSites={statusData.overall.online_sites}
          />
        )}

        {/* Loading State */}
        {!statusData && !error && (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Loading status information...</p>
          </div>
        )}

        {/* Site Status Grid */}
        {sites.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sites.map((site) => (
              <EnhancedSiteStatusCard
                key={site.domain}
                {...site}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border/50">
          <div className="text-center text-sm text-muted-foreground">
            <p>Status updates are refreshed every 5 minutes</p>
            <p className="mt-2">Having issues? Contact support for assistance</p>
            {statusData && (
              <p className="mt-2 text-xs">
                Backend last updated: {new Date(statusData.overall.last_updated).toLocaleString()}
              </p>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
};

// Enhanced Site Status Card with additional backend data
interface EnhancedSiteStatusCardProps {
  domain: string;
  displayName: string;
  status: 'online' | 'offline' | 'warning' | 'unknown';
  responseTime?: number;
  lastChecked: string;
  uptime?: number;
  uptime24h?: number;
  uptime7d?: number;
  uptime30d?: number;
  lastOnline?: string;
  sslValid?: boolean;
  sslExpires?: string;
  statusCode?: number;
  errorMessage?: string;
}

const EnhancedSiteStatusCard = ({ 
  domain, 
  displayName,
  status, 
  responseTime, 
  lastChecked, 
  uptime,
  uptime24h,
  uptime7d,
  uptime30d,
  lastOnline,
  sslValid,
  sslExpires,
  statusCode,
  errorMessage
}: EnhancedSiteStatusCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-card border border-border/50 rounded-lg overflow-hidden">
      {/* Main Card Content */}
      <div className="p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate" title={domain}>
              {displayName}
            </h3>
            <p className="text-sm text-muted-foreground">Last checked: {lastChecked}</p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <StatusBadge status={status} />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="text-muted-foreground mb-1">Response Time</p>
            <p className="font-medium text-foreground">
              {responseTime ? `${responseTime}ms` : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Uptime (30d)</p>
            <p className="font-medium text-foreground">
              {uptime30d !== undefined ? `${uptime30d}%` : 'N/A'}
            </p>
          </div>
        </div>

        {/* Status Code and SSL Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            {statusCode && (
              <span className={`px-2 py-1 rounded ${
                statusCode >= 200 && statusCode < 300 ? 'bg-green-100 text-green-700' :
                statusCode >= 300 && statusCode < 400 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {statusCode}
              </span>
            )}
            {sslValid !== undefined && (
              <span className={`px-2 py-1 rounded ${
                sslValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                SSL: {sslValid ? 'Valid' : 'Invalid'}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-destructive/10 border border-destructive/20 rounded p-2 mb-4">
            <p className="text-xs text-destructive">{errorMessage}</p>
          </div>
        )}
      </div>

      {/* Expandable Details */}
      {showDetails && (
        <div className="px-6 pb-6 border-t border-border/50 bg-muted/20">
          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">24h Uptime</p>
                <p className="font-medium">{uptime24h !== undefined ? `${uptime24h}%` : 'N/A'}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">7d Uptime</p>
                <p className="font-medium">{uptime7d !== undefined ? `${uptime7d}%` : 'N/A'}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">30d Uptime</p>
                <p className="font-medium">{uptime30d !== undefined ? `${uptime30d}%` : 'N/A'}</p>
              </div>
            </div>
            
            {lastOnline && (
              <div>
                <p className="text-muted-foreground text-sm mb-1">Last Online</p>
                <p className="text-sm font-medium">{lastOnline}</p>
              </div>
            )}
            
            {sslExpires && (
              <div>
                <p className="text-muted-foreground text-sm mb-1">SSL Expires</p>
                <p className="text-sm font-medium">{new Date(sslExpires).toLocaleDateString()}</p>
              </div>
            )}
            
            <div>
              <p className="text-muted-foreground text-sm mb-1">Domain</p>
              <p className="text-sm font-mono break-all">{domain}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;