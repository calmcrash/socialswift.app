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

  const renderYouTubePreview = () => (
    <div className="bg-white rounded-lg shadow-lg max-w-[720px] w-full mx-2 sm:mx-4">
      {/* YouTube Video Player */}
      <div className="relative bg-black">
        <video 
          src={media.preview} 
          controls 
          className="w-full max-h-[405px]"
        />
      </div>

      {/* YouTube Content */}
      <div className="p-4">
        <div className="mb-3">
          <textarea
            ref={textareaRef}
            value={caption}
            onChange={(e) => onCaptionChange(e.target.value)}
            placeholder="Video title"
            className="w-full text-[20px] font-semibold text-[#0f0f0f] resize-none border-none outline-none bg-transparent leading-6 min-h-[24px]"
          />
        </div>

      <div className="flex items-center justify-between mb-4">
          <div className="text-[14px] text-[#606060]">
            120K views • 3 days ago
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
          <div className="flex-1">
            <div className="font-semibold text-[14px] text-[#0f0f0f]">Your Channel</div>
            <div className="text-[12px] text-[#606060]">485K subscribers</div>
          </div>
          <button className="bg-[#cc0000] text-white px-4 py-2 rounded-full text-[14px] font-medium">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-start p-4 pt-8 pb-8 overflow-y-auto">
      <div ref={modalRef} className="relative max-w-[720px] w-full">
        {/* Top Bar - Perfect alignment */}
        <div className="flex items-center justify-between mb-4 ml-2 mr-1 sm:mx-4">
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
