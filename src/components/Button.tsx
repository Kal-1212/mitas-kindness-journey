
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = "", 
  ...props 
}) => {
  return (
    <button
      className={`rounded-full px-6 py-3 bg-kid-primary hover:bg-kid-primary/80 text-white transition-all duration-300 transform hover:scale-105 font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
