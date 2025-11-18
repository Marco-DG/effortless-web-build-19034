import React from 'react';
import { useAppStore } from '../../../store/app-store';
import { AutoSidebar } from '../editor/AutoSidebar';
import { BusinessSettingsSchema } from './schema';

export const BusinessSettingsEditor: React.FC = () => {
    const { activeProject, updateProject } = useAppStore();

    if (!activeProject || !activeProject.business) return null;

    // Flatten data for the editor
    const flatData = {
        name: activeProject.business.name,
        tagline: activeProject.business.tagline,
        description: activeProject.business.description,
        'contact.email': activeProject.business.contact?.email,
        'contact.phone': activeProject.business.contact?.phone,
        'contact.address': activeProject.business.contact?.address,
        'social.instagram': activeProject.business.social?.instagram,
        'social.facebook': activeProject.business.social?.facebook,
        'hours.weekdays': activeProject.business.hours?.weekdays,
        'hours.weekends': activeProject.business.hours?.weekends,
    };

    const handleUpdate = (newData: any) => {
        // Unflatten data to update store
        const updatedBusiness = {
            ...activeProject.business,
            name: newData.name,
            tagline: newData.tagline,
            description: newData.description,
            contact: {
                ...activeProject.business?.contact,
                email: newData['contact.email'],
                phone: newData['contact.phone'],
                address: newData['contact.address'],
            },
            social: {
                ...activeProject.business?.social,
                instagram: newData['social.instagram'],
                facebook: newData['social.facebook'],
            },
            hours: {
                ...activeProject.business?.hours,
                weekdays: newData['hours.weekdays'],
                weekends: newData['hours.weekends'],
            }
        };

        updateProject({ business: updatedBusiness });
    };

    return (
        <AutoSidebar
            schema={BusinessSettingsSchema}
            data={flatData}
            onUpdate={handleUpdate}
        />
    );
};
