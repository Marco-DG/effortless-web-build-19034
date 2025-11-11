import React from 'react';
import { CanvasElement, TextElement, ImageElement, ShapeElement } from '../../types';

interface PropertiesPanelProps {
  selectedElements: CanvasElement[];
  onElementUpdate: (elementId: string, updates: Partial<CanvasElement>) => void;
}

const fontOptions = [
  'Playfair Display', 'Merriweather', 'Cormorant Garamond',
  'Inter', 'Poppins', 'Montserrat', 'Dancing Script', 'Great Vibes'
];

const colorPresets = [
  '#2a1a1d', '#6b3a2e', '#d9b99b', '#8B4513', '#D2691E',
  '#2C3E50', '#34495E', '#E74C3C', '#C0392B', '#27AE60',
  '#3498DB', '#9B59B6', '#F39C12', '#1ABC9C', '#000000'
];

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedElements,
  onElementUpdate
}) => {
  if (selectedElements.length === 0) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="text-center text-gray-500 mt-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Nessun elemento selezionato</h3>
          <p className="text-sm text-gray-600">Seleziona un elemento per modificarne le proprietà</p>
        </div>
      </div>
    );
  }

  const isMultiSelection = selectedElements.length > 1;
  const primaryElement = selectedElements[0];

  const updateElement = (updates: Partial<CanvasElement>) => {
    selectedElements.forEach(element => {
      onElementUpdate(element.id, updates);
    });
  };

  const renderTextProperties = (element: TextElement) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Contenuto</label>
        <textarea
          value={element.content}
          onChange={(e) => updateElement({ content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={2}
          placeholder="Inserisci il testo..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Font</label>
        <select
          value={element.fontFamily}
          onChange={(e) => updateElement({ fontFamily: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {fontOptions.map(font => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dimensione</label>
          <input
            type="number"
            value={element.fontSize}
            onChange={(e) => updateElement({ fontSize: parseInt(e.target.value) || 16 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="8"
            max="200"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Peso</label>
          <select
            value={element.fontWeight}
            onChange={(e) => updateElement({ fontWeight: e.target.value as 'normal' | 'bold' | 'light' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="light">Light</option>
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Allineamento</label>
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          {(['left', 'center', 'right'] as const).map((align) => (
            <button
              key={align}
              onClick={() => updateElement({ textAlign: align })}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                element.textAlign === align
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {align === 'left' ? 'Sinistra' : align === 'center' ? 'Centro' : 'Destra'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Colore</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={element.color}
            onChange={(e) => updateElement({ color: e.target.value })}
            className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
          />
          <input
            type="text"
            value={element.color}
            onChange={(e) => updateElement({ color: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="#000000"
          />
        </div>
        
        {/* Color Presets */}
        <div className="grid grid-cols-5 gap-2 mt-3">
          {colorPresets.map(color => (
            <button
              key={color}
              onClick={() => updateElement({ color })}
              className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-105 ${
                element.color === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Spaziatura</label>
          <input
            type="number"
            value={element.letterSpacing}
            onChange={(e) => updateElement({ letterSpacing: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            step="0.5"
            min="-5"
            max="10"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Altezza linea</label>
          <input
            type="number"
            value={element.lineHeight}
            onChange={(e) => updateElement({ lineHeight: parseFloat(e.target.value) || 1.2 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            step="0.1"
            min="0.5"
            max="3"
          />
        </div>
      </div>
    </div>
  );

  const renderImageProperties = (element: ImageElement) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">URL Immagine</label>
        <input
          type="url"
          value={element.src}
          onChange={(e) => updateElement({ src: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://esempio.com/immagine.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Testo alternativo</label>
        <input
          type="text"
          value={element.alt}
          onChange={(e) => updateElement({ alt: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Descrizione immagine"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bordo arrotondato</label>
        <input
          type="range"
          min="0"
          max="50"
          value={element.borderRadius || 0}
          onChange={(e) => updateElement({ borderRadius: parseInt(e.target.value) })}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">{element.borderRadius || 0}px</div>
      </div>
    </div>
  );

  const renderShapeProperties = (element: ShapeElement) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Forma</label>
        <select
          value={element.shape}
          onChange={(e) => updateElement({ shape: e.target.value as 'rectangle' | 'circle' })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="rectangle">Rettangolo</option>
          <option value="circle">Cerchio</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Colore riempimento</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={element.fill}
            onChange={(e) => updateElement({ fill: e.target.value })}
            className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
          />
          <input
            type="text"
            value={element.fill}
            onChange={(e) => updateElement({ fill: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bordo</label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={element.stroke === 'none' ? '#000000' : element.stroke}
              onChange={(e) => updateElement({ stroke: e.target.value })}
              className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
              disabled={element.stroke === 'none'}
            />
            <select
              value={element.stroke === 'none' ? 'none' : 'color'}
              onChange={(e) => updateElement({ 
                stroke: e.target.value === 'none' ? 'none' : '#000000',
                strokeWidth: e.target.value === 'none' ? 0 : 1
              })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="none">Nessun bordo</option>
              <option value="color">Con bordo</option>
            </select>
          </div>
          
          {element.stroke !== 'none' && (
            <input
              type="number"
              value={element.strokeWidth}
              onChange={(e) => updateElement({ strokeWidth: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              max="20"
              placeholder="Spessore bordo"
            />
          )}
        </div>
      </div>
    </div>
  );

  const renderCommonProperties = () => (
    <div className="space-y-4 border-t border-gray-200 pt-4">
      <h3 className="font-semibold text-gray-900">Proprietà comuni</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">X</label>
          <input
            type="number"
            value={Math.round(primaryElement.x)}
            onChange={(e) => updateElement({ x: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Y</label>
          <input
            type="number"
            value={Math.round(primaryElement.y)}
            onChange={(e) => updateElement({ y: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Larghezza</label>
          <input
            type="number"
            value={Math.round(primaryElement.width)}
            onChange={(e) => updateElement({ width: parseInt(e.target.value) || 20 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="20"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Altezza</label>
          <input
            type="number"
            value={Math.round(primaryElement.height)}
            onChange={(e) => updateElement({ height: parseInt(e.target.value) || 20 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="20"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rotazione</label>
        <input
          type="range"
          min="-180"
          max="180"
          value={primaryElement.rotation}
          onChange={(e) => updateElement({ rotation: parseInt(e.target.value) })}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">{primaryElement.rotation}°</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Opacità</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={primaryElement.opacity || 1}
          onChange={(e) => updateElement({ opacity: parseFloat(e.target.value) })}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">{Math.round((primaryElement.opacity || 1) * 100)}%</div>
      </div>
    </div>
  );

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {isMultiSelection ? `${selectedElements.length} elementi` : 'Proprietà elemento'}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {isMultiSelection ? 'Modifica multipla' : `Tipo: ${primaryElement.type}`}
        </p>
      </div>

      {!isMultiSelection && primaryElement.type === 'text' && renderTextProperties(primaryElement as TextElement)}
      {!isMultiSelection && primaryElement.type === 'image' && renderImageProperties(primaryElement as ImageElement)}
      {!isMultiSelection && primaryElement.type === 'shape' && renderShapeProperties(primaryElement as ShapeElement)}
      
      {renderCommonProperties()}
    </div>
  );
};