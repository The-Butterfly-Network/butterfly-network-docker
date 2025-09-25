import React, { useState, useEffect } from 'react';

const Welcome = ({ loggedIn, isAdmin }) => {
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageError, setImageError] = useState(false);
  
  // Default avatar for fallback
  const defaultAvatar = "https://www.yuri-lover.win/cdn/pfp/fallback_avatar.png";
  
  useEffect(() => {
    if (loggedIn) {
      // Fetch user data when logged in
      const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch('/api/user_info', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setDisplayName(data.display_name || data.username);
            setAvatarUrl(data.avatar_url || '');
            setImageError(false);
          } else {
            // If API call fails, try to extract username from JWT token
            try {
              const token = localStorage.getItem('token');
              if (token) {
                // JWT tokens are in the format: header.payload.signature
                const payload = token.split('.')[1];
                // Decode the base64 payload
                const decodedPayload = JSON.parse(atob(payload));
                // Extract display_name or username from the payload
                setDisplayName(decodedPayload.display_name || decodedPayload.sub || 'User');
                setAvatarUrl(decodedPayload.avatar_url || '');
              }
            } catch (error) {
              console.error('Error parsing token:', error);
              setDisplayName('User'); // Fallback
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setDisplayName('User'); // Fallback
        }
      };
      
      fetchUserData();
    }
  }, [loggedIn]);
  
  // Handle image error
  const handleImageError = () => {
    console.error('Failed to load avatar image in Welcome component');
    setImageError(true);
  };
  
  if (!loggedIn) return null;
  
  return (
    <div className="welcome-message py-2 px-4 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        {avatarUrl && !imageError ? (
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={avatarUrl} 
              alt={displayName} 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={defaultAvatar} 
              alt="Default avatar"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <p className="text-lg">
          Welcome, <span className="font-bold">{displayName}</span>
          {isAdmin && !displayName.includes('Admin') && <span className="ml-2 text-purple-500 dark:text-purple-400"> (Admin)</span>}
        </p>
      </div>
    </div>
  );
};

export default Welcome;
