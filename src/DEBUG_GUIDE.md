# 🔧 Debug Guide - Site Builder Issue

## Problema Identificato
Schermo bianco quando si clicca su "Site Builder" dalla Hero.

## Come Debuggare

### 1. Apri Console Browser
- Premi F12
- Vai al tab "Console"

### 2. Clicca Site Builder
- Dalla landing page V2 (http://localhost:8080/v2)
- Clicca sul card "Site Builder" o sul bottone principale

### 3. Osserva Console Log
Dovrai vedere una sequenza simile a:

```
Starting building with mode: site
Project created successfully 
Building started successfully
RestaurantSaasV2 render: { isBuilding: true, activeMode: 'site', hasActiveProject: true, ... }
About to render, isBuilding: true
Rendering BuilderLayout
renderSidebar called: { activeMode: 'site', hasActiveProject: true }
Rendering SiteBuilder
```

## Possibili Errori da Cercare

### Error 1: Template Type Mismatch
Se vedi errore tipo: "Template 'wine-bar' not found"
- Il problema è nel tipo template nel store

### Error 2: Component Import Error  
Se vedi errore tipo: "Cannot resolve module"
- Problema di import nei componenti template

### Error 3: State Management Issue
Se `hasActiveProject: false` nonostante "Project created successfully"
- Problema nello store Zustand

### Error 4: Rendering Error
Se il log si ferma prima di "Rendering SiteBuilder"
- Problema nel componente SiteBuilder stesso

## Soluzioni Quick Fix

### Fix 1: Reset Store
```javascript
// In console browser
localStorage.clear()
location.reload()
```

### Fix 2: Template Fallback  
Se il problema è il template, temporaneamente cambia in Hero.tsx:
```typescript
createProject('Nuovo Progetto', 'fine-dining'); // invece di 'wine-bar'
```

### Fix 3: Mode Fallback
Se il problema è il mode, prova:
```typescript
handleStartBuilding('logo') // invece di 'site'
```

## Report Bug
Copia TUTTO l'output della console e condividilo per il debug.

Includi:
1. Tutti i console.log
2. Eventuali errori in rosso  
3. Warning in giallo
4. Network tab se ci sono richieste fallite