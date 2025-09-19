import { Card } from "@/components/ui/card";
import { StatusBadge, StatusType } from "./StatusBadge";

interface SiteStatusCardProps {
  domain: string;
  displayName: string;
  status: StatusType;
  responseTime?: number;
  lastChecked: string;
  uptime?: number;
}

export const SiteStatusCard = ({ 
  domain, 
  displayName,
  status, 
  responseTime, 
  lastChecked, 
  uptime 
}: SiteStatusCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 border border-border/50">
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
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground mb-1">Response Time</p>
          <p className="font-medium text-foreground">
            {responseTime ? `${responseTime}ms` : 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Uptime (30d)</p>
          <p className="font-medium text-foreground">
            {uptime ? `${uptime}%` : 'N/A'}
          </p>
        </div>
      </div>
    </Card>
  );
};