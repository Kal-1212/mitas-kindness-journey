
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

interface KindnessStarProps {
  onCollect: () => void;
  collected?: boolean;
}

const KindnessStar: React.FC<KindnessStarProps> = ({ onCollect, collected = false }) => {
  const [isCollected, setIsCollected] = useState(collected);
  const { addStar } = useGame();

  const handleClick = () => {
    if (!isCollected) {
      setIsCollected(true);
      addStar();
      onCollect();
    }
  };

  return (
    <div 
      className={`
        cursor-pointer transform transition-all duration-500
        ${isCollected ? 'scale-150 opacity-70' : 'hover:scale-125 animate-bounce-light'}
      `}
      onClick={handleClick}
    >
      <Star 
        className={`w-12 h-12 ${isCollected ? 'text-yellow-300 filter drop-shadow-lg' : 'text-yellow-400'}`} 
        fill={isCollected ? "currentColor" : "none"} 
      />
    </div>
  );
};

export default KindnessStar;
