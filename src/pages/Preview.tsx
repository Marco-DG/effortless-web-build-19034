export default function Preview() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Preview</h1>
        <p className="text-muted-foreground">
          Funzionalità di preview in fase di aggiornamento per la v2
        </p>
        <a 
          href="/" 
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Torna al builder
        </a>
      </div>
    </div>
  );
}