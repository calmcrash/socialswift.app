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
  
  // Normalize platform name for consistent file naming
  const normalizePlatformName = (platformName: string | undefined | null): string => {
    // Handle undefined, null, or empty values
    if (!platformName || typeof platformName !== 'string' || platformName.trim() === '') {
      return 'fallback';
    }
    
    return platformName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  // Alternative naming patterns to try
  const getAlternativeNames = (originalName: string | undefined | null): string[] => {
    // Handle undefined/null names early
    if (!originalName || typeof originalName !== 'string' || originalName.trim() === '') {
      return ['fallback'];
    }
    
    const normalized = normalizePlatformName(originalName);
    const alternatives = [
      originalName.toLowerCase(), // Try exact lowercase first
      normalized,
      originalName.toLowerCase().replace(/\s+/g, ''),
      originalName.toLowerCase().replace(/\s+/g, '-'),
      originalName.toLowerCase().replace(/\s+/g, '_'),
      originalName, // Try original case
    ];

    // Add specific platform name mappings
    const nameMap: Record<string, string[]> = {
      'twitter': ['twitter', 'x', 'x-twitter'],
      'x': ['x', 'twitter', 'x-twitter'],
      'x-twitter': ['x-twitter', 'twitter', 'x'],
      'facebook-pages': ['facebook-pages', 'facebook', 'fb-pages'],
      'facebook-personal': ['facebook-personal', 'facebook', 'fb-personal'],
      'instagram-personal': ['instagram-personal', 'instagram', 'ig-personal'],
      'instagram-professional': ['instagram-professional', 'instagram', 'ig-professional'],
      'linkedin-company': ['linkedin-company', 'linkedin', 'linkedin-business'],
      'linkedin-personal': ['linkedin-personal', 'linkedin', 'linkedin-profile'],
      'youtube': ['youtube', 'yt'],
      'tiktok': ['tiktok', 'tik-tok'],
      'whatsapp-business': ['whatsapp-business', 'whatsapp', 'wa-business'],
      'google-business-profile': ['google-business-profile', 'google-business', 'google-my-business', 'gmb'],
      'xiaohongshu-red': ['xiaohongshu-red', 'xiaohongshu', 'red', 'little-red-book'],
      '9gag': ['9gag', 'ninegag'],
      '9gag-tv': ['9gag-tv', '9gag_tv', 'ninegag-tv'],
      'wordpress-com': ['wordpress-com', 'wordpress', 'wp'],
      'dev-to': ['dev-to', 'devto', 'dev'],
      'ko-fi': ['ko-fi', 'kofi'],
      'mx-takatak': ['mx-takatak', 'mx-taka-tak', 'takatak'],
      // Handle numeric prefixes specifically
      '9gag tv': ['9gag', '9gag-tv', '9gag_tv'],
      'alignable': ['alignable'],
      'amino': ['amino'],
      'angellist': ['angellist', 'angel-list'],
      'artstation': ['artstation', 'art-station'],
      'behance': ['behance'],
      'bilibili': ['bilibili'],
      'bitchute': ['bitchute', 'bit-chute'],
      'bitclout': ['bitclout', 'bit-clout'],
      'blogger': ['blogger'],
      'bluesky': ['bluesky', 'blue-sky'],
      'caffeine': ['caffeine'],
      'clapper': ['clapper'],
      'dailymotion': ['dailymotion', 'daily-motion'],
      'deso': ['deso', 'deso-protocol'],
      'devto': ['devto', 'dev-to', 'dev'],
      'deviantart': ['deviantart', 'deviant-art'],
      'discord': ['discord'],
      'dlive': ['dlive', 'd-live'],
      'douyin': ['douyin'],
      'dribbble': ['dribbble'],
    };

    // Check if the original name (lowercase) has a specific mapping
    const lowerOriginal = originalName.toLowerCase();
    if (nameMap[lowerOriginal]) {
      return [...nameMap[lowerOriginal], ...alternatives];
    }
    
    if (nameMap[normalized]) {
      return [...nameMap[normalized], ...alternatives];
    }

    return [...new Set(alternatives)]; // Remove duplicates
  };

  // Early return if name is invalid
  if (!name || typeof name !== 'string' || name.trim() === '') {
    const FallbackIcon = () => (
      <div 
        className={cn(
          "flex items-center justify-center rounded border-2 border-dashed border-gray-300",
          fallbackBg,
          className
        )}
        title="No platform name provided"
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

  const [alternativeNames] = useState(() => getAlternativeNames(name));
  const [currentNameIndex, setCurrentNameIndex] = useState(0);

  const getIconPath = (nameTry: string, format: string): string => {
    return `/icons/${nameTry}.${format}`;
  };

  const handleImageError = () => {
    if (currentFormat < formats.length - 1) {
      // Try next format with current name
      setCurrentFormat(currentFormat + 1);
    } else if (currentNameIndex < alternativeNames.length - 1) {
      // Try next alternative name, reset format to first
      setCurrentNameIndex(currentNameIndex + 1);
      setCurrentFormat(0);
    } else {
      // All combinations failed, show fallback
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    // Image loaded successfully, reset states
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

  // Generate fallback text (first letter or first two letters for better recognition)
  const getFallbackText = (platformName: string): string => {
    if (!platformName || typeof platformName !== 'string') return '?';
    
    const cleaned = platformName.replace(/[^a-zA-Z0-9]/g, '');
    if (cleaned.length === 0) return '?';
    if (cleaned.length === 1) return cleaned.charAt(0).toUpperCase();
    
    // For better recognition, use first two characters for some platforms
    const twoCharPlatforms = ['qq', 'vk', 'mx', 'ai'];
    const normalizedName = cleaned.toLowerCase();
    
    if (normalizedName && twoCharPlatforms.some(prefix => normalizedName.startsWith(prefix))) {
      return cleaned.substring(0, 2).toUpperCase();
    }
    
    return cleaned.charAt(0).toUpperCase();
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

  // Safely access array elements with fallbacks
  const currentName = alternativeNames[currentNameIndex] || 'fallback';
  const currentFormatName = formats[currentFormat] || 'svg';

  if (isLoading && currentFormat === 0 && currentNameIndex === 0) {
    // Show loading only on first attempt
    return (
      <>
        <LoadingIcon />
        <img
          src={getIconPath(currentName, currentFormatName)}
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
      src={getIconPath(currentName, currentFormatName)}
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
