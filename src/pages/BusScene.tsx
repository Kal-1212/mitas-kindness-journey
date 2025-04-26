import React, { useState } from 'react';
import { Bus } from 'lucide-react';
import SceneContainer from '@/components/SceneContainer';
import NavigationButton from '@/components/NavigationButton';
import CharacterDialog from '@/components/CharacterDialog';
import KindnessStar from '@/components/KindnessStar';
import { useGame } from '@/contexts/GameContext';
import Button from '@/components/Button';

const BusScene: React.FC = () => {
  const { markSceneCompleted } = useGame();
  const [gameState, setGameState] = useState<'intro' | 'game' | 'complete'>('intro');
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [showStar, setShowStar] = useState(false);

  const handleSeatClick = (seatIndex: number) => {
    setSelectedSeat(seatIndex);
    if (seatIndex === 4) { // Middle seat is the correct one
      setTimeout(() => {
        setGameState('complete');
        setShowStar(true);
      }, 1000);
    } else {
      // Wrong seat - reset after a moment
      setTimeout(() => {
        setSelectedSeat(null);
      }, 1500);
    }
  };

  const handleStarCollected = () => {
    markSceneCompleted('bus');
  };

  return (
    <SceneContainer 
      title="On the Bus" 
      background="bg-gradient-to-b from-kid-blue to-kid-purple"
    >
      <div className="flex flex-col h-full">
        {gameState === 'intro' && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-center mb-8">
              <Bus className="w-20 h-20 text-kid-primary" />
            </div>
            
            <CharacterDialog 
              character="Narrator" 
              message="Mita is on the crowded bus to school. An elderly woman gets on the bus and has nowhere to sit."
            />
            
            <CharacterDialog 
              character="Mita" 
              message="I should offer my seat to the grandmother."
              position="right"
            />
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={() => setGameState('game')}
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
              message="Which seat should Mita offer to the elderly woman? Tap on a seat to help Mita make the right choice."
            />
            
            <div className="relative bg-kid-blue/70 rounded-xl p-6 mt-6 mx-auto w-full max-w-md">
              <h3 className="text-center font-bold text-xl mb-6">Bus Seats</h3>
              
              <div className="grid grid-cols-3 gap-4">
                {[...Array(9)].map((_, index) => (
                  <div
                    key={index}
                    onClick={() => handleSeatClick(index)}
                    className={`
                      aspect-square rounded-lg flex items-center justify-center cursor-pointer
                      transition-all duration-300
                      ${selectedSeat === index 
                        ? index === 4 
                          ? "bg-green-200 border-2 border-green-500" 
                          : "bg-red-200 border-2 border-red-500"
                        : "bg-white hover:bg-kid-yellow border border-gray-300"}
                      ${index === 4 ? "relative" : ""}
                    `}
                  >
                    {index === 4 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-xs text-center">
                          <div>Mita's</div>
                          <div>Seat</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {gameState === 'complete' && (
          <div className="flex-1 flex flex-col justify-center">
            <CharacterDialog 
              character="Mita" 
              message="Please take my seat, grandmother." 
              position="right"
            />
            
            <CharacterDialog 
              character="Elderly Woman" 
              message="Thank you, child. You are very kind." 
            />
            
            <CharacterDialog 
              character="Narrator" 
              message="Wonderful! In Ethiopian culture, showing respect to elders is very important. Mita demonstrated good manners by offering her seat." 
            />

            {showStar && (
              <div className="flex justify-center my-8">
                <KindnessStar onCollect={handleStarCollected} />
              </div>
            )}

            <div className="flex justify-center mt-4">
              <NavigationButton to="school">
                Continue to School
              </NavigationButton>
            </div>
          </div>
        )}
      </div>
    </SceneContainer>
  );
};

export default BusScene;
