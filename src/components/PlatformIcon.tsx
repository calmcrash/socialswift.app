import React, { useState } from 'react';
import { cn } from '../utils/cn';

type PlatformIconProps = {
  name: string; // Icon path like "/icons/instagram.svg"
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
  const [currentSrc, setCurrentSrc] = useState(name);
  const [hasError, setHasError] = useState(false);
  const [attemptedFormats, setAttemptedFormats] = useState<string[]>([]);

  // Formats to try in order
  const formats = ['svg', 'png', 'jpg', 'jpeg', 'webp', 'avif'];

  const handleImageError = () => {
    // Get base path without extension
    const basePath = currentSrc.replace(/\.(svg|png|jpg|jpeg|webp|avif)$/i, '');
    
    // Find next format to try
    const nextFormat = formats.find(fmt => !attemptedFormats.includes(fmt));
    
    if (nextFormat) {
      setAttemptedFormats(prev => [...prev, nextFormat]);
      setCurrentSrc(`${basePath}.${nextFormat}`);
    } else {
      // All formats failed
      setHasError(true);
    }
  };

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
      src={currentSrc}
      alt="Platform icon"
      className={cn("object-contain", className)}
      onError={handleImageError}
      draggable={false}
      loading="lazy"
    />
  );
};

export default PlatformIcon;
