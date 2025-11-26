import React from 'react';

// TEMPORARY BRIDGE COMPONENT
// TODO: Remove after migration to Clean components is complete
interface PremiumListItemProps {
  title: string;
  description?: string;
  price?: string;
  category?: string;
  featured?: boolean;
  available?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleFeatured?: () => void;
  onToggleAvailable?: () => void;
}

export const PremiumListItem: React.FC<PremiumListItemProps> = ({ 
  title,
  description,
  price,
  category,
  featured,
  available,
  onEdit,
  onDelete,
  onToggleFeatured,
  onToggleAvailable
}) => {
  return (
    <div className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-slate-900">{title}</h4>
            {featured && (
              <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                Speciale
              </span>
            )}
            {!available && (
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                Non disponibile
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-slate-600 mb-2">{description}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-slate-500">
            {category && <span>Categoria: {category}</span>}
            {price && <span className="font-medium text-slate-700">€{price}</span>}
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          {onEdit && (
            <button 
              onClick={onEdit}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
              Modifica
            </button>
          )}
          {onToggleFeatured && (
            <button 
              onClick={onToggleFeatured}
              className="px-3 py-1 text-xs bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors"
            >
              {featured ? 'Rimuovi speciale' : 'Rendi speciale'}
            </button>
          )}
          {onToggleAvailable && (
            <button 
              onClick={onToggleAvailable}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                available 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {available ? 'Disabilita' : 'Abilita'}
            </button>
          )}
          {onDelete && (
            <button 
              onClick={onDelete}
              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
            >
              Elimina
            </button>
          )}
        </div>
      </div>
    </div>
  );
};