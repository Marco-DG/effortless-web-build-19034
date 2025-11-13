// Centralized localStorage management
import { BuilderData } from "@/types/builder";

const STORAGE_KEYS = {
  BUILDER_DATA: "builderData",
  USER_PREFERENCES: "userPreferences",
  TEMPLATE_CACHE: "templateCache"
} as const;

export const storage = {
  // Builder Data
  getBuilderData(): BuilderData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BUILDER_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error reading builder data:", error);
      return null;
    }
  },

  setBuilderData(data: BuilderData): boolean {
    try {
      localStorage.setItem(STORAGE_KEYS.BUILDER_DATA, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error saving builder data:", error);
      return false;
    }
  },

  clearBuilderData(): void {
    localStorage.removeItem(STORAGE_KEYS.BUILDER_DATA);
  },

  // User Preferences
  getUserPreferences(): Record<string, any> | null {
    try {
      const prefs = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return prefs ? JSON.parse(prefs) : null;
    } catch (error) {
      console.error("Error reading user preferences:", error);
      return null;
    }
  },

  setUserPreferences(prefs: Record<string, any>): boolean {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(prefs));
      return true;
    } catch (error) {
      console.error("Error saving user preferences:", error);
      return false;
    }
  },

  // Template Cache
  getTemplateCache(templateId: string): any | null {
    try {
      const cache = localStorage.getItem(`${STORAGE_KEYS.TEMPLATE_CACHE}_${templateId}`);
      return cache ? JSON.parse(cache) : null;
    } catch (error) {
      console.error("Error reading template cache:", error);
      return null;
    }
  },

  setTemplateCache(templateId: string, data: any): boolean {
    try {
      localStorage.setItem(`${STORAGE_KEYS.TEMPLATE_CACHE}_${templateId}`, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error saving template cache:", error);
      return false;
    }
  },

  // Generic helpers
  clear(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};

// Legacy compatibility - remove after migration
export const getBuilderData = storage.getBuilderData;
export const setBuilderData = storage.setBuilderData;