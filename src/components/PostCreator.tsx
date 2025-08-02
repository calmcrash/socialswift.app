import React, { useState } from 'react';
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

  const handleTogglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleConnectPlatform = (platformId: string) => {
    // In a real app, this would trigger an OAuth flow
    // For demo purposes, we'll just mark it as connected
    const updatedPlatforms = platforms.map(platform => 
      platform.id === platformId 
        ? { ...platform, connected: true } 
        : platform
    );
    
    // Add newly connected platform to selected platforms
    if (!selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(prev => [...prev, platformId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !caption || selectedPlatforms.length === 0) return;
    
    setIsSubmitting(true);
    
    // Create post object
    const post: Post = {
      caption,
      media,
      platforms: selectedPlatforms
    };
    
    // In a real app, we would send this to an API
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
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-4 mt-2 bg-white border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow duration-200 text-gray-800 placeholder-gray-500"
            rows={4}
            spellCheck={true}
            lang="en"
            autoCorrect="on"
          />
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
          className="flex items-center px-6 py-3 font-medium rounded-lg bg-white border border-gray-200 text-blue-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send className="h-5 w-5 mr-2" />
          Post across platforms
        </button>
      </div>
    </form>
  );
};

export default PostCreator;