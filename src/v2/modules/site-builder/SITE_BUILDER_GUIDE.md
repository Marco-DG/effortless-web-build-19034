# 🏗️ Site Builder - Guida Completa

## 🎯 Overview

Il Site Builder V2 è un sistema completo e modulare per creare siti web per ristoranti. Ogni sezione è configurabile indipendentemente e il risultato finale è un sito responsive e professionale.

## 🚀 Come Testarlo

### 1. Accesso al Site Builder
- Vai a `http://localhost:8080/v2`
- Clicca su "Site Builder" dalla Hero
- Si aprirà la sidebar con 4 tab principali

### 2. Tab "Sezioni" 📄

**Funzionalità principali:**
- ✅ **Gestione sezioni**: Aggiungi, rimuovi, riordina, mostra/nascondi
- ✅ **Editor dedicato**: Ogni sezione ha il suo editor personalizzato
- ✅ **Preview live**: Cambiamenti visibili in tempo reale

**Test da fare:**
1. **Aggiungi nuove sezioni**:
   - Clicca sui pulsanti per aggiungere Hero, About, Gallery, ecc.
   - Osserva come appaiono nella lista
   
2. **Modifica sezioni esistenti**:
   - Clicca l'icona ✏️ per editare una sezione
   - Prova l'editor della sezione Hero (più completo)
   
3. **Riordina sezioni**:
   - Usa le frecce ↑↓ per cambiare l'ordine
   - Verifica che la preview si aggiorni
   
4. **Mostra/Nascondi**:
   - Toggle dell'occhio per abilitare/disabilitare
   - Le sezioni disabilitate non appaiono nella preview

### 3. Sezioni Implementate ✅

#### **Hero Section** (Completa)
- Titolo, sottotitolo, descrizione
- 4 stili: Minimal, Gradient, Image Background, Video Background
- 3 allineamenti: Sinistra, Centro, Destra
- Call-to-Action configurabile
- Preview con tutti gli stili

#### **About Section** (Completa)  
- Titolo e contenuto ricco
- Immagine con 4 posizioni: Sinistra, Destra, Sopra, Sfondo
- Features/caratteristiche con icone
- Layout responsive automatico

#### **Menu Section** (Integrata)
- Usa automaticamente i dati del Menu Builder
- 4 modalità display: Full, Featured, Categories, Preview
- Toggle prezzi
- Integrazione perfetta con Menu Builder

#### **Gallery Section** (Funzionale)
- Titolo e sottotitolo configurabili  
- 3 layout: Grid, Masonry, Carousel
- Colonne configurabili (2-4)
- Upload multiplo immagini
- Caption per ogni immagine

#### **Contact Section** (Base)
- Integrazione automatica dati contatto
- Icone Lucide per telefono, email, indirizzo
- Layout a 3 colonne responsive

#### **Hours Section** (Automatica)
- Mostra automaticamente gli orari dal progetto
- Layout pulito e leggibile
- Icona orologio

#### **Newsletter Section** (Base)
- Form email semplice
- Background colorato
- Testo configurabile

### 4. Test Avanzati 🔬

#### **Responsive Design**
1. Apri DevTools (F12)
2. Testa varie dimensioni schermo
3. Verifica che tutte le sezioni si adattino bene

#### **Hero Styles Test**
1. Crea sezione Hero
2. Prova tutti e 4 gli stili:
   - **Gradient**: Bello sfondo sfumato
   - **Minimal**: Pulito e semplice  
   - **Image Background**: Aggiungi URL immagine
   - **Video Background**: Per video (placeholder)

#### **About Section Test**
1. Aggiungi sezione About
2. Prova le 4 posizioni immagine
3. Aggiungi features/caratteristiche
4. Verifica layout responsive

#### **Integration Test**  
1. Vai al Menu Builder
2. Aggiungi alcuni piatti
3. Torna al Site Builder  
4. Aggiungi sezione Menu
5. Verifica che i piatti appaiano automaticamente

### 5. Cosa Osservare ✨

#### **UI/UX**
- ✅ Transizioni fluide tra editor
- ✅ Preview aggiornata in tempo reale  
- ✅ Layout pulito e intuitivo
- ✅ Mobile responsive perfetto
- ✅ No sidebar doppia (problema risolto!)

#### **Funzionalità**
- ✅ Drag & drop virtuale (frecce su/giù)
- ✅ Toggle visibilità sezioni
- ✅ Editor contextual per ogni sezione
- ✅ Integrazione perfetta con altri builder
- ✅ Dati persistiti automaticamente

#### **Performance**  
- ✅ Rendering veloce delle sezioni
- ✅ State management ottimale con Zustand
- ✅ Componenti modulari riutilizzabili

## 🎨 Design Highlights

### **Layout System**
- Container responsive centralizzato
- Grid system con breakpoint mobili
- Spacing consistente (sistema 8pt)

### **Color System**
- Colori template automatici
- Tema personalizzabile per template
- Contrasti ottimizzati per accessibilità

### **Typography** 
- Font heading/body separati
- Scale tipografica armonica
- Line-height ottimizzati per leggibilità

## 🔄 Workflow Consigliato

### **Setup Base (5 min)**
1. Crea nuovo progetto dalla Hero
2. Vai a Site Builder
3. La sezione Hero è già configurata
4. Aggiungi sezione About
5. Sezione Menu è già collegata

### **Personalizzazione (10 min)**
1. Edita Hero: cambia titolo, sottotitolo, stile
2. Configura About: aggiungi storia del ristorante  
3. Aggiungi Gallery: carica 6-8 foto
4. Aggiungi Contact: già integrato automaticamente

### **Rifinitura (5 min)**
1. Riordina sezioni come preferisci
2. Toggle visibilità per nascondere sezioni non necessarie
3. Testa responsive su mobile
4. Preview finale completa

## 🎯 Punti di Forza V2

### **vs V1 Miglioramenti**
- ❌ **V1**: Nessun site builder completo
- ✅ **V2**: Site builder modulare e completo

### **Architettura**
- **Modulare**: Ogni sezione è un componente isolato
- **Scalabile**: Facile aggiungere nuovi tipi di sezione
- **Type-safe**: TypeScript completo per tutti i dati
- **Reusable**: Componenti riutilizzabili

### **Developer Experience**
- **Hot reload**: Cambiamenti istantanei
- **Debuggable**: State chiaro e ispezionabile
- **Maintainable**: Codice pulito e organizzato

## 🚧 In Sviluppo

### **Tab "Design"** (prossima iterazione)
- Editor colori tema
- Font picker avanzato  
- Spacing controls
- Animation settings

### **Tab "Settings"** (prossima iterazione)
- SEO meta tags
- Social sharing
- Analytics integration
- Performance settings

### **Tab "SEO"** (prossima iterazione)
- Title/description optimization
- Keywords management
- Open Graph tags
- Schema markup

### **Sezioni Avanzate** (future)
- **Reviews**: Gestione recensioni avanzata
- **Events**: Calendario eventi
- **Reservations**: Sistema prenotazioni integrate
- **Blog**: Sezione blog/news

## 🎉 Test Results Attesi

Dopo aver testato dovresti osservare:

1. **Nessun bug visuale** - Layout perfetti su ogni device
2. **Performance eccellente** - Tutto fluido e veloce
3. **UX intuitiva** - Facile da usare anche per non-tecnici
4. **Preview accurata** - Quello che vedi è quello che ottieni
5. **Integration seamless** - Menu Builder si integra perfettamente

Il Site Builder V2 rappresenta un salto qualitativo enorme rispetto alla V1 e pone le basi per un sistema di website building professionale e completo! 🚀