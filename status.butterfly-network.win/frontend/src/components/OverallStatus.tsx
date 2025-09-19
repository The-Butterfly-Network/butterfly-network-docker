import { Card } from "@/components/ui/card";
import { StatusBadge, StatusType } from "./StatusBadge";

interface OverallStatusProps {
  status: StatusType;
  totalSites: number;
  onlineSites: number;
}

export const OverallStatus = ({ status, totalSites, onlineSites }: OverallStatusProps) => {
  const getStatusMessage = () => {
    switch (status) {
      case 'online':
        return 'All systems operational';
      case 'warning':
        return 'Some systems experiencing issues';
      case 'offline':
        return 'Major system outage';
      default:
        return 'System status unknown';
    }
  };

  return (
    <Card className="p-8 mb-8 bg-gradient-status border-border/50">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <StatusBadge status={status} className="text-base px-4 py-2" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {getStatusMessage()}
        </h2>
        <p className="text-muted-foreground">
          {onlineSites} of {totalSites} services are operational
        </p>
      </div>
    </Card>
  );
};