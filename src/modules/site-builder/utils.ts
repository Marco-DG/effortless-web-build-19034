/**
 * Site Builder Utilities
 * Shared utilities for site builder editors
 */

/**
 * Creates a nested updater function for updating project data
 * @param project - The current project object
 * @param onUpdate - The update function from the parent
 * @param section - The section name to update (e.g., 'business', 'story', etc.)
 * @returns Function that updates nested data in the specified section
 */
export const createNestedUpdater = (project: any, onUpdate: any, section: string) => {
  return (field: string, value: any) => {
    onUpdate({
      data: {
        ...project.data,
        [section]: {
          ...project.data?.[section],
          [field]: value
        }
      }
    });
  };
};

/**
 * Creates a standardized error message for missing template data
 */
export const createTemplateErrorMessage = (templateId: string, section: string) => {
  return `Template "${templateId}" is missing configuration for section "${section}"`;
};

/**
 * Safe getter for nested project data with fallback
 */
export const getProjectData = (project: any, section: string, field?: string) => {
  if (!project?.data?.[section]) return undefined;
  
  if (field) {
    return project.data[section][field];
  }
  
  return project.data[section];
};