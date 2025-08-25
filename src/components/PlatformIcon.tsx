import React, { useState, useEffect } from 'react';
import { cn } from '../utils/cn';

type PlatformIconProps = {
  name: string;
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
  const [currentFormat, setCurrentFormat] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fallback formats in order of preference
  const formats = ['svg', 'png', 'jpg', 'jpeg', 'webp'];
  
  // Early return if name is undefined or invalid
  if (!name || typeof name !== 'string' || name.trim() === '') {
    const FallbackIcon = () => (
      <div 
        className={cn(
          "flex items-center justify-center rounded border-2 border-dashed border-gray-300",
          fallbackBg,
          className
        )}
        title="No icon available"
      >
        <span className={cn(
          "text-xs font-bold uppercase leading-none",
          fallbackTextColor
        )}>
          ?
        </span>
      </div>
    );
    return <FallbackIcon />;
  }

  const [currentNameIndex, setCurrentNameIndex] = useState(0);

  // Simple and safe alternative naming patterns
  const getAlternativeNames = (originalName: string): string[] => {
    try {
      if (!originalName) return ['fallback'];
      
      const safeName = String(originalName).trim();
      if (!safeName) return ['fallback'];
      
      return [
        safeName.toLowerCase(),
        safeName.toLowerCase().replace(/\s+/g, '-'),
        safeName.toLowerCase().replace(/\s+/g, '_'),
        safeName.toLowerCase().replace(/[^a-z0-9]/g, ''),
        safeName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
        safeName
      ].filter(Boolean);
    } catch (e) {
      return ['fallback'];
    }
  };

  const [alternativeNames] = useState(() => getAlternativeNames(name));

  const getIconPath = (nameTry: string, format: string): string => {
    return `/icons/${nameTry}.${format}`;
  };

  const handleImageError = () => {
    const currentPath = getIconPath(alternativeNames[currentNameIndex] || 'fallback', formats[currentFormat] || 'svg');
    console.log(`❌ Failed to load: ${currentPath}`);
    
    if (currentFormat < formats.length - 1) {
      // Try next format
      setCurrentFormat(currentFormat + 1);
    } else if (currentNameIndex < alternativeNames.length - 1) {
      // Try next alternative name, reset format to first
      setCurrentNameIndex(currentNameIndex + 1);
      setCurrentFormat(0);
    } else {
      // All combinations failed, show fallback
      console.log(`❌ All attempts failed for: ${name}`);
      console.log(`   Tried names:`, alternativeNames);
      console.log(`   Tried formats:`, formats);
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    // Image loaded successfully
    const successPath = getIconPath(alternativeNames[currentNameIndex] || 'fallback', formats[currentFormat] || 'svg');
    console.log(`✅ Successfully loaded: ${successPath}`);
    setHasError(false);
    setIsLoading(false);
  };

  // Reset states when name prop changes
  useEffect(() => {
    setCurrentFormat(0);
    setCurrentNameIndex(0);
    setHasError(false);
    setIsLoading(true);
  }, [name]);

  // Generate fallback text
  const getFallbackText = (platformName: string): string => {
    try {
      if (!platformName || typeof platformName !== 'string') return '?';
      
      const cleaned = String(platformName).replace(/[^a-zA-Z0-9]/g, '');
      if (cleaned.length === 0) return '?';
      if (cleaned.length === 1) return cleaned.charAt(0).toUpperCase();
      
      return cleaned.charAt(0).toUpperCase();
    } catch (e) {
      return '?';
    }
  };

  // Fallback icon when no image is found
  const FallbackIcon = () => (
    <div 
      className={cn(
        "flex items-center justify-center rounded border-2 border-dashed border-gray-300",
        fallbackBg,
        className
      )}
      title={`${name} (icon not found)`}
    >
      <span className={cn(
        "text-xs font-bold uppercase leading-none",
        fallbackTextColor
      )}>
        {getFallbackText(name)}
      </span>
    </div>
  );

  // Loading placeholder
  const LoadingIcon = () => (
    <div 
      className={cn(
        "flex items-center justify-center rounded animate-pulse bg-gray-100",
        className
      )}
    >
      <div className="w-3 h-3 bg-gray-300 rounded"></div>
    </div>
  );

  if (hasError) {
    return <FallbackIcon />;
  }

  if (isLoading && currentFormat === 0 && currentNameIndex === 0) {
    // Show loading only on first attempt
    return (
      <>
        <LoadingIcon />
        <img
          src={getIconPath(alternativeNames[currentNameIndex] || 'fallback', formats[currentFormat] || 'svg')}
          alt={`${name} icon`}
          className={cn("object-contain absolute opacity-0", className)}
          onError={handleImageError}
          onLoad={handleImageLoad}
          draggable={false}
        />
      </>
    );
  }

  return (
    <img
      src={getIconPath(alternativeNames[currentNameIndex] || 'fallback', formats[currentFormat] || 'svg')}
      alt={`${name} icon`}
      className={cn("object-contain", className)}
      onError={handleImageError}
      onLoad={handleImageLoad}
      draggable={false}
      loading="lazy"
    />
  );
};

export default PlatformIcon;
