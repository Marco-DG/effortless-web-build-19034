import React from 'react';
import { cn } from '@/lib/utils';

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
  className?: string;
}

export const PremiumListItem: React.FC<PremiumListItemProps> = ({
  title,
  description,
  price,
  category,
  featured = false,
  available = true,
  onEdit,
  onDelete,
  onToggleFeatured,
  onToggleAvailable,
  className
}) => {
  return (
    <div className={cn(
      "group relative rounded-[16px] border border-slate-200/50 bg-gradient-to-br from-white/80 via-slate-50/40 to-slate-50/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden",
      !available && "opacity-60",
      className
    )}>
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-amber-400 to-amber-500 border-2 border-white rounded-full flex items-center justify-center shadow-lg shadow-amber-900/25">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      )}

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className={cn(
                "font-semibold text-sm font-geist tracking-[-0.01em] truncate",
                available ? "text-slate-800" : "text-slate-500"
              )}>
                {title}
              </h4>
              {category && (
                <span className="px-2 py-1 text-xs font-medium font-geist tracking-[-0.005em] bg-slate-100/60 text-slate-600 rounded-full shrink-0">
                  {category}
                </span>
              )}
            </div>
            {description && (
              <p className={cn(
                "text-xs font-medium font-geist tracking-[-0.005em] leading-relaxed",
                available ? "text-slate-600" : "text-slate-400"
              )}>
                {description}
              </p>
            )}
          </div>
          
          {price && (
            <div className={cn(
              "text-sm font-bold font-geist tracking-[-0.01em] shrink-0 ml-4",
              available ? "text-slate-800" : "text-slate-500"
            )}>
              {price}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
          {/* Status toggles */}
          <div className="flex items-center gap-2">
            {onToggleAvailable && (
              <button
                onClick={onToggleAvailable}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium font-geist tracking-[-0.005em] rounded-[10px] transition-all duration-200",
                  available 
                    ? "bg-green-100/80 text-green-700 hover:bg-green-200/80" 
                    : "bg-red-100/80 text-red-700 hover:bg-red-200/80"
                )}
              >
                {available ? 'Disponibile' : 'Non disponibile'}
              </button>
            )}
            
            {onToggleFeatured && (
              <button
                onClick={onToggleFeatured}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium font-geist tracking-[-0.005em] rounded-[10px] transition-all duration-200",
                  featured 
                    ? "bg-amber-100/80 text-amber-700 hover:bg-amber-200/80" 
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80"
                )}
              >
                {featured ? 'Speciale' : 'Standard'}
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 hover:bg-slate-100/60 rounded-[10px] text-slate-600 transition-all duration-200"
                title="Modifica elemento"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </button>
            )}
            
            {onDelete && (
              <button
                onClick={onDelete}
                className="p-2 hover:bg-red-50/80 rounded-[10px] text-red-600 transition-all duration-200"
                title="Elimina elemento"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};