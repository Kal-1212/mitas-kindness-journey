
import React, { useState } from 'react';
import SceneContainer from '@/components/SceneContainer';
import NavigationButton from '@/components/NavigationButton';
import CharacterDialog from '@/components/CharacterDialog';
import KindnessStar from '@/components/KindnessStar';
import { useGame } from '@/contexts/GameContext';

const HomeScene: React.FC = () => {
  const { markSceneCompleted } = useGame();
  const [gameState, setGameState] = useState<'intro' | 'game' | 'complete'>('intro');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showStar, setShowStar] = useState(false);

  const options = [
    { text: "ሰላም", translation: "Hello" },
    { text: "አመሰግናለሁ", translation: "Thank you" },
    { text: "ደህና ሁን", translation: "Goodbye" },
  ];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    
    if (option === "አመሰግናለሁ") { // Correct answer
      setTimeout(() => {
        setGameState('complete');
        setShowStar(true);
      }, 1000);
    } else {
      // Wrong answer - clear after a moment
      setTimeout(() => {
        setSelectedOption(null);
      }, 1500);
    }
  };

  const handleStarCollected = () => {
    markSceneCompleted('home');
  };

  return (
    <SceneContainer 
      title="Morning at Home" 
      background="bg-gradient-to-b from-kid-green to-kid-blue"
    >
      <div className="flex flex-col h-full">
        {gameState === 'intro' && (
          <div className="flex-1 flex flex-col justify-center">
            <CharacterDialog 
              character="Narrator" 
              message="Mita is getting ready for school. Her mother has prepared a delicious breakfast for her."
            />
            <CharacterDialog 
              character="Mother" 
              message="Have a good day at school, Mita!" 
            />
            <CharacterDialog 
              character="Mita" 
              message="I want to thank my mother before I leave."
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
          <div className="flex-1 flex flex-col justify-center items-center">
            <CharacterDialog 
              character="Narrator" 
              message="Help Mita say 'Thank you' to her mother in Amharic. Choose the correct phrase:" 
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
              {options.map((option) => (
                <button
                  key={option.text}
                  onClick={() => handleOptionClick(option.text)}
                  className={`
                    p-4 rounded-xl text-center text-xl transition-all duration-300
                    ${selectedOption === option.text 
                      ? option.text === "አመሰግናለሁ"
                        ? "bg-green-100 border-2 border-green-500 text-green-700"
                        : "bg-red-100 border-2 border-red-500 text-red-700"
                      : "bg-white hover:bg-kid-purple/20 border-2 border-kid-purple/30"}
                  `}
                >
                  <div className="text-2xl font-bold">{option.text}</div>
                  <div className="text-sm text-gray-600 mt-1">{option.translation}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'complete' && (
          <div className="flex-1 flex flex-col justify-center">
            <CharacterDialog 
              character="Mita" 
              message="Thank you for breakfast, Mother!" 
              amharicMessage="አመሰግናለሁ"
              position="right"
            />
            <CharacterDialog 
              character="Mother" 
              message="You're welcome, Mita. Have a good day at school!" 
            />
            <CharacterDialog 
              character="Narrator" 
              message="Great job! Mita thanked her mother with good manners. It's important to show gratitude in Ethiopian culture." 
            />

            {showStar && (
              <div className="flex justify-center my-8">
                <KindnessStar onCollect={handleStarCollected} />
              </div>
            )}

            <div className="flex justify-center mt-4">
              <NavigationButton to="bus">
                Continue to the Bus
              </NavigationButton>
            </div>
          </div>
        )}
      </div>
    </SceneContainer>
  );
};

export default HomeScene;
