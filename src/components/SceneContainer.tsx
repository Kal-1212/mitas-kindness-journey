
import React, { ReactNode } from 'react';
import { Star } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

interface SceneContainerProps {
  title: string;
  background: string; // Tailwind background class
  children: ReactNode;
}

const SceneContainer: React.FC<SceneContainerProps> = ({ 
  title, 
  background, 
  children 
}) => {
  const { stars } = useGame();

  return (
    <div className={`min-h-screen flex flex-col ${background}`}>
      <header className="p-4 flex justify-between items-center bg-white/30 backdrop-blur-sm rounded-b-lg shadow-md">
        <h1 className="text-2xl font-bold text-kid-primary">{title}</h1>
        <div className="flex items-center gap-1">
          <Star className="h-6 w-6 text-yellow-400 animate-star-shine" />
          <span className="text-xl font-bold">{stars}</span>
        </div>
      </header>
      <main className="flex-1 flex flex-col p-4 overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default SceneContainer;
