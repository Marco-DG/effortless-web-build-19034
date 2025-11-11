// Tipi specifici per il Logo Builder (non duplicati con types/index.ts)

export interface LogoTemplate {
  id: string;
  name: string;
  category: 'minimalist' | 'vintage' | 'modern' | 'elegant' | 'playful' | 'restaurant' | 'wine-bar';
  preview: string;
  elements: import('../../types').CanvasElement[];
  canvasSize: {
    width: number;
    height: number;
  };
  tags: string[];
}

export interface CanvasConfig {
  width: number;
  height: number;
  backgroundColor: string;
  snapToGrid: boolean;
  gridSize: number;
  zoom: number;
  showRulers: boolean;
  showGrid: boolean;
}

export interface LogoBuilderState {
  canvas: CanvasConfig;
  elements: import('../../types').CanvasElement[];
  selectedElementIds: string[];
  history: {
    past: import('../../types').CanvasElement[][];
    present: import('../../types').CanvasElement[];
    future: import('../../types').CanvasElement[][];
  };
  activeTemplate: LogoTemplate | null;
  tool: 'select' | 'text' | 'image' | 'shape';
}

export interface ElementTransform {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export interface DragState {
  isDragging: boolean;
  dragType: 'move' | 'resize' | 'rotate';
  startPosition: { x: number; y: number };
  startTransform: ElementTransform;
  resizeHandle?: 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w';
}