import React from 'react';
import { CanvasElement, TextElement } from '../../types';
import { Type, Image, Square, Circle, Trash2, Copy, Lock, Unlock } from 'lucide-react';

interface ElementToolbarProps {
  selectedElements: CanvasElement[];
  onAddElement: (type: 'text' | 'image' | 'shape') => void;
  onDeleteElements: (elementIds: string[]) => void;
  onDuplicateElements: (elementIds: string[]) => void;
  onLockElements: (elementIds: string[], locked: boolean) => void;
}

export const ElementToolbar: React.FC<ElementToolbarProps> = ({
  selectedElements,
  onAddElement,
  onDeleteElements,
  onDuplicateElements,
  onLockElements
}) => {
  const hasSelectedElements = selectedElements.length > 0;
  const hasLockedElements = selectedElements.some(el => el.locked);
  const allLocked = selectedElements.length > 0 && selectedElements.every(el => el.locked);

  return (
    <div className="flex items-center gap-1 p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Add Elements */}
      <div className="flex items-center gap-1 mr-2">
        <button
          onClick={() => onAddElement('text')}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          title="Aggiungi Testo"
        >
          <Type className="w-4 h-4" />
          <span className="hidden sm:inline">Testo</span>
        </button>
        
        <button
          onClick={() => onAddElement('image')}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          title="Aggiungi Immagine"
        >
          <Image className="w-4 h-4" />
          <span className="hidden sm:inline">Immagine</span>
        </button>
        
        <div className="relative group">
          <button
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title="Aggiungi Forma"
          >
            <Square className="w-4 h-4" />
            <span className="hidden sm:inline">Forme</span>
            <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Shapes dropdown */}
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button
              onClick={() => onAddElement('shape')}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            >
              <Square className="w-4 h-4" />
              Rettangolo
            </button>
            <button
              onClick={() => onAddElement('shape')}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            >
              <Circle className="w-4 h-4" />
              Cerchio
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      {hasSelectedElements && <div className="w-px h-6 bg-gray-300 mx-2" />}

      {/* Element Actions */}
      {hasSelectedElements && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => onDuplicateElements(selectedElements.map(el => el.id))}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Duplica"
          >
            <Copy className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onLockElements(selectedElements.map(el => el.id), !allLocked)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title={allLocked ? "Sblocca" : "Blocca"}
          >
            {allLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => onDeleteElements(selectedElements.map(el => el.id))}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            title="Elimina"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Selection Info */}
      {hasSelectedElements && (
        <div className="ml-auto text-sm text-gray-500">
          {selectedElements.length} element{selectedElements.length !== 1 ? 'i' : 'o'} selezionat{selectedElements.length !== 1 ? 'i' : 'o'}
        </div>
      )}
    </div>
  );
};