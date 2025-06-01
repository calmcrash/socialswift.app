import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { Mail } from 'lucide-react';
import Logo from './Logo';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    await login('email', email);
    setIsSubmitting(false);
  };

  const handleProviderLogin = async (provider: 'google' | 'apple') => {
    setIsSubmitting(true);
    await login(provider);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="text-center mb-8">
        <Logo className="justify-center" />
        <p className="text-gray-600 mt-2">Sign in to manage your social media posts</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => handleProviderLogin('google')}
          disabled={isSubmitting}
          className="flex items-center justify-center w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            className="h-5 w-5 mr-3" 
          />
          <span className="font-medium">Continue with Google</span>
        </button>

        <button
          onClick={() => handleProviderLogin('apple')}
          disabled={isSubmitting}
          className="flex items-center justify-center w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
            alt="Apple" 
            className="h-5 w-5 mr-3" 
          />
          <span className="font-medium">Continue with Apple</span>
        </button>

        {showEmailInput ? (
          <form onSubmit={handleEmailLogin} className="space-y-3">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in with Email'}
            </button>
          </form>
        ) : (
          <button
            onClick={() => setShowEmailInput(true)}
            disabled={isSubmitting}
            className="flex items-center justify-center w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
          >
            <Mail className="h-5 w-5 mr-3 text-gray-600" />
            <span className="font-medium">Continue with Email</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginForm;