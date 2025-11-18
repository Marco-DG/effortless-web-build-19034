import React from 'react';
import { cn } from '@/lib/utils';
import { Info, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

interface CleanInfoBoxProps {
  type?: 'info' | 'tip' | 'warning' | 'success';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const CleanInfoBox: React.FC<CleanInfoBoxProps> = ({
  type = 'info',
  title,
  children,
  className
}) => {
  const typeConfig = {
    info: {
      icon: Info,
      colors: "bg-blue-50 border-blue-200 text-blue-800",
      iconColor: "text-blue-600",
      titleColor: "text-blue-900"
    },
    tip: {
      icon: Lightbulb,
      colors: "bg-amber-50 border-amber-200 text-amber-800",
      iconColor: "text-amber-600",
      titleColor: "text-amber-900"
    },
    warning: {
      icon: AlertTriangle,
      colors: "bg-orange-50 border-orange-200 text-orange-800", 
      iconColor: "text-orange-600",
      titleColor: "text-orange-900"
    },
    success: {
      icon: CheckCircle,
      colors: "bg-green-50 border-green-200 text-green-800",
      iconColor: "text-green-600", 
      titleColor: "text-green-900"
    }
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn(
      "p-4 rounded-lg border",
      config.colors,
      className
    )}>
      <div className="flex gap-3">
        <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", config.iconColor)} />
        <div className="flex-1">
          {title && (
            <h4 className={cn("font-semibold text-sm mb-2", config.titleColor)}>
              {title}
            </h4>
          )}
          <div className="text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};