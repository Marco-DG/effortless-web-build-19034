import { useState } from "react";
import { BuilderData, TemplateType } from "@/types/builder";
import { getDefaultData } from "@/lib/defaultData";

export const useBuilderState = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | undefined>();
  const [builderData, setBuilderData] = useState<BuilderData | null>(null);

  const startBuilding = () => {
    setIsSidebarOpen(true);
    if (!builderData) {
      const defaultData = getDefaultData("wine-bar");
      setBuilderData(defaultData);
    }
  };

  const selectTemplate = (template: TemplateType) => {
    setBuilderData((prev) => {
      if (!prev) return getDefaultData(template);
      // Keep existing data; only switch template field
      return { ...prev, template } as any;
    });
    setIsSidebarOpen(true);
  };

  const updateData = (data: Partial<BuilderData>) => {
    if (builderData) {
      setBuilderData((prev) => (prev ? { ...prev, ...data } : null));
    }
  };

  const changeSection = (section: string) => {
    setActiveSection(section);
    setTimeout(() => setActiveSection(undefined), 2000);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openPreview = () => {
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const previewData: BuilderData = builderData || getDefaultData("wine-bar");

  return {
    // State values
    isSidebarOpen,
    isPreviewOpen,
    activeSection,
    builderData,
    previewData,
    // Actions
    actions: {
      startBuilding,
      selectTemplate,
      updateData,
      changeSection,
      closeSidebar,
      openPreview,
      closePreview,
    },
  };
};
