
import React from 'react';

interface CharacterDialogProps {
  character: string;
  message: string;
  amharicMessage?: string;
  position?: 'left' | 'right';
}

const CharacterDialog: React.FC<CharacterDialogProps> = ({
  character,
  message,
  amharicMessage,
  position = 'left',
}) => {
  return (
    <div className={`flex ${position === 'right' ? 'justify-end' : 'justify-start'} my-4`}>
      <div className="max-w-[80%] bg-white rounded-2xl p-4 shadow-md animate-pop">
        <h3 className="font-bold text-lg text-kid-primary">{character}</h3>
        <p className="text-gray-800 text-lg mt-1">{message}</p>
        {amharicMessage && (
          <p className="italic text-gray-600 mt-1">"{amharicMessage}"</p>
        )}
      </div>
    </div>
  );
};

export default CharacterDialog;
