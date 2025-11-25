import React from 'react';

interface SegmentedControlOption {
    value: string;
    label: string;
}

interface SegmentedControlProps {
    options: SegmentedControlOption[];
    value: string;
    onChange: (value: string) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, value, onChange }) => {
    return (
        <div className="w-full border-b border-slate-200/60">
            <div className="flex">
                {options.map((option) => {
                    const isActive = value === option.value;
                    return (
                        <button
                            key={option.value}
                            onClick={() => onChange(option.value)}
                            className={`
                                flex-1 px-4 py-3 text-sm font-semibold transition-all duration-200 relative
                                ${isActive
                                    ? 'text-slate-900'
                                    : 'text-slate-500 hover:text-slate-700'
                                }
                            `}
                        >
                            {option.label}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
