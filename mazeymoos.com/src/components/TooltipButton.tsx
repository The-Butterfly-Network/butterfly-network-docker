import { LucideIcon } from "lucide-react";

interface TooltipButtonProps {
  label: string;
  username: string;
  icon: LucideIcon;
}

export const TooltipButton = ({ label, username, icon: IconComponent }: TooltipButtonProps) => {
  return (
    <div className="group relative inline-block">
      <div className="gaming-btn cursor-default">
        <div className="flex items-center justify-center gap-3">
          <IconComponent size={20} className="text-primary" />
          <span>{label}</span>
        </div>
      </div>
      <div className="tooltip-content group-hover:visible group-hover:opacity-100 -top-12 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
        {username}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-primary"></div>
      </div>
    </div>
  );
};