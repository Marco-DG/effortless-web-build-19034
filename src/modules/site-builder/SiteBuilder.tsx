import React, { useState } from 'react';
import { useAppStore } from '../../store/app-store';
import { SimpleSiteBuilder } from './SimpleSiteBuilder';
import { LogoBuilderRedesigned } from '../logo-builder/LogoBuilderRedesigned';
import { MenuBuilder } from '../menu-builder/MenuBuilder';

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
        return <MenuBuilder onSwitchBuilder={handleMacroTabChange} />;
      case 'site':
      default:
        return <SimpleSiteBuilder onSwitchBuilder={handleMacroTabChange} />;
    }
  };

  return (
    <div className="h-full w-full lg:w-auto">
      {/* Contenuto diretto - ogni Builder ha il suo header unificato */}
      {renderContent()}
    </div>
  );
};