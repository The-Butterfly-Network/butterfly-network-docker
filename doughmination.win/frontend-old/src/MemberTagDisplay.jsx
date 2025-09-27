import React from 'react';

const MemberTagDisplay = ({ tags = [], className = '' }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-1 mt-2 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getTagStyle(tag)}`}
        >
          {getTagIcon(tag)} {getTagDisplayName(tag)}
        </span>
      ))}
    </div>
  );
};

// Helper function to get styling for different tag types
const getTagStyle = (tag) => {
  const styles = {
    'host': 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
    'valorant': 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
    'pets': 'bg-pink-100 text-pink-800 dark:bg-pink-800 dark:text-pink-100',
    'vocaloids': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-800 dark:text-cyan-100',
  };
  
  return styles[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
};

// Helper function to get icons for different tag types
const getTagIcon = (tag) => {
  const icons = {
    'saja': '🔫',
    'huntrix': '🎤',
    'fictives': '🦋',
  };
  
  return icons[tag] || '📁';
};

// Helper function to get display names for tags
const getTagDisplayName = (tag) => {
  const displayNames = {
    'host': 'Host',
    'valorant': 'Valorant',
    'pets': 'Pets',
    'vocaloids': 'Vocaloids',
  };
  
  return displayNames[tag] || tag.charAt(0).toUpperCase() + tag.slice(1);
};

export default MemberTagDisplay;
