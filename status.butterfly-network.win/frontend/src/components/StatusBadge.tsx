import { cn } from "@/lib/utils";

export type StatusType = 'online' | 'offline' | 'warning' | 'unknown';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  online: {
    label: 'Online',
    className: 'bg-status-online-bg text-status-online border-status-online/20',
  },
  offline: {
    label: 'Offline',
    className: 'bg-status-offline-bg text-status-offline border-status-offline/20',
  },
  warning: {
    label: 'Issues',
    className: 'bg-status-warning-bg text-status-warning border-status-warning/20',
  },
  unknown: {
    label: 'Unknown',
    className: 'bg-status-unknown-bg text-status-unknown border-status-unknown/20',
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border",
      config.className,
      className
    )}>
      <div className={cn(
        "w-2 h-2 rounded-full",
        status === 'online' && "bg-status-online",
        status === 'offline' && "bg-status-offline", 
        status === 'warning' && "bg-status-warning",
        status === 'unknown' && "bg-status-unknown"
      )} />
      {config.label}
    </div>
  );
};