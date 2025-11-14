import { useCallback } from 'react';

interface SectionUpdaterProps {
  project: any;
  onUpdate: (updates: any) => void;
}

export const useSectionUpdater = ({ project, onUpdate }: SectionUpdaterProps) => {
  const updateSection = useCallback((
    sectionType: string,
    updates: any,
    sectionId?: string,
    order?: number
  ) => {
    const sections = project.data.site?.sections || [];
    const existingSection = sections.find((s: any) => s.type === sectionType);
    
    if (existingSection) {
      existingSection.data = { ...existingSection.data, ...updates };
    } else {
      sections.push({
        id: sectionId || `${sectionType}_main`,
        type: sectionType,
        enabled: true,
        order: order || sections.length,
        data: updates
      });
    }
    
    onUpdate({ site: { ...project.data.site, sections } });
  }, [project, onUpdate]);

  const createSectionUpdater = useCallback((
    sectionType: string, 
    sectionId?: string, 
    order?: number
  ) => {
    return (updates: any) => updateSection(sectionType, updates, sectionId, order);
  }, [updateSection]);

  return { updateSection, createSectionUpdater };
};