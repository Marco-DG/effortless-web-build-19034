import React, { useState, useCallback, useEffect } from 'react';
import { useAppStore } from '../../store/app-store';
import { SidebarLayout } from '../../ui/Layout';
import { CanvasElement, TextElement, ImageElement, ShapeElement } from '../../types';
import { LogoTemplate, ElementTransform } from './types';
import { ADVANCED_LOGO_TEMPLATES, getAllAdvancedTemplates, getAdvancedTemplatesByCategory } from './AdvancedLogoTemplates';
import { 
  Download, Eye, Type, Image, Square, Palette, Layers, Undo, Redo, 
  ZoomIn, ZoomOut, Grid, RotateCw, Move, MousePointer, Plus 
} from 'lucide-react';

interface AdvancedLogoBuilderProps {
  onSwitchBuilder?: (builder: 'logo' | 'menu' | 'site') => void;
}

type ActiveTool = 'templates' | 'canvas' | 'text' | 'style' | 'export';
type CanvasTool = 'select' | 'text' | 'image' | 'shape' | 'move';

export const AdvancedLogoBuilder: React.FC<AdvancedLogoBuilderProps> = ({ onSwitchBuilder }) => {
  const { activeProject, updateProject } = useAppStore();
  const [activeTool, setActiveTool] = useState<ActiveTool>('templates');
  const [canvasTool, setCanvasTool] = useState<CanvasTool>('select');
  
  // Canvas state
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElementIds, setSelectedElementIds] = useState<string[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 300 });
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [activeTemplate, setActiveTemplate] = useState<LogoTemplate | null>(null);
  
  // History for undo/redo
  const [history, setHistory] = useState<{
    past: CanvasElement[][];
    present: CanvasElement[];
    future: CanvasElement[][];
  }>({
    past: [],
    present: [],
    future: []
  });

  // Drag state
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    dragType: 'move' | 'resize' | 'rotate';
    elementId: string | null;
    startPosition: { x: number; y: number };
    startTransform: ElementTransform | null;
  }>({
    isDragging: false,
    dragType: 'move',
    elementId: null,
    startPosition: { x: 0, y: 0 },
    startTransform: null
  });

  if (!activeProject) return null;

  // Initialize from project data
  useEffect(() => {
    const logoConfig = activeProject.data.logo;
    if (logoConfig.canvas && logoConfig.canvas.elements.length > 0) {
      setElements(logoConfig.canvas.elements);
      setCanvasSize(logoConfig.canvas.canvasSize || { width: 500, height: 300 });
      if (logoConfig.canvas.templateId) {
        const template = getAllAdvancedTemplates().find(t => t.id === logoConfig.canvas.templateId);
        setActiveTemplate(template || null);
      }
      setActiveTool('canvas');
    }
  }, [activeProject]);

  // Save to project when elements change
  useEffect(() => {
    if (elements.length > 0) {
      const logoConfig = {
        ...activeProject.data.logo,
        mode: 'advanced' as const,
        canvas: {
          elements,
          canvasSize,
          templateId: activeTemplate?.id
        }
      };
      updateProject({ logo: logoConfig });
    }
  }, [elements, canvasSize, activeTemplate]);

  // Template selection
  const handleTemplateSelect = useCallback((template: LogoTemplate) => {
    setActiveTemplate(template);
    setElements(template.elements.map(el => ({ ...el, selected: false })));
    setCanvasSize(template.canvasSize);
    setSelectedElementIds([]);
    setActiveTool('canvas');
    
    // Update business name in text elements
    const updatedElements = template.elements.map(el => {
      if (el.type === 'text' && (el as TextElement).content.includes('RESTAURANT') || 
          (el as TextElement).content.includes('OSTERIA') || 
          (el as TextElement).content.includes('CAFÉ')) {
        return {
          ...el,
          content: activeProject.data.business.name.toUpperCase()
        } as TextElement;
      }
      return el;
    });
    setElements(updatedElements);
    
    // Save to history
    setHistory(prev => ({
      past: [...prev.past, prev.present],
      present: updatedElements,
      future: []
    }));
  }, [activeProject.data.business.name]);

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
        content: 'Nuovo Testo',
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

  // Element selection
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

  const clearSelection = useCallback(() => {
    setSelectedElementIds([]);
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
  const handleExport = () => {
    const logoData = {
      elements,
      canvasSize,
      template: activeTemplate?.id || null,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(logoData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${activeProject.data.business.name}-logo.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Render functions
  const renderHeader = () => (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onSwitchBuilder?.('logo')} 
          className="px-3 py-1.5 rounded text-xs font-medium bg-primary text-primary-foreground"
        >
          Logo
        </button>
        <button 
          onClick={() => onSwitchBuilder?.('menu')} 
          className="px-3 py-1.5 rounded text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Menù
        </button>
        <button 
          onClick={() => onSwitchBuilder?.('site')} 
          className="px-3 py-1.5 rounded text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Sito Web
        </button>
      </div>
      
      <div className="flex items-center gap-1">
        {activeTool === 'canvas' && (
          <>
            <button
              onClick={undo}
              disabled={history.past.length === 0}
              className="p-1.5 hover:bg-gray-100 rounded-lg disabled:text-gray-400 transition-all duration-200"
              title="Annulla"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={history.future.length === 0}
              className="p-1.5 hover:bg-gray-100 rounded-lg disabled:text-gray-400 transition-all duration-200"
              title="Ripristina"
            >
              <Redo className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-gray-300 mx-1" />
          </>
        )}
        <button 
          className="lg:hidden inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-2.5 py-1.5 text-xs font-medium"
        >
          <Eye className="w-3.5 h-3.5" /> Anteprima
        </button>
        <button
          onClick={handleExport}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200"
          title="Esporta"
        >
          <Download className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );

  const renderNavigation = () => (
    <div className="p-2 space-y-1">
      {[
        { id: 'templates' as ActiveTool, icon: Palette, label: 'Template' },
        { id: 'canvas' as ActiveTool, icon: Layers, label: 'Canvas', disabled: elements.length === 0 },
        { id: 'text' as ActiveTool, icon: Type, label: 'Testo' },
        { id: 'style' as ActiveTool, icon: Square, label: 'Stile' },
        { id: 'export' as ActiveTool, icon: Download, label: 'Export' }
      ].map((tool) => (
        <button
          key={tool.id}
          onClick={() => !tool.disabled && setActiveTool(tool.id)}
          disabled={tool.disabled}
          className={`w-full flex items-center justify-center 2xl:justify-start px-2 py-2.5 2xl:px-3 text-sm transition-all duration-200 rounded-lg group ${
            activeTool === tool.id
              ? 'bg-primary text-primary-foreground shadow-sm'
              : tool.disabled 
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
          title={tool.label}
        >
          <tool.icon className="w-4 h-4 flex-shrink-0" />
          <span className="hidden 2xl:block ml-2 text-left font-medium">
            {tool.label}
          </span>
        </button>
      ))}
    </div>
  );

  // Template Selector
  const renderTemplateSelector = () => (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Template Professionali</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Scegli un template professionale per iniziare
        </p>
      </div>

      {/* Template Categories */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-700">Wine Bar & Elegant</h4>
          <div className="grid gap-2">
            {getAdvancedTemplatesByCategory('wine-bar').concat(
              getAdvancedTemplatesByCategory('elegant')
            ).map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="w-full p-3 border rounded-lg text-left hover:border-primary transition-colors group"
              >
                <div className="font-medium text-sm mb-1">{template.name}</div>
                <div className="text-xs text-muted-foreground mb-2">
                  {template.tags.join(', ')}
                </div>
                <div className="text-xs text-blue-600 group-hover:text-blue-700">
                  {template.elements.length} elementi • {template.canvasSize.width}×{template.canvasSize.height}px
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-700">Restaurant & Vintage</h4>
          <div className="grid gap-2">
            {getAdvancedTemplatesByCategory('restaurant').concat(
              getAdvancedTemplatesByCategory('vintage')
            ).map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="w-full p-3 border rounded-lg text-left hover:border-primary transition-colors group"
              >
                <div className="font-medium text-sm mb-1">{template.name}</div>
                <div className="text-xs text-muted-foreground mb-2">
                  {template.tags.join(', ')}
                </div>
                <div className="text-xs text-blue-600 group-hover:text-blue-700">
                  {template.elements.length} elementi • {template.canvasSize.width}×{template.canvasSize.height}px
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-700">Modern & Contemporary</h4>
          <div className="grid gap-2">
            {getAdvancedTemplatesByCategory('modern').map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="w-full p-3 border rounded-lg text-left hover:border-primary transition-colors group"
              >
                <div className="font-medium text-sm mb-1">{template.name}</div>
                <div className="text-xs text-muted-foreground mb-2">
                  {template.tags.join(', ')}
                </div>
                <div className="text-xs text-blue-600 group-hover:text-blue-700">
                  {template.elements.length} elementi • {template.canvasSize.width}×{template.canvasSize.height}px
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <button
            onClick={() => {
              setElements([]);
              setActiveTool('canvas');
            }}
            className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-primary transition-colors"
          >
            <Plus className="w-5 h-5 mx-auto mb-1 text-gray-400" />
            <div className="font-medium text-sm text-gray-600">Inizia da Zero</div>
            <div className="text-xs text-gray-400">Canvas vuoto</div>
          </button>
        </div>
      </div>
    </div>
  );

  // Canvas Tools
  const renderCanvasTools = () => (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Strumenti Canvas</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Seleziona, modifica e aggiungi elementi
        </p>
      </div>

      {/* Canvas Tools */}
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium mb-2">Strumenti</h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'select' as CanvasTool, icon: MousePointer, label: 'Seleziona' },
              { id: 'move' as CanvasTool, icon: Move, label: 'Sposta' },
              { id: 'text' as CanvasTool, icon: Type, label: 'Testo' },
              { id: 'shape' as CanvasTool, icon: Square, label: 'Forma' }
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => setCanvasTool(tool.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  canvasTool === tool.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <tool.icon className="w-4 h-4" />
                {tool.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add Elements */}
        <div>
          <h4 className="text-sm font-medium mb-2">Aggiungi Elementi</h4>
          <div className="space-y-2">
            <button
              onClick={() => addElement('text')}
              className="w-full flex items-center gap-3 px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-blue-700 transition-colors"
            >
              <Type className="w-4 h-4" />
              Aggiungi Testo
            </button>
            <button
              onClick={() => addElement('shape')}
              className="w-full flex items-center gap-3 px-3 py-2 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg text-green-700 transition-colors"
            >
              <Square className="w-4 h-4" />
              Aggiungi Forma
            </button>
            <button
              onClick={() => addElement('image')}
              className="w-full flex items-center gap-3 px-3 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-purple-700 transition-colors"
            >
              <Image className="w-4 h-4" />
              Aggiungi Immagine
            </button>
          </div>
        </div>

        {/* Canvas Controls */}
        <div>
          <h4 className="text-sm font-medium mb-2">Vista</h4>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.2))}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="text-xs font-medium text-center min-w-[50px]">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-gray-100 hover:bg-gray-200 rounded text-sm"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              showGrid 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Grid className="w-4 h-4" />
            Griglia
          </button>
        </div>

        {/* Selection Info */}
        {selectedElementIds.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Selezionato</h4>
            <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
              {selectedElementIds.length} elemento{selectedElementIds.length > 1 ? 'i' : ''} selezionato{selectedElementIds.length > 1 ? 'i' : ''}
            </div>
            <div className="mt-2 space-y-1">
              <button
                onClick={() => deleteElements(selectedElementIds)}
                className="w-full px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded text-sm transition-colors"
              >
                Elimina
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Text Editor (simplified for selected text elements)
  const renderTextEditor = () => {
    const selectedTextElements = elements.filter(el => 
      selectedElementIds.includes(el.id) && el.type === 'text'
    ) as TextElement[];

    if (selectedTextElements.length === 0) {
      return (
        <div className="p-4">
          <div className="text-center text-gray-500 py-8">
            <Type className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Seleziona un elemento testo per modificarlo</p>
          </div>
        </div>
      );
    }

    const textElement = selectedTextElements[0];

    return (
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Editor Testo</h3>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Contenuto</label>
          <textarea
            value={textElement.content}
            onChange={(e) => updateElement(textElement.id, { content: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Font</label>
          <select
            value={textElement.fontFamily}
            onChange={(e) => updateElement(textElement.id, { fontFamily: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="Inter">Inter</option>
            <option value="Playfair Display">Playfair Display</option>
            <option value="Dancing Script">Dancing Script</option>
            <option value="Merriweather">Merriweather</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Cormorant Garamond">Cormorant Garamond</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Dimensione ({textElement.fontSize}px)
          </label>
          <input
            type="range"
            min="8"
            max="72"
            value={textElement.fontSize}
            onChange={(e) => updateElement(textElement.id, { fontSize: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Colore</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={textElement.color}
              onChange={(e) => updateElement(textElement.id, { color: e.target.value })}
              className="w-12 h-8 border rounded cursor-pointer"
            />
            <input
              type="text"
              value={textElement.color}
              onChange={(e) => updateElement(textElement.id, { color: e.target.value })}
              className="flex-1 px-2 py-1 border rounded text-sm font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Allineamento</label>
          <div className="grid grid-cols-3 gap-1">
            {['left', 'center', 'right'].map((align) => (
              <button
                key={align}
                onClick={() => updateElement(textElement.id, { textAlign: align as any })}
                className={`px-2 py-1 text-xs rounded ${
                  textElement.textAlign === align
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {align === 'left' ? '←' : align === 'center' ? '↔' : '→'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Peso Font</label>
          <select
            value={textElement.fontWeight}
            onChange={(e) => updateElement(textElement.id, { fontWeight: e.target.value as any })}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="light">Leggero</option>
            <option value="normal">Normale</option>
            <option value="bold">Grassetto</option>
          </select>
        </div>
      </div>
    );
  };

  // Style Editor  
  const renderStyleEditor = () => (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Stile e Colori</h3>
        <p className="text-sm text-muted-foreground">
          Modifica l'aspetto degli elementi selezionati
        </p>
      </div>

      {selectedElementIds.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <Palette className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Seleziona un elemento per modificarne lo stile</p>
        </div>
      )}
    </div>
  );

  // Export Options
  const renderExportOptions = () => (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Export e Download</h3>
        <p className="text-sm text-muted-foreground">
          Esporta il tuo logo in diversi formati
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleExport}
          className="w-full p-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          📁 Download Configurazione
        </button>
        
        <button
          disabled
          className="w-full p-3 bg-muted text-muted-foreground rounded-lg font-medium cursor-not-allowed"
        >
          🖼️ Export PNG (Prossimamente)
        </button>
        
        <button
          disabled
          className="w-full p-3 bg-muted text-muted-foreground rounded-lg font-medium cursor-not-allowed"
        >
          🎨 Export SVG (Prossimamente)
        </button>
      </div>

      {activeTemplate && (
        <div className="border-t pt-4 space-y-2">
          <h4 className="font-medium text-sm">Template Attivo</h4>
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="font-medium text-sm">{activeTemplate.name}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {elements.length} elementi • {canvasSize.width}×{canvasSize.height}px
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTool) {
      case 'templates': return renderTemplateSelector();
      case 'canvas': return renderCanvasTools();
      case 'text': return renderTextEditor();
      case 'style': return renderStyleEditor();
      case 'export': return renderExportOptions();
      default: return null;
    }
  };

  return (
    <SidebarLayout
      header={renderHeader()}
      navigation={renderNavigation()}
      content={renderContent()}
    />
  );
};