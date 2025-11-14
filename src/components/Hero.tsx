import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PremiumLanding } from './PremiumLanding';
import { useAppStore } from '../store/app-store';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { startBuilding, createProject } = useAppStore();

  const handleStartBuilding = (mode: 'logo' | 'menu' | 'site') => {
    createProject('Nuovo Progetto', 'wine-bar');
    startBuilding(mode);
    
    // Naviga alla pagina builders
    navigate('/builders');
  };

  return <PremiumLanding onStartBuilding={handleStartBuilding} />;
};