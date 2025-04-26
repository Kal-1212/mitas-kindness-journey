import React, { useState } from 'react';
import { School } from 'lucide-react';
import SceneContainer from '@/components/SceneContainer';
import NavigationButton from '@/components/NavigationButton';
import CharacterDialog from '@/components/CharacterDialog';
import KindnessStar from '@/components/KindnessStar';
import { useGame } from '@/contexts/GameContext';
import Button from '@/components/Button';

const SchoolScene: React.FC = () => {
  const { markSceneCompleted } = useGame();
  const [gameState, setGameState] = useState<'intro' | 'game' | 'complete'>('intro');
  const [draggedBooks, setDraggedBooks] = useState(0);
  const [showStar, setShowStar] = useState(false);
  
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', 'book');
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.getData('text/plain') === 'book') {
      setDraggedBooks(prev => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          setTimeout(() => {
            setGameState('complete');
            setShowStar(true);
          }, 800);
        }
        return newCount;
      });
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleStarCollected = () => {
    markSceneCompleted('school');
  };

  return (
    <SceneContainer 
      title="At the School Gate" 
      background="bg-gradient-to-b from-kid-yellow to-kid-green"
    >
      <div className="flex flex-col h-full">
        {gameState === 'intro' && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-center mb-8">
              <School className="w-20 h-20 text-kid-primary" />
            </div>
            
            <CharacterDialog 
              character="Narrator" 
              message="Mita has arrived at school. She sees her teacher struggling with a pile of heavy books at the school gate."
            />
            
            <CharacterDialog 
              character="Mita" 
              message="I should help my teacher carry those books."
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
              message="Help Mita carry the books! Drag and drop the books from the teacher to Mita."
            />
            
            <div className="flex justify-between items-center mt-8 mx-auto w-full max-w-md">
              <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-center font-bold mb-2">Teacher</h3>
                <div className="flex flex-col gap-2">
                  {[...Array(3 - draggedBooks)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-kid-blue p-2 rounded border border-kid-primary text-center"
                      draggable
                      onDragStart={handleDragStart}
                    >
                      Book {index + 1}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-4xl">→</div>
              
              <div 
                className="w-1/2 p-4 bg-white rounded-lg shadow-md min-h-[120px]"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <h3 className="text-center font-bold mb-2">Mita</h3>
                <div className="flex flex-col gap-2">
                  {[...Array(draggedBooks)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-kid-pink p-2 rounded border border-kid-primary text-center animate-pop"
                    >
                      Book {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {gameState === 'complete' && (
          <div className="flex-1 flex flex-col justify-center">
            <CharacterDialog 
              character="Mita" 
              message="Let me help you carry these, Teacher." 
              position="right"
            />
            
            <CharacterDialog 
              character="Teacher" 
              message="Thank you, Mita! You are such a helpful student." 
            />
            
            <CharacterDialog 
              character="Narrator" 
              message="Excellent! Mita showed kindness by helping her teacher. In Ethiopian culture, being helpful and respectful to teachers is highly valued." 
            />

            {showStar && (
              <div className="flex justify-center my-8">
                <KindnessStar onCollect={handleStarCollected} />
              </div>
            )}

            <div className="flex justify-center mt-4">
              <NavigationButton to="afterClass">
                Continue to After Class
              </NavigationButton>
            </div>
          </div>
        )}
      </div>
    </SceneContainer>
  );
};

export default SchoolScene;
