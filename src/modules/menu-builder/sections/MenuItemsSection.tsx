import React, { useState } from 'react';
import { MenuConfig, MenuItem } from '../../../types';
import { PremiumCard, PremiumTextInput, PremiumSelect, PremiumListItem, PremiumActionButton } from '../../../components/forms';

interface MenuItemsSectionProps {
  config: MenuConfig & { items: MenuItem[] };
  onUpdate: (updates: Partial<MenuConfig & { items: MenuItem[] }>) => void;
  onAddItem: () => void;
}

const categories = [
  { value: 'antipasti', label: 'Antipasti' },
  { value: 'primi', label: 'Primi Piatti' },
  { value: 'secondi', label: 'Secondi Piatti' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'bevande', label: 'Bevande' },
  { value: 'cocktail', label: 'Cocktail' },
  { value: 'vini', label: 'Vini' },
  { value: 'altro', label: 'Altro' }
];

export const MenuItemsSection: React.FC<MenuItemsSectionProps> = ({
  config,
  onUpdate,
  onAddItem
}) => {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('tutti');
  const [editFormData, setEditFormData] = useState<Partial<MenuItem>>({});

  const filteredItems = selectedCategory === 'tutti' 
    ? config.items 
    : config.items.filter(item => item.category === selectedCategory);

  const handleUpdateItem = (id: string, updates: Partial<MenuItem>) => {
    const updatedItems = config.items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    onUpdate({ items: updatedItems });
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = config.items.filter(item => item.id !== id);
    onUpdate({ items: updatedItems });
  };

  const handleStartEditing = (item: MenuItem) => {
    setEditingItem(item.id);
    setEditFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      available: item.available,
      featured: item.featured
    });
  };

  const handleSaveEdit = () => {
    if (editingItem && editFormData) {
      handleUpdateItem(editingItem, editFormData);
      setEditingItem(null);
      setEditFormData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditFormData({});
  };

  return (
    <div className="space-y-6">
      {/* Header con statistiche */}
      <PremiumCard
        title="Gestione Elementi"
        description={`${config.items.length} elementi totali nel menu`}
      >
        <div className="grid grid-cols-2 gap-4">
          <PremiumActionButton
            variant="primary"
            icon={() => (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            )}
            onClick={onAddItem}
          >
            Aggiungi Elemento
          </PremiumActionButton>

          <PremiumSelect
            label="Filtra per categoria"
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={[
              { value: 'tutti', label: 'Tutte le categorie' },
              ...categories
            ]}
            description="Visualizza elementi per categoria"
          />
        </div>
      </PremiumCard>

      {/* Form di editing (se attivo) */}
      {editingItem && (
        <PremiumCard
          title="Modifica Elemento"
          description="Aggiorna le informazioni dell'elemento selezionato"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <PremiumTextInput
                label="Nome piatto"
                value={editFormData.name || ''}
                onChange={(value) => setEditFormData({ ...editFormData, name: value })}
                placeholder="Es: Spaghetti Carbonara"
                description="Il nome del piatto come apparirà nel menu"
              />

              <PremiumTextInput
                label="Prezzo"
                value={editFormData.price || ''}
                onChange={(value) => setEditFormData({ ...editFormData, price: value })}
                placeholder="€15,00"
                description="Prezzo del piatto"
              />
            </div>

            <PremiumTextInput
              label="Descrizione"
              value={editFormData.description || ''}
              onChange={(value) => setEditFormData({ ...editFormData, description: value })}
              placeholder="Descrizione del piatto..."
              description="Una breve descrizione degli ingredienti e preparazione"
              multiline
              rows={2}
            />

            <PremiumSelect
              label="Categoria"
              value={editFormData.category || ''}
              onChange={(value) => setEditFormData({ ...editFormData, category: value })}
              options={categories}
              description="Categoria di appartenenza del piatto"
            />

            <div className="flex gap-3 pt-4 border-t border-slate-200/50">
              <PremiumActionButton
                variant="primary"
                onClick={handleSaveEdit}
              >
                Salva Modifiche
              </PremiumActionButton>
              
              <PremiumActionButton
                variant="ghost"
                onClick={handleCancelEdit}
              >
                Annulla
              </PremiumActionButton>
            </div>
          </div>
        </PremiumCard>
      )}

      {/* Lista elementi */}
      <PremiumCard
        title={`Elementi ${selectedCategory !== 'tutti' ? `- ${categories.find(c => c.value === selectedCategory)?.label}` : ''}`}
        description={`${filteredItems.length} elementi ${selectedCategory !== 'tutti' ? 'in questa categoria' : 'totali'}`}
      >
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <div className="w-16 h-16 mx-auto mb-4 rounded-[18px] bg-gradient-to-br from-slate-100/80 to-slate-200/60 border border-slate-200/50 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <h4 className="font-semibold text-sm font-geist tracking-[-0.01em] mb-2">
              {selectedCategory === 'tutti' ? 'Nessun elemento nel menu' : 'Nessun elemento in questa categoria'}
            </h4>
            <p className="text-xs font-medium font-geist tracking-[-0.01em]">
              Aggiungi il primo elemento per iniziare a creare il tuo menu
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <PremiumListItem
                key={item.id}
                title={item.name}
                description={item.description}
                price={item.price}
                category={categories.find(c => c.value === item.category)?.label}
                featured={item.featured}
                available={item.available}
                onEdit={() => handleStartEditing(item)}
                onDelete={() => handleDeleteItem(item.id)}
                onToggleFeatured={() => handleUpdateItem(item.id, { featured: !item.featured })}
                onToggleAvailable={() => handleUpdateItem(item.id, { available: !item.available })}
              />
            ))}
          </div>
        )}
      </PremiumCard>
    </div>
  );
};