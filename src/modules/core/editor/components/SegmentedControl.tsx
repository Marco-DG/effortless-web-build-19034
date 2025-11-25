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
            <div className="flex relative">
                {options.map((option) => {
                    const isActive = value === option.value;
                    return (
                        <button
                            key={option.value}
                            onClick={() => onChange(option.value)}
                            className={`
                                flex-1 px-4 py-3 text-sm font-semibold transition-colors duration-200 relative
                                ${isActive
                                    ? 'text-slate-900'
                                    : 'text-slate-500'
                                }
                            `}
                        >
                            {option.label}
                            {isActive && (
                                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ease-out" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
