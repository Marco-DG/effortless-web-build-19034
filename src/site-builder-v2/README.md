# Site Builder V2 - Standalone Version

## 🎯 Overview

Questo è una versione standalone del Site Builder, completamente separata dal resto dell'applicazione. È accessibile tramite il routing `/builder2`.

## 📁 Struttura

```
src/site-builder-v2/
├── SiteBuilder2.tsx          # Componente principale standalone
├── index.ts                  # Export principale
├── i18n.ts                  # Internazionalizzazione
├── utils.ts                 # Utility
├── designTokens.ts          # Design tokens
├── builder/                 # Core builder logic
│   ├── Engine.tsx
│   ├── UniversalBuilder.tsx
│   ├── UniversalSidebar.tsx
│   ├── SectionManager.tsx
│   ├── SectionTree.tsx
│   ├── registry.ts
│   └── types.ts
├── components/             # Sezioni componenti
│   ├── Hero/
│   ├── Header/
│   ├── Footer/
│   ├── Features/
│   ├── Gallery/
│   ├── Content/
│   ├── Grid/
│   ├── Menu/
│   ├── Awards/
│   ├── Testimonials/
│   └── Reservation/
├── editor/                # Editor auto-generato
│   ├── AutoSidebar.tsx
│   ├── FieldRenderers.tsx
│   └── components/
├── theme/                 # Theme editor
│   ├── ThemeEditor.tsx
│   └── schema.ts
├── store/                 # State management
│   └── app-store.ts
├── shared/               # Componenti condivisi
│   ├── components/
│   └── forms/
├── hooks/                # Custom hooks
├── types/                # Type definitions
├── constants/            # Costanti
└── locales/             # Traduzioni
```

## 🚀 Features

### ✅ Completamente Standalone
- ✅ **Zero dipendenze** dal resto dell'app
- ✅ **Store isolato** (Zustand)
- ✅ **Routing dedicato** `/builder2`
- ✅ **Componenti copiati** e adattati
- ✅ **I18n separato**

### 🎨 Design System
- ✅ **Glassmorphism UI** con design tokens
- ✅ **Header bar personalizzato** per V2
- ✅ **Layout responsive** con sidebar collapsible
- ✅ **Animazioni fluide** e transizioni

### 🏗️ Builder Features
- ✅ **Editor drag & drop** per sezioni
- ✅ **Auto sidebar** schema-driven
- ✅ **Componenti modulari** (10+ sezioni)
- ✅ **Theme editor** avanzato
- ✅ **Preview in tempo reale**

## 🛠️ Utilizzo

### Accesso
```
http://localhost:5173/builder2
```

### Import Component
```tsx
import { SiteBuilder2 } from '../site-builder-v2';

const MyPage = () => <SiteBuilder2 />;
```

## 🔧 Personalizzazione

### Aggiungere Nuovi Componenti
1. Crea cartella in `components/NuovoComponente/`
2. Aggiungi `schema.ts`, `index.ts`, `NuovoComponente.tsx`
3. Registra in `builder/registry.ts`
4. Import in `SiteBuilder2.tsx`

### Modificare Tema
- Modifica `theme/schema.ts`
- Aggiorna `designTokens.ts`

### Aggiungere Fields
- Estendi `editor/FieldRenderers.tsx`
- Aggiorna `types/index.ts`

## 🎯 Differenze dalla Versione Originale

### 🆕 Novità V2
- **Header bar custom** con branding V2
- **Progetto auto-inizializzato** senza menu builders
- **Isolamento completo** - no interferenze
- **CSS adjustments** per layout standalone

### 🔄 Mantenuto
- ✅ **Tutti i componenti** sezioni
- ✅ **AutoSidebar** e FieldRenderers
- ✅ **Theme system**
- ✅ **State management**
- ✅ **I18n support** (EN/IT)

## 📈 Performance

- **Bundle size**: ~1.1MB (gzipped: 327KB)
- **Build time**: ~4s
- **Runtime**: Ottimizzato per editing in tempo reale

---

*Creato come versione standalone per testing e sviluppo isolato.*