import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';
import useTheme from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';

// Define interfaces for type safety
interface Member {
  id: number;
  name: string;
  display_name?: string;
  avatar_url?: string;
  pronouns?: string;
  tags?: string[];
  is_private: boolean;
  is_cofront: boolean;
  is_special: boolean;
  _isFromCofront?: boolean;
  _cofrontName?: string;
  _cofrontDisplayName?: string;
  component_avatars?: string[];
  component_members?: Member[];
}

interface Fronting {
  member_name: string;
  display_name?: string;
  avatar_url?: string;
}

interface SystemInfo {
  mental_state?: MentalState;
}

interface MentalState {
  level: string;
  notes?: string;
  updated_at: string;
}

export default function Index() {
  const [theme] = useTheme();
  const navigate = useNavigate();
  
  // State management
  const [members, setMembers] = useState<Member[]>([]);
  const [fronting, setFronting] = useState<Fronting | null>(null);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSubSystemFilter, setCurrentSubSystemFilter] = useState<string | null>(null);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  // Initialize app data
  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    setLoading(true);
    try {
      // Check authentication status
      await checkAuthStatus();
      
      // Fetch public data
      await Promise.all([
        fetchMembers(),
        fetchFronting(),
        fetchSystemInfo()
      ]);
    } catch (error) {
      console.error('Initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoggedIn(false);
      setIsAdmin(false);
      return;
    }

    // Fast-path for mock dev token
    if (token.startsWith('mock-')) {
      setLoggedIn(true);
      setIsAdmin(token === 'mock-admin');
      return;
    }

    try {
      const response = await fetch("/api/is_admin", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setLoggedIn(true);
        setIsAdmin(!!data.isAdmin);
      } else {
        setLoggedIn(false);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Initialization error:', error);
      setLoggedIn(false);
      setIsAdmin(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch("/api/members");
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
        
        // Extract unique tags
        const tags = new Set<string>();
        data.forEach((member: Member) => {
          member.tags?.forEach(tag => tags.add(tag));
        });
        setAvailableTags(Array.from(tags));
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const fetchFronting = async () => {
    try {
      const response = await fetch("/api/fronters");
      if (response.ok) {
        const data = await response.json();
        setFronting(data);
      }
    } catch (error) {
      console.error('Error fetching fronting:', error);
    }
  };

  const fetchSystemInfo = async () => {
    try {
      const response = await fetch("/api/system");
      if (response.ok) {
        const data = await response.json();
        setSystemInfo(data);
      }
    } catch (error) {
      console.error('Error fetching system info:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  // Event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleSubSystemFilterChange = useCallback((filter: string | null) => {
    setCurrentSubSystemFilter(filter);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  // Filter members based on search and subsystem filter
  useEffect(() => {
    let filtered = members;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(member =>
        (member.display_name || member.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply subsystem filter
    if (currentSubSystemFilter) {
      if (currentSubSystemFilter === 'untagged') {
        filtered = filtered.filter(member => !member.tags || member.tags.length === 0);
      } else {
        filtered = filtered.filter(member => 
          member.tags?.includes(currentSubSystemFilter)
        );
      }
    }

    setFilteredMembers(filtered);
  }, [members, searchQuery, currentSubSystemFilter]);

  // Mental state helper functions
  const getMentalStateLabel = (level: string) => {
    const labels: { [key: string]: string } = {
      'safe': 'Safe',
      'unstable': 'Unstable',
      'idealizing': 'Idealizing',
      'self-harming': 'Self-Harming',
      'highly at risk': 'Highly At Risk'
    };
    return labels[level] || level;
  };

  const getMentalStateIcon = (level: string) => {
    const icons: { [key: string]: string } = {
      'safe': '✅',
      'unstable': '⚠️',
      'idealizing': '❗',
      'self-harming': '🚨',
      'highly at risk': '⛔'
    };
    return icons[level] || '❓';
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen transition-colors ${
        theme === 'dark' ? 'text-green-400' : 'text-pink-500'
      }`}>
        <div className="text-2xl font-comic">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header with navigation */}
      <header className="fixed top-0 left-0 w-full z-40">
        <div className={`transition-all ${
          theme === 'dark' 
            ? 'bg-black/90 border-b border-green-500/20' 
            : 'bg-white/90 border-b border-pink-300/20'
        } backdrop-blur-sm`}>
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link 
              to="/" 
              className={`text-2xl font-bold font-comic transition-all duration-300 ${
                theme === 'dark' 
                  ? 'text-green-400 drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]' 
                  : 'text-pink-500 drop-shadow-[0_0_10px_rgba(255,182,193,0.5)]'
              }`}
            >
              Doughmination System™
            </Link>
            
            {/* Desktop Navigation */}
            <div className="desktop-nav hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://www.butterfly-network.win"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-comic"
                >
                  Butterfly Network
                </a>
              </Button>
              {loggedIn ? (
                <>
                  {isAdmin && (
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/admin/dashboard" className="font-comic">
                        Admin Panel
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/admin/user" className="font-comic">
                      Profile
                    </Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleLogout} className="font-comic">
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/login" className="font-comic">
                    Login
                  </Link>
                </Button>
              )}
            </div>
            
            {/* Hamburger menu button - for mobile devices */}
            <button 
              className={`hamburger-menu flex md:hidden items-center justify-center p-2 rounded-md transition-colors ${
                theme === 'dark' 
                  ? 'bg-green-900/50 text-green-400 hover:bg-green-800/50' 
                  : 'bg-pink-100 text-pink-500 hover:bg-pink-200'
              }`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation overlay */}
        {menuOpen && (
          <div className="mobile-menu-overlay fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={toggleMenu}>
            <div 
              className={`absolute right-0 top-[61px] w-64 max-w-[80vw] h-screen shadow-lg ${
                theme === 'dark' ? 'bg-black/95' : 'bg-white/95'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="flex flex-col p-4 gap-3">
                <li>
                  <a
                    href="https://www.butterfly-network.win"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full px-4 py-3 rounded-lg text-sm text-center transition-all font-comic ${
                      theme === 'dark' 
                        ? 'bg-green-600 text-black hover:bg-green-500' 
                        : 'bg-pink-500 text-white hover:bg-pink-400'
                    }`}
                    onClick={toggleMenu}
                  >
                    Butterfly Network
                  </a>
                </li>
                {loggedIn ? (
                  <>
                    {isAdmin && (
                      <li>
                        <Link 
                          to="/admin/dashboard"
                          className={`block w-full px-4 py-3 rounded-lg text-sm text-center transition-all font-comic ${
                            theme === 'dark' 
                              ? 'bg-green-500 text-black hover:bg-green-400' 
                              : 'bg-pink-400 text-white hover:bg-pink-300'
                          }`}
                          onClick={toggleMenu}
                        >
                          Admin Panel
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link 
                        to="/admin/user"
                        className={`block w-full px-4 py-3 rounded-lg text-sm text-center transition-all font-comic ${
                          theme === 'dark' 
                            ? 'bg-green-600 text-black hover:bg-green-500' 
                            : 'bg-pink-500 text-white hover:bg-pink-400'
                        }`}
                        onClick={toggleMenu}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          toggleMenu();
                        }}
                        className="w-full px-4 py-3 bg-red-500 text-white rounded-lg text-sm text-center hover:bg-red-600 transition-colors font-comic"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link 
                      to="/admin/login"
                      className={`block w-full px-4 py-3 rounded-lg text-sm text-center transition-all font-comic ${
                        theme === 'dark' 
                          ? 'bg-green-600 text-black hover:bg-green-500' 
                          : 'bg-pink-500 text-white hover:bg-pink-400'
                      }`}
                      onClick={toggleMenu}
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </header>

      {/* Space for fixed header */}
      <div className="h-20"></div>

      {/* Main content */}
      <main className="container mx-auto px-2 sm:px-4 pt-4 flex-grow">
        <div className="flex">
          <div className="flex-1">
            <div className="content-wrapper flex flex-col gap-2 sm:gap-4">
              <div className="mt-2">
                <h1 className={`text-4xl font-bold mb-8 text-center font-comic transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'text-green-400 drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]' 
                    : 'text-pink-500 drop-shadow-[0_0_10px_rgba(255,182,193,0.5)]'
                }`}>
                  System Members
                </h1> 
                
                {/* Mental State Banner */}
                {systemInfo?.mental_state && (
                  <div className={`mental-state-banner ${systemInfo.mental_state.level.replace(' ', '-')} mb-6 p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'
                  }`}>
                    <div className="flex items-center justify-center gap-3">
                      <span className="mental-state-icon text-2xl">
                        {getMentalStateIcon(systemInfo.mental_state.level)}
                      </span>
                      <div>
                        <span className="mental-state-label font-comic">Current Status: </span>
                        <span className="mental-state-level font-comic font-bold">
                          {getMentalStateLabel(systemInfo.mental_state.level)}
                        </span>
                        {systemInfo.mental_state.notes && (
                          <p className="mental-state-notes mt-2 font-comic text-sm opacity-80">
                            {systemInfo.mental_state.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <small className="mental-state-updated block mt-2 opacity-75 text-center font-comic">
                      Last updated: {new Date(systemInfo.mental_state.updated_at).toLocaleString()}
                    </small>
                  </div>
                )}
                
                {/* Currently Fronting Section */}
                {fronting && (
                  <div className={`mb-6 p-4 border-b border-opacity-30 text-center ${
                    theme === 'dark' ? 'border-green-500/30' : 'border-pink-300/30'
                  }`}>
                    <h2 className="text-xl font-comic mb-3">Currently Fronting</h2>
                    <div className="flex items-center justify-center gap-3">
                      {fronting.avatar_url && (
                        <img 
                          src={fronting.avatar_url} 
                          alt={fronting.display_name || fronting.member_name}
                          className="w-16 h-16 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://www.yuri-lover.win/pfp/fallback_avatar.png';
                          }}
                        />
                      )}
                      <div>
                        <h3 className={`text-2xl font-comic ${
                          theme === 'dark' ? 'text-green-400' : 'text-pink-500'
                        }`}>
                          {fronting.display_name || fronting.member_name}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Search and Filter */}
                <div className="mb-6 space-y-4">
                  {/* Tag Filter Buttons */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => handleSubSystemFilterChange(null)}
                      className={`px-4 py-2 rounded-lg transition-all font-comic ${
                        currentSubSystemFilter === null
                          ? (theme === 'dark' ? 'bg-green-600 text-black' : 'bg-pink-600 text-white')
                          : (theme === 'dark' ? 'bg-gray-700 text-green-300 hover:bg-gray-600' : 'bg-gray-200 text-pink-700 hover:bg-gray-300')
                      }`}
                    >
                      All Members
                    </button>
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleSubSystemFilterChange(tag)}
                        className={`px-4 py-2 rounded-lg transition-all font-comic ${
                          currentSubSystemFilter === tag
                            ? (theme === 'dark' ? 'bg-green-600 text-black' : 'bg-pink-600 text-white')
                            : (theme === 'dark' ? 'bg-gray-700 text-green-300 hover:bg-gray-600' : 'bg-gray-200 text-pink-700 hover:bg-gray-300')
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    <button
                      onClick={() => handleSubSystemFilterChange('untagged')}
                      className={`px-4 py-2 rounded-lg transition-all font-comic ${
                        currentSubSystemFilter === 'untagged'
                          ? (theme === 'dark' ? 'bg-green-600 text-black' : 'bg-pink-600 text-white')
                          : (theme === 'dark' ? 'bg-gray-700 text-green-300 hover:bg-gray-600' : 'bg-gray-200 text-pink-700 hover:bg-gray-300')
                      }`}
                    >
                      Untagged
                    </button>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative max-w-md mx-auto mb-6">
                    <div className={`flex items-center border rounded-lg overflow-hidden transition-all ${
                      theme === 'dark' 
                        ? 'bg-gray-900/90 border-green-500/30 text-green-400'
                        : 'bg-white/90 border-pink-300/30 text-pink-700'
                    }`}>
                      <div className="flex-shrink-0 p-3 opacity-60">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search members..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full p-3 bg-transparent outline-none placeholder-opacity-60 font-comic"
                      />
                      {searchQuery && (
                        <button 
                          onClick={clearSearch}
                          className="flex-shrink-0 p-3 hover:opacity-70 transition-opacity"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Members Grid */}
                {filteredMembers.length > 0 ? (
                  <div className="member-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredMembers
                      .filter(member => !member.is_private && !member.is_cofront && !member.is_special)
                      .map((member) => (
                        <Link
                          key={member.id}
                          to={`/${member.name}`}
                          className={`member-grid-item block p-4 rounded-lg transition-all hover:scale-105 ${
                            theme === 'dark' 
                              ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-green-500/20' 
                              : 'bg-white/50 hover:bg-white/70 border border-pink-300/20'
                          }`}
                        >
                          <div className="text-center">
                            <img 
                              src={member.avatar_url || 'https://www.yuri-lover.win/pfp/fallback_avatar.png'} 
                              alt={member.display_name || member.name}
                              className="w-16 h-16 mx-auto rounded-full object-cover mb-2"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://www.yuri-lover.win/pfp/fallback_avatar.png';
                              }}
                            />
                            <h3 className={`font-comic font-semibold text-sm ${
                              theme === 'dark' ? 'text-green-400' : 'text-pink-600'
                            }`}>
                              {member.display_name || member.name}
                            </h3>
                            {member.pronouns && (
                              <p className="text-xs opacity-70 mt-1 font-comic">
                                {member.pronouns}
                              </p>
                            )}
                            {member.tags && member.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2 justify-center">
                                {member.tags.slice(0, 2).map((tag, index) => (
                                  <span
                                    key={index}
                                    className={`text-xs px-2 py-1 rounded-full font-comic ${
                                      theme === 'dark' 
                                        ? 'bg-green-900/50 text-green-300' 
                                        : 'bg-pink-100 text-pink-700'
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {member.tags.length > 2 && (
                                  <span className="text-xs opacity-70 font-comic">
                                    +{member.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="font-comic text-lg opacity-70">
                      {searchQuery || currentSubSystemFilter 
                        ? 'No members found matching your criteria.' 
                        : 'No members available.'
                      }
                    </p>
                    {(searchQuery || currentSubSystemFilter) && (
                      <div className="mt-4 flex gap-2 justify-center">
                        {searchQuery && (
                          <button 
                            onClick={clearSearch}
                            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 font-comic"
                          >
                            Clear search
                          </button>
                        )}
                        {currentSubSystemFilter && (
                          <button 
                            onClick={() => setCurrentSubSystemFilter(null)}
                            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 font-comic"
                          >
                            Clear filter
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}