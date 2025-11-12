# Restaurant SaaS V2 - Architettura

## 🎯 Obiettivi Raggiunti

✅ **Architettura Pulita e Modulare**
- Separazione netta tra moduli (Logo, Menu, Site Builder)
- State management centralizzato con Zustand
- Design system unificato
- Componenti riutilizzabili

✅ **Problemi Risolti**
- ❌ Sidebar doppia → ✅ Layout unificato con BuilderLayout
- ❌ UI inconsistente → ✅ Design system cohesivo
- ❌ State frammentato → ✅ Store centralizzato
- ❌ Navigation confusa → ✅ Transizioni fluide

✅ **Funzionalità Mantenute**
- Logo Builder completo con font, colori, layout
- Menu Builder con gestione elementi e configurazioni
- Preview in tempo reale per tutti i builder
- Mobile responsiveness
- Estetica moderna migliorata

## 🏗️ Struttura

```
src/v2/
├── store/
│   └── app-store.ts           # State management Zustand
├── types/
│   └── index.ts              # Tipi TypeScript centralizzati
├── ui/
│   ├── Button.tsx            # Button component migliorato
│   ├── Card.tsx              # Card components
│   ├── Layout.tsx            # Layout components (App, Builder, Sidebar, Preview)
│   └── design-tokens.ts      # Design system tokens
├── components/
│   └── Hero.tsx              # Hero section rinnovata
├── modules/
│   ├── logo-builder/
│   │   ├── LogoBuilder.tsx   # Sidebar del logo builder
│   │   ├── LogoPreview.tsx   # Preview del logo
│   │   └── LogoControls.tsx  # Controlli configurazione logo
│   ├── menu-builder/
│   │   ├── MenuBuilder.tsx   # Sidebar del menu builder
│   │   ├── MenuPreview.tsx   # Preview del menu
│   │   └── MenuControls.tsx  # Controlli gestione menu
│   └── site-builder/
│       ├── SiteBuilder.tsx   # Placeholder site builder
│       └── SitePreview.tsx   # Preview del sito
└── RestaurantSaasV2.tsx      # Componente principale
```

## 🔧 Tecnologie

- **React 18** con TypeScript
- **Zustand** per state management
- **Framer Motion** per animazioni
- **Tailwind CSS** per styling
- **Radix UI** per componenti base
- **Class Variance Authority** per varianti components

## 🎨 Design System

### Layout Components
- `AppLayout`: Layout principale dell'applicazione
- `BuilderLayout`: Layout per i builder (Hero + Sidebar + Preview)
- `SidebarLayout`: Layout per le sidebar dei builder
- `PreviewLayout`: Layout per le preview

### UI Components  
- `Button`: Con varianti (default, outline, gradient, etc.)
- `Card`: Con elevazioni e hover states
- Design tokens per spacing, colori, typography

### Responsive Design
- Desktop: Layout a 3 colonne (sidebar + preview)
- Mobile: Modal overlay per sidebar e preview
- Transizioni animate tra stati

## 🚀 Funzionalità

### Logo Builder
- ✅ Modalità testo/immagine/ibrido
- ✅ Font selection con preview
- ✅ Color picker con preset
- ✅ Size slider
- ✅ Layout options (horizontal/vertical/stacked)
- ✅ Tagline support
- ✅ Real-time preview

### Menu Builder
- ✅ Gestione elementi menu completa
- ✅ Categorizzazione automatica
- ✅ Layout list/grid con configurazioni
- ✅ Show/hide options per vari elementi
- ✅ Drag & drop order (UI ready)
- ✅ Featured items
- ✅ Allergen support
- ✅ Badge system

### Site Builder
- 🔄 In development (placeholder creato)
- 📋 Preview basilare implementata

## 🔄 State Management

### useAppStore (Zustand)
```typescript
interface AppStore {
  // State
  activeMode: 'logo' | 'menu' | 'site'
  isBuilding: boolean
  activeProject: Project | null
  ui: { sidebarOpen, previewOpen, activeSection }
  
  // Actions
  setActiveMode, startBuilding, stopBuilding
  toggleSidebar, openSidebar, closeSidebar
  togglePreview, openPreview, closePreview
  createProject, loadProject, updateProject, saveProject
}
```

### Persistenza
- Progetti salvati in localStorage
- Stato UI non persistito
- Migration path da dati V1 esistenti

## 📱 Mobile Experience

- Hero section ottimizzata per mobile
- Sidebar come modal overlay
- Preview in modal separato
- Touch-friendly controls
- Responsive typography scaling

## 🎯 Prossimi Passi

1. **Site Builder Complete** - Implementare il site builder completo
2. **Export Functionality** - Aggiungere export per loghi e menu
3. **Template Engine** - Sistema template per diversi stili
4. **Advanced Preview** - Preview più dettagliata con navigazione
5. **Project Management** - Lista progetti, duplicazione, cancellazione
6. **Cloud Sync** - Sincronizzazione cloud dei progetti

## 🧪 Testing

Per testare la nuova versione:
1. Vai a `http://localhost:8080/v2`
2. Prova i diversi builder dalla hero
3. Verifica responsiveness su mobile
4. Testa le transizioni tra modalità

## 🔄 Migration V1→V2

La V2 è costruita parallelamente alla V1:
- URL: `/v2` per la nuova versione  
- URL: `/` per la versione esistente
- Dati compatibili tra versioni
- Migration graduale possibile