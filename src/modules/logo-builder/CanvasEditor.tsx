import React, { useRef, useState, useCallback } from 'react';
import { CanvasElement, TextElement, ImageElement, ShapeElement } from '../../types';
import { DragState, ElementTransform } from './types';

interface CanvasEditorProps {
  elements: CanvasElement[];
  selectedElementIds: string[];
  canvasWidth: number;
  canvasHeight: number;
  zoom: number;
  onElementUpdate: (elementId: string, updates: Partial<CanvasElement>) => void;
  onElementSelect: (elementId: string, multiSelect?: boolean) => void;
  onElementsMove: (elementIds: string[], deltaX: number, deltaY: number) => void;
  onElementResize: (elementId: string, newTransform: ElementTransform) => void;
  onCanvasClick: (e: React.MouseEvent) => void;
}

export const CanvasEditor: React.FC<CanvasEditorProps> = ({
  elements,
  selectedElementIds,
  canvasWidth,
  canvasHeight,
  zoom,
  onElementUpdate,
  onElementSelect,
  onElementsMove,
  onElementResize,
  onCanvasClick
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, elementId: string, dragType: 'move' | 'resize' = 'move', resizeHandle?: string) => {
    e.preventDefault();
    e.stopPropagation();

    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    if (!selectedElementIds.includes(elementId)) {
      onElementSelect(elementId, e.metaKey || e.ctrlKey);
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const startX = (e.clientX - rect.left) / zoom;
    const startY = (e.clientY - rect.top) / zoom;

    setDragState({
      isDragging: true,
      dragType,
      startPosition: { x: startX, y: startY },
      startTransform: {
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
        rotation: element.rotation
      },
      resizeHandle: resizeHandle as any
    });
  }, [elements, selectedElementIds, onElementSelect, zoom]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragState || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = (e.clientX - rect.left) / zoom;
    const currentY = (e.clientY - rect.top) / zoom;
    
    const deltaX = currentX - dragState.startPosition.x;
    const deltaY = currentY - dragState.startPosition.y;

    if (dragState.dragType === 'move') {
      onElementsMove(selectedElementIds, deltaX, deltaY);
    } else if (dragState.dragType === 'resize') {
      // Handle resize logic
      const newTransform = calculateResize(dragState.startTransform, deltaX, deltaY, dragState.resizeHandle);
      if (selectedElementIds.length === 1) {
        onElementResize(selectedElementIds[0], newTransform);
      }
    }
  }, [dragState, selectedElementIds, onElementsMove, onElementResize, zoom]);

  const handleMouseUp = useCallback(() => {
    setDragState(null);
  }, []);

  const calculateResize = (startTransform: ElementTransform, deltaX: number, deltaY: number, handle?: string): ElementTransform => {
    const { x, y, width, height } = startTransform;
    let newTransform = { ...startTransform };

    switch (handle) {
      case 'se': // Bottom-right
        newTransform.width = Math.max(20, width + deltaX);
        newTransform.height = Math.max(20, height + deltaY);
        break;
      case 'sw': // Bottom-left
        newTransform.width = Math.max(20, width - deltaX);
        newTransform.height = Math.max(20, height + deltaY);
        newTransform.x = x + (width - newTransform.width);
        break;
      case 'ne': // Top-right
        newTransform.width = Math.max(20, width + deltaX);
        newTransform.height = Math.max(20, height - deltaY);
        newTransform.y = y + (height - newTransform.height);
        break;
      case 'nw': // Top-left
        newTransform.width = Math.max(20, width - deltaX);
        newTransform.height = Math.max(20, height - deltaY);
        newTransform.x = x + (width - newTransform.width);
        newTransform.y = y + (height - newTransform.height);
        break;
      case 'e': // Right
        newTransform.width = Math.max(20, width + deltaX);
        break;
      case 'w': // Left
        newTransform.width = Math.max(20, width - deltaX);
        newTransform.x = x + (width - newTransform.width);
        break;
      case 'n': // Top
        newTransform.height = Math.max(20, height - deltaY);
        newTransform.y = y + (height - newTransform.height);
        break;
      case 's': // Bottom
        newTransform.height = Math.max(20, height + deltaY);
        break;
    }

    return newTransform;
  };

  const renderElement = (element: CanvasElement) => {
    const isSelected = selectedElementIds.includes(element.id);
    
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: element.x,
      top: element.y,
      width: element.width,
      height: element.height,
      transform: `rotate(${element.rotation}deg)`,
      zIndex: element.zIndex,
      opacity: element.opacity || 1,
      cursor: 'move',
      userSelect: 'none'
    };

    let elementContent: React.ReactNode;

    if (element.type === 'text') {
      const textEl = element as TextElement;
      elementContent = (
        <div
          style={{
            ...baseStyle,
            fontFamily: textEl.fontFamily,
            fontSize: textEl.fontSize,
            fontWeight: textEl.fontWeight,
            fontStyle: textEl.fontStyle,
            color: textEl.color,
            textAlign: textEl.textAlign,
            letterSpacing: textEl.letterSpacing,
            lineHeight: textEl.lineHeight,
            textDecoration: textEl.textDecoration,
            display: 'flex',
            alignItems: 'center',
            justifyContent: textEl.textAlign === 'center' ? 'center' : textEl.textAlign === 'right' ? 'flex-end' : 'flex-start',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
          onMouseDown={(e) => handleMouseDown(e, element.id)}
        >
          {textEl.content}
        </div>
      );
    } else if (element.type === 'image') {
      const imgEl = element as ImageElement;
      elementContent = (
        <img
          src={imgEl.src}
          alt={imgEl.alt}
          style={{
            ...baseStyle,
            borderRadius: imgEl.borderRadius || 0,
            filter: imgEl.filter || 'none',
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
          onMouseDown={(e) => handleMouseDown(e, element.id)}
          draggable={false}
        />
      );
    } else if (element.type === 'shape') {
      const shapeEl = element as ShapeElement;
      
      if (shapeEl.shape === 'rectangle') {
        elementContent = (
          <div
            style={{
              ...baseStyle,
              backgroundColor: shapeEl.fill,
              border: shapeEl.stroke !== 'none' ? `${shapeEl.strokeWidth}px solid ${shapeEl.stroke}` : 'none',
              borderRadius: shapeEl.borderRadius || 0
            }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          />
        );
      } else if (shapeEl.shape === 'circle') {
        elementContent = (
          <div
            style={{
              ...baseStyle,
              backgroundColor: shapeEl.fill,
              border: shapeEl.stroke !== 'none' ? `${shapeEl.strokeWidth}px solid ${shapeEl.stroke}` : 'none',
              borderRadius: '50%'
            }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          />
        );
      }
    }

    return (
      <div key={element.id} style={{ position: 'relative' }}>
        {elementContent}
        
        {/* Selection handles */}
        {isSelected && (
          <div
            style={{
              position: 'absolute',
              left: element.x - 4,
              top: element.y - 4,
              width: element.width + 8,
              height: element.height + 8,
              border: '2px solid #3B82F6',
              pointerEvents: 'none',
              transform: `rotate(${element.rotation}deg)`,
              zIndex: 9999
            }}
          >
            {/* Resize handles */}
            {['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w'].map(handle => (
              <div
                key={handle}
                style={{
                  position: 'absolute',
                  width: 8,
                  height: 8,
                  backgroundColor: '#3B82F6',
                  border: '1px solid white',
                  cursor: `${handle}-resize`,
                  pointerEvents: 'all',
                  ...getHandlePosition(handle)
                }}
                onMouseDown={(e) => handleMouseDown(e, element.id, 'resize', handle)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const getHandlePosition = (handle: string): React.CSSProperties => {
    switch (handle) {
      case 'nw': return { top: -4, left: -4 };
      case 'ne': return { top: -4, right: -4 };
      case 'sw': return { bottom: -4, left: -4 };
      case 'se': return { bottom: -4, right: -4 };
      case 'n': return { top: -4, left: '50%', transform: 'translateX(-50%)' };
      case 's': return { bottom: -4, left: '50%', transform: 'translateX(-50%)' };
      case 'e': return { top: '50%', right: -4, transform: 'translateY(-50%)' };
      case 'w': return { top: '50%', left: -4, transform: 'translateY(-50%)' };
      default: return {};
    }
  };

  return (
    <div
      ref={canvasRef}
      className="relative bg-white border border-gray-200 mx-auto"
      style={{
        width: canvasWidth * zoom,
        height: canvasHeight * zoom,
        transform: `scale(${zoom})`,
        transformOrigin: 'top left'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={onCanvasClick}
    >
      {/* Grid background */}
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
      
      {/* Render elements */}
      {elements
        .sort((a, b) => a.zIndex - b.zIndex)
        .map(element => renderElement(element))}
    </div>
  );
};