export type User = {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  provider: 'google' | 'apple' | 'email';
};

// Platform configuration type (matches platforms.ts)
export type Platform = {
  name: string;
  icon: string;
  type: 'social' | 'professional' | 'messaging' | 'video' | 'blogging' | 'community' | 'audio' | 'newsletter' | 'streaming' | 'marketplace' | 'creative' | 'dating' | 'lifestyle';
  category: 'mainstream' | 'business' | 'creative' | 'tech' | 'niche' | 'regional' | 'emerging' | 'web3';
  hashtags: {
    supported: boolean;
    min: number;
    max: number;
    optimal: number;
    style: 'professional' | 'casual' | 'trending' | 'niche' | 'creative' | 'community' | 'none' | 'branded' | 'technical';
    placement: 'caption' | 'description' | 'tags' | 'comments' | 'title' | 'none' | 'end' | 'inline';
    notes: string;
  };
};

// User's connected platform instance
export type ConnectedPlatform = {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  enabled: boolean;
  accessToken?: string;
  refreshToken?: string;
  accountId?: string;
  accountName?: string;
  lastSync?: Date;
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

// SEO and optimization types
export type HashtagSuggestion = {
  tag: string;
  popularity: 'low' | 'medium' | 'high';
  category: string;
  relevanceScore: number;
};

export type OptimizedContent = {
  platform: string;
  caption: string;
  hashtags: string[];
  characterCount: number;
  mediaOptimizations?: {
    format: string;
    dimensions: string;
    fileSize: string;
  };
};

export type PlatformFilter = {
  type?: Platform['type'];
  category?: Platform['category'];
  connected?: boolean;
  enabled?: boolean;
  searchTerm?: string;
};
