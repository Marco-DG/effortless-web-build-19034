import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Trash2, Upload } from "lucide-react";

export interface ImageUploaderProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  accept?: string; // e.g. "image/*"
  helpText?: string;
  urlHelpText?: string;
  previewSize?: number; // square px
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label = "Immagine",
  value,
  onChange,
  onRemove,
  accept = "image/*",
  helpText = "PNG, JPG o SVG",
  urlHelpText = "oppure incolla un URL immagine",
  previewSize = 64,
  className = "",
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const handleFile = async (file: File) => {
    const r = new FileReader();
    r.onload = () => onChange(r.result as string);
    r.readAsDataURL(file);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && <div className="text-sm font-medium text-foreground">{label}</div>}
      <div
        className={`rounded-md border ${dragOver ? "border-primary bg-primary/5" : "border-border bg-white"} p-4 transition-colors cursor-pointer`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        role="button"
        tabIndex={0}
        onClick={() => fileInputRef.current?.click()}
      >
        {value ? (
          <div className="flex items-center gap-4">
            <img src={value} alt="Anteprima" style={{ width: previewSize, height: previewSize }} className="rounded object-cover" />
            <div className="flex-1">
              <p className="text-sm font-medium">Immagine selezionata</p>
              <p className="text-xs text-muted-foreground">{helpText}</p>
            </div>
            {onRemove && (
              <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={(e)=>{ e.stopPropagation(); onRemove(); }}>
                <Trash2 className="w-4 h-4 mr-2" /> Rimuovi
              </Button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="w-12 h-12 rounded-md bg-muted/40 flex items-center justify-center">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm">Trascina qui l'immagine oppure clicca per selezionare un file</p>
              <p className="text-xs">{helpText}</p>
            </div>
            <Button size="sm" variant="secondary" onClick={(e)=>{ e.stopPropagation(); fileInputRef.current?.click(); }}>
              <Upload className="w-4 h-4 mr-2" /> Scegli file
            </Button>
          </div>
        )}
      </div>

      <div className="rounded-md border border-border bg-white p-3">
        <label className="text-sm text-muted-foreground block mb-1">{urlHelpText}</label>
        <div className="flex items-center gap-2">
          <Input type="url" placeholder="https://..." value={value || ''} onChange={(e)=> onChange(e.target.value)} />
          <Button variant="secondary" size="sm" onClick={()=> onChange((value || '').trim())}>Usa</Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          handleFile(file);
        }}
      />
    </div>
  );
};

export default ImageUploader;
