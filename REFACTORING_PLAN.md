# 🛠 Comprehensive Refactoring Plan

## 🚨 **Critical Issues Found**

### 1. **Duplicate Code Elimination**
- ❌ **Duplicate toast implementations** (`hooks/use-toast.ts` vs `components/ui/use-toast.ts`)
- ❌ **Template duplication** (80%+ shared code between FineDining, WineBar, Trattoria)
- ❌ **Builder Step repetition** (identical CRUD patterns across 8+ step components)
- ❌ **Props interface duplication** (same patterns repeated without shared types)

### 2. **Architectural Issues**
- ❌ **BuilderSidebar.tsx**: 1000+ lines, multiple responsibilities
- ❌ **Scattered localStorage usage** instead of centralized storage
- ❌ **No shared component patterns** for forms/CRUD operations
- ❌ **Inconsistent macro-tab implementation** (legacy "appearance"/"data" references)

### 3. **Performance & Maintenance**
- ❌ **123 files with inline className styling** (hard to maintain)
- ❌ **43 React.FC interfaces** (could be simplified)
- ❌ **No shared hooks** for common operations
- ❌ **Missing error boundaries**

## ✅ **Immediate Fixes Applied**

1. **Removed duplicate toast hook**
2. **Created shared storage utilities**
3. **Added reusable CRUD components**
4. **Established shared prop types**

## 📋 **Phase-by-Phase Refactoring**

### **Phase 1: Foundation (Priority: HIGH)**
- [ ] **Split BuilderSidebar into focused components**
  - `BuilderHeader.tsx` (macro tabs)
  - `BuilderNavigation.tsx` (section nav)
  - `BuilderContent.tsx` (step content)
- [ ] **Consolidate template architecture**
  - Use `BaseTemplate` for all templates
  - Move theme configs to separate files
  - Create template registry system
- [ ] **Fix localStorage usage**
  - Replace all direct localStorage calls with `storage` utilities
  - Add error handling and fallbacks

### **Phase 2: Component Standardization (Priority: MEDIUM)**
- [ ] **Refactor Builder Steps**
  - Use `CRUDFormSection` for Reviews, FAQ, Events
  - Use `useCRUDState` hook for state management
  - Extract common form patterns
- [ ] **Create design system patterns**
  - `FormSection.tsx` for consistent form layouts
  - `ActionButtons.tsx` for nav/CRUD buttons
  - `PreviewCard.tsx` for item previews
- [ ] **Standardize component props**
  - Use shared interfaces from `types/shared.ts`
  - Remove duplicate prop definitions

### **Phase 3: Performance & UX (Priority: LOW)**
- [ ] **Add error boundaries**
- [ ] **Implement proper loading states**
- [ ] **Add keyboard navigation**
- [ ] **Optimize re-renders with React.memo**

## 🎯 **Target Metrics**

| Metric | Before | Target | 
|--------|--------|--------|
| Lines of code | ~8000 | ~5000 |
| Duplicate patterns | 15+ | 0 |
| Component size (avg) | 200 lines | 100 lines |
| Shared utilities | 3 | 15+ |

## 🔧 **Implementation Strategy**

### **Week 1: Critical Fixes**
1. Fix macro-tab inconsistencies
2. Split BuilderSidebar
3. Migrate localStorage usage

### **Week 2: Template Consolidation**  
1. Implement BaseTemplate
2. Refactor existing templates
3. Create theme system

### **Week 3: Component Patterns**
1. Apply CRUD patterns to steps
2. Create shared form components
3. Standardize prop interfaces

### **Week 4: Polish & Testing**
1. Add error handling
2. Performance optimizations
3. Comprehensive testing

## 📝 **Migration Checklist**

- [ ] Update all Builder Steps to use shared patterns
- [ ] Migrate templates to BaseTemplate
- [ ] Replace localStorage calls with storage utilities
- [ ] Update prop interfaces to use shared types
- [ ] Add comprehensive TypeScript coverage
- [ ] Create component documentation
- [ ] Add visual regression tests

## 🚀 **Expected Benefits**

1. **50% reduction in code duplication**
2. **Improved maintainability and consistency**
3. **Better performance through optimizations**
4. **Easier feature additions and bug fixes**
5. **Standardized development patterns**