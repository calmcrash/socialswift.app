import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, X } from 'lucide-react';
import { PostMedia } from '../types';
import SocialMediaPreviewModal from './SocialMediaPreviewModal';

type FileUploaderProps = {
  onChange: (media: PostMedia | undefined) => void;
  value?: PostMedia;
  caption?: string;
  onCaptionChange?: (caption: string) => void;
};

const FileUploader: React.FC<FileUploaderProps> = ({ 
  onChange, 
  value, 
  caption = '', 
  onCaptionChange 
}) => {
  const [error, setError] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const MAX_SIZE = 2 * 1024 * 1024 * 1024; // 2GB

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Check file size
    if (file.size > MAX_SIZE) {
      setError('File is too large. Maximum size is 2GB.');
      return;
    }

    // Determine file type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      setError('Only image or video files are allowed.');
      return;
    }

    // Create preview URL
    const preview = URL.createObjectURL(file);
    
    onChange({
      file,
      preview,
      type: isImage ? 'image' : 'video'
    });
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': [],
      'video/*': []
    },
    maxSize: MAX_SIZE,
    multiple: false
  });

  const removeMedia = () => {
    onChange(undefined);
  };

  const handleThumbnailClick = () => {
    if (value) {
      setShowPreviewModal(true);
    }
  };
  return (
    <div className="w-full">
      {value ? (
        <div className="relative border border-gray-200 rounded-lg overflow-hidden cursor-pointer" onClick={handleThumbnailClick}>
          {value.type === 'image' ? (
            <img 
              src={value.preview} 
              alt="Preview" 
              className="w-full h-64 object-contain bg-gray-50"
            />
          ) : (
            <video 
              src={value.preview} 
              className="w-full h-64 object-contain bg-gray-50"
            />
          )}
          <button
            onClick={removeMedia}
            onClick={(e) => {
              e.stopPropagation();
              removeMedia();
            }}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
          <div className="px-3 py-2 text-sm text-gray-600 bg-gray-50 border-t border-gray-200">
            {value.file.name} ({(value.file.size / (1024 * 1024)).toFixed(2)} MB)
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <FileUp className="mx-auto h-10 w-10 text-gray-400 mb-3" />
          <p className="text-gray-700 font-medium">
            {isDragActive ? 'Drop your file here' : 'Drag & drop your image or video'}
          </p>
          <p className="text-gray-500 text-sm mt-1 text-center">or click to browse</p>
          
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}

      {showPreviewModal && value && (
        <SocialMediaPreviewModal
          media={value}
          caption={caption}
          onClose={() => setShowPreviewModal(false)}
          onCaptionChange={onCaptionChange || (() => {})}
        />
      )}
    </div>
  );
};

export default FileUploader;