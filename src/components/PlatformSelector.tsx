import React, { useState, useEffect } from 'react';
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
  const [isExpanded, setIsExpanded] = useState(false);

  // Sort platforms alphabetically by name
  const sortedPlatforms = [...platforms].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // 4 icons on mobile, 12 on desktop
  const getFirstRowCount = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 4 : 12;
    }
    return 12; // Default to desktop
  };

  // MOBILE NUCLEAR FIX: Responsive grid template to match item counts
  const getGridTemplate = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 
        ? 'repeat(4, 80px)'   // 4 columns on mobile (matches 4 items)
        : 'repeat(12, 80px)'; // 12 columns on desktop (matches 12 items)
    }
    return 'repeat(12, 80px)'; // Default to desktop
  };

  const [firstRowCount, setFirstRowCount] = useState(getFirstRowCount());
  const [gridTemplate, setGridTemplate] = useState(getGridTemplate());

  // Update row count AND grid template on window resize
  useEffect(() => {
    const handleResize = () => {
      setFirstRowCount(getFirstRowCount());
      setGridTemplate(getGridTemplate()); // CRITICAL: Update grid template too
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const renderPlatformButton = (platform: Platform) => (
    <button
      key={platform.id}
      onClick={() =>
        platform.connected
          ? onTogglePlatform(platform.id)
          : handleConnectClick(platform)
      }
      className={cn(
        "relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200",
        "flex-shrink-0 flex-grow-0", // NUCLEAR: NO FLEXIBILITY
        platform.connected
          ? selectedPlatforms.includes(platform.id)
            ? "bg-white border-2 border-blue-500"
            : "bg-white border border-gray-200 hover:border-blue-500"
          : "bg-white border border-gray-200 opacity-80 hover:opacity-100"
      )}
      style={{
        width: '80px',
        height: '80px',
        minWidth: '80px',
        minHeight: '80px',
        maxWidth: '80px',
        maxHeight: '80px'
      }}
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
      <span className="text-xs mt-1 text-center text-gray-800 line-clamp-1 max-w-full overflow-hidden text-ellipsis">
        {platform.name}
      </span>
    </button>
  );

  const renderAddMoreButton = () => (
    <button 
      className="relative flex flex-col items-center justify-center p-2 rounded-lg bg-white border border-gray-200 hover:border-blue-500 transition-all duration-200 flex-shrink-0 flex-grow-0"
      style={{
        width: '80px',
        height: '80px',
        minWidth: '80px',
        minHeight: '80px',
        maxWidth: '80px',
        maxHeight: '80px'
      }}
    >
      <div className="bg-gray-100 rounded-full p-2">
        <Plus className="h-4 w-4 text-gray-600" />
      </div>
      <span className="text-xs mt-1 text-gray-800">Add More</span>
    </button>
  );

  // Chevron should appear after 6 icons
  const chevronPosition = 6;

  return (
    <div>
      <h3 className="text-lg font-medium text-white mb-3">
        Connect to platforms
      </h3>

      <div className="space-y-3">
        {/* MOBILE NUCLEAR SOLUTION: RESPONSIVE FIXED GRID WITH EXACT PIXEL SPACING */}
        <div 
          className="grid justify-items-center"
          style={{
            // RESPONSIVE NUCLEAR GRID: Matches column count to item count
            gridTemplateColumns: gridTemplate, // 4 cols mobile, 12 cols desktop
            gap: '16px',
            justifyContent: 'center',
            maxWidth: '100%',
            overflow: 'hidden'
          }}
        >
          {sortedPlatforms.slice(0, firstRowCount).map(renderPlatformButton)}
        </div>

        {/* Chevron below first 6 icons with consistent spacing */}
        {sortedPlatforms.length > chevronPosition && !isExpanded && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/15 transition-all duration-200 group"
            >
              <ChevronDown className="h-5 w-5 text-white/80 group-hover:text-white transition-all duration-200" />
            </button>
          </div>
        )}

        {/* RESPONSIVE FIXED GRID FOR REMAINING PLATFORMS */}
        {isExpanded && (
          <div 
            className="grid justify-items-center"
            style={{
              // SAME RESPONSIVE GRID STRUCTURE
              gridTemplateColumns: gridTemplate, // Matches above grid exactly
              gap: '16px',
              justifyContent: 'center',
              maxWidth: '100%',
              overflow: 'hidden'
            }}
          >
            {sortedPlatforms.slice(firstRowCount).map(renderPlatformButton)}
            {renderAddMoreButton()}
          </div>
        )}

        {/* Chevron to collapse when expanded with consistent spacing */}
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
              You'll be redirected to {currentPlatform.name} to authorize access
              to your account.
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
