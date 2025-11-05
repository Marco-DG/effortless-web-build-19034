import * as React from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Sparkles, TerminalSquare, Link2, Bot } from "lucide-react";

export interface AICommandPaletteProps {
  onOpenChange?: (open: boolean) => void;
}

export function AICommandPalette({ onOpenChange }: AICommandPaletteProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => { onOpenChange?.(open); }, [open]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Chiedi all'AI o cerca un'azione…" />
      <CommandList>
        <CommandEmpty>Nessun risultato.</CommandEmpty>
        <CommandGroup heading="Azioni rapide">
          <CommandItem onSelect={() => {/* scaffold future */}}>
            <Sparkles className="mr-2 h-4 w-4" /> Suggerisci miglioramenti
          </CommandItem>
          <CommandItem onSelect={() => {/* scaffold future */}}>
            <TerminalSquare className="mr-2 h-4 w-4" /> Genera sezione
          </CommandItem>
          <CommandItem onSelect={() => {/* scaffold future */}}>
            <Link2 className="mr-2 h-4 w-4" /> Crea CTA e link
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Prossimamente">
          <CommandItem disabled>
            <Bot className="mr-2 h-4 w-4" /> Chat progettazione (presto)
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
