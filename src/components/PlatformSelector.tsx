import React, { useState, useEffect } from 'react';
import { Platform, ConnectedPlatform } from '../types';
import { platforms } from '../utils/platforms';
import { Plus, Link, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../utils/cn';
import Modal from './Modal';
import PlatformIcon from './PlatformIcon';

type PlatformSelectorProps = {
  connectedPlatforms: ConnectedPlatform[];
  selectedPlatforms: string[];
  onTogglePlatform: (platformName: string) => void;
  onConnectPlatform: (platformName: string) => void;
};

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  connectedPlatforms = [], // Add default empty array
  selectedPlatforms = [], // Add default empty array
  onTogglePlatform,
  onConnectPlatform
}) => {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<Platform | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Get button size and gap for proper alignment
  const getFirstRowCount = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 4 : 12;
    }
    return 12;
  };

  const getButtonSize = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 70 : 80;
    }
    return 80;
  };

  const getGridGap = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 12 : 20;
    }
    return 20;
  };

  const [firstRowCount, setFirstRowCount] = useState(getFirstRowCount());
  const [buttonSize, setButtonSize] = useState(getButtonSize());
  const [gridGap, setGridGap] = useState(getGridGap());

  useEffect(() => {
    const handleResize = () => {
      setFirstRowCount(getFirstRowCount());
      setButtonSize(getButtonSize());
      setGridGap(getGridGap());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper function to check if platform is connected
  const isPlatformConnected = (platformName: string): boolean => {
    if (!connectedPlatforms || !Array.isArray(connectedPlatforms)) return false;
    return connectedPlatforms.some(cp => cp.name === platformName && cp.connected);
  };

  // Helper function to get connected platform info
  const getConnectedPlatform = (platformName: string): ConnectedPlatform | undefined => {
    if (!connectedPlatforms || !Array.isArray(connectedPlatforms)) return undefined;
    return connectedPlatforms.find(cp => cp.name === platformName);
  };

  // Simple filtering - just show all platforms, sorted by connection status
  const getFilteredPlatforms = (): Platform[] => {
    if (!platforms || !Array.isArray(platforms)) return [];
    
    // Sort: connected first, then alphabetically
    return platforms.sort((a, b) => {
      const aConnected = isPlatformConnected(a.name);
      const bConnected = isPlatformConnected(b.name);
      
      if (aConnected && !bConnected) return -1;
      if (!aConnected && bConnected) return 1;
      
      return a.name.localeCompare(b.name);
    });
  };

  const filteredPlatforms = getFilteredPlatforms();

  const handleConnectClick = (platform: Platform) => {
    setCurrentPlatform(platform);
    setShowConnectModal(true);
  };

  const handleConnect = () => {
    if (currentPlatform) {
      onConnectPlatform(currentPlatform.name);
      setShowConnectModal(false);
    }
  };

  const renderPlatformButton = (platform: Platform) => {
    const connected = isPlatformConnected(platform.name);
    const connectedPlatform = getConnectedPlatform(platform.name);
    const isSelected = selectedPlatforms?.includes(platform.name) ?? false;
    const isEnabled = connectedPlatform?.enabled ?? true;

    return (
      <button
        key={platform.name}
        onClick={() =>
          connected
            ? onTogglePlatform(platform.name)
            : handleConnectClick(platform)
        }
        disabled={connected && !isEnabled}
        className={cn(
          "relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200",
          "flex-shrink-0 flex-grow-0",
          connected
            ? isSelected
              ? "bg-white border-2 border-blue-500"
              : "bg-white border border-gray-200 hover:border-blue-500"
            : "bg-white border border-gray-200 opacity-80 hover:opacity-100",
          !isEnabled && "opacity-50 cursor-not-allowed"
        )}
        style={{
          width: `${buttonSize}px`,
          height: `${buttonSize}px`,
          minWidth: `${buttonSize}px`,
          minHeight: `${buttonSize}px`,
          maxWidth: `${buttonSize}px`,
          maxHeight: `${buttonSize}px`
        }}
        title={`${platform.name} - ${platform.type} (${platform.category})`}
      >
        <div className="relative">
          <PlatformIcon name={platform.icon} className="h-8 w-8 text-gray-700" />
          
          {/* Connection status indicators */}
          {!connected && (
            <div className="absolute -bottom-1 -right-1 bg-gray-100 rounded-full p-0.5">
              <Link className="h-3 w-3 text-gray-600" />
            </div>
          )}
          
          {connected && isSelected && (
            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}

          {/* Platform type badge - REMOVED */}
        </div>
        
        <span className="text-xs mt-1 text-center text-gray-800 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {platform.name}
        </span>
      </button>
    );
  };

  const renderAddMoreButton = () => (
    <button 
      className="relative flex flex-col items-center justify-center p-2 rounded-lg bg-white border border-gray-200 hover:border-blue-500 transition-all duration-200 flex-shrink-0 flex-grow-0"
      style={{
        width: `${buttonSize}px`,
        height: `${buttonSize}px`,
        minWidth: `${buttonSize}px`,
        minHeight: `${buttonSize}px`,
        maxWidth: `${buttonSize}px`,
        maxHeight: `${buttonSize}px`
      }}
    >
      <div className="bg-gray-100 rounded-full p-2">
        <Plus className="h-4 w-4 text-gray-600" />
      </div>
      <span className="text-xs mt-1 text-gray-800">See All</span>
    </button>
  );

  const chevronPosition = 6;

  return (
    <div>
      <h3 className="text-lg font-medium text-white mb-3">
        Connect to platforms
      </h3>

      {/* Platform Grid */}
      <div className="space-y-4">
        {/* First row - always visible */}
        <div className="flex justify-center w-full">
          <div 
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${firstRowCount}, ${buttonSize}px)`,
              gap: `${gridGap}px`,
              maxWidth: '100%'
            }}
          >
            {filteredPlatforms.slice(0, firstRowCount).map(renderPlatformButton)}
          </div>
        </div>

        {/* Chevron - only show if there are more platforms */}
        {filteredPlatforms.length > chevronPosition && !isExpanded && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/15 transition-all duration-200 group"
            >
              <ChevronDown className="h-5 w-5 text-white/80 group-hover:text-white transition-all duration-200" />
            </button>
          </div>
        )}

        {/* Expanded rows */}
        {isExpanded && (
          <div className="flex justify-center w-full">
            <div 
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${firstRowCount}, ${buttonSize}px)`,
                gap: `${gridGap}px`,
                maxWidth: '100%'
              }}
            >
              {filteredPlatforms.slice(firstRowCount).map(renderPlatformButton)}
              {renderAddMoreButton()}
            </div>
          </div>
        )}

        {/* Collapse chevron when expanded */}
        {isExpanded && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsExpanded(false)}
              className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/15 transition-all duration-200 group"
            >
              <ChevronUp className="h-5 w-5 text-white/80 group-hover:text-white transition-all duration-200" />
            </button>
          </div>
        )}
      </div>

      {/* No results message */}
      {filteredPlatforms.length === 0 && (
        <div className="text-center py-8 text-white/70">
          <p>No platforms available.</p>
        </div>
      )}

      {/* Connection Modal */}
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

            <div className="text-center mb-6">
              <h4 className="font-medium text-gray-900 mb-2">{currentPlatform.name}</h4>
              <p className="text-sm text-gray-600 mb-2">
                {currentPlatform.type} platform • {currentPlatform.category}
              </p>
              <p className="text-gray-700">
                You'll be redirected to {currentPlatform.name} to authorize access to your account.
              </p>
              
              {/* Hashtag info */}
              {currentPlatform.hashtags?.supported && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    Hashtag Support: {currentPlatform.hashtags.optimal} optimal tags
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {currentPlatform.hashtags.notes}
                  </p>
                </div>
              )}
            </div>

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
