
import React, { useState, useEffect } from 'react';
import { Star, Gift } from 'lucide-react';
import SceneContainer from '@/components/SceneContainer';
import NavigationButton from '@/components/NavigationButton';
import CharacterDialog from '@/components/CharacterDialog';
import KindnessStar from '@/components/KindnessStar';
import { useGame } from '@/contexts/GameContext';

const BackHomeScene: React.FC = () => {
  const { stars, markSceneCompleted } = useGame();
  const [showReward, setShowReward] = useState(false);
  const [showStar, setShowStar] = useState(false);

  useEffect(() => {
    // Show the reward after a delay
    const timer = setTimeout(() => {
      setShowReward(true);
    }, 2000);
    
    // Show the final star after another delay
    const starTimer = setTimeout(() => {
      setShowStar(true);
    }, 4000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(starTimer);
    };
  }, []);

  const handleStarCollected = () => {
    markSceneCompleted('backHome');
  };

  return (
    <SceneContainer 
      title="Back Home" 
      background="bg-gradient-to-b from-kid-green to-kid-yellow"
    >
      <div className="flex flex-col h-full justify-center">
        <CharacterDialog 
          character="Narrator" 
          message="Mita returns home after her day of kindness. She feels happy about all the good deeds she did." 
        />
        
        <CharacterDialog 
          character="Mita" 
          message="I helped so many people today! It feels good to be kind to others."
          position="right" 
        />
        
        <CharacterDialog 
          character="Mother" 
          message="How was your day, Mita?" 
        />
        
        <CharacterDialog 
          character="Mita" 
          message="It was wonderful! I thanked you for breakfast, gave my seat to an elderly woman on the bus, helped my teacher with books, and carried Mrs. Abebe's heavy bag."
          position="right" 
        />
        
        <CharacterDialog 
          character="Mother" 
          message="I'm so proud of you, Mita! You showed excellent manners and kindness today." 
        />
        
        {showReward && (
          <div className="my-8 text-center animate-pop">
            <h2 className="text-2xl font-bold text-kid-primary mb-4">
              You've Earned a Kindness Badge!
            </h2>
            
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-kid-pink via-kid-purple to-kid-blue p-6 rounded-full inline-block">
                <div className="bg-white p-4 rounded-full flex items-center justify-center">
                  <Gift className="w-16 h-16 text-kid-primary" fill="rgba(155, 135, 245, 0.3)" />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-center gap-2">
                {[...Array(stars)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-lg mt-2 text-gray-700">
                You collected {stars} Kindness {stars === 1 ? 'Star' : 'Stars'}!
              </p>
            </div>
          </div>
        )}

        {showStar && (
          <div className="flex justify-center my-4">
            <KindnessStar onCollect={handleStarCollected} />
          </div>
        )}
        
        <div className="flex justify-center mt-4">
          <NavigationButton to="end">
            See Your Achievement
          </NavigationButton>
        </div>
      </div>
    </SceneContainer>
  );
};

export default BackHomeScene;
