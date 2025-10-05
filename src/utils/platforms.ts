export interface Platform {
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
}

export const platforms: Platform[] = [
  // A-B Platforms
  {
    name: 'Alignable',
    icon: '/icons/alignable.jpeg',
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
    name: 'Amino',
    icon: '/icons/amino.svg',
    type: 'community',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 2,
      max: 10,
      optimal: 5,
      style: 'community',
      placement: 'caption',
      notes: 'Community-specific hashtags are crucial. Focus on fandom and interest-based tags.'
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
      notes: 'Startup, investment, and tech industry hashtags. Focus on funding stages and sectors.'
    }
  },
  {
    name: 'ArtStation',
    icon: '/icons/artstation.svg',
    type: 'creative',
    category: 'creative',
    hashtags: {
      supported: true,
      min: 3,
      max: 15,
      optimal: 8,
      style: 'creative',
      placement: 'tags',
      notes: 'Art style, medium, and technique tags. Industry and software-specific hashtags work well.'
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
      optimal: 10,
      style: 'creative',
      placement: 'tags',
      notes: 'Design categories, tools, and style hashtags. Industry and client-type tags are effective.'
    }
  },
  {
    name: 'Bilibili',
    icon: '/icons/bilibili.svg',
    type: 'video',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 2,
      max: 10,
      optimal: 5,
      style: 'trending',
      placement: 'title',
      notes: 'Chinese platform. Trending topics and anime/gaming tags perform best. Use Chinese characters.'
    }
  },
  {
    name: 'BitChute',
    icon: '/icons/bitchute.svg',
    type: 'video',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 1,
      max: 8,
      optimal: 4,
      style: 'niche',
      placement: 'description',
      notes: 'Alternative content platform. Focus on niche communities and specific topics.'
    }
  },
  {
    name: 'BitClout',
    icon: '/icons/bitclout.avif',
    type: 'social',
    category: 'web3',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'trending',
      placement: 'caption',
      notes: 'Crypto and blockchain hashtags. Focus on DeFi, NFT, and Web3 topics.'
    }
  },
  {
    name: 'Blogger',
    icon: '/icons/blogger.svg',
    type: 'blogging',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 3,
      max: 20,
      optimal: 8,
      style: 'niche',
      placement: 'tags',
      notes: 'SEO-focused hashtags. Use long-tail keywords and topic clusters for better discovery.'
    }
  },
  {
    name: 'BlueSky',
    icon: '/icons/bluesky.png',
    type: 'social',
    category: 'emerging',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'casual',
      placement: 'caption',
      notes: 'Similar to Twitter. Keep hashtags minimal and relevant. Community-building focus.'
    }
  },

  // C-D Platforms
  {
    name: 'Caffeine',
    icon: '/icons/caffeine.png',
    type: 'streaming',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'trending',
      placement: 'title',
      notes: 'Gaming and esports focused. Use game-specific and streaming hashtags.'
    }
  },
  {
    name: 'Clapper',
    icon: '/icons/clapper.png',
    type: 'video',
    category: 'emerging',
    hashtags: {
      supported: true,
      min: 3,
      max: 10,
      optimal: 6,
      style: 'trending',
      placement: 'caption',
      notes: 'TikTok alternative. Focus on trending challenges and music-related hashtags.'
    }
  },
  {
    name: 'Dailymotion',
    icon: '/icons/dailymotion.svg',
    type: 'video',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 2,
      max: 10,
      optimal: 5,
      style: 'niche',
      placement: 'tags',
      notes: 'European focus. Use location-based and language-specific hashtags for better reach.'
    }
  },
  {
    name: 'DeSo Protocol',
    icon: '/icons/deso.png',
    type: 'social',
    category: 'web3',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'technical',
      placement: 'caption',
      notes: 'Web3 and blockchain social platform. Focus on crypto, DeFi, and decentralization topics.'
    }
  },
  {
    name: 'Dev.to',
    icon: '/icons/dev.svg',
    type: 'community',
    category: 'tech',
    hashtags: {
      supported: true,
      min: 1,
      max: 4,
      optimal: 3,
      style: 'technical',
      placement: 'tags',
      notes: 'Developer community. Programming languages, frameworks, and tech concepts work best.'
    }
  },
  {
    name: 'DeviantArt',
    icon: '/icons/deviantart.svg',
    type: 'creative',
    category: 'creative',
    hashtags: {
      supported: true,
      min: 3,
      max: 30,
      optimal: 15,
      style: 'creative',
      placement: 'tags',
      notes: 'Art-focused platform. Use medium, style, fandom, and technique-specific hashtags.'
    }
  },
  {
    name: 'Discord',
    icon: '/icons/discord.svg',
    type: 'community',
    category: 'mainstream',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'No traditional hashtags. Focus on channel names and server discovery instead.'
    }
  },
  {
    name: 'DLive',
    icon: '/icons/dlive.png',
    type: 'streaming',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'trending',
      placement: 'title',
      notes: 'Blockchain streaming platform. Gaming, crypto, and streaming hashtags perform well.'
    }
  },
  {
    name: 'Douyin',
    icon: '/icons/douyin.png',
    type: 'video',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 2,
      max: 5,
      optimal: 4,
      style: 'trending',
      placement: 'caption',
      notes: 'Chinese TikTok. Use Chinese characters and trending challenges. Focus on local trends.'
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
      notes: 'Design community. UI/UX, branding, and design tool hashtags are most effective.'
    }
  },

  // E-G Platforms
  {
    name: 'Ello',
    icon: '/icons/ello.png',
    type: 'creative',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 2,
      max: 10,
      optimal: 5,
      style: 'creative',
      placement: 'caption',
      notes: 'Artist-focused platform. Creative categories and artistic movements work best.'
    }
  },
  {
    name: 'Eventbrite',
    icon: '/icons/eventbrite.svg',
    type: 'marketplace',
    category: 'business',
    hashtags: {
      supported: true,
      min: 2,
      max: 10,
      optimal: 5,
      style: 'professional',
      placement: 'description',
      notes: 'Event discovery platform. Location, event type, and industry hashtags are crucial.'
    }
  },
  {
    name: 'Facebook Pages',
    icon: '/icons/facebook.svg',
    type: 'social',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 1,
      max: 3,
      optimal: 2,
      style: 'branded',
      placement: 'caption',
      notes: 'Minimal hashtag strategy. Focus on branded and location-based hashtags for business pages.'
    }
  },
  {
    name: 'Facebook Personal',
    icon: '/icons/facebook.svg',
    type: 'social',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 0,
      max: 2,
      optimal: 1,
      style: 'casual',
      placement: 'caption',
      notes: 'Hashtags less important. Focus on meaningful content and personal connections.'
    }
  },
  {
    name: 'Farcaster',
    icon: '/icons/farcaster.png',
    type: 'social',
    category: 'web3',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'technical',
      placement: 'caption',
      notes: 'Web3 social protocol. Crypto, blockchain, and tech innovation hashtags work best.'
    }
  },
  {
    name: 'Flickr',
    icon: '/icons/flickr.svg',
    type: 'creative',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 5,
      max: 75,
      optimal: 20,
      style: 'creative',
      placement: 'tags',
      notes: 'Photography platform. Camera, technique, location, and subject hashtags are essential.'
    }
  },
  {
    name: 'Gab',
    icon: '/icons/gab.svg',
    type: 'social',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'niche',
      placement: 'caption',
      notes: 'Alternative social platform. Political and free speech hashtags are common.'
    }
  },
  {
    name: 'Gettr',
    icon: '/icons/gettr.png',
    type: 'social',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'trending',
      placement: 'caption',
      notes: 'Twitter alternative. News, politics, and current events hashtags perform well.'
    }
  },
  {
    name: 'Glass',
    icon: '/icons/glass.png',
    type: 'creative',
    category: 'emerging',
    hashtags: {
      supported: true,
      min: 2,
      max: 10,
      optimal: 5,
      style: 'creative',
      placement: 'caption',
      notes: 'Photography-focused platform. Artistic and technique-based hashtags work best.'
    }
  },
  {
    name: 'Goodreads',
    icon: '/icons/goodreads.svg',
    type: 'community',
    category: 'niche',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Book platform without hashtags. Focus on genres, book clubs, and reading challenges.'
    }
  },
  {
    name: 'Google Business Profile',
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
      notes: 'No hashtags. Focus on location keywords, business categories, and local SEO.'
    }
  },

  // H-K Platforms
  {
    name: 'Hashnode',
    icon: '/icons/hashnode.svg',
    type: 'blogging',
    category: 'tech',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'technical',
      placement: 'tags',
      notes: 'Developer blogging platform. Programming languages, frameworks, and tech concepts.'
    }
  },
  {
    name: 'Hive Social',
    icon: '/icons/hive.png',
    type: 'social',
    category: 'emerging',
    hashtags: {
      supported: true,
      min: 2,
      max: 10,
      optimal: 5,
      style: 'casual',
      placement: 'caption',
      notes: 'Growing Twitter alternative. Casual, community-focused hashtags work well.'
    }
  },
  {
    name: 'Indie Hackers',
    icon: '/icons/indie-hackers.png',
    type: 'community',
    category: 'tech',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'professional',
      placement: 'caption',
      notes: 'Entrepreneur community. Startup, business, and tech hashtags perform best.'
    }
  },
  {
    name: 'Instagram Personal',
    icon: '/icons/instagram.svg',
    type: 'social',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 5,
      max: 30,
      optimal: 15,
      style: 'trending',
      placement: 'caption',
      notes: 'Mix of popular and niche hashtags. Research shows 20-30 hashtags maximize reach.'
    }
  },
  {
    name: 'Instagram Professional',
    icon: '/icons/instagram.svg',
    type: 'social',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 8,
      max: 30,
      optimal: 20,
      style: 'branded',
      placement: 'caption',
      notes: 'Business accounts benefit from branded hashtags mixed with trending and niche tags.'
    }
  },
  {
    name: 'Josh',
    icon: '/icons/josh.png',
    type: 'video',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 3,
      max: 8,
      optimal: 5,
      style: 'trending',
      placement: 'caption',
      notes: 'Indian short video platform. Bollywood, cricket, and Indian culture hashtags work well.'
    }
  },
  {
    name: 'KakaoTalk',
    icon: '/icons/kakaotalk.png',
    type: 'messaging',
    category: 'regional',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Messaging app. No hashtags, focus on stickers and group communication.'
    }
  },
  {
    name: 'Kick',
    icon: '/icons/kick.png',
    type: 'streaming',
    category: 'emerging',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'trending',
      placement: 'title',
      notes: 'Twitch alternative. Gaming categories and streaming hashtags are most effective.'
    }
  },
  {
    name: 'Ko-fi',
    icon: '/icons/kofi.png',
    type: 'creative',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 2,
      max: 10,
      optimal: 5,
      style: 'creative',
      placement: 'description',
      notes: 'Creator support platform. Art styles, commission types, and creator hashtags work.'
    }
  },
  {
    name: 'Kuaishou',
    icon: '/icons/kuaishou.png',
    type: 'video',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 2,
      max: 8,
      optimal: 4,
      style: 'trending',
      placement: 'caption',
      notes: 'Chinese short video platform. Local trends and Chinese culture hashtags are key.'
    }
  },
  {
    name: 'Kwai',
    icon: '/icons/kwai.png',
    type: 'video',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 3,
      max: 10,
      optimal: 6,
      style: 'trending',
      placement: 'caption',
      notes: 'Global short video platform. Music, dance, and lifestyle hashtags perform well.'
    }
  },

  // L-M Platforms
  {
    name: 'Lemon8',
    icon: '/icons/lemon8.png',
    type: 'lifestyle',
    category: 'emerging',
    hashtags: {
      supported: true,
      min: 3,
      max: 15,
      optimal: 8,
      style: 'trending',
      placement: 'caption',
      notes: 'ByteDance lifestyle platform. Fashion, beauty, travel, and lifestyle hashtags work best.'
    }
  },
  {
    name: 'Lens Protocol',
    icon: '/icons/lens.png',
    type: 'social',
    category: 'web3',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'technical',
      placement: 'caption',
      notes: 'Web3 social protocol. DeFi, NFT, and blockchain development hashtags are effective.'
    }
  },
  {
    name: 'Letterboxd',
    icon: '/icons/letterboxd.png',
    type: 'community',
    category: 'niche',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Film review platform. No hashtags, focus on film titles, directors, and reviews.'
    }
  },
  {
    name: 'Likee',
    icon: '/icons/likee.png',
    type: 'video',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 3,
      max: 10,
      optimal: 6,
      style: 'trending',
      placement: 'caption',
      notes: 'Short video platform. Music, dance, comedy, and challenge hashtags are popular.'
    }
  },
  {
    name: 'LINE',
    icon: '/icons/line.png',
    type: 'messaging',
    category: 'regional',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Japanese messaging app. No hashtags, focus on stickers and timeline posts.'
    }
  },
  {
    name: 'LinkedIn Company',
    icon: '/icons/linkedin.svg',
    type: 'professional',
    category: 'business',
    hashtags: {
      supported: true,
      min: 2,
      max: 5,
      optimal: 3,
      style: 'professional',
      placement: 'end',
      notes: 'Business networking. Industry, company, and thought leadership hashtags work best.'
    }
  },
  {
    name: 'LinkedIn Personal',
    icon: '/icons/linkedin.svg',
    type: 'professional',
    category: 'business',
    hashtags: {
      supported: true,
      min: 2,
      max: 5,
      optimal: 3,
      style: 'professional',
      placement: 'end',
      notes: 'Professional networking. Career, industry, and skill-based hashtags are most effective.'
    }
  },
  {
    name: 'Mastodon',
    icon: '/icons/mastadon.svg',
    type: 'social',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'community',
      placement: 'caption',
      notes: 'Decentralized social network. Community-specific and interest-based hashtags work well.'
    }
  },
  {
    name: 'Medium',
    icon: '/icons/medium.svg',
    type: 'blogging',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 3,
      max: 5,
      optimal: 5,
      style: 'professional',
      placement: 'tags',
      notes: 'Publishing platform. Topic-specific and industry hashtags help with discoverability.'
    }
  },
  {
    name: 'Meetup',
    icon: '/icons/meetup.svg',
    type: 'community',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 2,
      max: 10,
      optimal: 5,
      style: 'community',
      placement: 'description',
      notes: 'Event organizing platform. Interest, skill, and location-based hashtags are crucial.'
    }
  },
  {
    name: 'MeWe',
    icon: '/icons/mewe.png',
    type: 'social',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'community',
      placement: 'caption',
      notes: 'Privacy-focused social platform. Community and interest-based hashtags work well.'
    }
  },
  {
    name: 'Minds',
    icon: '/icons/minds.svg',
    type: 'social',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'niche',
      placement: 'caption',
      notes: 'Decentralized social platform. Crypto rewards, use trending and crypto-related hashtags.'
    }
  },
  {
    name: 'Moj',
    icon: '/icons/moj.png',
    type: 'video',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 3,
      max: 10,
      optimal: 6,
      style: 'trending',
      placement: 'caption',
      notes: 'Indian short video platform. Bollywood, regional languages, and Indian trends work best.'
    }
  },
  {
    name: 'MX TakaTak',
    icon: '/icons/mx-takatak.png',
    type: 'video',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 3,
      max: 8,
      optimal: 5,
      style: 'trending',
      placement: 'caption',
      notes: 'Indian short video platform. Regional content and Indian pop culture hashtags are key.'
    }
  },

  // N-P Platforms
  {
    name: 'Naver Band',
    icon: '/icons/naver-band.png',
    type: 'community',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'community',
      placement: 'caption',
      notes: 'Korean social platform. K-pop, Korean culture, and community hashtags work well.'
    }
  },
  {
    name: 'Newgrounds',
    icon: '/icons/newgrounds.png',
    type: 'creative',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 2,
      max: 10,
      optimal: 5,
      style: 'creative',
      placement: 'tags',
      notes: 'Creative community platform. Art styles, game genres, and animation hashtags are key.'
    }
  },
  {
    name: 'Nextdoor',
    icon: '/icons/nextdoor.png',
    type: 'community',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 1,
      max: 3,
      optimal: 2,
      style: 'community',
      placement: 'caption',
      notes: 'Neighborhood social network. Local events, safety, and community hashtags work best.'
    }
  },
  {
    name: '9GAG',
    icon: '/icons/9gag.png',
    type: 'social',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 2,
      max: 8,
      optimal: 4,
      style: 'trending',
      placement: 'caption',
      notes: 'Meme platform. Trending memes, pop culture, and humor hashtags are most effective.'
    }
  },
  {
    name: '9GAG TV',
    icon: '/icons/9gag.png',
    type: 'video',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 2,
      max: 8,
      optimal: 4,
      style: 'trending',
      placement: 'caption',
      notes: 'Video meme platform. Viral video trends and entertainment hashtags perform well.'
    }
  },
  {
    name: 'Noplace',
    icon: '/icons/noplace.png',
    type: 'social',
    category: 'emerging',
    hashtags: {
      supported: true,
      min: 1,
      max: 8,
      optimal: 4,
      style: 'casual',
      placement: 'caption',
      notes: 'New social platform. Gen Z focused, use trending and lifestyle hashtags.'
    }
  },
  {
    name: 'Odnoklassniki',
    icon: '/icons/odnoklassniki.png',
    type: 'social',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'community',
      placement: 'caption',
      notes: 'Russian social network. Use Cyrillic hashtags, family, and local community topics.'
    }
  },
  {
    name: 'Odysee',
    icon: '/icons/odysee.png',
    type: 'video',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 2,
      max: 10,
      optimal: 5,
      style: 'niche',
      placement: 'tags',
      notes: 'Blockchain video platform. Tech, crypto, and alternative content hashtags work well.'
    }
  },
  {
    name: 'Parler',
    icon: '/icons/parler.png',
    type: 'social',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'niche',
      placement: 'caption',
      notes: 'Alternative social platform. Political and current events hashtags are common.'
    }
  },
  {
    name: 'PeerTube',
    icon: '/icons/peertube.png',
    type: 'video',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 2,
      max: 10,
      optimal: 5,
      style: 'community',
      placement: 'tags',
      notes: 'Decentralized video platform. Community-specific and interest-based hashtags work.'
    }
  },
  {
    name: 'Pinterest',
    icon: '/icons/pinterest.svg',
    type: 'creative',
    category: 'mainstream',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Uses keywords instead of hashtags. Focus on descriptive keywords in pin descriptions.'
    }
  },
  {
    name: 'Polywork',
    icon: '/icons/polywork.png',
    type: 'professional',
    category: 'emerging',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'professional',
      placement: 'caption',
      notes: 'Modern professional network. Skills, achievements, and career hashtags work best.'
    }
  },
  {
    name: 'Poparazzi',
    icon: '/icons/poparazzi.png',
    type: 'social',
    category: 'emerging',
    hashtags: {
      supported: true,
      min: 2,
      max: 8,
      optimal: 4,
      style: 'casual',
      placement: 'caption',
      notes: 'Photo sharing for Gen Z. Friendship, lifestyle, and moment-based hashtags work.'
    }
  },
  {
    name: 'ProductHunt',
    icon: '/icons/producthunt.svg',
    type: 'community',
    category: 'tech',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'professional',
      placement: 'description',
      notes: 'Product discovery platform. Tech categories, startup, and innovation hashtags work.'
    }
  },

  // Q-R Platforms
  {
    name: 'QQ',
    icon: '/icons/qq.png',
    type: 'social',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'casual',
      placement: 'caption',
      notes: 'Chinese social platform. Use simplified Chinese characters and local trends.'
    }
  },
  {
    name: 'Quora',
    icon: '/icons/quora.svg',
    type: 'community',
    category: 'mainstream',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Q&A platform without hashtags. Focus on topic following and expertise demonstration.'
    }
  },
  {
    name: 'Quora Spaces',
    icon: '/icons/quora.svg',
    type: 'community',
    category: 'mainstream',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Community feature of Quora. No hashtags, focus on space topics and expertise.'
    }
  },
  {
    name: 'Qzone',
    icon: '/icons/qzone.png',
    type: 'social',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 1,
      max: 8,
      optimal: 4,
      style: 'casual',
      placement: 'caption',
      notes: 'Chinese social network. Personal moments, mood, and lifestyle hashtags in Chinese.'
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
      notes: 'No hashtags. Focus on subreddit communities and engaging titles/content.'
    }
  },
  {
    name: 'Roposo',
    icon: '/icons/roposo.png',
    type: 'social',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 3,
      max: 10,
      optimal: 6,
      style: 'trending',
      placement: 'caption',
      notes: 'Indian social platform. Regional languages, festivals, and cultural hashtags work well.'
    }
  },
  {
    name: 'Rumble',
    icon: '/icons/rumble.png',
    type: 'video',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 2,
      max: 8,
      optimal: 4,
      style: 'niche',
      placement: 'tags',
      notes: 'Alternative video platform. News, politics, and independent content hashtags perform well.'
    }
  },

  // S Platforms
  {
    name: 'ShareChat',
    icon: '/icons/sharechat.png',
    type: 'social',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 3,
      max: 12,
      optimal: 7,
      style: 'trending',
      placement: 'caption',
      notes: 'Indian social platform. Regional languages, festivals, and Bollywood hashtags are key.'
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
      notes: 'No traditional hashtags. Focus on location tags, filters, and Snapchat-specific features.'
    }
  },
  {
    name: 'Spotify Podcasts',
    icon: '/icons/spotify.svg',
    type: 'audio',
    category: 'mainstream',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'No hashtags. Focus on podcast categories, keywords in descriptions, and SEO optimization.'
    }
  },
  {
    name: 'Spoutible',
    icon: '/icons/spoutible.png',
    type: 'social',
    category: 'emerging',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'community',
      placement: 'caption',
      notes: 'Twitter alternative. Community-focused and civil discourse hashtags work well.'
    }
  },
  {
    name: 'Steemit',
    icon: '/icons/steemit.png',
    type: 'blogging',
    category: 'web3',
    hashtags: {
      supported: true,
      min: 3,
      max: 5,
      optimal: 5,
      style: 'technical',
      placement: 'tags',
      notes: 'Blockchain blogging. Crypto earnings-based, use trending tags for maximum rewards.'
    }
  },
  {
    name: 'Substack',
    icon: '/icons/substack.svg',
    type: 'newsletter',
    category: 'mainstream',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Newsletter platform without hashtags. Focus on compelling titles and subscriber engagement.'
    }
  },

  // T-V Platforms
  {
    name: 'Telegram',
    icon: '/icons/telegram.svg',
    type: 'messaging',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'community',
      placement: 'caption',
      notes: 'Channel posts benefit from hashtags. Use for discoverability within channels and groups.'
    }
  },
  {
    name: 'Telegram Channels',
    icon: '/icons/telegram.svg',
    type: 'messaging',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 2,
      max: 8,
      optimal: 4,
      style: 'community',
      placement: 'caption',
      notes: 'Broadcasting platform. Topic-specific hashtags help with channel discoverability.'
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
      optimal: 3,
      style: 'trending',
      placement: 'caption',
      notes: 'Meta\'s Twitter alternative. Similar to Twitter strategy - minimal, relevant hashtags.'
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
      max: 5,
      optimal: 4,
      style: 'trending',
      placement: 'caption',
      notes: '2025 update: 5 hashtag limit. Mix trending and niche hashtags for best performance.'
    }
  },
  {
    name: 'Triller',
    icon: '/icons/triller.png',
    type: 'video',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 3,
      max: 10,
      optimal: 6,
      style: 'trending',
      placement: 'caption',
      notes: 'Music video platform. Music genres, artists, and dance challenge hashtags work best.'
    }
  },
  {
    name: 'Truth Social',
    icon: '/icons/truth-social.svg',
    type: 'social',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'niche',
      placement: 'caption',
      notes: 'Alternative social platform. Political and current events hashtags are common.'
    }
  },
  {
    name: 'Tumblr',
    icon: '/icons/tumblr.svg',
    type: 'social',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 5,
      max: 30,
      optimal: 15,
      style: 'creative',
      placement: 'tags',
      notes: 'Creative microblogging. Fandom, art, and aesthetic hashtags are crucial for discovery.'
    }
  },
  {
    name: 'Twitch',
    icon: '/icons/twitch.svg',
    type: 'streaming',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'trending',
      placement: 'title',
      notes: 'Live streaming platform. Game categories and streaming hashtags in titles and descriptions.'
    }
  },
  {
    name: 'Vero',
    icon: '/icons/vero.png',
    type: 'social',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 2,
      max: 8,
      optimal: 4,
      style: 'creative',
      placement: 'caption',
      notes: 'Ad-free social platform. Creative and lifestyle hashtags work well with engaged community.'
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
      optimal: 10,
      style: 'creative',
      placement: 'tags',
      notes: 'Professional video platform. Creative, technical, and industry-specific hashtags work best.'
    }
  },
  {
    name: 'VK',
    icon: '/icons/vk.svg',
    type: 'social',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'community',
      placement: 'caption',
      notes: 'Russian social network. Use Cyrillic hashtags, local events, and Russian culture topics.'
    }
  },
  {
    name: 'VSCO',
    icon: '/icons/vsco.png',
    type: 'creative',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 3,
      max: 15,
      optimal: 8,
      style: 'creative',
      placement: 'caption',
      notes: 'Photography platform. Aesthetic, photography technique, and mood hashtags work well.'
    }
  },

  // W-Z Platforms
  {
    name: 'WeChat',
    icon: '/icons/wechat.png',
    type: 'social',
    category: 'regional',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Chinese super app. No hashtags, focus on WeChat articles and mini-program content.'
    }
  },
  {
    name: 'Weibo',
    icon: '/icons/weibo.svg',
    type: 'social',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'trending',
      placement: 'caption',
      notes: 'Chinese microblogging. Use Chinese characters, trending topics, and cultural hashtags.'
    }
  },
  {
    name: 'WhatsApp Business',
    icon: '/icons/whatsapp.svg',
    type: 'messaging',
    category: 'business',
    hashtags: {
      supported: false,
      min: 0,
      max: 0,
      optimal: 0,
      style: 'none',
      placement: 'none',
      notes: 'Business messaging app. No hashtags, focus on direct customer communication.'
    }
  },
  {
    name: 'WordPress.com',
    icon: '/icons/wordpress.svg',
    type: 'blogging',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 3,
      max: 15,
      optimal: 8,
      style: 'professional',
      placement: 'tags',
      notes: 'Blogging platform. SEO-focused hashtags and topic categories for better discoverability.'
    }
  },
  {
    name: 'XING',
    icon: '/icons/xing.png',
    type: 'professional',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 1,
      max: 5,
      optimal: 3,
      style: 'professional',
      placement: 'caption',
      notes: 'European professional network. Industry, skills, and German-speaking market hashtags.'
    }
  },
  {
    name: 'X/Twitter',
    icon: '/icons/twitter.svg',
    type: 'social',
    category: 'mainstream',
    hashtags: {
      supported: true,
      min: 1,
      max: 2,
      optimal: 2,
      style: 'trending',
      placement: 'inline',
      notes: '2025 best practice: 1-2 relevant hashtags max. Over-tagging reduces engagement.'
    }
  },
  {
    name: 'Xiaohongshu',
    icon: '/icons/xiaohongshu.png',
    type: 'lifestyle',
    category: 'regional',
    hashtags: {
      supported: true,
      min: 3,
      max: 10,
      optimal: 6,
      style: 'trending',
      placement: 'caption',
      notes: 'Chinese lifestyle platform. Fashion, beauty, travel, and lifestyle hashtags in Chinese.'
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
      optimal: 8,
      style: 'niche',
      placement: 'description',
      notes: 'Video platform. Mix broad and specific hashtags in descriptions, first 3 appear above title.'
    }
  },
  {
    name: 'Zynn',
    icon: '/icons/zynn.png',
    type: 'video',
    category: 'niche',
    hashtags: {
      supported: true,
      min: 3,
      max: 8,
      optimal: 5,
      style: 'trending',
      placement: 'caption',
      notes: 'TikTok alternative. Similar hashtag strategy to TikTok with trending and niche tags.'
    }
  }
];
