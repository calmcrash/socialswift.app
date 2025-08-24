import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import FileUploader from './FileUploader';
import PlatformSelector from './PlatformSelector';
import SEOOptimizer from './SEOOptimizer';
import { Platform, PostMedia, Post } from '../types';

type PostCreatorProps = {
  platforms: Platform[];
  onPost: (post: Post) => void;
};

const PostCreator: React.FC<PostCreatorProps> = ({ platforms, onPost }) => {
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState<PostMedia | undefined>(undefined);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    platforms.filter(p => p.connected && p.enabled).map(p => p.id)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [caption]);

  const handleTogglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleConnectPlatform = (platformId: string) => {
    const updatedPlatforms = platforms.map(platform => 
      platform.id === platformId 
        ? { ...platform, connected: true } 
        : platform
    );
    
    if (!selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(prev => [...prev, platformId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !caption || selectedPlatforms.length === 0) return;
    
    setIsSubmitting(true);
    
    const post: Post = {
      caption,
      media,
      platforms: selectedPlatforms
    };
    
    onPost(post);
    
    // Reset form
    setCaption('');
    setMedia(undefined);
    setIsSubmitting(false);
  };

  const isPostDisabled = !caption || selectedPlatforms.length === 0 || isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="caption" className="text-lg font-medium text-white">
          Write your caption
        </label>
        
        {/* Smart Text Input */}
        <div className="mt-2 bg-white rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-shadow duration-200">
          <textarea
            ref={textareaRef}
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind? or Type in video title & press enter for description"
            className="w-full p-4 border-none outline-none resize-none min-h-[60px] text-gray-800 placeholder-gray-500 rounded-lg"
            style={{ overflow: 'hidden' }}
            spellCheck={true}
            lang="en"
            autoCorrect="on"
          />
        </div>

        {/* Live Preview - ALWAYS SHOWS when multiline, no toggle button */}
        {isMultiLine && (
          <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="mb-3">
              <h3 className="font-semibold text-white">Live Preview</h3>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-hidden">
              {/* Mock Video Thumbnail - Fixed aspect ratio */}
              {media ? (
                <div className="relative bg-gray-800 rounded-lg aspect-video overflow-hidden max-h-48">
                  {media.type === 'image' ? (
                    <img 
                      src={media.preview} 
                      alt="Media preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video 
                      src={media.preview}
                      className="w-full h-full object-cover"
                      muted
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-3xl opacity-80">▶️</div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    3:45
                  </div>
                </div>
              ) : (
                <div className="relative bg-gray-800 rounded-lg aspect-video flex items-center justify-center max-h-48">
                  <div className="text-white text-3xl opacity-60">📹</div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    Upload video
                  </div>
                </div>
              )}">
                  <div className="text-white text-3xl opacity-60">📹</div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    Upload video
                  </div>
                </div>
              )}
              
              {/* Title */}
              <div>
                <h4 className="font-bold text-white text-base leading-tight line-clamp-2">
                  {title || 'Your title will appear here...'}
                </h4>
              </div>
              
              {/* Description Preview - YouTube style */}
              {description && (
                <div className="space-y-2">
                  <div className="text-gray-200 text-sm leading-relaxed">
                    <p className={isDescriptionExpanded ? '' : 'line-clamp-3'}>
                      {isDescriptionExpanded ? description : previewText}
                    </p>
                  </div>
                  
                  {totalWordCount > visibleWordCount && (
                    <button
                      type="button"
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                      className="text-blue-300 text-sm font-medium hover:text-blue-100 transition-colors uppercase"
                    >
                      {isDescriptionExpanded ? 'Show less' : '...more'}
                    </button>
                  )}
                  
                  {/* Preview Stats */}
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 pt-2 border-t border-white/10">
                    <span>👁️ Visible: {visibleWordCount} words</span>
                    <span>📝 Total: {totalWordCount} words</span>
                    {totalWordCount > visibleWordCount && (
                      <span className="text-yellow-300">
                        ⚠️ {totalWordCount - visibleWordCount} words truncated
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <SEOOptimizer caption={caption} />
      
      <div>
        <label className="text-lg font-medium text-white">
          Upload media
        </label>
        <div className="mt-2 bg-white rounded-lg border border-gray-200">
          <FileUploader 
            value={media} 
            onChange={setMedia} 
            caption={caption}
            onCaptionChange={setCaption}
          />
        </div>
      </div>
      
      <PlatformSelector
        platforms={platforms}
        selectedPlatforms={selectedPlatforms}
        onTogglePlatform={handleTogglePlatform}
        onConnectPlatform={handleConnectPlatform}
      />

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPostDisabled}
          className="flex items-center px-6 py-3 font-medium rounded-lg bg-white border border-gray-200 text-blue-500 transition-colors duration-200 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5 mr-2" />
          {isSubmitting ? 'Posting...' : 'Post across platforms'}
        </button>
      </div>
    </form>
  );
};

export default PostCreator;
