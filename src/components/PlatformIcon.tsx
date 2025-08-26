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
  
  // More aggressive early validation
  const isValidName = (value: any): value is string => {
    return value != null && 
           typeof value === 'string' && 
           value.trim().length > 0;
  };
  
  // Early return if name is undefined or invalid
  if (!isValidName(name)) {
    console.warn('PlatformIcon: Invalid name prop received:', name);
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

  // Simple and safe alternative naming patterns with extra validation
  const getAlternativeNames = (originalName: string): string[] => {
    try {
      // Double-check the name is still valid here
      if (!isValidName(originalName)) {
        console.warn('getAlternativeNames: Invalid name:', originalName);
        return ['fallback'];
      }
      
      const safeName = originalName.trim();
      
      const alternatives = [
        safeName.toLowerCase(),
        safeName.toLowerCase().replace(/\s+/g, '-'),
        safeName.toLowerCase().replace(/\s+/g, '_'),
        safeName.toLowerCase().replace(/[^a-z0-9]/g, ''),
        safeName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
        safeName
      ].filter(item => item && item.length > 0);
      
      // Ensure we always have at least one fallback
      if (alternatives.length === 0) {
        alternatives.push('fallback');
      }
      
      return alternatives;
    } catch (e) {
      console.error('getAlternativeNames error:', e);
      return ['fallback'];
    }
  };

  const [alternativeNames] = useState(() => getAlternativeNames(name));

  const getIconPath = (nameTry: string, format: string): string => {
    // Extra safety checks
    const safeName = (nameTry && typeof nameTry === 'string') ? nameTry : 'fallback';
    const safeFormat = (format && typeof format === 'string') ? format : 'svg';
    return `/icons/${safeName}.${safeFormat}`;
  };

  const handleImageError = () => {
    const currentName = alternativeNames[currentNameIndex] || 'fallback';
    const currentFormatName = formats[currentFormat] || 'svg';
    const currentPath = getIconPath(currentName, currentFormatName);
    console.log(`❌ Failed to load: ${currentPath}`);
    
    if (currentFormat < formats.length - 1) {
      // Try next format
      setCurrentFormat(prev => prev + 1);
    } else if (currentNameIndex < alternativeNames.length - 1) {
      // Try next alternative name, reset format to first
      setCurrentNameIndex(prev => prev + 1);
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
    const currentName = alternativeNames[currentNameIndex] || 'fallback';
    const currentFormatName = formats[currentFormat] || 'svg';
    const successPath = getIconPath(currentName, currentFormatName);
    console.log(`✅ Successfully loaded: ${successPath}`);
    setHasError(false);
    setIsLoading(false);
  };

  // Reset states when name prop changes
  useEffect(() => {
    // Re-validate name when it changes
    if (!isValidName(name)) {
      console.warn('useEffect: Invalid name detected:', name);
      setHasError(true);
      setIsLoading(false);
      return;
    }
    
    setCurrentFormat(0);
    setCurrentNameIndex(0);
    setHasError(false);
    setIsLoading(true);
  }, [name]);

  // Generate fallback text
  const getFallbackText = (platformName: string): string => {
    try {
      if (!isValidName(platformName)) return '?';
      
      const cleaned = platformName.replace(/[^a-zA-Z0-9]/g, '');
      if (cleaned.length === 0) return '?';
      
      return cleaned.charAt(0).toUpperCase();
    } catch (e) {
      console.error('getFallbackText error:', e);
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
      title={`${name || 'Unknown'} (icon not found)`}
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

  const currentName = alternativeNames[currentNameIndex] || 'fallback';
  const currentFormatName = formats[currentFormat] || 'svg';
  const imageSrc = getIconPath(currentName, currentFormatName);

  if (isLoading && currentFormat === 0 && currentNameIndex === 0) {
    // Show loading only on first attempt
    return (
      <div className="relative">
        <LoadingIcon />
        <img
          src={imageSrc}
          alt={`${name} icon`}
          className={cn("object-contain absolute opacity-0", className)}
          onError={handleImageError}
          onLoad={handleImageLoad}
          draggable={false}
        />
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
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
