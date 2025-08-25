export interface Platform {
  name: string;
  icon: string;
  type: 'social' | 'professional' | 'messaging' | 'video' | 'blogging' | 'community' | 'audio' | 'newsletter' | 'streaming' | 'marketplace';
  category: 'mainstream' | 'business' | 'creative' | 'tech' | 'niche';
  hashtags: {
    supported: boolean;
    min: number;
    max: number;
    optimal: number;
    style: 'professional' | 'casual' | 'trending' | 'niche' | 'creative' | 'community' | 'none';
    placement: 'caption' | 'description' | 'tags' | 'comments' | 'title' | 'none';
    notes: string;
  };
}

export const platforms: Platform[] = [
  {
    name: 'Alignable',
    icon: '/icons/alignable.svg',
    type: 'professional',
    category: 'business',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'professional',
      placement: 'caption',
      notes: 'Focus on local business and networking hashtags. Industry-specific tags perform best.'
    }
  },
  {
    name: 'AngelList',
    icon: '/icons/angellist.svg',
    type: 'professional',
    category: 'business',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'professional',
      placement: 'description',
      notes: 'Startup and investment focused hashtags. Tech industry tags are highly effective.'
    }
  },
  {
    name: 'Behance',
    icon: '/icons/behance.svg',
    type: 'creative',
    category: 'creative',
    hashtags: {
      supported: true,
      min: 3,
      max: 20,
      optimal: 8,
      style: 'creative',
      placement: 'tags',
      notes: 'Creative industry hashtags are essential. Mix broad art tags with specific technique tags.'
    }
  },
  {
    name: 'Bluesky',
    icon: '/icons/bluesky.svg',
    type: 'social',
    category: 'tech',
    hashtags: {
      supported: true,
      min: 1,
      max: 3,
      optimal: 2,
      style: 'casual',
      placement: 'caption',
      notes: 'Twitter-like hashtag usage. Focus on community and topical hashtags rather than promotional.'
    }
  },
  {
    name: 'Clubhouse',
    icon: '/icons/clubhouse.svg',
    type: 'audio',
    category: 'niche',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Audio-first platform does not use hashtags. Focus on room titles and descriptions instead.'
    }
  },
  {
    name: 'Discord',
    icon: '/icons/discord.svg',
    type: 'messaging',
    category: 'tech',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Uses channels and servers instead of hashtags. Community-focused messaging platform.'
    }
  },
  {
    name: 'Dribbble',
    icon: '/icons/dribbble.svg',
    type: 'creative',
    category: 'creative',
    hashtags: {
      supported: true,
      min: 3,
      max: 20,
      optimal: 10,
      style: 'creative',
      placement: 'tags',
      notes: 'Design-specific hashtags are crucial. Mix technique tags with industry and style tags.'
    }
  },
  {
    name: 'Facebook',
    icon: '/icons/facebook.svg',
    type: 'social',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 1,
      max: 10,
      optimal: 3,
      style: 'casual',
      placement: 'caption',
      notes: '2025 update: Facebook reduced hashtag effectiveness. Focus on 1-3 highly relevant hashtags only.'
    }
  },
  {
    name: 'Farcaster',
    icon: '/icons/farcaster.svg',
    type: 'social',
    category: 'tech',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 2,
      style: 'niche',
      placement: 'caption',
      notes: 'Web3 social network. Crypto and tech hashtags perform best. Community-driven tagging.'
    }
  },
  {
    name: 'Flickr',
    icon: '/icons/flickr.svg',
    type: 'creative',
    category: 'creative',
    hashtags: {
      supported: true,
      min: 5,
      max: 75,
      optimal: 20,
      style: 'creative',
      placement: 'tags',
      notes: 'Photo-centric platform with extensive tagging system. Mix location, technique, and subject tags.'
    }
  },
  {
    name: 'GitHub',
    icon: '/icons/github.svg',
    type: 'professional',
    category: 'tech',
    hashtags: {
      supported: true,
      min: 1,
      max: 20,
      optimal: 5,
      style: 'professional',
      placement: 'tags',
      notes: 'Uses topics instead of hashtags. Focus on programming languages and project types.'
    }
  },
  {
    name: 'Goodreads',
    icon: '/icons/goodreads.svg',
    type: 'community',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 2,
      max: 15,
      optimal: 8,
      style: 'niche',
      placement: 'tags',
      notes: 'Book genres and themes work best. Mix popular genres with specific sub-genres.'
    }
  },
  {
    name: 'Google My Business',
    icon: '/icons/google-business.svg',
    type: 'professional',
    category: 'business',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Business listing platform. Focus on categories, keywords, and local SEO instead of hashtags.'
    }
  },
  {
    name: 'Instagram',
    icon: '/icons/instagram.svg',
    type: 'social',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 1,
      max: 30,
      optimal: 5,
      style: 'trending',
      placement: 'caption',
      notes: '2025 update: Instagram algorithm favors 3-5 highly relevant hashtags over 30. Quality over quantity.'
    }
  },
  {
    name: 'KakaoTalk',
    icon: '/icons/kakaotalk.svg',
    type: 'messaging',
    category: 'niche',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Messaging app popular in Korea. Does not use hashtags in traditional posts.'
    }
  },
  {
    name: 'Lemon8',
    icon: '/icons/lemon8.svg',
    type: 'social',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 3,
      max: 15,
      optimal: 8,
      style: 'trending',
      placement: 'caption',
      notes: 'Lifestyle-focused platform. Mix trending hashtags with niche lifestyle and aesthetic tags.'
    }
  },
  {
    name: 'Lens Protocol',
    icon: '/icons/lens.svg',
    type: 'social',
    category: 'tech',
    hashtags: {
      supported: true,
      min: 1,
      max: 10,
      optimal: 4,
      style: 'niche',
      placement: 'caption',
      notes: 'Web3 social protocol. Crypto, NFT, and decentralized tech hashtags are most effective.'
    }
  },
  {
    name: 'Line',
    icon: '/icons/line.svg',
    type: 'messaging',
    category: 'niche',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Messaging app popular in Asia. Timeline posts support hashtags but not widely used.'
    }
  },
  {
    name: 'LinkedIn',
    icon: '/icons/linkedin.svg',
    type: 'professional',
    category: 'business',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'professional',
      placement: 'caption',
      notes: '2025 best practice: 3 hashtags maximum. Focus on industry-specific and professional development tags.'
    }
  },
  {
    name: 'Mastodon',
    icon: '/icons/mastodon.svg',
    type: 'social',
    category: 'tech',
    hashtags: {
      supported: true,
      min: 1,
      max: 10,
      optimal: 4,
      style: 'community',
      placement: 'caption',
      notes: 'Decentralized platform with strong hashtag culture. Community and topical hashtags are essential for discovery.'
    }
  },
  {
    name: 'Medium',
    icon: '/icons/medium.svg',
    type: 'blogging',
    category: 'creative',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 5,
      style: 'professional',
      placement: 'tags',
      notes: 'Uses tags instead of hashtags. Focus on topic-based tags for better article discovery.'
    }
  },
  {
    name: 'Nextdoor',
    icon: '/icons/nextdoor.svg',
    type: 'community',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 2,
      style: 'community',
      placement: 'caption',
      notes: 'Neighborhood-focused platform. Local community and service-related hashtags work best.'
    }
  },
  {
    name: 'OnlyFans',
    icon: '/icons/onlyfans.svg',
    type: 'social',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 3,
      max: 15,
      optimal: 8,
      style: 'niche',
      placement: 'caption',
      notes: 'Content creator platform. Niche and descriptive hashtags are crucial for discoverability.'
    }
  },
  {
    name: 'Pinterest',
    icon: '/icons/pinterest.svg',
    type: 'creative',
    category: 'creative',
    hashtags: {
      supported: true,
      min: 0,
      max: 20,
      optimal: 5,
      style: 'niche',
      placement: 'description',
      notes: '2025 major update: Pinterest algorithm no longer prioritizes hashtags. Focus on 3-5 descriptive hashtags max.'
    }
  },
  {
    name: 'Quora',
    icon: '/icons/quora.svg',
    type: 'community',
    category: 'niche',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Q&A platform uses topics and spaces instead of hashtags. Focus on relevant topic selection.'
    }
  },
  {
    name: 'Reddit',
    icon: '/icons/reddit.svg',
    type: 'community',
    category: 'mainstream',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Uses subreddits instead of hashtags. Community-specific posting rules vary by subreddit.'
    }
  },
  {
    name: 'Signal',
    icon: '/icons/signal.svg',
    type: 'messaging',
    category: 'tech',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Secure messaging app. Does not support hashtags or public posting features.'
    }
  },
  {
    name: 'Snapchat',
    icon: '/icons/snapchat.svg',
    type: 'social',
    category: 'mainstream',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Uses geofilters and stickers instead of hashtags. Location-based discovery is key.'
    }
  },
  {
    name: 'Substack',
    icon: '/icons/substack.svg',
    type: 'newsletter',
    category: 'creative',
    hashtags: {
      supported: true,
      min: 1,
      max: 10,
      optimal: 5,
      style: 'professional',
      placement: 'tags',
      notes: 'Newsletter platform with tagging system. Topic-based tags help with discoverability.'
    }
  },
  {
    name: 'Telegram',
    icon: '/icons/telegram.svg',
    type: 'messaging',
    category: 'tech',
    hashtags: {
      supported: true,
      min: 1,
      max: 10,
      optimal: 3,
      style: 'community',
      placement: 'caption',
      notes: 'Hashtags work in channels and groups. Use for content organization and search within communities.'
    }
  },
  {
    name: 'Threads',
    icon: '/icons/threads.svg',
    type: 'social',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 2,
      style: 'casual',
      placement: 'caption',
      notes: 'Meta\'s Twitter competitor. Trending and conversational hashtags perform best. Keep it minimal.'
    }
  },
  {
    name: 'TikTok',
    icon: '/icons/tiktok.svg',
    type: 'video',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 3,
      max: 10,
      optimal: 4,
      style: 'trending',
      placement: 'caption',
      notes: '2025 algorithm favors 3-4 trending hashtags mixed with niche tags. Trending hashtags are crucial for FYP.'
    }
  },
  {
    name: 'Tumblr',
    icon: '/icons/tumblr.svg',
    type: 'blogging',
    category: 'creative',
    hashtags: {
      supported: true,
      min: 5,
      max: 30,
      optimal: 15,
      style: 'creative',
      placement: 'tags',
      notes: 'Tag-heavy platform with unique culture. Mix popular tags with very specific niche tags for best reach.'
    }
  },
  {
    name: 'Twitch',
    icon: '/icons/twitch.svg',
    type: 'streaming',
    category: 'tech',
    hashtags: {
      supported: true,
      min: 3,
      max: 10,
      optimal: 5,
      style: 'niche',
      placement: 'tags',
      notes: 'Gaming and streaming platform. Game titles, streaming categories, and community hashtags are essential.'
    }
  },
  {
    name: 'Twitter/X',
    icon: '/icons/twitter.svg',
    type: 'social',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 1,
      max: 3,
      optimal: 2,
      style: 'trending',
      placement: 'caption',
      notes: '2025 best practice: 1-2 hashtags maximum. Trending hashtags are crucial but overuse hurts engagement.'
    }
  },
  {
    name: 'Vimeo',
    icon: '/icons/vimeo.svg',
    type: 'video',
    category: 'creative',
    hashtags: {
      supported: true,
      min: 3,
      max: 20,
      optimal: 8,
      style: 'creative',
      placement: 'tags',
      notes: 'Professional video platform. Creative industry and technical hashtags perform well for discoverability.'
    }
  },
  {
    name: 'WeChat',
    icon: '/icons/wechat.svg',
    type: 'messaging',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'casual',
      placement: 'caption',
      notes: 'Popular in China. Moments posts support hashtags. Cultural and lifestyle hashtags work best.'
    }
  },
  {
    name: 'WhatsApp',
    icon: '/icons/whatsapp.svg',
    type: 'messaging',
    category: 'mainstream',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Messaging app with Status feature. Does not use hashtags in traditional sense.'
    }
  },
  {
    name: 'XING',
    icon: '/icons/xing.svg',
    type: 'professional',
    category: 'business',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'professional',
      placement: 'caption',
      notes: 'German professional network. Industry-specific and professional development hashtags are key.'
    }
  },
  {
    name: 'YouTube',
    icon: '/icons/youtube.svg',
    type: 'video',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 3,
      max: 15,
      optimal: 6,
      style: 'niche',
      placement: 'description',
      notes: '2025 update: YouTube hashtags in descriptions help with search. First 3 hashtags appear above video title.'
    }
  },
  {
    name: 'Zynn',
    icon: '/icons/zynn.svg',
    type: 'video',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 3,
      max: 8,
      optimal: 5,
      style: 'trending',
      placement: 'caption',
      notes: 'Short-form video platform. Trending and challenge hashtags are essential for algorithm visibility.'
    }
  }
];

// Utility functions for hashtag optimization
export const getHashtagRules = (platformName: string): Platform['hashtags'] | null => {
  const platform = platforms.find(p => p.name.toLowerCase() === platformName.toLowerCase());
  return platform ? platform.hashtags : null;
};

export const getOptimalHashtagCount = (platformNames: string[]): Record<string, number> => {
  const result: Record<string, number> = {};
  platformNames.forEach(name => {
    const rules = getHashtagRules(name);
    if (rules) {
      result[name] = rules.optimal;
    }
  });
  return result;
};

export const shouldUseHashtags = (platformName: string): boolean => {
  const rules = getHashtagRules(platformName);
  return rules ? rules.supported : false;
};

export const getHashtagsByPlatformStyle = () => {
  const grouped: Record<string, Platform[]> = {
    professional: [],
    casual: [],
    trending: [],
    niche: [],
    creative: [],
    community: [],
    none: []
  };
  
  platforms.forEach(platform => {
    grouped[platform.hashtags.style].push(platform);
  });
  
  return grouped;
};

export const getPlatformsByHashtagSupport = () => {
  return {
    supported: platforms.filter(p => p.hashtags.supported),
    notSupported: platforms.filter(p => !p.hashtags.supported)
  };
};
