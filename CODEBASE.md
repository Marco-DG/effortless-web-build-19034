# CODEBASE OVERVIEW

This document explains the structure, data flow, and extension points of this project.

- Stack: Vite + React 18 + TypeScript + React Router + TanStack Query + TailwindCSS + shadcn/ui (Radix UI) + Framer Motion
- Purpose: A website builder experience for hospitality (restaurants, wine bars, trattorie) with live template preview, step-by-step editing, and a standalone preview route that pulls data from localStorage.

## Quick Start

- Dev: `npm run dev` (Vite dev server on port 8080)
- Build: `npm run build`
- Preview build: `npm run preview`

Vite aliases:
- `@` -> `./src`

Tailwind content scanning: `./src/**/*.{ts,tsx}` (+ pages/components/app roots)

## Project Structure

Top-level:
- `vite.config.ts` – Vite config, React SWC plugin, `@` alias, dev server setup (port 8080)
- `tailwind.config.ts` – Tailwind theming and shadcn color tokens; container and animation settings
- `tsconfig*.json` – TypeScript configs and path aliases
- `public/` – Static assets (favicon, robots, placeholder)
- `src/` – Application code

Key app files:
- `src/main.tsx` – React root
- `src/App.tsx` – App providers and router with animated route transitions
- `src/pages/Index.tsx` – Builder entry
- `src/pages/Preview.tsx` – Standalone template preview (reads `builderData` from localStorage or defaults)
- `src/pages/NotFound.tsx` – 404 page

### Components Library (shadcn/Radix and custom)
- `src/components/ui/*` – Shadcn-styled primitives and composite components (accordion, dialog, inputs, select, table, etc.) plus project-specific:
  - `option-list.tsx` – Filterable/selectable list used by builder (e.g., templates, fonts)
  - `viewport-selector.tsx` – Exposes viewport presets and helpers for preview device frames
  - `image-uploader.tsx` – Upload/URL input for images
  - `toaster.tsx`, `sonner.tsx`, `use-toast.ts` – Notifications
- `src/components/visual/*`
  - `CursorGlow.tsx`, `ParallaxOrbs.tsx` – Decorative visual layers
- `src/components/animations/Reveal.tsx` – Simple reveal utility
- `src/components/ai/AICommandPalette.tsx` – Command dialog scaffold (Ctrl/Cmd+K)
- `src/components/controls/PerformanceToggle.tsx` – Reduced-effects toggle hook integration

### Feature: Builder
Entry/exports: `src/features/builder/index.ts`

Core pieces:
- `components/Builder.tsx` – Two-column layout (sidebar + preview). On mobile, preview opens in modal. Orchestrates builder state from `useBuilderState`.
- `components/BuilderSidebar.tsx` – The stepper/sidebar UI for editing data (collapsed in this view; see file for all interactions and sections)
- `components/TemplatePreview.tsx` – Lazy loads templates and renders a responsive, device-framed preview. Supports manual viewport switching on desktop and native responsive on mobile. Injects heading font styles.
- `components/HeroContent.tsx` – Landing hero used when sidebar is closed; CTA buttons to start building and jump to sections
- `hooks/useBuilderState.ts` – Local builder state machine for UI:
  - toggles `isSidebarOpen` / `isPreviewOpen`
  - tracks `activeSection` highlight in the preview
  - holds `builderData` (or uses defaults) and exposes `previewData`
  - actions: `startBuilding`, `selectTemplate`, `updateData`, `changeSection`, `openPreview`, `closePreview`, `closeSidebar`

Builder Steps (in `components/steps`):
- `BuilderStep0.tsx` – Template selection (with favorites + search via `OptionList`)
- `BuilderStep1.tsx` – Business name
- `BuilderStep2.tsx` – Business type selector
- `BuilderStep3.tsx` – Hero content (title, subtitle, background image via `ImageUploader`)
- `BuilderStep4.tsx` – Menu items CRUD (name, price, description, category)
- `BuilderStep5.tsx` – About section (story, philosophy, values list)
- `BuilderStep6.tsx` – Events CRUD (title, date, time, location, description)
- `BuilderStep7*.tsx` – Reviews/FAQ steps (present but large; similar CRUD patterns)
- `BuilderStep8.tsx` – Finalization step (present, similar pattern)
- `BuilderStepLogo.tsx` – Logo creation/selection (image or text)
- `BuilderStepTypography.tsx` – Dual-font selection (primary/secondary) using Google Fonts loader and `OptionList`

Constants:
- `src/constants/sections.ts` – UI labels and icons for builder sections (`APPEARANCE_SECTIONS`, `DATA_SECTIONS`, `SECTION_ICONS`)

### Feature: Templates
Entry/exports: `src/features/templates/index.ts`

Templates implement the actual site composition. They all accept:
- Props: `{ data: BuilderData; activeSection?: string; fontFamily?: string; singlePage?: boolean }`
- They use composition of `src/features/templates/components/*` sections for the page and optionally highlight the current builder section.

Available templates:
- `WineBarTemplate.tsx` – Premium/minimal aesthetic (lazy loaded)
- `FineDiningTemplate.tsx` – Editorial serif aesthetic (lazy loaded)
- `TrattoriaTemplate.tsx` – Warm/traditional aesthetic (eager import here but lazy in preview). Example shows how sections are composed and gated by `sectionsOrder`/`sectionsEnabled`.

Shared template sections (composables):
- `components/SiteHeader.tsx`, `SiteHero.tsx`, `SiteAbout.tsx`, `SiteMenu.tsx`, `SiteEvents.tsx`, `SiteGallery.tsx`, `SiteReviews.tsx`, `SiteFAQ.tsx`, `SiteReservation.tsx`, `SiteContact.tsx`, `SiteBlog.tsx`, `SiteNewsletter.tsx`, `SiteFooter.tsx`, `PromoBanner.tsx`

### Pages and Routing
- Router is defined in `src/App.tsx` with animated route wrapper (`framer-motion`):
  - `/` → `Index` → renders `Builder`
  - `/preview` → `Preview` → renders `TemplatePreview` with data pulled from `localStorage.builderData` or fallback defaults
  - `*` → `NotFound`

### Data Model
Types in `src/types/builder.ts` define all builder data shapes.
Key types:
- `TemplateType` – "wine-bar" | "fine-dining" | "trattoria"
- `BuilderData` – central structure containing:
  - identity: `businessName`, `businessType`, logo (`logoUrl`|`logoText`|`logoFont`), `tagline`
  - hero: `heroSlogan`, `heroDescription`, optional fonts/styles
  - content collections: `menuItems[]`, `events[]`, `gallery[]`, `reviews[]`, `faqs[]`, `blogPosts[]`
  - contacts: `address`, `phone`, `email`, `openingHours`, `socialLinks`, `reservationLink?`, `deliveryLinks`
  - about: `imageUrl`, `heading`, `text` (campi legacy ancora letti se presenti: `story`, `philosophy`, `values[]`)
  - site chrome: `promoBanner`, `cookieBannerEnabled`, newsletter fields
  - layout control: `sectionsOrder: string[]`, `sectionsEnabled: Record<string, boolean>`, `singlePage?`
  - typography: `fontFamily?` (legacy), `fontPrimary?` (body), `fontSecondary?` (headings)

Defaults:
- Provided by `src/lib/defaultData.ts` via `getDefaultData(template: TemplateType): BuilderData`.
- `useBuilderState` uses `getDefaultData("wine-bar")` when starting.
- The `/preview` page also falls back to `getDefaultData("wine-bar")` if no data in localStorage.

Local persistence helpers:
- `src/lib/storage.ts` – thin wrappers `getBuilderData()` / `setBuilderData()` for localStorage (used sparingly; many places directly read/write `localStorage` key `builderData`).

### Styling & Theming
- Tailwind is used extensively. Theme tokens align with shadcn conventions (e.g., `--primary`, `--foreground`, etc.).
- Tailwind config extends fonts (`Inter` default, `Playfair Display` for headings by default) and shadcn sidebar color namespace.
- Global styles in `src/index.css` include responsive viewport container classes for preview frames (e.g., `.viewport-mobile`, `.builder-preview-root`).
- Reduced-effects user preference handled via `src/hooks/useReducedEffects.ts`, toggling `reduced-effects` class on `html`.

### Fonts

### Immagini (riuso)
- Per la selezione di immagini nel builder, usare sempre il componente condiviso `ImageUploader` (`src/components/ui/image-uploader.tsx`).
- Sezioni che lo usano: Hero, Logo (modalità immagine), About, Galleria (aggiunta singola immagine).
- Evitare input file custom duplicati: il componente gestisce drag & drop, preview, URL e rimozione.
- Google Fonts are managed by `src/lib/fonts.ts`:
  - `getAllFonts()` returns curated list (with metadata and category)
  - `ensureGoogleFontLoaded(familyId, googleName?, weights)` injects a `<link>` tag once per font
  - `BuilderStepTypography` uses this to load selected fonts
  - `TemplatePreview` loads both body (`fontFamily`) and heading (`fontSecondary`) families and injects a CSS override for headings

### Live Preview & Viewports
- `TemplatePreview` lazy-loads templates and wraps them in a device-sized container.
- Desktop: user can switch viewports (desktop/tablet/mobile) using helpers from `components/ui/viewport-selector`.
- Mobile: viewport controls are hidden; preview takes full width for native responsive testing.
- `activeSection` flashes a highlight ring around the relevant section inside templates to provide context when a user edits that section from the sidebar.
- In-page anchors are standardized: `#home`, `#menu`, `#about`, `#gallery`, `#events`, `#contact`, etc. Single-page templates (e.g., Trattoria) now wrap each section with an element carrying its corresponding `id` for proper in-page navigation.

### AI/Command Palette (Scaffold)
- `components/ai/AICommandPalette.tsx` binds Ctrl/Cmd+K and opens a command dialog with placeholder actions for future AI-assisted flows (e.g., generate section, CTA, improvements).

## Data Flow
- Builder interactions mutate `builderData` via `useBuilderState.updateData(partial)`.
- The right column preview receives `previewData` (current state or defaults) and re-renders accordingly.
- Opening preview in a new tab writes the current data to `localStorage.builderData`, and `/preview` reads this value.

Sequence overview:
1. User opens `/` and sees `HeroContent`.
2. Clicking a CTA triggers `startBuilding()` → opens sidebar and initializes defaults if needed.
3. Sidebar steps call `onUpdate(partial)` to change specific slices of `BuilderData`.
4. `TemplatePreview` reflects changes, loads fonts and animates viewport as configured.
5. Clicking "Nuova scheda" stores data and opens `/preview` for a full preview without editor chrome.

## Conventions & Patterns
- Import alias: use `@/` for all source modules.
- Keep templates self-contained and driven only by `BuilderData` props (no internal fetches/side-effects beyond presentation/animation).
- Steps should only update the relevant fields in `BuilderData` and remain stateless beyond local UI state.
- Prefer `OptionList` for large selectable lists (fonts, templates) with search and metadata actions.
- Avoid direct `localStorage` access inside many components in favor of `lib/storage.ts` for testability—existing code uses both patterns.

## Extending the Codebase

Add a new template:
1. Create `src/features/templates/MyNewTemplate.tsx` exporting `MyNewTemplate` with the same prop contract.
2. Compose with existing `templates/components/*` as needed, or add new components there.
3. Register a lazy import in `TemplatePreview.tsx` and extend the `switch (data.template)`.
4. Add template metadata in the builder selection step (`BuilderStep0.tsx`).
5. Provide default data in `lib/defaultData.ts` for the new `TemplateType`, and add the type to `types/builder.ts`.

Add a new builder step/section:
1. Add a file to `src/features/builder/components/steps/` implementing the step UI.
2. Define any necessary fields in `types/builder.ts` and defaults in `lib/defaultData.ts`.
3. Wire it in `BuilderSidebar.tsx` with appropriate navigation and mapping to `onUpdate`.
4. If the section maps to a template area, ensure templates read those fields and optionally highlight when `activeSection` equals the new section id.
5. Optionally, add an entry to `constants/sections.ts` with label and icon.

Persisting data across sessions:
- Use `lib/storage.ts` helpers and keep the `localStorage` key `builderData` consistent. When opening the preview, ensure the current builder state is serialized before navigation.

Fonts and typography:
- Add fonts to `lib/fonts.ts` with `id` (CSS family), `google` (Google family param), and a category. `ensureGoogleFontLoaded` will inject the needed link tag; ensure to pass the same `id` into components’ `style={{ fontFamily }}` or Tailwind classes as needed.

Viewport support:
- If you add or change device presets, update `components/ui/viewport-selector.tsx` and any related CSS in `index.css`.

## Known Gaps / TODO candidates
- `BuilderSidebar.tsx` is sizable; if logic grows, consider splitting sections into focused subcomponents.
- Some places write directly to `localStorage`; consolidating through `lib/storage.ts` would improve testability.
- Defaults (`lib/defaultData.ts`) are not shown here in full—ensure new fields receive sensible defaults.

## Testing Ideas
- Unit test `ensureGoogleFontLoaded` logic (idempotent link injection)
- Component tests for builder steps: CRUD lists (menu, events, values)
- E2E for builder -> preview persistence (localStorage write/read boundaries)

---
If you have questions or want this formatted differently (e.g., with diagrams), let me know.
