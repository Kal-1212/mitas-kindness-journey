
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define our scene and game state types
export type Scene = 'start' | 'home' | 'bus' | 'school' | 'afterClass' | 'backHome' | 'end';

interface GameState {
  currentScene: Scene;
  stars: number;
  completedScenes: Scene[];
  setCurrentScene: (scene: Scene) => void;
  addStar: () => void;
  markSceneCompleted: (scene: Scene) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScene, setCurrentScene] = useState<Scene>('start');
  const [stars, setStars] = useState(0);
  const [completedScenes, setCompletedScenes] = useState<Scene[]>([]);

  const addStar = () => {
    setStars((prevStars) => prevStars + 1);
  };

  const markSceneCompleted = (scene: Scene) => {
    if (!completedScenes.includes(scene)) {
      setCompletedScenes((prev) => [...prev, scene]);
    }
  };

  const resetGame = () => {
    setCurrentScene('start');
    setStars(0);
    setCompletedScenes([]);
  };

  return (
    <GameContext.Provider
      value={{
        currentScene,
        stars,
        completedScenes,
        setCurrentScene,
        addStar,
        markSceneCompleted,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameState => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
