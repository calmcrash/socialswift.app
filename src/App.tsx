import React from 'react';
import { platforms as initialPlatforms } from './utils/platforms';
import { AuthProvider, useAuth } from './components/AuthProvider';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import PostCreator from './components/PostCreator';
import LandingPage from './components/LandingPage';
import { Platform, Post } from './types';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [platforms, setPlatforms] = React.useState<Platform[]>(initialPlatforms);
  const [posts, setPosts] = React.useState<Post[]>([]);

  const handlePost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
    alert('Post scheduled successfully! It will be shared across your selected platforms.');
  };

  const handleConnectPlatform = (platformId: string) => {
    setPlatforms(prev => 
      prev.map(platform => 
        platform.id === platformId 
          ? { ...platform, connected: true } 
          : platform
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <PostCreator 
            platforms={platforms} 
            onPost={handlePost} 
          />
        </div>
        
        {posts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Recent posts</h2>
            <div className="space-y-6">
              {posts.map((post, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <p className="text-gray-800 mb-3">{post.caption}</p>
                  {post.media && (
                    <div className="mb-3">
                      {post.media.type === 'image' ? (
                        <img 
                          src={post.media.preview} 
                          alt="Post media" 
                          className="max-h-48 rounded-lg" 
                        />
                      ) : (
                        <video 
                          src={post.media.preview} 
                          controls 
                          className="max-h-48 rounded-lg" 
                        />
                      )}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {post.platforms.map(platformId => {
                      const platform = platforms.find(p => p.id === platformId);
                      return platform ? (
                        <span 
                          key={platformId}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {platform.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;