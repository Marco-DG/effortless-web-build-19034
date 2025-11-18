import React from 'react';
import { Engine } from './Engine';
import { useAppStore } from '../../../store/app-store';

export const UniversalPreview: React.FC = () => {
    const { activeProject } = useAppStore();

    if (!activeProject) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }

    return (
        <div className="w-full h-full overflow-y-auto bg-slate-100">
            <div className="w-full min-h-full bg-white shadow-2xl overflow-hidden transform-gpu">
                <Engine config={activeProject} />
            </div>
        </div>
    );
};
