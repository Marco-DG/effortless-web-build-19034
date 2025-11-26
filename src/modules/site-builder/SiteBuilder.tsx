import React, { useState } from 'react';
import { useAppStore } from '../../store/app-store';
import { UniversalBuilder } from '../core/builder/UniversalBuilder';
import { LogoBuilderRedesigned } from '../logo-builder/LogoBuilderRedesigned';
import { MenuBuilderRedesigned } from '../menu-builder/MenuBuilderRedesigned';

export const SiteBuilder: React.FC = () => {
  const { activeProject, setActiveMode } = useAppStore();
  const [macroTab, setMacroTab] = useState<'logo' | 'menu' | 'site'>('site');
  
  if (!activeProject) return null;

  const handleMacroTabChange = (tab: 'logo' | 'menu' | 'site') => {
    setMacroTab(tab);
    setActiveMode(tab);
  };

  const renderContent = () => {
    switch (macroTab) {
      case 'logo':
        return <LogoBuilderRedesigned onSwitchBuilder={handleMacroTabChange} />;
      case 'menu':
        return <MenuBuilderRedesigned onSwitchBuilder={handleMacroTabChange} />;
      case 'site':
      default:
        return <UniversalBuilder />;
    }
  };

  return (
    <div className="h-full w-full lg:w-auto">
      {/* Contenuto diretto - ogni Builder ha il suo header unificato */}
      {renderContent()}
    </div>
  );
};