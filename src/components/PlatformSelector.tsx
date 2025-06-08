import React, { useState } from 'react';
import { Platform } from '../types';
import { Plus, Link, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../utils/cn';
import Modal from './Modal';
import PlatformIcon from './PlatformIcon';

type PlatformSelectorProps = {
  platforms: Platform[];
  selectedPlatforms: string[];
  onTogglePlatform: (platformId: string) => void;
  onConnectPlatform: (platformId: string) => void;
};

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  platforms,
  selectedPlatforms,
  onTogglePlatform,
  onConnectPlatform
}) => {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<Platform | null>(null);
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);

  const handleConnectClick = (platform: Platform) => {
    setCurrentPlatform(platform);
    setShowConnectModal(true);
  };

  const handleConnect = () => {
    if (currentPlatform) {
      onConnectPlatform(currentPlatform.id);
      setShowConnectModal(false);
    }
  };

  // Calculate how many platforms to show (2 rows of 6 = 12 platforms)
  const platformsPerRow = 6;
  const defaultRows = 2;
  const defaultPlatformCount = platformsPerRow * defaultRows;
  
  const visiblePlatforms = showAllPlatforms 
    ? platforms 
    : platforms.slice(0, defaultPlatformCount);
  
  const hasMorePlatforms = platforms.length > defaultPlatformCount;

  return (
    <div>
      <h3 className="text-lg font-medium text-white mb-3">Post to platforms</h3>
      
      {/* Platform grid container with white background matching FileUploader */}
      <div className="mt-2 bg-white rounded-lg border border-gray-200 p-8">
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-3 justify-center transition-all duration-300 ease-in-out">
            {visiblePlatforms.map(platform => (
              <button
                key={platform.id}
                onClick={() => platform.connected ? onTogglePlatform(platform.id) : handleConnectClick(platform)}
                className={cn(
                  "relative flex flex-col items-center justify-center h-20 p-2 rounded-lg transition-all duration-200",
                  "w-[calc(25%-9px)] sm:w-[calc(16.66%-10px)]", // 4 icons on mobile, 6 on desktop
                  platform.connected 
                    ? selectedPlatforms.includes(platform.id)
                      ? "bg-gray-50 border-2 border-blue-500"
                      : "bg-gray-50 border border-gray-200 hover:border-blue-500"
                    : "bg-gray-50 border border-gray-200 opacity-80 hover:opacity-100"
                )}
              >
                <div className="relative">
                  <PlatformIcon name={platform.icon} className="h-8 w-8 text-gray-700" />
                  {!platform.connected && (
                    <div className="absolute -bottom-1 -right-1 bg-gray-100 rounded-full p-0.5">
                      <Link className="h-3 w-3 text-gray-600" />
                    </div>
                  )}
                  {platform.connected && selectedPlatforms.includes(platform.id) && (
                    <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <span className="text-xs mt-1 text-center text-gray-800 line-clamp-1">
                  {platform.name}
                </span>
              </button>
            ))}
            
            <button className="relative flex flex-col items-center justify-center h-20 p-2 rounded-lg bg-gray-50 border border-gray-200 hover:border-blue-500 transition-all duration-200 w-[calc(25%-9px)] sm:w-[calc(16.66%-10px)]">
              <div className="bg-gray-100 rounded-full p-2">
                <Plus className="h-4 w-4 text-gray-600" />
              </div>
              <span className="text-xs mt-1 text-gray-800">Add More</span>
            </button>
          </div>
        </div>

        {/* Toggle button for showing more platforms */}
        {hasMorePlatforms && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAllPlatforms(!showAllPlatforms)}
              className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800 transition-all duration-200 transform hover:scale-110"
              aria-label={showAllPlatforms ? "Show fewer platforms" : "Show more platforms"}
            >
              {showAllPlatforms ? (
                <ChevronUp className="h-6 w-6 transition-transform duration-300" />
              ) : (
                <ChevronDown className="h-6 w-6 transition-transform duration-300" />
              )}
            </button>
          </div>
        )}
      </div>

      {showConnectModal && currentPlatform && (
        <Modal 
          title={`Connect to ${currentPlatform.name}`}
          onClose={() => setShowConnectModal(false)}
        >
          <div className="p-4">
            <div className="flex items-center justify-center py-6">
              <div className="bg-gray-100 rounded-full p-4">
                <PlatformIcon 
                  name={currentPlatform.icon} 
                  className="h-10 w-10 text-gray-700" 
                />
              </div>
            </div>
            
            <p className="text-center text-gray-700 mb-6">
              You'll be redirected to {currentPlatform.name} to authorize access to your account.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowConnectModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConnect}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Connect
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PlatformSelector;