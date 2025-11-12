import React, { useState, useCallback, useEffect } from 'react';
import { CanvasElement, TextElement, ImageElement, ShapeElement } from '../../types';
import { LogoTemplate, ElementTransform } from './types';
import { CanvasEditor } from './CanvasEditor';
import { TemplateSelector } from './TemplateSelector';
import { ElementToolbar } from './ElementToolbar';
import { PropertiesPanel } from './PropertiesPanel';
import { LOGO_TEMPLATES } from './templates';
import { useAppStore } from '../../store/app-store';
import { Download, Undo, Redo, ZoomIn, ZoomOut, Grid, Eye } from 'lucide-react';

interface CanvasLogoBuilderProps {
  onSwitchBuilder?: (builder: 'logo' | 'menu' | 'site') => void;
}

export const CanvasLogoBuilder: React.FC<CanvasLogoBuilderProps> = ({ onSwitchBuilder }) => {
  const { activeProject, updateProject } = useAppStore();
  
  // State
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElementIds, setSelectedElementIds] = useState<string[]>([]);
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);
  const [activeTemplate, setActiveTemplate] = useState<LogoTemplate | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 200 });
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState<{
    past: CanvasElement[][];
    present: CanvasElement[];
    future: CanvasElement[][];
  }>({
    past: [],
    present: [],
    future: []
  });

  // Initialize from project data
  useEffect(() => {
    if (!activeProject) return;
    
    const logoConfig = activeProject.data.logo;
    if (logoConfig.canvas) {
      setElements(logoConfig.canvas.elements || []);
      setCanvasSize(logoConfig.canvas.canvasSize || { width: 400, height: 200 });
      
      if (logoConfig.canvas.templateId) {
        const template = LOGO_TEMPLATES.find(t => t.id === logoConfig.canvas.templateId);
        setActiveTemplate(template || null);
      }
      
      setShowTemplateSelector(false);
    }
  }, [activeProject]);

  // Save to project when elements change
  useEffect(() => {
    if (!activeProject || elements.length === 0) return;
    
    const logoConfig = {
      ...activeProject.data.logo,
      canvas: {
        elements,
        canvasSize,
        templateId: activeTemplate?.id || undefined
      }
    };
    
    updateProject({ logo: logoConfig });
  }, [elements, canvasSize, activeTemplate, activeProject, updateProject]);

  if (!activeProject) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Nessun progetto attivo</h3>
          <p>Crea o seleziona un progetto per utilizzare il logo builder</p>
        </div>
      </div>
    );
  }

  // Template selection
  const handleTemplateSelect = useCallback((template: LogoTemplate) => {
    setActiveTemplate(template);
    setElements(template.elements.map(el => ({ ...el, selected: false })));
    setCanvasSize(template.canvasSize);
    setSelectedElementIds([]);
    setShowTemplateSelector(false);
    
    // Save to history
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: template.elements,
      future: []
    }));
  }, []);

  const handleStartFromScratch = useCallback(() => {
    setActiveTemplate(null);
    setElements([]);
    setCanvasSize({ width: 400, height: 200 });
    setSelectedElementIds([]);
    setShowTemplateSelector(false);
    setHistory({ past: [], present: [], future: [] });
  }, []);

  // Element management
  const generateId = () => `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addElement = useCallback((type: 'text' | 'image' | 'shape') => {
    const id = generateId();
    let newElement: CanvasElement;

    const centerX = canvasSize.width / 2;
    const centerY = canvasSize.height / 2;

    if (type === 'text') {
      newElement = {
        id,
        type: 'text',
        content: 'Nuovo testo',
        x: centerX - 50,
        y: centerY - 15,
        width: 100,
        height: 30,
        rotation: 0,
        zIndex: elements.length,
        locked: false,
        selected: false,
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#000000',
        letterSpacing: 0,
        lineHeight: 1.2,
        textDecoration: 'none',
        opacity: 1
      } as TextElement;
    } else if (type === 'image') {
      newElement = {
        id,
        type: 'image',
        src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
        alt: 'Nuova immagine',
        x: centerX - 50,
        y: centerY - 50,
        width: 100,
        height: 100,
        rotation: 0,
        zIndex: elements.length,
        locked: false,
        selected: false,
        opacity: 1,
        borderRadius: 0
      } as ImageElement;
    } else {
      newElement = {
        id,
        type: 'shape',
        shape: 'rectangle',
        x: centerX - 50,
        y: centerY - 25,
        width: 100,
        height: 50,
        rotation: 0,
        zIndex: elements.length,
        locked: false,
        selected: false,
        fill: '#3B82F6',
        stroke: 'none',
        strokeWidth: 0,
        opacity: 1
      } as ShapeElement;
    }

    setElements(prev => [...prev, newElement]);
    setSelectedElementIds([id]);
    
    // Save to history
    const newElements = [...elements, newElement];
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: newElements,
      future: []
    }));
  }, [elements, canvasSize]);

  const updateElement = useCallback((elementId: string, updates: Partial<CanvasElement>) => {
    setElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
  }, []);

  const deleteElements = useCallback((elementIds: string[]) => {
    setElements(prev => prev.filter(el => !elementIds.includes(el.id)));
    setSelectedElementIds(prev => prev.filter(id => !elementIds.includes(id)));
    
    // Save to history
    const newElements = elements.filter(el => !elementIds.includes(el.id));
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: newElements,
      future: []
    }));
  }, [elements]);

  const duplicateElements = useCallback((elementIds: string[]) => {
    const elementsToDuplicate = elements.filter(el => elementIds.includes(el.id));
    const duplicatedElements = elementsToDuplicate.map(el => ({
      ...el,
      id: generateId(),
      x: el.x + 20,
      y: el.y + 20,
      zIndex: elements.length + elementsToDuplicate.indexOf(el),
      selected: false
    }));

    setElements(prev => [...prev, ...duplicatedElements]);
    setSelectedElementIds(duplicatedElements.map(el => el.id));
    
    // Save to history
    const newElements = [...elements, ...duplicatedElements];
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: newElements,
      future: []
    }));
  }, [elements]);

  const lockElements = useCallback((elementIds: string[], locked: boolean) => {
    setElements(prev => prev.map(el => 
      elementIds.includes(el.id) ? { ...el, locked } : el
    ));
  }, []);

  // Selection
  const selectElement = useCallback((elementId: string, multiSelect = false) => {
    if (multiSelect) {
      setSelectedElementIds(prev => 
        prev.includes(elementId) 
          ? prev.filter(id => id !== elementId)
          : [...prev, elementId]
      );
    } else {
      setSelectedElementIds([elementId]);
    }
  }, []);

  const selectElements = useCallback((elementIds: string[]) => {
    setSelectedElementIds(elementIds);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedElementIds([]);
  }, []);

  // Movement and resize
  const moveElements = useCallback((elementIds: string[], deltaX: number, deltaY: number) => {
    setElements(prev => prev.map(el => 
      elementIds.includes(el.id) 
        ? { ...el, x: el.x + deltaX, y: el.y + deltaY }
        : el
    ));
  }, []);

  const resizeElement = useCallback((elementId: string, newTransform: ElementTransform) => {
    setElements(prev => prev.map(el => 
      el.id === elementId 
        ? { ...el, ...newTransform }
        : el
    ));
  }, []);

  // History
  const undo = useCallback(() => {
    if (history.past.length === 0) return;
    
    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);
    
    setHistory({
      past: newPast,
      present: previous,
      future: [history.present, ...history.future]
    });
    setElements(previous);
    setSelectedElementIds([]);
  }, [history]);

  const redo = useCallback(() => {
    if (history.future.length === 0) return;
    
    const next = history.future[0];
    const newFuture = history.future.slice(1);
    
    setHistory({
      past: [...history.past, history.present],
      present: next,
      future: newFuture
    });
    setElements(next);
    setSelectedElementIds([]);
  }, [history]);

  // Export
  const exportLogo = useCallback(() => {
    // TODO: Implement export functionality
    console.log('Exporting logo with elements:', elements);
    
    // For now, just save the configuration
    const logoData = {
      elements,
      canvasSize,
      template: activeTemplate?.id || null,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(logoData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'logo-config.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [elements, canvasSize, activeTemplate]);

  const selectedElements = elements.filter(el => selectedElementIds.includes(el.id));

  if (showTemplateSelector) {
    return (
      <TemplateSelector
        selectedTemplate={activeTemplate}
        onTemplateSelect={handleTemplateSelect}
        onClose={handleStartFromScratch}
      />
    );
  }

  return (
    <div className="h-full w-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        {/* Builder Tabs */}
        {onSwitchBuilder && (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onSwitchBuilder('logo')} 
              className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium text-sm"
            >
              Logo
            </button>
            <button 
              onClick={() => onSwitchBuilder('menu')} 
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Menù
            </button>
            <button 
              onClick={() => onSwitchBuilder('site')} 
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Sito Web
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={undo}
            disabled={history.past.length === 0}
            className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-colors"
            title="Annulla"
          >
            <Undo className="w-5 h-5" />
          </button>
          
          <button
            onClick={redo}
            disabled={history.future.length === 0}
            className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-colors"
            title="Ripristina"
          >
            <Redo className="w-5 h-5" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-2" />
          
          <button
            onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          
          <span className="text-sm font-medium text-gray-600 min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          
          <button
            onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.2))}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          
          <div className="w-px h-6 bg-gray-300 mx-2" />
          
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-2 rounded-lg transition-colors ${
              showGrid 
                ? 'text-blue-600 bg-blue-100' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            title="Griglia"
          >
            <Grid className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setShowTemplateSelector(true)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            title="Cambia Template"
          >
            <Eye className="w-5 h-5" />
          </button>
          
          <button
            onClick={exportLogo}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Download className="w-4 h-4" />
            Esporta
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Element Toolbar */}
          <div className="p-4 bg-white border-b border-gray-200">
            <ElementToolbar
              selectedElements={selectedElements}
              onAddElement={addElement}
              onDeleteElements={deleteElements}
              onDuplicateElements={duplicateElements}
              onLockElements={lockElements}
            />
          </div>

          {/* Canvas */}
          <div className="flex-1 p-8 overflow-auto">
            <CanvasEditor
              elements={elements}
              selectedElementIds={selectedElementIds}
              canvasWidth={canvasSize.width}
              canvasHeight={canvasSize.height}
              zoom={zoom}
              onElementUpdate={updateElement}
              onElementSelect={selectElement}
              onElementsMove={moveElements}
              onElementResize={resizeElement}
              onCanvasClick={clearSelection}
            />
          </div>
        </div>

        {/* Properties Panel */}
        <PropertiesPanel
          selectedElements={selectedElements}
          onElementUpdate={updateElement}
        />
      </div>
    </div>
  );
};