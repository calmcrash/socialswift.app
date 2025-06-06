import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
        Social Swift
      </span>
    </div>
  );
};

export default Logo;