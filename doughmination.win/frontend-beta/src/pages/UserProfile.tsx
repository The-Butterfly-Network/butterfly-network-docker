import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UserData {
  id: number;
  username: string;
  display_name?: string;
  avatar_url?: string;
  is_admin: boolean;
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/user_info', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        setError('Failed to fetch user data');
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 pt-20">
        <div className="text-center font-comic">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 pt-20">
        <div className="max-w-md mx-auto">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto p-6 pt-20">
        <div className="max-w-md mx-auto text-center">
          <p className="font-comic mb-4">User data not available</p>
          <Button variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 pt-20">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-comic">User Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              {userData.avatar_url ? (
                <img 
                  src={userData.avatar_url} 
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://www.yuri-lover.win/pfp/fallback_avatar.png';
                  }}
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-600 text-2xl">👤</span>
                </div>
              )}
              
              <h2 className="text-xl font-comic mb-2">
                {userData.display_name || userData.username}
                {userData.is_admin && (
                  <Badge variant="secondary" className="ml-2">Admin</Badge>
                )}
              </h2>
              
              <p className="text-sm text-muted-foreground">
                @{userData.username}
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button asChild>
                <Link to="/admin/user/edit" className="font-comic">
                  Edit Profile
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/" className="font-comic">
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}