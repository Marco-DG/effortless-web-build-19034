import React, { useRef, useState, useCallback } from 'react';
import { LogoConfig } from '../../types';

interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  content?: string; // per text
  src?: string; // per image
  style: {
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    fontWeight?: string;
    textAlign?: string;
    backgroundColor?: string;
    borderRadius?: number;
    opacity?: number;
  };
}

interface InteractiveCanvasProps {
  config: LogoConfig;
  onUpdate: (updates: Partial<LogoConfig>) => void;
  businessName: string;
}

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({
  config,
  onUpdate,
  businessName
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Converti la LogoConfig attuale in elementi canvas
  const elements: CanvasElement[] = React.useMemo(() => {
    const els: CanvasElement[] = [];
    
    // Elemento testo principale
    if (config.text || businessName) {
      els.push({
        id: 'main-text',
        type: 'text',
        x: 200,
        y: 100,
        width: 300,
        height: 60,
        rotation: 0,
        content: config.text || businessName,
        style: {
          fontFamily: config.font || 'Inter',
          fontSize: config.size || 48,
          color: config.color || '#000000',
          fontWeight: 'bold',
          textAlign: 'center'
        }
      });
    }

    // Elemento tagline
    if (config.tagline) {
      els.push({
        id: 'tagline',
        type: 'text',
        x: 200,
        y: 170,
        width: 300,
        height: 30,
        rotation: 0,
        content: config.tagline,
        style: {
          fontFamily: 'Inter',
          fontSize: (config.size || 48) * 0.3,
          color: config.color || '#666666',
          fontWeight: 'normal',
          textAlign: 'center'
        }
      });
    }

    // Elemento immagine
    if (config.imageUrl && config.mode !== 'text') {
      els.push({
        id: 'main-image',
        type: 'image',
        x: 150,
        y: 80,
        width: 100,
        height: 100,
        rotation: 0,
        src: config.imageUrl,
        style: {
          borderRadius: 0,
          opacity: 1
        }
      });
    }

    return els;
  }, [config, businessName]);

  const handleElementClick = useCallback((elementId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedElementId(elementId);
  }, []);

  const handleCanvasClick = useCallback(() => {
    setSelectedElementId(null);
  }, []);

  const handleMouseDown = useCallback((event: React.MouseEvent, elementId: string, action: 'move' | 'resize') => {
    event.preventDefault();
    event.stopPropagation();
    
    setSelectedElementId(elementId);
    if (action === 'move') {
      setIsDragging(true);
    } else {
      setIsResizing(true);
    }
    
    setDragStart({
      x: event.clientX,
      y: event.clientY
    });
  }, []);

  const renderElement = (element: CanvasElement) => {
    const isSelected = selectedElementId === element.id;
    
    return (
      <div key={element.id} className="absolute">
        {/* Elemento principale */}
        <div
          className="absolute cursor-move transition-transform hover:scale-[1.02]"
          style={{
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            transform: `rotate(${element.rotation}deg)`,
            ...element.style,
            userSelect: 'none'
          }}
          onClick={(e) => handleElementClick(element.id, e)}
          onMouseDown={(e) => handleMouseDown(e, element.id, 'move')}
        >
          {element.type === 'text' && (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                fontFamily: element.style.fontFamily,
                fontSize: element.style.fontSize,
                color: element.style.color,
                fontWeight: element.style.fontWeight,
                textAlign: element.style.textAlign as any
              }}
            >
              {element.content}
            </div>
          )}
          
          {element.type === 'image' && (
            <img
              src={element.src}
              alt=""
              className="w-full h-full object-cover"
              style={{
                borderRadius: element.style.borderRadius,
                opacity: element.style.opacity
              }}
              draggable={false}
            />
          )}
          
          {element.type === 'shape' && (
            <div
              className="w-full h-full"
              style={{
                backgroundColor: element.style.backgroundColor,
                borderRadius: element.style.borderRadius,
                opacity: element.style.opacity
              }}
            />
          )}
        </div>

        {/* Selection box e handles */}
        {isSelected && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: element.x - 4,
              top: element.y - 4,
              width: element.width + 8,
              height: element.height + 8,
              transform: `rotate(${element.rotation}deg)`,
              transformOrigin: `${element.width / 2 + 4}px ${element.height / 2 + 4}px`
            }}
          >
            {/* Selection border */}
            <div className="absolute inset-0 border-2 border-blue-500 rounded-sm">
              {/* Resize handles */}
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-nw-resize pointer-events-auto"
                   onMouseDown={(e) => handleMouseDown(e, element.id, 'resize')} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-ne-resize pointer-events-auto"
                   onMouseDown={(e) => handleMouseDown(e, element.id, 'resize')} />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-sw-resize pointer-events-auto"
                   onMouseDown={(e) => handleMouseDown(e, element.id, 'resize')} />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-se-resize pointer-events-auto"
                   onMouseDown={(e) => handleMouseDown(e, element.id, 'resize')} />
              
              {/* Rotation handle */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-1 h-4 bg-blue-500" />
                <div className="w-3 h-3 bg-blue-500 border border-white rounded-full cursor-grab pointer-events-auto" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-8 bg-gray-50">
      <div
        ref={canvasRef}
        className="relative bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
        style={{ width: 600, height: 400 }}
        onClick={handleCanvasClick}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Canvas elements */}
        {elements.map(renderElement)}

        {/* Canvas info */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
          600 × 400 px
        </div>
        
        {selectedElementId && (
          <div className="absolute bottom-4 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            {selectedElementId} selezionato
          </div>
        )}
      </div>
    </div>
  );
};