import React, { useState } from 'react';
import { Platform } from '../types';
import { Plus, Link, Check } from 'lucide-react';
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

  return (
    <div>
      <h3 className="text-lg font-medium text-white mb-3">Post to platforms</h3>
      <div className="flex flex-wrap gap-3">
        {platforms.map(platform => (
          <button
            key={platform.id}
            onClick={() => platform.connected ? onTogglePlatform(platform.id) : handleConnectClick(platform)}
            className={cn(
              "relative flex flex-col items-center justify-center w-20 h-20 p-2 rounded-lg transition-all duration-200",
              platform.connected 
                ? selectedPlatforms.includes(platform.id)
                  ? "bg-white/30 backdrop-blur-sm border-2 border-white"
                  : "bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white"
                : "bg-white/20 backdrop-blur-sm border border-white/30 opacity-80 hover:opacity-100"
            )}
          >
            <div className="relative">
              <PlatformIcon name={platform.icon} className="h-8 w-8 text-white" />
              {!platform.connected && (
                <div className="absolute -bottom-1 -right-1 bg-white/30 backdrop-blur-sm rounded-full p-0.5">
                  <Link className="h-3 w-3 text-white" />
                </div>
              )}
              {platform.connected && selectedPlatforms.includes(platform.id) && (
                <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
                  <Check className="h-3 w-3 text-blue-500" />
                </div>
              )}
            </div>
            <span className="text-xs mt-1 text-center text-white line-clamp-1">
              {platform.name}
            </span>
          </button>
        ))}
        
        <button className="flex flex-col items-center justify-center w-20 h-20 p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white transition-all duration-200">
          <div className="bg-white/30 backdrop-blur-sm rounded-full p-2">
            <Plus className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs mt-1 text-white">Add More</span>
        </button>
      </div>

      {showConnectModal && currentPlatform && (
        <Modal 
          title={`Connect to ${currentPlatform.name}`}
          onClose={() => setShowConnectModal(false)}
        >
          <div className="p-4">
            <div className="flex items-center justify-center py-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <PlatformIcon 
                  name={currentPlatform.icon} 
                  className="h-10 w-10 text-white" 
                />
              </div>
            </div>
            
            <p className="text-center text-white mb-6">
              You'll be redirected to {currentPlatform.name} to authorize access to your account.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowConnectModal(false)}
                className="flex-1 py-2 px-4 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConnect}
                className="flex-1 py-2 px-4 bg-white text-blue-600 rounded-lg hover:bg-white/90 transition-colors duration-200"
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