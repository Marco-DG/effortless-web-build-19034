import React from 'react';
import { ChevronDown } from 'lucide-react';

// --- Wrapper ---

export const CleanFormField: React.FC<{ label: string; description?: string; children: React.ReactNode }> = ({
    label,
    description,
    children
}) => (
    <div className="space-y-2">
        <div className="flex justify-between items-baseline">
            <label className="text-sm font-medium text-slate-700">{label}</label>
        </div>
        {children}
        {description && <p className="text-xs text-slate-400 leading-relaxed">{description}</p>}
    </div>
);

export const CleanSectionHeader: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="mb-6 pb-6 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
    </div>
);

// --- Inputs ---

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    multiline?: boolean;
    rows?: number;
}

export const CleanTextInput: React.FC<InputProps> = ({ multiline, className = '', ...props }) => {
    const baseClass = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200";

    if (multiline) {
        return (
            <textarea
                className={`${baseClass} resize-none ${className}`}
                {...props as any}
            />
        );
    }
    return <input className={`${baseClass} ${className}`} {...props} />;
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { label: string; value: string }[];
}

export const CleanSelect: React.FC<SelectProps> = ({ options, className = '', ...props }) => (
    <div className="relative">
        <select
            className={`w-full appearance-none px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all duration-200 ${className}`}
            {...props}
        >
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
);

export const CleanToggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-blue-600' : 'bg-slate-200'
            }`}
    >
        <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'
                }`}
        />
    </button>
);
