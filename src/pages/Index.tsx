
import React from 'react';
import { GameProvider, useGame } from '@/contexts/GameContext';
import StartScene from './StartScene';
import HomeScene from './HomeScene';
import BusScene from './BusScene';
import SchoolScene from './SchoolScene';
import AfterClassScene from './AfterClassScene';
import BackHomeScene from './BackHomeScene';
import EndScene from './EndScene';

const GameContent = () => {
  const { currentScene } = useGame();

  switch (currentScene) {
    case 'start':
      return <StartScene />;
    case 'home':
      return <HomeScene />;
    case 'bus':
      return <BusScene />;
    case 'school':
      return <SchoolScene />;
    case 'afterClass':
      return <AfterClassScene />;
    case 'backHome':
      return <BackHomeScene />;
    case 'end':
      return <EndScene />;
    default:
      return <StartScene />;
  }
};

const Index = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

export default Index;
