
import React from 'react';
import { useGame, Scene } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';

interface NavigationButtonProps {
  to: Scene;
  disabled?: boolean;
  children: React.ReactNode;
  primary?: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  to,
  disabled = false,
  children,
  primary = true,
}) => {
  const { setCurrentScene } = useGame();

  const handleClick = () => {
    setCurrentScene(to);
    window.scrollTo(0, 0);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      className={`rounded-full px-6 py-3 text-base ${
        primary 
          ? 'bg-kid-primary hover:bg-kid-primary/80 text-white' 
          : 'bg-kid-blue hover:bg-kid-blue/80 text-gray-800'
      } transition-all duration-300 transform hover:scale-105 font-medium`}
    >
      {children}
    </Button>
  );
};

export default NavigationButton;
