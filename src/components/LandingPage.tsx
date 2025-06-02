import React from 'react';
import LoginForm from './LoginForm';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
};

export default LandingPage;