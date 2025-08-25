import React, { useState } from 'react';
import { cn } from '../utils/cn';

type PlatformIconProps = {
  name: string;
  className?: string;
};

const PlatformIcon: React.FC<PlatformIconProps> = ({ name, className }) => {
  const [currentFormat, setCurrentFormat] = useState(0);
  const [hasError, setHasError] = useState(false);
  
  // Fallback formats in order of preference
  const formats = ['svg', 'png', 'jpg', 'jpeg'];
  
  const getIconPath = (format: string) => {
    return `/icons/${name}.${format}`;
  };

  const handleImageError = () => {
    if (currentFormat < formats.length - 1) {
      // Try next format
      setCurrentFormat(currentFormat + 1);
    } else {
      // All formats failed, show fallback
      setHasError(true);
    }
  };

  const handleImageLoad = () => {
    // Image loaded successfully, reset error state
    setHasError(false);
  };

  // Fallback icon when no image is found
  const FallbackIcon = () => (
    <div className={cn(
      "flex items-center justify-center bg-gray-200 rounded",
      className
    )}>
      <span className="text-xs font-medium text-gray-600 uppercase">
        {name.charAt(0)}
      </span>
    </div>
  );

  if (hasError) {
    return <FallbackIcon />;
  }

  return (
    <img
      src={getIconPath(formats[currentFormat])}
      alt={`${name} icon`}
      className={cn("object-contain", className)}
      onError={handleImageError}
      onLoad={handleImageLoad}
      draggable={false}
    />
  );
};

export default PlatformIcon;
