import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronUp, ChevronDown, Globe, Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { PostMedia } from '../types';

interface SocialMediaPreviewModalProps {
  media: PostMedia;
  caption: string;
  onClose: () => void;
  onCaptionChange: (caption: string) => void;
}

const SocialMediaPreviewModal: React.FC<SocialMediaPreviewModalProps> = ({
  media,
  caption,
  onClose,
  onCaptionChange
}) => {
  const [previewMode, setPreviewMode] = useState<'facebook' | 'instagram'>('facebook');
  const modalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [caption]);

  const renderFacebookPreview = () => (
    <div className="bg-white rounded-lg shadow-lg max-w-[500px] w-full mx-2 sm:mx-4">
      {/* Facebook Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-semibold text-[15px] text-[#1c1e21]">Your Name</span>
            </div>
            <div className="flex items-center text-[13px] text-[#65676b]">
              <span>Just now</span>
              <span className="mx-1">·</span>
              <Globe className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Facebook Caption */}
      <div className="px-4 pt-3">
        <textarea
          ref={textareaRef}
          value={caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full text-[15px] text-[#1c1e21] resize-none border-none outline-none bg-transparent leading-5 min-h-[20px]"
        />
      </div>

      {/* Facebook Image */}
      <div className="mt-3">
        {media.type === 'image' ? (
          <img 
            src={media.preview} 
            alt="Preview" 
            className="w-full object-cover max-h-[400px]"
          />
        ) : (
          <video 
            src={media.preview} 
            controls 
            className="w-full object-cover max-h-[400px]"
          />
        )}
      </div>

      {/* Facebook Action Buttons */}
      <div className="px-4 py-2">
        <div className="flex justify-around">
          <button className="flex items-center justify-center flex-1 py-2 text-[#65676b] hover:bg-gray-100 rounded-md">
            <Heart className="w-5 h-5 mr-2" />
            <span className="text-[15px] font-semibold">Like</span>
          </button>
          <button className="flex items-center justify-center flex-1 py-2 text-[#65676b] hover:bg-gray-100 rounded-md">
            <MessageCircle className="w-5 h-5 mr-2" />
            <span className="text-[15px] font-semibold">Comment</span>
          </button>
          <button className="flex items-center justify-center flex-1 py-2 text-[#65676b] hover:bg-gray-100 rounded-md">
            <Share className="w-5 h-5 mr-2" />
            <span className="text-[15px] font-semibold">Share</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderInstagramPreview = () => (
    <div className="bg-white rounded-lg shadow-lg max-w-[400px] w-full mx-2 sm:mx-4">
      {/* Instagram Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
            <span className="font-semibold text-[14px] text-black">your_username</span>
          </div>
          <MoreHorizontal className="w-6 h-6 text-black" />
        </div>
      </div>

      {/* Instagram Square Image */}
      <div className="relative aspect-square bg-gray-100">
        {media.type === 'image' ? (
          <img 
            src={media.preview} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        ) : (
          <video 
            src={media.preview} 
            controls 
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Instagram Action Buttons */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Heart className="w-6 h-6 text-black" />
            <MessageCircle className="w-6 h-6 text-black" />
            <Share className="w-6 h-6 text-black" />
          </div>
        </div>

        {/* Instagram Caption */}
        <div className="text-[14px] text-black">
          <span className="font-semibold mr-2">your_username</span>
          <textarea
            ref={textareaRef}
            value={caption}
            onChange={(e) => onCaptionChange(e.target.value)}
            placeholder="Write a caption..."
            className="inline w-full resize-none border-none outline-none bg-transparent leading-5 min-h-[20px]"
          />
        </div>
      </div>
    </div>
  );

  const renderYouTubePreview = () => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const lines = caption.split('\n');
    const title = lines[0] || '';
    const description = lines.slice(1).join('\n');
    
    // YouTube desktop specs: ~2 lines visible, ~125-130 chars before "Show more"
    const DESCRIPTION_CHAR_LIMIT = 125;
    const shouldShowMore = description.length > DESCRIPTION_CHAR_LIMIT;
    const displayDescription = showFullDescription ? description : description.substring(0, DESCRIPTION_CHAR_LIMIT);
    
    return (
      <div className="bg-white rounded-lg shadow-lg max-w-[640px] w-full mx-2 sm:mx-4">
        {/* YouTube Video Player */}
        <div className="relative bg-black">
          <video 
            src={media.preview} 
            controls 
            className="w-full max-h-[360px]"
          />
        </div>

        {/* YouTube Content - Exact Desktop Layout */}
        <div className="p-4">
          {/* Title */}
          <div className="mb-2">
            <h1 className="text-[20px] font-medium text-[#0f0f0f] leading-[26px] font-roboto tracking-tight">
              {title || 'Video title'}
            </h1>
          </div>

          {/* Views and Date */}
          <div className="flex items-center mb-4">
            <span className="text-[14px] text-[#606060] font-roboto">
              views • time ago
            </span>
          </div>

          {/* Channel Info and Description */}
          <div className="flex items-start gap-3">
            {/* Channel Avatar */}
            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
            
            <div className="flex-1 min-w-0">
              {/* Channel Name and Subscribers */}
              <div className="mb-1">
                <h3 className="text-[14px] font-medium text-[#0f0f0f] font-roboto">Your Channel</h3>
                <p className="text-[12px] text-[#606060] font-roboto">subscribers</p>
              </div>
              
              {/* Description - Exact YouTube Desktop Style */}
              {description && (
                <div className="mt-3">
                  <div className="text-[14px] text-[#0f0f0f] font-roboto leading-[20px]">
                    <div 
                      className={`${!showFullDescription ? 'line-clamp-2' : ''} whitespace-pre-wrap break-words`}
                      style={{
                        maxHeight: !showFullDescription ? '40px' : 'none', // 2 lines * 20px line-height
                        overflow: !showFullDescription ? 'hidden' : 'visible'
                      }}
                    >
                      {displayDescription}
                      {shouldShowMore && !showFullDescription && '...'}
                    </div>
                    
                    {/* Show more/Show less button - Exact YouTube style */}
                    {shouldShowMore && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-[14px] font-medium text-[#606060] hover:text-[#0f0f0f] mt-1 uppercase tracking-wide font-roboto transition-colors"
                        style={{ fontSize: '12px', fontWeight: '500', letterSpacing: '0.5px' }}
                      >
                        {showFullDescription ? 'SHOW LESS' : 'SHOW MORE'}
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {!description && (
                <div className="mt-3 text-[14px] text-[#606060] italic font-roboto">
                  Description will appear here...
                </div>
              )}
            </div>
            
            {/* Subscribe Button */}
            <button className="bg-[#cc0000] hover:bg-[#aa0000] text-white px-4 py-2 rounded-full text-[14px] font-medium font-roboto transition-colors flex-shrink-0">
              Subscribe
            </button>
          </div>
          
          {/* Hidden textarea for editing */}
          <textarea
            ref={textareaRef}
            value={caption}
            onChange={(e) => onCaptionChange(e.target.value)}
            placeholder="Video title&#10;Description goes here..."
            className="absolute opacity-0 pointer-events-none"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-start p-4 pt-8 pb-8 overflow-y-auto">
      <div ref={modalRef} className="relative max-w-[720px] w-full">
        {/* Top Bar - Perfect alignment */}
        <div className="flex items-center justify-between mb-4 ml-2 mr-0 sm:mx-4">
          <div className="flex items-center">
            <span className="text-white font-medium">Preview Post</span>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Toggle arrows - only show for images */}
            {media.type === 'image' && (
              <>
                <button
                  onClick={() => setPreviewMode('facebook')}
                  className={`p-2 rounded-full transition-colors ${
                    previewMode === 'facebook' ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  <ChevronUp 
                    className="w-5 h-5 text-white"
                  />
                </button>
                <button
                  onClick={() => setPreviewMode('instagram')}
                  className={`p-2 rounded-full transition-colors ${
                    previewMode === 'instagram' ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  <ChevronDown 
                    className="w-5 h-5 text-white"
                  />
                </button>
              </>
            )}
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex justify-center w-full">
          {media.type === 'video' ? (
            renderYouTubePreview()
          ) : previewMode === 'facebook' ? (
            renderFacebookPreview()
          ) : (
            renderInstagramPreview()
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPreviewModal;
