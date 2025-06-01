export type User = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  provider: 'google' | 'apple' | 'email';
};

export type Platform = {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  enabled: boolean;
};

export type PostMedia = {
  file: File;
  preview: string;
  type: 'image' | 'video';
};

export type Post = {
  caption: string;
  media?: PostMedia;
  platforms: string[];
};