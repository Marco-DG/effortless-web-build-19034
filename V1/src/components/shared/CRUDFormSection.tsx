import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";

interface CRUDFormSectionProps<T> {
  title: string;
  description: string;
  items: T[];
  newItem: Omit<T, 'id'>;
  onNewItemChange: (item: Omit<T, 'id'>) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderForm: (newItem: Omit<T, 'id'>, onChange: (item: Omit<T, 'id'>) => void) => React.ReactNode;
  canAdd: boolean;
  addButtonText: string;
}

export function CRUDFormSection<T extends { id: string }>({
  title,
  description,
  items,
  newItem,
  onNewItemChange,
  onAddItem,
  onRemoveItem,
  renderItem,
  renderForm,
  canAdd,
  addButtonText
}: CRUDFormSectionProps<T>) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6">{description}</p>

        <div className="space-y-4">
          {items.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {items.map((item, idx) => (
                <div key={item.id} className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    {renderItem(item, idx)}
                  </div>
                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="p-1 hover:bg-destructive/10 rounded transition-colors ml-2"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
            {renderForm(newItem, onNewItemChange)}
            <Button
              type="button"
              onClick={onAddItem}
              disabled={!canAdd}
              variant="outline"
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              {addButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}