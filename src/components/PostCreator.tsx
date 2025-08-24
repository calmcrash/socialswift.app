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
            placeholder="What's on your mind?"
            className="w-full p-4 border-none outline-none resize-none min-h-[60px] text-gray-800 placeholder-gray-500 rounded-lg"
            style={{ overflow: 'hidden' }}
            spellCheck={true}
            lang="en"
            autoCorrect="on"
          />
        </div>
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
