import React from 'react';
import { LogoConfig } from '../../types';
import { PreviewLayout } from '../../ui/Layout';
import { cn } from '@/lib/utils';

interface LogoPreviewProps {
  config: LogoConfig;
  businessName: string;
}

export const LogoPreview: React.FC<LogoPreviewProps> = ({ 
  config, 
  businessName 
}) => {
  const displayText = config.text || businessName || 'Your Logo';
  const isTextMode = config.mode === 'text' || !config.imageUrl;

  return (
    <PreviewLayout mode="logo">
      <div className="w-full h-full flex items-center justify-center p-8">
        {isTextMode ? (
          <div className={cn(
            'text-center transition-all duration-300',
            config.layout === 'vertical' && 'space-y-4',
            config.layout === 'horizontal' && 'flex items-center gap-4',
            config.layout === 'stacked' && 'space-y-2'
          )}>
            <div
              className="font-semibold tracking-tight"
              style={{
                fontFamily: config.font || 'Playfair Display',
                fontSize: `${config.size || 48}px`,
                color: config.color || '#8B4513',
                lineHeight: 1.1
              }}
            >
              {displayText}
            </div>
            
            {config.tagline && (
              <div
                className="text-muted-foreground"
                style={{
                  fontSize: `${(config.size || 48) * 0.3}px`,
                  fontFamily: 'Inter'
                }}
              >
                {config.tagline}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <img
              src={config.imageUrl}
              alt="Logo"
              className="max-h-64 max-w-full object-contain drop-shadow-lg"
              style={{
                height: `${config.size || 48}px`
              }}
            />
          </div>
        )}
      </div>
    </PreviewLayout>
  );
};