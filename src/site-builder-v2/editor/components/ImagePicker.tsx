import React, { useState } from 'react';
import { Image as ImageIcon, Link, Upload, Search, Check } from 'lucide-react';

interface ImagePickerProps {
    value: string;
    onChange: (value: string) => void;
}

const CURATED_IMAGES = [
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=200', label: 'Restaurant Interior' },
    { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=200', label: 'Bar Atmosphere' },

    { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=200', label: 'Fresh Ingredients' },
    { url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=200', label: 'Salad' },
    { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=200', label: 'Pizza' },
    { url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=200', label: 'Sandwich' },
    { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=200', label: 'Fine Dining' },
    { url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=200', label: 'Chef' },
];

export const ImagePicker: React.FC<ImagePickerProps> = ({ value, onChange }) => {
    const [activeTab, setActiveTab] = useState<'gallery' | 'link'>('gallery');
    const [customUrl, setCustomUrl] = useState(value);

    const handleCustomUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomUrl(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="space-y-4">
            {/* Preview */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200 group">
                {value ? (
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                        <ImageIcon className="w-8 h-8" />
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-lg">
                <button
                    onClick={() => setActiveTab('gallery')}
                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'gallery' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    <Search className="w-3.5 h-3.5" /> Gallery
                </button>
                <button
                    onClick={() => setActiveTab('link')}
                    className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'link' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    <Link className="w-3.5 h-3.5" /> URL
                </button>
            </div>

            {/* Content */}
            {activeTab === 'gallery' ? (
                <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
                    {CURATED_IMAGES.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => onChange(img.url)}
                            className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${value === img.url ? 'border-[var(--theme-primary)] ring-2 ring-[var(--theme-primary)]/20' : 'border-transparent hover:border-slate-300'
                                }`}
                            title={img.label}
                        >
                            <img
                                src={img.url}
                                alt={img.label}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            {value === img.url && (
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="space-y-2">
                    <input
                        type="text"
                        value={customUrl}
                        onChange={handleCustomUrlChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:border-[var(--theme-primary)]"
                    />
                    <p className="text-xs text-slate-400">Paste a direct link to an image.</p>
                </div>
            )}
        </div>
    );
};
