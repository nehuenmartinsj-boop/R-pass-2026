
import React from 'react';
import { AppView } from '../types';
import { MATERIAL_ICONS } from '../constants';

interface NavigationProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const items = [
    { view: AppView.HOME, label: 'Inicio', icon: MATERIAL_ICONS.HOME },
    { view: AppView.METAR, label: 'METAR', icon: MATERIAL_ICONS.METAR },
    { view: AppView.PROGRESS, label: 'Progreso', icon: MATERIAL_ICONS.PROGRESS },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass pt-2 pb-8 px-6 flex justify-around items-center z-50 max-w-lg mx-auto border-t border-white/10 backdrop-blur-2xl">
      {items.map((item) => (
        <button
          key={item.view}
          onClick={() => onViewChange(item.view)}
          className={`flex flex-col items-center gap-1 transition-all ${
            currentView === item.view ? 'text-primary scale-110' : 'text-slate-400'
          }`}
        >
          <span className={`material-symbols-outlined ${currentView === item.view ? 'fill-1' : ''}`}>
            {item.icon}
          </span>
          <span className="text-[10px] font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
