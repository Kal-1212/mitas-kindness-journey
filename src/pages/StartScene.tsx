
import React from 'react';
import SceneContainer from '@/components/SceneContainer';
import NavigationButton from '@/components/NavigationButton';
import CharacterDialog from '@/components/CharacterDialog';

const StartScene: React.FC = () => {
  return (
    <SceneContainer 
      title="Mita's Day of Kindness" 
      background="bg-gradient-to-b from-kid-yellow to-kid-peach"
    >
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-kid-primary mb-4">
            Mita's Day of Kindness
          </h1>
          <p className="text-xl text-gray-700 max-w-md mx-auto">
            Help Mita spread kindness throughout her day and learn about Ethiopian culture!
          </p>
        </div>
        
        <div className="w-64 h-64 bg-white rounded-full shadow-lg flex items-center justify-center mb-4">
          <div className="w-56 h-56 bg-kid-purple rounded-full flex items-center justify-center text-6xl">
            ሚታ
          </div>
        </div>
        
        <CharacterDialog 
          character="Narrator" 
          message="Follow Mita as she goes through her day showing kindness and good manners. Help her make good choices!" 
        />
        
        <div className="mt-8">
          <NavigationButton to="home">
            Start Mita's Journey
          </NavigationButton>
        </div>
      </div>
    </SceneContainer>
  );
};

export default StartScene;
