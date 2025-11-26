import React from 'react';

// TEMPORARY BRIDGE COMPONENT
// TODO: Remove after migration to Clean components is complete
interface PremiumColorPickerProps {
  label?: string;
  description?: string;
  value: string;
  onChange: (color: string) => void;
  presetColors?: string[];
}

export const PremiumColorPicker: React.FC<PremiumColorPickerProps> = ({ 
  label,
  description,
  value, 
  onChange,
  presetColors = [
    '#000000', '#1f2937', '#374151', '#6b7280', '#9ca3af',
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6',
    '#8b5cf6', '#ec4899', '#ffffff', '#f8fafc', '#e2e8f0'
  ]
}) => {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>}
      {description && <p className="text-sm text-slate-500 mb-2">{description}</p>}
      
      <div className="space-y-3">
        {/* Input di testo per colore personalizzato */}
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 border border-slate-200 rounded cursor-pointer"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#000000"
            className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
          />
        </div>
        
        {/* Palette colori predefiniti */}
        <div className="grid grid-cols-5 gap-2">
          {presetColors.map((color) => (
            <button
              key={color}
              onClick={() => onChange(color)}
              className={`w-8 h-8 rounded border-2 transition-all ${
                value === color 
                  ? 'border-blue-500 ring-2 ring-blue-500/20' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};