import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTheme from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Member {
  id: number;
  name: string;
  display_name?: string;
  avatar_url?: string;
  is_private: boolean;
}

interface Fronting {
  member_name: string;
  display_name?: string;
  avatar_url?: string;
}

interface AdminDashboardProps {
  fronting?: Fronting;
  onFrontingChanged?: () => void;
}

export default function AdminDashboard({ fronting, onFrontingChanged }: AdminDashboardProps) {
  const theme = useTheme();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [switchingTo, setSwitchingTo] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("/api/members", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMembers(data.filter((member: Member) => !member.is_private));
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchFront = async (memberName: string) => {
    setSwitchingTo(memberName);
    setMessage('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("/api/switch_front", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ member_name: memberName })
      });

      if (response.ok) {
        setMessage(`Successfully switched to ${memberName}`);
        onFrontingChanged?.();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.detail || 'Failed to switch fronting member'}`);
      }
    } catch (error) {
      console.error('Switch error:', error);
      setMessage('Network error occurred');
    } finally {
      setSwitchingTo(null);
    }
  };

  const handleRefresh = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("/api/admin/refresh", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setMessage('Data refreshed successfully');
        fetchMembers();
        onFrontingChanged?.();
      } else {
        setMessage('Failed to refresh data');
      }
    } catch (error) {
      console.error('Refresh error:', error);
      setMessage('Network error during refresh');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center font-comic">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 pt-20">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-comic text-center">
              Admin Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {message && (
              <Alert>
                <AlertDescription className="font-comic">{message}</AlertDescription>
              </Alert>
            )}

            {fronting && (
              <div className="text-center">
                <h3 className="text-lg font-comic mb-2">Currently Fronting:</h3>
                <div className="flex items-center justify-center gap-3">
                  {fronting.avatar_url && (
                    <img 
                      src={fronting.avatar_url} 
                      alt={fronting.display_name || fronting.member_name}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <span className="text-xl font-comic">
                    {fronting.display_name || fronting.member_name}
                  </span>
                </div>
              </div>
            )}

            <div className="grid gap-4">
              <h3 className="text-lg font-comic">Switch Fronting To:</h3>
              <div className="grid gap-2 max-h-96 overflow-y-auto">
                {members.map((member) => (
                  <Button
                    key={member.id}
                    variant="outline"
                    className="justify-start font-comic"
                    onClick={() => handleSwitchFront(member.name)}
                    disabled={switchingTo === member.name}
                  >
                    {member.avatar_url && (
                      <img 
                        src={member.avatar_url} 
                        alt={member.display_name || member.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                    )}
                    {switchingTo === member.name ? 'Switching...' : (member.display_name || member.name)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={handleRefresh} className="font-comic">
                Refresh Data
              </Button>
              <Button variant="outline" asChild>
                <Link to="/" className="font-comic">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}