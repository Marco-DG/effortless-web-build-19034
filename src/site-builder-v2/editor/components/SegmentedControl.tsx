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
    // Find index of active option
    const activeIndex = options.findIndex(opt => opt.value === value);

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
                                flex-1 px-4 py-3 text-sm font-semibold transition-colors duration-200 relative z-10
                                ${isActive
                                    ? 'text-slate-900'
                                    : 'text-slate-500'
                                }
                            `}
                        >
                            {option.label}
                        </button>
                    );
                })}
                {/* Sliding indicator */}
                <div
                    className="absolute bottom-0 h-0.5 bg-slate-900 rounded-full"
                    style={{
                        left: `calc(${activeIndex * (100 / options.length)}% + 1rem)`,
                        width: `calc(${100 / options.length}% - 2rem)`,
                        transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                />
            </div>
        </div>
    );
};
