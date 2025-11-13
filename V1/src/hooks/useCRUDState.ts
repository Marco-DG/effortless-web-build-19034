import { useState, useCallback } from "react";

interface CRUDItem {
  id: string;
}

export function useCRUDState<T extends CRUDItem>(
  items: T[],
  defaultNewItem: Omit<T, 'id'>,
  onUpdate: (items: T[]) => void,
  generateId: () => string = () => `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
) {
  const [newItem, setNewItem] = useState<Omit<T, 'id'>>(defaultNewItem);

  const addItem = useCallback(() => {
    const item: T = {
      ...newItem,
      id: generateId(),
    } as T;
    
    onUpdate([...items, item]);
    setNewItem(defaultNewItem);
  }, [newItem, items, onUpdate, defaultNewItem, generateId]);

  const removeItem = useCallback((index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    onUpdate(updatedItems);
  }, [items, onUpdate]);

  const updateNewItem = useCallback((updates: Partial<Omit<T, 'id'>>) => {
    setNewItem(prev => ({ ...prev, ...updates }));
  }, []);

  return {
    newItem,
    setNewItem,
    updateNewItem,
    addItem,
    removeItem,
  };
}