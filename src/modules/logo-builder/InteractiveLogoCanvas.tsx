import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CanvasElement, LogoConfig } from '../../types';
import { PreviewLayout } from '../../ui/Layout';

interface InteractiveLogoCanvasProps {
  config: LogoConfig;
  businessName: string;
  onElementUpdate: (elementId: string, updates: Partial<CanvasElement>) => void;
  onElementSelect: (elementId: string | null) => void;
  selectedElementId: string | null;
}

interface DragState {
  isDragging: boolean;
  elementId: string;
  startX: number;
  startY: number;
  startElementX: number;
  startElementY: number;
}

interface ResizeState {
  isResizing: boolean;
  elementId: string;
  handle: 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w';
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  startElementX: number;
  startElementY: number;
}

export const InteractiveLogoCanvas: React.FC<InteractiveLogoCanvasProps> = ({
  config,
  businessName,
  onElementUpdate,
  onElementSelect,
  selectedElementId
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [resizeState, setResizeState] = useState<ResizeState | null>(null);
  const [zoom, setZoom] = useState(1);

  const elements = config.elements || [];
  const canvasWidth = config.canvasSize?.width || 400;
  const canvasHeight = config.canvasSize?.height || 300;

  // Handle element selection
  const handleElementClick = useCallback((e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    onElementSelect(elementId);
  }, [onElementSelect]);

  // Handle canvas click (deselect)
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      onElementSelect(null);
    }
  }, [onElementSelect]);

  // Handle drag start
  const handleMouseDown = useCallback((e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    onElementSelect(elementId);

    setDragState({
      isDragging: true,
      elementId,
      startX: e.clientX,
      startY: e.clientY,
      startElementX: element.x,
      startElementY: element.y
    });
  }, [elements, onElementSelect]);

  // Handle resize start
  const handleResizeStart = useCallback((e: React.MouseEvent, elementId: string, handle: ResizeState['handle']) => {
    e.preventDefault();
    e.stopPropagation();

    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    setResizeState({
      isResizing: true,
      elementId,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: element.width,
      startHeight: element.height,
      startElementX: element.x,
      startElementY: element.y
    });
  }, [elements]);

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragState) {
        const deltaX = e.clientX - dragState.startX;
        const deltaY = e.clientY - dragState.startY;

        let newX = dragState.startElementX + deltaX / zoom;
        let newY = dragState.startElementY + deltaY / zoom;

        // Snap to grid if enabled
        if (config.snapToGrid) {
          const gridSize = 10;
          newX = Math.round(newX / gridSize) * gridSize;
          newY = Math.round(newY / gridSize) * gridSize;
        }

        // Constrain to canvas
        newX = Math.max(0, Math.min(canvasWidth - 50, newX));
        newY = Math.max(0, Math.min(canvasHeight - 50, newY));

        onElementUpdate(dragState.elementId, { x: newX, y: newY });
      }

      if (resizeState) {
        const deltaX = e.clientX - resizeState.startX;
        const deltaY = e.clientY - resizeState.startY;

        let newWidth = resizeState.startWidth;
        let newHeight = resizeState.startHeight;
        let newX = resizeState.startElementX;
        let newY = resizeState.startElementY;

        const scaledDeltaX = deltaX / zoom;
        const scaledDeltaY = deltaY / zoom;

        switch (resizeState.handle) {
          case 'se':
            newWidth = Math.max(20, resizeState.startWidth + scaledDeltaX);
            newHeight = Math.max(20, resizeState.startHeight + scaledDeltaY);
            break;
          case 'sw':
            newWidth = Math.max(20, resizeState.startWidth - scaledDeltaX);
            newHeight = Math.max(20, resizeState.startHeight + scaledDeltaY);
            newX = resizeState.startElementX + scaledDeltaX;
            break;
          case 'ne':
            newWidth = Math.max(20, resizeState.startWidth + scaledDeltaX);
            newHeight = Math.max(20, resizeState.startHeight - scaledDeltaY);
            newY = resizeState.startElementY + scaledDeltaY;
            break;
          case 'nw':
            newWidth = Math.max(20, resizeState.startWidth - scaledDeltaX);
            newHeight = Math.max(20, resizeState.startHeight - scaledDeltaY);
            newX = resizeState.startElementX + scaledDeltaX;
            newY = resizeState.startElementY + scaledDeltaY;
            break;
          case 'e':
            newWidth = Math.max(20, resizeState.startWidth + scaledDeltaX);
            break;
          case 'w':
            newWidth = Math.max(20, resizeState.startWidth - scaledDeltaX);
            newX = resizeState.startElementX + scaledDeltaX;
            break;
          case 's':
            newHeight = Math.max(20, resizeState.startHeight + scaledDeltaY);
            break;
          case 'n':
            newHeight = Math.max(20, resizeState.startHeight - scaledDeltaY);
            newY = resizeState.startElementY + scaledDeltaY;
            break;
        }

        onElementUpdate(resizeState.elementId, {
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight
        });
      }
    };

    const handleMouseUp = () => {
      setDragState(null);
      setResizeState(null);
    };

    if (dragState || resizeState) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState, resizeState, config.snapToGrid, canvasWidth, canvasHeight, zoom, onElementUpdate]);

  // Render element with selection handles
  const renderElement = (element: CanvasElement) => {
    const isSelected = selectedElementId === element.id;

    return (
      <div key={element.id} className="absolute">
        {/* Element */}
        <div
          className={`absolute cursor-move transition-all ${
            isSelected ? 'ring-2 ring-primary ring-opacity-50' : ''
          }`}
          style={{
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            transform: `rotate(${element.rotation || 0}deg)`,
            opacity: element.opacity || 1,
            zIndex: element.zIndex || 0
          }}
          onClick={(e) => handleElementClick(e, element.id)}
          onMouseDown={(e) => handleMouseDown(e, element.id)}
        >
          {element.type === 'text' && (
            <div
              className="w-full h-full flex items-center justify-center select-none"
              style={{
                fontFamily: element.style?.fontFamily || 'Inter',
                fontSize: `${element.style?.fontSize || 16}px`,
                fontWeight: element.style?.fontWeight || 'normal',
                color: element.style?.color || '#000',
                textAlign: (element.style?.textAlign as any) || 'center',
                letterSpacing: element.style?.letterSpacing || 'normal',
                textShadow: element.style?.textShadow,
              }}
            >
              {element.content || 'Testo'}
            </div>
          )}

          {element.type === 'shape' && element.subtype === 'rectangle' && (
            <div
              className="w-full h-full"
              style={{
                background: element.style?.fill || '#ccc',
                border: element.style?.stroke ? `${element.style?.strokeWidth || 1}px solid ${element.style.stroke}` : 'none',
              }}
            />
          )}

          {element.type === 'shape' && element.subtype === 'circle' && (
            <div
              className="w-full h-full rounded-full"
              style={{
                background: element.style?.fill || '#ccc',
                border: element.style?.stroke ? `${element.style?.strokeWidth || 1}px solid ${element.style.stroke}` : 'none',
              }}
            />
          )}
        </div>

        {/* Selection handles */}
        {isSelected && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: element.x - 4,
              top: element.y - 4,
              width: element.width + 8,
              height: element.height + 8
            }}
          >
            {/* Corner handles */}
            {['nw', 'ne', 'sw', 'se'].map((handle) => (
              <div
                key={handle}
                className={`absolute w-3 h-3 bg-white border-2 border-primary rounded-full cursor-${handle}-resize pointer-events-auto`}
                style={{
                  left: handle.includes('w') ? -6 : handle.includes('e') ? element.width + 2 : element.width / 2 - 6,
                  top: handle.includes('n') ? -6 : handle.includes('s') ? element.height + 2 : element.height / 2 - 6,
                }}
                onMouseDown={(e) => handleResizeStart(e, element.id, handle as any)}
              />
            ))}

            {/* Edge handles */}
            {['n', 's', 'e', 'w'].map((handle) => (
              <div
                key={handle}
                className={`absolute w-3 h-3 bg-white border-2 border-primary rounded-full cursor-${handle}-resize pointer-events-auto`}
                style={{
                  left: handle === 'e' ? element.width + 2 : handle === 'w' ? -6 : element.width / 2 - 6,
                  top: handle === 's' ? element.height + 2 : handle === 'n' ? -6 : element.height / 2 - 6,
                }}
                onMouseDown={(e) => handleResizeStart(e, element.id, handle as any)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <PreviewLayout mode="logo">
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        {/* Canvas Container */}
        <div className="relative">
          {/* Canvas */}
          <div
            ref={canvasRef}
            className="relative border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-default"
            style={{
              width: canvasWidth,
              height: canvasHeight,
              backgroundColor: config.backgroundColor || '#ffffff',
              transform: `scale(${zoom})`,
              transformOrigin: 'center center'
            }}
            onClick={handleCanvasClick}
          >
            {/* Grid */}
            {config.showGrid && (
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #000 1px, transparent 1px),
                    linear-gradient(to bottom, #000 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
            )}

            {/* Elements */}
            <AnimatePresence>
              {elements.map((element) => (
                <motion.div
                  key={element.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderElement(element)}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Canvas Info */}
            <div className="absolute top-2 left-2 text-xs text-gray-400 font-mono bg-white/80 px-2 py-1 rounded">
              {canvasWidth}×{canvasHeight}
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur rounded-lg border p-2 shadow-sm">
            <button
              onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
              className="w-6 h-6 rounded border hover:bg-gray-100 flex items-center justify-center text-sm font-semibold transition-colors"
            >
              -
            </button>
            <span className="text-xs font-mono px-2 min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(Math.min(2, zoom + 0.25))}
              className="w-6 h-6 rounded border hover:bg-gray-100 flex items-center justify-center text-sm font-semibold transition-colors"
            >
              +
            </button>
          </div>

          {/* Element Count */}
          {elements.length > 0 && (
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              {elements.length} {elements.length === 1 ? 'elemento' : 'elementi'}
            </div>
          )}
        </div>
      </div>
    </PreviewLayout>
  );
};