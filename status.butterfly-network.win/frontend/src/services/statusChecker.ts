import { StatusType, Site, domainDisplayNames } from "@/data/sites";

interface StatusCheckResult {
  status: StatusType;
  responseTime?: number;
  error?: string;
}

export class StatusChecker {
  private static readonly TIMEOUT_MS = 10000; // 10 seconds
  private static readonly WARNING_THRESHOLD_MS = 2000; // 2 seconds

  static async checkSiteStatus(domain: string): Promise<StatusCheckResult> {
    const startTime = Date.now();
    
    try {
      // Try HTTPS first, then HTTP if that fails
      const urls = [
        `https://${domain}`,
        `http://${domain}`
      ];

      for (const url of urls) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

          const response = await fetch(url, {
            method: 'HEAD', // Use HEAD to minimize data transfer
            mode: 'no-cors', // Handle CORS issues
            signal: controller.signal,
            cache: 'no-cache'
          });

          clearTimeout(timeoutId);
          const responseTime = Date.now() - startTime;

          // With no-cors mode, we can't check response.ok, so we assume success if no error
          return {
            status: responseTime > this.WARNING_THRESHOLD_MS ? 'warning' : 'online',
            responseTime
          };
        } catch (error) {
          // Continue to next URL if this one fails
          continue;
        }
      }

      // If both HTTPS and HTTP fail, try a different approach
      return await this.fallbackCheck(domain, startTime);
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      return {
        status: responseTime > this.TIMEOUT_MS ? 'offline' : 'unknown',
        responseTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private static async fallbackCheck(domain: string, startTime: number): Promise<StatusCheckResult> {
    try {
      // Try to load an image from the domain (common technique for checking availability)
      const img = new Image();
      const responseTime = Date.now() - startTime;
      
      return new Promise<StatusCheckResult>((resolve) => {
        const timeout = setTimeout(() => {
          resolve({
            status: 'offline',
            responseTime: Date.now() - startTime
          });
        }, this.TIMEOUT_MS - responseTime);

        img.onload = () => {
          clearTimeout(timeout);
          const finalResponseTime = Date.now() - startTime;
          resolve({
            status: finalResponseTime > this.WARNING_THRESHOLD_MS ? 'warning' : 'online',
            responseTime: finalResponseTime
          });
        };

        img.onerror = () => {
          clearTimeout(timeout);
          resolve({
            status: 'offline',
            responseTime: Date.now() - startTime
          });
        };

        // Try to load favicon or a common image
        img.src = `https://${domain}/favicon.ico?t=${Date.now()}`;
      });
    } catch {
      return {
        status: 'offline',
        responseTime: Date.now() - startTime
      };
    }
  }

  static async checkAllSites(domains: string[]): Promise<Site[]> {
    const checkPromises = domains.map(async (domain) => {
      const result = await this.checkSiteStatus(domain);
      return {
        domain,
        displayName: domainDisplayNames[domain] || domain,
        status: result.status,
        responseTime: result.responseTime,
        uptime: this.calculateMockUptime(result.status), // In a real app, this would come from historical data
        lastChecked: new Date().toLocaleTimeString()
      };
    });

    return Promise.all(checkPromises);
  }

  private static calculateMockUptime(status: StatusType): number {
    // Mock uptime calculation based on current status
    // In a real implementation, this would be calculated from historical data
    switch (status) {
      case 'online': return Math.floor(Math.random() * 5) + 95;
      case 'warning': return Math.floor(Math.random() * 15) + 80;
      case 'offline': return Math.floor(Math.random() * 30) + 60;
      default: return Math.floor(Math.random() * 20) + 75;
    }
  }
}