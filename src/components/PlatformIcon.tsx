import React from 'react';

interface PlatformIconProps {
  name: string;
  className?: string;
}

const PlatformIcon: React.FC<PlatformIconProps> = ({ name, className }) => {
  return (
    <img
      src={name}
      alt="Platform icon"
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default PlatformIcon;