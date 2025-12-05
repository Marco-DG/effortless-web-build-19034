import React from 'react';
import { type BuilderSection } from '../../types/sidebar';
import { SidebarItem } from '../../builder/SidebarItem';

interface SidebarNavigationProps {
    categories: { id: string; label: string; sections: readonly BuilderSection[] }[];
    activeSection: string;
    onSectionChange: (sectionId: string) => void;
    isExpanded: boolean;
    renderCategory?: (categoryId: string, isExpanded: boolean) => React.ReactNode;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
    categories,
    activeSection,
    onSectionChange,
    isExpanded,
    renderCategory
}) => {
    return (
        <div className="flex flex-col gap-2">
            {categories.map((category) => (
                <React.Fragment key={category.id}>
                    {/* Sezioni della categoria */}
                    {renderCategory && renderCategory(category.id, isExpanded) ? (
                        renderCategory(category.id, isExpanded)
                    ) : (
                        category.sections.map((section) => {
                            const isActive = activeSection === section.id;
                            return (
                                <SidebarItem
                                    key={section.id}
                                    icon={section.icon}
                                    label={section.label}
                                    isActive={isActive}
                                    isExpanded={isExpanded}
                                    onClick={() => onSectionChange(section.id)}
                                />
                            );
                        })
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};
