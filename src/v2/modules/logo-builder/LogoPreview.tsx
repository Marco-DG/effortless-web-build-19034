import React from 'react';
import { LogoConfig, CanvasElement } from '../../types';
import { PreviewLayout } from '../../ui/Layout';
import { cn } from '@/lib/utils';

interface LogoPreviewProps {
  config: LogoConfig;
  businessName: string;
  onUpdate?: (updates: Partial<LogoConfig>) => void;
}

export const LogoPreview: React.FC<LogoPreviewProps> = ({ 
  config, 
  businessName,
  onUpdate 
}) => {
  const displayText = config.text || businessName || 'Your Restaurant';
  const fontSize = config.size || 48;
  const fontFamily = config.font || 'Inter';
  const color = config.color || '#8B4513';
  const tagline = config.tagline;
  const layout = config.layout || 'vertical';
  
  const isImageMode = config.mode === 'image';
  const isHybridMode = config.mode === 'hybrid';
  const isCanvasMode = config.mode === 'canvas' || config.mode === 'advanced';
  const hasImage = config.imageUrl && (isImageMode || isHybridMode);

  // Funzione per renderizzare un elemento canvas
  const renderCanvasElement = (element: CanvasElement, index: number) => {
    const baseProps = {
      key: element.id,
      style: {
        transform: `translate(${element.x}px, ${element.y}px) rotate(${element.rotation}deg)`,
        position: 'absolute' as const,
        zIndex: element.zIndex || index,
        opacity: element.opacity || 1,
      }
    };

    if (element.type === 'text') {
      return (
        <div
          {...baseProps}
          style={{
            ...baseProps.style,
            fontFamily: element.style?.fontFamily || 'Inter',
            fontSize: `${element.style?.fontSize || 16}px`,
            fontWeight: element.style?.fontWeight || 'normal',
            color: element.style?.color || '#000',
            textAlign: (element.style?.textAlign as any) || 'center',
            letterSpacing: element.style?.letterSpacing || 'normal',
            textShadow: element.style?.textShadow,
            filter: element.style?.filter,
            mixBlendMode: element.style?.mixBlendMode as any,
            width: `${element.width}px`,
            height: `${element.height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {element.content || displayText}
        </div>
      );
    }

    if (element.type === 'shape') {
      if (element.subtype === 'circle') {
        return (
          <div
            {...baseProps}
            style={{
              ...baseProps.style,
              width: `${element.width}px`,
              height: `${element.height}px`,
              borderRadius: '50%',
              background: element.style?.fill || '#ccc',
              border: element.style?.stroke ? `${element.style?.strokeWidth || 1}px solid ${element.style.stroke}` : 'none',
              filter: element.style?.filter,
            }}
          />
        );
      }

      if (element.subtype === 'rectangle') {
        return (
          <div
            {...baseProps}
            style={{
              ...baseProps.style,
              width: `${element.width}px`,
              height: `${element.height}px`,
              background: element.style?.fill || '#ccc',
              border: element.style?.stroke ? `${element.style?.strokeWidth || 1}px solid ${element.style.stroke}` : 'none',
              filter: element.style?.filter,
            }}
          />
        );
      }

      if (element.subtype === 'line') {
        return (
          <div
            {...baseProps}
            style={{
              ...baseProps.style,
              width: `${element.width}px`,
              height: `${element.style?.strokeWidth || 2}px`,
              background: element.style?.stroke || '#000',
              transformOrigin: 'left center',
            }}
          />
        );
      }

      // Per path e forme complesse, usa SVG
      if (element.subtype === 'path' || element.style?.pathData) {
        return (
          <svg
            {...baseProps}
            width={element.width}
            height={element.height}
            style={{
              ...baseProps.style,
              overflow: 'visible'
            }}
          >
            <path
              d={element.style?.pathData || ''}
              fill={element.style?.fill || 'none'}
              stroke={element.style?.stroke || 'none'}
              strokeWidth={element.style?.strokeWidth || 1}
              strokeLinecap={element.style?.strokeLinecap as any}
              strokeLinejoin={element.style?.strokeLinejoin as any}
              filter={element.style?.filter}
            />
          </svg>
        );
      }
    }

    return null;
  };

  // Calcola le dimensioni responsive
  const responsiveFontSize = Math.min(fontSize, 64);
  const taglineFontSize = Math.min(responsiveFontSize * 0.35, 24);

  return (
    <PreviewLayout mode="logo">
      <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
        
        {/* Canvas Area */}
        <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 p-12 min-w-[400px] min-h-[300px] flex items-center justify-center">
          
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-5 rounded-xl"
            style={{
              backgroundImage: `
                linear-gradient(to right, #000 1px, transparent 1px),
                linear-gradient(to bottom, #000 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          />

          {/* Logo Content */}
          <div className="relative z-10 text-center">
            
            {/* Image + Text Layout (Hybrid) */}
            {isHybridMode && hasImage && (
              <div className={cn(
                'flex items-center transition-all duration-300',
                layout === 'vertical' && 'flex-col gap-6',
                layout === 'horizontal' && 'flex-row gap-8',
                layout === 'stacked' && 'flex-col gap-3'
              )}>
                <div className="flex-shrink-0">
                  <img
                    src={config.imageUrl}
                    alt="Logo"
                    className="object-contain rounded-lg shadow-md"
                    style={{
                      height: `${Math.min(responsiveFontSize * 1.5, 120)}px`,
                      maxWidth: '200px'
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div
                    className="font-bold leading-tight"
                    style={{
                      fontFamily,
                      fontSize: `${responsiveFontSize * 0.8}px`,
                      color,
                      fontWeight: fontFamily.includes('Playfair') || fontFamily.includes('Merriweather') ? '600' : '700'
                    }}
                  >
                    {displayText}
                  </div>
                  {tagline && (
                    <div
                      className="mt-2 opacity-80"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: `${taglineFontSize * 0.8}px`,
                        color: color,
                        fontWeight: '400'
                      }}
                    >
                      {tagline}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Image Only Mode */}
            {isImageMode && (
              <div className="flex flex-col items-center gap-4">
                {hasImage ? (
                  <img
                    src={config.imageUrl}
                    alt="Logo"
                    className="object-contain rounded-xl shadow-lg"
                    style={{
                      height: `${Math.min(responsiveFontSize * 2, 200)}px`,
                      maxWidth: '300px'
                    }}
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs">Aggiungi immagine</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Canvas Mode (Template) */}
            {isCanvasMode && (config.elements || config.template?.elements) && (
              <div 
                className="relative"
                style={{
                  width: `${config.canvasSize?.width || config.template?.canvasSize?.width || 400}px`,
                  height: `${config.canvasSize?.height || config.template?.canvasSize?.height || 300}px`,
                  transform: 'scale(0.8)', // Scale down for preview
                  transformOrigin: 'center center'
                }}
              >
                {(config.elements || config.template?.elements || []).map((element, index) => 
                  renderCanvasElement(element, index)
                )}
              </div>
            )}

            {/* Text Only Mode (Default) */}
            {(!isImageMode && !isHybridMode && !isCanvasMode) && (
              <div className={cn(
                'transition-all duration-300',
                layout === 'vertical' && 'space-y-4',
                layout === 'horizontal' && 'flex items-center gap-6 justify-center',
                layout === 'stacked' && 'space-y-2'
              )}>
                
                {/* Main Text */}
                <div
                  className="font-bold leading-tight tracking-tight"
                  style={{
                    fontFamily,
                    fontSize: `${responsiveFontSize}px`,
                    color,
                    fontWeight: fontFamily.includes('Playfair') || fontFamily.includes('Merriweather') ? '600' : '700',
                    textShadow: fontFamily.includes('Dancing Script') ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  {displayText}
                </div>
                
                {/* Tagline */}
                {tagline && (
                  <div
                    className="opacity-80"
                    style={{
                      fontFamily: fontFamily.includes('Dancing Script') ? fontFamily : 'Inter',
                      fontSize: `${taglineFontSize}px`,
                      color: color,
                      fontWeight: fontFamily.includes('Dancing Script') ? '400' : '500',
                      letterSpacing: layout === 'stacked' ? '0.5px' : '2px',
                      textTransform: layout === 'stacked' ? 'none' : 'uppercase'
                    }}
                  >
                    {tagline}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Corner Info */}
          <div className="absolute top-4 right-4 text-xs text-gray-400 font-mono">
            LOGO
          </div>
          
          {/* Size Info */}
          <div className="absolute bottom-4 left-4 text-xs text-gray-400 font-mono">
            {responsiveFontSize}px
          </div>

          {/* Template Info */}
          {config.font && (
            <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-mono">
              {config.font}
            </div>
          )}
        </div>

        {/* Style Indicators */}
        <div className="absolute top-8 right-8 flex flex-col gap-2">
          {config.mode && (
            <div className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium border">
              {config.mode === 'text' ? '📝 Testo' : 
               config.mode === 'image' ? '🖼️ Immagine' : 
               config.mode === 'canvas' || config.mode === 'advanced' ? '🎨 Template' : 
               '🎨 Misto'}
            </div>
          )}
          {config.layout && tagline && (
            <div className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium border">
              {config.layout === 'vertical' ? '⬍ Verticale' : config.layout === 'horizontal' ? '⬌ Orizzontale' : '⬜ Compatto'}
            </div>
          )}
        </div>

      </div>
    </PreviewLayout>
  );
};