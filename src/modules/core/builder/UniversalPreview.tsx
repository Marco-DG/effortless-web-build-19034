import React from 'react';
import { Engine } from './Engine';
import { useAppStore } from '../../../store/app-store';

export const UniversalPreview: React.FC = () => {
    const { activeProject } = useAppStore();

    if (!activeProject) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }

    return (
        <div className="w-full h-full overflow-y-auto bg-slate-100 p-8">
            <div className="max-w-[1400px] mx-auto bg-white shadow-2xl min-h-[800px] rounded-xl overflow-hidden ring-1 ring-slate-900/5">
                <Engine config={activeProject} />
            </div>
        </div>
    );
};
