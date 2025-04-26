
import React from 'react';
import { Star } from 'lucide-react';
import SceneContainer from '@/components/SceneContainer';
import NavigationButton from '@/components/NavigationButton';
import { useGame } from '@/contexts/GameContext';

const EndScene: React.FC = () => {
  const { stars, resetGame } = useGame();
  
  return (
    <SceneContainer 
      title="Congratulations!" 
      background="bg-gradient-to-b from-kid-purple to-kid-pink"
    >
      <div className="flex flex-col h-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-kid-primary mb-8 animate-pop">
            You Are a Kindness Hero!
          </h1>
          
          <div className="my-8">
            <div className="text-xl mb-4">You collected:</div>
            <div className="flex justify-center gap-3 my-6">
              {[...Array(stars)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-12 h-12 text-yellow-400 animate-star-shine" 
                  style={{ animationDelay: `${i * 0.2}s` }}
                  fill="currentColor" 
                />
              ))}
            </div>
            <div className="text-2xl font-semibold">
              {stars} Kindness {stars === 1 ? 'Star' : 'Stars'}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 max-w-lg mx-auto shadow-lg mt-8">
            <h2 className="text-xl font-bold text-kid-primary mb-3">
              What We Learned Today:
            </h2>
            <ul className="text-left space-y-2">
              <li className="flex items-start">
                <div className="text-kid-orange mr-2">•</div>
                <div>Saying "thank you" (አመሰግናለሁ) shows gratitude</div>
              </li>
              <li className="flex items-start">
                <div className="text-kid-orange mr-2">•</div>
                <div>Respecting elders by offering your seat</div>
              </li>
              <li className="flex items-start">
                <div className="text-kid-orange mr-2">•</div>
                <div>Helping teachers and neighbors with heavy loads</div>
              </li>
              <li className="flex items-start">
                <div className="text-kid-orange mr-2">•</div>
                <div>Being kind makes everyone feel good!</div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-center mt-12">
          <NavigationButton 
            to="start" 
            onClick={resetGame}
          >
            Play Again
          </NavigationButton>
        </div>
      </div>
    </SceneContainer>
  );
};

export default EndScene;
