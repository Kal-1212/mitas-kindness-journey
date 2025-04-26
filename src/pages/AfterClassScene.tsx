
import React, { useState } from 'react';
import SceneContainer from '@/components/SceneContainer';
import NavigationButton from '@/components/NavigationButton';
import CharacterDialog from '@/components/CharacterDialog';
import KindnessStar from '@/components/KindnessStar';
import { useGame } from '@/contexts/GameContext';

const AfterClassScene: React.FC = () => {
  const { markSceneCompleted } = useGame();
  const [gameState, setGameState] = useState<'intro' | 'game' | 'complete'>('intro');
  const [selectedBag, setSelectedBag] = useState<string | null>(null);
  const [showStar, setShowStar] = useState(false);

  const bags = [
    { id: 'small', name: 'Small Bag', size: 'Small and light', correct: false },
    { id: 'medium', name: 'Shopping Bag', size: 'Medium and manageable', correct: false },
    { id: 'large', name: 'Heavy Groceries', size: 'Large and heavy', correct: true },
  ];

  const handleBagSelect = (bagId: string) => {
    setSelectedBag(bagId);
    const selectedBagItem = bags.find(bag => bag.id === bagId);
    
    if (selectedBagItem?.correct) {
      setTimeout(() => {
        setGameState('complete');
        setShowStar(true);
      }, 1000);
    } else {
      // Wrong bag - reset after a moment
      setTimeout(() => {
        setSelectedBag(null);
      }, 1500);
    }
  };

  const handleStarCollected = () => {
    markSceneCompleted('afterClass');
  };

  return (
    <SceneContainer 
      title="After Class" 
      background="bg-gradient-to-b from-kid-peach to-kid-pink"
    >
      <div className="flex flex-col h-full">
        {gameState === 'intro' && (
          <div className="flex-1 flex flex-col justify-center">
            <CharacterDialog 
              character="Narrator" 
              message="School is over and Mita is walking home. She sees her neighbor Mrs. Abebe carrying several bags from the market."
            />
            
            <CharacterDialog 
              character="Mita" 
              message="Mrs. Abebe looks like she needs help carrying her bags. I should offer to help her."
              position="right"
            />
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={() => setGameState('game')}
                className="bg-kid-primary hover:bg-kid-primary/80 text-white rounded-full px-6 py-3"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {gameState === 'game' && (
          <div className="flex-1 flex flex-col justify-center">
            <CharacterDialog 
              character="Narrator" 
              message="Which bag should Mita offer to carry for her neighbor? Choose the one that would be most helpful."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mx-auto max-w-2xl">
              {bags.map((bag) => (
                <button
                  key={bag.id}
                  onClick={() => handleBagSelect(bag.id)}
                  className={`
                    p-6 rounded-xl flex flex-col items-center transition-all duration-300
                    ${selectedBag === bag.id 
                      ? bag.correct
                        ? "bg-green-100 border-2 border-green-500"
                        : "bg-red-100 border-2 border-red-500"
                      : "bg-white hover:bg-kid-blue/30 border-2 border-kid-blue/50"}
                  `}
                >
                  <div className={`
                    w-16 h-16 mb-3 rounded-md flex items-center justify-center
                    ${bag.id === 'small' ? 'bg-kid-yellow' : 
                      bag.id === 'medium' ? 'bg-kid-blue' : 'bg-kid-purple'}
                  `}>
                    <div className="text-2xl">
                      {bag.id === 'small' ? '👜' : 
                       bag.id === 'medium' ? '🛍️' : '🧺'}
                    </div>
                  </div>
                  <div className="text-lg font-semibold">{bag.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{bag.size}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'complete' && (
          <div className="flex-1 flex flex-col justify-center">
            <CharacterDialog 
              character="Mita" 
              message="Mrs. Abebe, let me help you with that heavy bag." 
              position="right"
            />
            
            <CharacterDialog 
              character="Mrs. Abebe" 
              message="Thank you, Mita! You are such a considerate child." 
            />
            
            <CharacterDialog 
              character="Narrator" 
              message="Well done! Mita showed kindness by helping her neighbor with the heaviest bag. In Ethiopian communities, helping neighbors is an important value." 
            />

            {showStar && (
              <div className="flex justify-center my-8">
                <KindnessStar onCollect={handleStarCollected} />
              </div>
            )}

            <div className="flex justify-center mt-4">
              <NavigationButton to="backHome">
                Continue to Back Home
              </NavigationButton>
            </div>
          </div>
        )}
      </div>
    </SceneContainer>
  );
};

export default AfterClassScene;
