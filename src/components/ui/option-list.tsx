import React from "react";

export interface OptionItem {
  id: string;
  title: string;
  description?: string;
  meta?: React.ReactNode;
  thumbnailUrl?: string;
}

export interface OptionListProps<T extends string = string> {
  // Optional search bar
  enableSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (q: string) => void;
  items: Array<OptionItem & { id: T }>;
  selectedId?: T;
  onSelect: (id: T) => void;
  ariaLabel?: string;
  className?: string;
  showSelectedCheck?: boolean;
}

export function OptionList<T extends string = string>({ items, selectedId, onSelect, ariaLabel = "Lista opzioni", className = "", showSelectedCheck = false, enableSearch = false, searchPlaceholder = "Cerca...", onSearchChange, searchAddon }: OptionListProps<T>) {
  return (
    <div className={`rounded-lg border bg-white ${className}`} aria-label={ariaLabel}>
      {enableSearch && (
        <div className="p-2 border-b">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="flex-1 px-3 py-2 border rounded-md text-sm"
              onChange={(e)=> onSearchChange && onSearchChange(e.target.value)}
            />
            {searchAddon}
          </div>
        </div>
      )}
      <div className="divide-y max-h-[520px] overflow-auto pr-1" role="list">
      {items.map((item) => {
        const isSelected = selectedId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full text-left p-3 transition-colors ${isSelected ? "bg-primary/5" : "hover:bg-muted/50"}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {item.thumbnailUrl && (
                  <img src={item.thumbnailUrl} alt="" className="w-14 h-10 rounded object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                    {isSelected && (
                      showSelectedCheck ? (
                        <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <span className="text-primary text-xs font-medium">Selezionato</span>
                      )
                    )}
                  </div>
                  {item.description && (
                    <p className="text-[12px] text-muted-foreground mb-1">{item.description}</p>
                  )}
                </div>
              </div>
              {item.meta && <div className="flex items-center gap-2 flex-shrink-0">{item.meta}</div>}
            </div>
          </button>
        );
      })}
      {items.length === 0 && (
        <div className="col-span-full text-sm text-muted-foreground p-4 border rounded-md">Nessuna opzione disponibile.</div>
      )}
      </div>
    </div>
  );
}
