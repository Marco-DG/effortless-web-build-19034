import React from 'react';
import { useAppStore } from '../../../store/app-store';
import { AutoSidebar } from '../editor/AutoSidebar';
import { ThemeSettingsSchema } from './schema';

export const ThemeEditor: React.FC = () => {
    const { activeProject, updateProject } = useAppStore();

    if (!activeProject) return null;

    // Flatten data for the editor
    const flatData = {
        'fonts.heading': activeProject.theme.fonts.heading,
        'fonts.body': activeProject.theme.fonts.body,
        'colors.primary': activeProject.theme.colors.primary,
        'colors.secondary': activeProject.theme.colors.secondary,
        'colors.accent': activeProject.theme.colors.accent,
        'colors.background': activeProject.theme.colors.background,
        'colors.text': activeProject.theme.colors.text,
        borderRadius: activeProject.theme.borderRadius
    };

    const handleUpdate = (newData: any) => {
        // Unflatten data to update store
        const updatedTheme = {
            ...activeProject.theme,
            fonts: {
                heading: newData['fonts.heading'],
                body: newData['fonts.body']
            },
            colors: {
                primary: newData['colors.primary'],
                secondary: newData['colors.secondary'],
                accent: newData['colors.accent'],
                background: newData['colors.background'],
                text: newData['colors.text']
            },
            borderRadius: newData.borderRadius
        };

        updateProject({ theme: updatedTheme });
    };

    return (
        <AutoSidebar
            schema={ThemeSettingsSchema}
            data={flatData}
            onUpdate={handleUpdate}
        />
    );
};
