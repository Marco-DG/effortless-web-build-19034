import React from 'react';
import { Check } from 'lucide-react';

interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
}

const PRESET_COLORS = [
    '#D4AF37', // Gold
    '#1A1A1A', // Black
    '#FFFFFF', // White
    '#F4F4F4', // Off-white
    '#0B0B0F', // Deep Dark
    '#E63946', // Red
    '#457B9D', // Blue
    '#2A9D8F', // Teal
    '#264653', // Dark Blue
    '#E9C46A', // Yellow
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => (
                    <button
                        key={color}
                        onClick={() => onChange(color)}
                        className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-transform hover:scale-110 ${value === color ? 'ring-2 ring-offset-2 ring-slate-400' : ''
                            }`}
                        style={{ backgroundColor: color }}
                        title={color}
                    >
                        {value === color && (
                            <Check className={`w-4 h-4 ${['#FFFFFF', '#F4F4F4', '#E9C46A'].includes(color) ? 'text-black' : 'text-white'}`} />
                        )}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-slate-200 overflow-hidden">
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full h-full p-0 border-0 cursor-pointer transform scale-150"
                    />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm font-mono uppercase focus:outline-none focus:border-[var(--theme-primary)]"
                />
            </div>
        </div>
    );
};
