import React from 'react';
import { PremiumLanding } from './PremiumLanding';
import { useAppStore } from '../store/app-store';

export const Hero: React.FC = () => {
  const { startBuilding, createProject } = useAppStore();

  const handleStartBuilding = (mode: 'logo' | 'menu' | 'site') => {
    createProject('Nuovo Progetto', 'wine-bar');
    startBuilding(mode);
  };

  return <PremiumLanding onStartBuilding={handleStartBuilding} />;
};