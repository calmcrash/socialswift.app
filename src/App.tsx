import React from 'react';
import { platforms as initialPlatforms } from './utils/platforms';
import { AuthProvider, useAuth } from './components/AuthProvider';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import PostCreator from './components/PostCreator';
import LandingPage from './components/LandingPage';
import { Platform, Post, ConnectedPlatform } from './types';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [platforms] = React.useState<Platform[]>(initialPlatforms);
  const [connectedPlatforms, setConnectedPlatforms] = React.useState<ConnectedPlatform[]>([]);
  const [posts, setPosts] = React.useState<Post[]>([]);

  const handlePost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
    alert('Post scheduled successfully! It will be shared across your selected platforms.');
  };

  const handleConnectPlatform = (platformName: string) => {
    setConnectedPlatforms(prev => {
      const exists = prev.find(cp => cp.name === platformName);
      if (exists) {
        return prev;
      }
      const platformConfig = platforms.find(p => p.name === platformName);
      const newConnection: ConnectedPlatform = {
        id: crypto.randomUUID(),
        name: platformName,
        icon: platformConfig?.icon || '',
        connected: true,
        enabled: true
      };
      return [...prev, newConnection];
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500">
        <div className="animate-spin h-10 w-10 border-4 border-white rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <>
      {/* Fixed gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-cyan-500"></div>
      
      {/* Scrollable content */}
      <div className="relative min-h-screen">
        <Header />
        <div className="container mx-auto py-8 px-4">
          <div className="mb-8">
            <PostCreator
              platforms={platforms}
              connectedPlatforms={connectedPlatforms}
              onPost={handlePost}
              onConnectPlatform={handleConnectPlatform}
            />
          </div>
          
          {posts.length > 0 && (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Recent posts</h2>
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <div key={index} className="border-b border-white/10 pb-6 last:border-0">
                    <p className="text-white mb-3">{post.caption}</p>
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
                      {post.platforms.map(platformName => (
                        <span
                          key={platformName}
                          className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded"
                        >
                          {platformName}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
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