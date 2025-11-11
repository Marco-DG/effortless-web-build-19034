import React from 'react';
import { useAppStore } from '../../store/app-store';
import { LogoPreview } from './LogoPreview';
import { LogoControls } from './LogoControls';
import { SidebarLayout } from '../../ui/Layout';
import { Button } from '../../ui/Button';
import { X, Download, Save } from 'lucide-react';

export const LogoBuilder: React.FC = () => {
  const { activeProject, updateProject, closeSidebar } = useAppStore();
  
  if (!activeProject) return null;

  const logoConfig = activeProject.data.logo;

  const handleUpdateLogo = (updates: any) => {
    updateProject({
      logo: { ...logoConfig, ...updates }
    });
  };

  const handleExport = () => {
    // TODO: Implementare export del logo
    console.log('Export logo:', logoConfig);
  };

  const header = (
    <div className="flex items-center justify-between p-4">
      <div>
        <h2 className="text-lg font-semibold">Logo Builder</h2>
        <p className="text-sm text-muted-foreground">
          Crea il logo per {activeProject.data.business.name}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          leftIcon={<Save className="w-4 h-4" />}
          onClick={() => console.log('Save logo')}
        >
          Salva
        </Button>
        <Button
          size="sm"
          variant="outline"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExport}
        >
          Export
        </Button>
        <Button
          size="sm"
          variant="ghost"
          leftIcon={<X className="w-4 h-4" />}
          onClick={closeSidebar}
          className="lg:hidden"
        >
          Chiudi
        </Button>
      </div>
    </div>
  );

  const navigation = (
    <div className="p-2 space-y-1">
      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
        <span className="text-primary font-semibold text-sm">L</span>
      </div>
    </div>
  );

  const content = (
    <div className="p-6">
      <LogoControls 
        config={logoConfig}
        businessName={activeProject.data.business.name}
        onUpdate={handleUpdateLogo}
      />
    </div>
  );

  return (
    <SidebarLayout
      header={header}
      navigation={navigation}
      content={content}
    />
  );
};