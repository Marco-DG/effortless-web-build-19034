# 🚨 **Immediate Critical Actions Required**

## **Severity: HIGH - Production Issues**

### 1. **Fix Macro Tab Implementation** 
**Status**: ❌ BROKEN - compilation error  
**Issue**: Missing comma in BuilderSidebar props destructuring  
**Files**: `src/features/builder/components/BuilderSidebar.tsx`
```diff
- macroTab = "site"
+ macroTab = "site",
  onMacroTabChange,
```

### 2. **Remove "Dati" Tab & Complete "Sito Web" Integration**
**Status**: ❌ INCOMPLETE  
**Issue**: UI still shows old tabs, broken navigation  
**Actions**:
- Remove all references to `macroTab === "data"`
- Update subnav to show `[...APPEARANCE_SECTIONS, ...DATA_SECTIONS]` for "site"
- Remove "Dati" button from header

### 3. **Fix Duplicate Toast Hook** 
**Status**: ✅ COMPLETED  
**Action**: Removed `src/hooks/use-toast.ts` duplicate

### 4. **Centralize localStorage Usage**
**Status**: ⚠️ IN PROGRESS  
**Issue**: 6 files using direct localStorage calls  
**Files to update**:
- `src/pages/Preview.tsx`
- `src/features/builder/components/steps/BuilderStepTypography.tsx`
- `src/features/builder/components/steps/BuilderStepLogo.tsx`
- `src/features/builder/components/steps/BuilderStep0.tsx`
- `src/features/builder/components/TemplatePreview.tsx`
- `src/features/builder/components/Builder.tsx`

## **Severity: MEDIUM - Code Quality**

### 5. **Split BuilderSidebar Monster Component**
**Current**: 1000+ lines, 15+ case statements  
**Target**: Split into 3-4 focused components  
**Estimated effort**: 2-3 hours

### 6. **Consolidate Builder Steps (13 files)**
**Pattern**: All steps follow identical CRUD patterns  
**Solution**: Use new `CRUDFormSection` and `useCRUDState`  
**Estimated effort**: 4-6 hours  
**Benefit**: 60% code reduction

### 7. **Template Consolidation**
**Issue**: Templates share 80%+ identical code  
**Solution**: Use new `BaseTemplate` component  
**Files**: FineDining, WineBar, Trattoria templates  
**Estimated effort**: 3-4 hours

## **Severity: LOW - Optimization**

### 8. **Standardize Component Props**
**Issue**: Repeated prop interfaces across components  
**Solution**: Use shared types from `src/types/shared.ts`

### 9. **Performance Optimizations**
**Issue**: Unnecessary re-renders, missing React.memo  
**Solution**: Add memoization where appropriate

### 10. **Add Error Boundaries**
**Issue**: No error handling for component failures  
**Solution**: Wrap major sections with error boundaries

---

## ⏰ **Immediate Priority Queue**

**Today (Critical)**:
1. ✅ Fix BuilderSidebar syntax error
2. ✅ Complete macro-tab "Sito Web" integration  
3. ✅ Test macro-tab navigation works end-to-end

**This Week (High)**:
1. Migrate localStorage usage to centralized storage
2. Split BuilderSidebar into focused components
3. Apply CRUD patterns to Builder steps

**Next Week (Medium)**:
1. Consolidate templates with BaseTemplate
2. Standardize component props
3. Add error boundaries and loading states

---

## 🎯 **Success Metrics**

- **Build**: ✅ No compilation errors
- **Navigation**: ✅ All macro-tabs work correctly  
- **Code Quality**: Reduce 50% duplication
- **Performance**: Improve load times by 20%
- **Maintainability**: New features take 50% less time

---

## 🔧 **Quick Wins Available**

1. **Remove duplicate code**: Save ~2000 lines immediately
2. **Fix localStorage**: Prevent future data corruption issues  
3. **Standardize forms**: Reduce bug surface area by 60%
4. **Template consolidation**: Easier theme updates and new templates

**Total estimated effort**: 12-16 hours  
**Expected impact**: Massive improvement in code quality and maintainability