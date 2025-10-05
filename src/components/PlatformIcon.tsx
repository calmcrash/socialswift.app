import React, { useState } from 'react';
import { cn } from '../utils/cn';

type PlatformIconProps = {
  name: string; // This is actually the icon path
  className?: string;
  fallbackBg?: string;
  fallbackTextColor?: string;
};

const PlatformIcon: React.FC<PlatformIconProps> = ({ 
  name, 
  className,
  fallbackBg = "bg-gray-200",
  fallbackTextColor = "text-gray-600"
}) => {
  const [hasError, setHasError] = useState(false);

  // Get fallback letter from path
  const getFallbackText = (path: string): string => {
    const filename = path.split('/').pop()?.split('.')[0] || '?';
    return filename.charAt(0).toUpperCase();
  };

  if (hasError || !name) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center rounded border-2 border-dashed border-gray-300",
          fallbackBg,
          className
        )}
        title="Icon not found"
      >
        <span className={cn(
          "text-xs font-bold uppercase leading-none",
          fallbackTextColor
        )}>
          {getFallbackText(name)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={name}
      alt="Platform icon"
      className={cn("object-contain", className)}
      onError={() => setHasError(true)}
      draggable={false}
      loading="lazy"
    />
  );
};

export default PlatformIcon;
