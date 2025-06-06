import React, { useState } from 'react';
import { Mail, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from './AuthProvider';
import Modal from './Modal';
import Logo from './Logo';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <Logo />
      
      <div>
        {user ? (
          <button 
            onClick={() => setShowProfileModal(true)}
            className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden border border-gray-200 hover:border-blue-500 transition-colors duration-200"
          >
            {user.image ? (
              <img 
                src={user.image} 
                alt={user.name || 'User profile'} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <Mail className="h-5 w-5 text-gray-600" />
              </div>
            )}
          </button>
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        )}
      </div>

      {showProfileModal && (
        <Modal onClose={() => setShowProfileModal(false)} title="Your Profile">
          <div className="flex flex-col items-center p-4">
            {user?.image ? (
              <img 
                src={user.image} 
                alt={user.name || 'User profile'} 
                className="h-20 w-20 rounded-full mb-4 border-2 border-gray-200"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <UserIcon className="h-10 w-10 text-gray-400" />
              </div>
            )}
            
            <h3 className="text-lg font-medium">{user?.name || 'User'}</h3>
            <p className="text-gray-600 mb-6">{user?.email}</p>
            
            <button
              onClick={() => {
                logout();
                setShowProfileModal(false);
              }}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </button>
          </div>
        </Modal>
      )}
    </header>
  );
};

export default Header;