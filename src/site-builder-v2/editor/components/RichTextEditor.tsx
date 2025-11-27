import React, { useRef } from 'react';
import { Bold, Italic, List, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertFormat = (startTag: string, endTag: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);

        const newText = text.substring(0, start) + startTag + selectedText + endTag + text.substring(end);
        onChange(newText);

        // Restore selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + startTag.length, end + startTag.length);
        }, 0);
    };

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[var(--theme-primary)]/20 focus-within:border-[var(--theme-primary)] transition-all">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50/50">
                <button
                    onClick={() => insertFormat('**', '**')}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-md transition-colors"
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    onClick={() => insertFormat('*', '*')}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-md transition-colors"
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-200 mx-1" />
                <button
                    onClick={() => insertFormat('- ')}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-md transition-colors"
                    title="List"
                >
                    <List className="w-4 h-4" />
                </button>
            </div>

            {/* Editor Area */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full p-3 min-h-[120px] text-sm resize-y focus:outline-none bg-transparent font-sans"
            />

            <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
                <span>Markdown supported</span>
                <span>{value.length} chars</span>
            </div>
        </div>
    );
};
