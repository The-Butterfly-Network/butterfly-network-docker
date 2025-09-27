// AdminDashboard.tsx - Key parts with debugging and fixes
import React, { useState, useEffect } from 'react';

interface Member {
  id: string;
  uuid: string;
  name: string;
  display_name?: string | null;
  avatar_url?: string | null;
  pronouns?: string | null;
  tags?: string[];
  is_special?: boolean;
  original_name?: string;
  privacy?: {
    visibility: string;
  };
}

interface FrontingData {
  id: string;
  timestamp: string;
  members: Member[];
}

interface AdminDashboardProps {
  fronting: FrontingData | null;
  onFrontingChanged: (memberId?: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ fronting, onFrontingChanged }) => {
  const [newFront, setNewFront] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{type: 'success' | 'error', content: string} | null>(null);

  // Fetch members on component mount
  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      try {
        const res = await fetch("/api/members", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!res.ok) throw new Error("Failed to fetch members");
        const data = await res.json();
        
        // Sort members alphabetically by display name or name
        const sortedMembers = [...data].sort((a, b) => {
          const nameA = (a.display_name || a.name).toLowerCase();
          const nameB = (b.display_name || b.name).toLowerCase();
          return nameA.localeCompare(nameB);
        });
        
        setMembers(sortedMembers);
        console.log('Loaded members:', sortedMembers.length);
        
        // Set first non-special member as default selection
        const firstRegularMember = sortedMembers.find(m => !m.is_special);
        if (firstRegularMember && !newFront) {
          setNewFront(firstRegularMember.id);
        }
      } catch (err) {
        console.error("Error fetching members:", err);
        setMessage({ type: "error", content: "Error loading members" });
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // Handle switching fronting member
  const handleSwitchFront = async () => {
    if (!newFront) {
      console.error('No member selected for switching');
      setMessage({ type: "error", content: "Please select a member to switch to." });
      return;
    }
    
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage({ type: "error", content: "Authentication required." });
      return;
    }

    setMessage(null);
    setLoading(true);
    
    const selectedMember = members.find(m => m.id === newFront);
    
    const requestBody = { member_id: newFront };
    
    try {
      const response = await fetch("/api/switch_front", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('Response status:', response.status);
      
      // Read response text first
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${responseText}`);
      }
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed response:', data);
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
      
      // Check for success
      if (data.success || data.status === 'success') {
        setMessage({ type: "success", content: "Fronting member switched successfully." });
        
        // Refresh fronting data
        if (onFrontingChanged) {
          onFrontingChanged(newFront);
        }
      } else {
        setMessage({ 
          type: "error", 
          content: data.message || data.detail || "Failed to switch fronting member." 
        });
      }
    } catch (error: any) {
      console.error("=== SWITCH ERROR ===", error);
      setMessage({ type: "error", content: `Error: ${error.message}` });
    } finally {
      setLoading(false);
      console.log('=== SWITCH DEBUG END ===');
    }
  };

  // Get member display name
  const getMemberDisplayName = (member: Member) => {
    if (member.is_special) {
      return `${member.display_name || member.name} (${member.original_name === "system" ? "Unsure" : "Sleeping"})`;
    }
    return member.display_name || member.name;
  };

  // Filter members for dropdown (exclude private ones for now)
  const availableMembers = members.filter(member => 
    member.privacy?.visibility !== 'private' || member.is_special
  );

  if (loading && members.length === 0) {
    return <div className="text-center p-8">Loading admin dashboard...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
      
      {/* Display feedback messages */}
      {message && (
        <div className={`mb-4 p-3 rounded ${
          message.type === "success" 
            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" 
            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
        }`}>
          {message.content}
        </div>
      )}

      {/* Current Fronting Display */}
      {fronting && fronting.members && fronting.members.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-center">
            Currently Fronting{fronting.members.length > 1 ? ` (${fronting.members.length})` : ""}:
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {fronting.members.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500 mb-2">
                  <img
                    src={member.avatar_url || "https://www.yuri-lover.win/cdn/pfp/fallback_avatar.png"}
                    alt={member.display_name || member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://www.yuri-lover.win/cdn/pfp/fallback_avatar.png";
                    }}
                  />
                </div>
                <span className="text-center font-semibold">
                  {member.display_name || member.name}
                </span>
                {member.pronouns && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {member.pronouns}
                  </span>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
            Last switch: {new Date(fronting.timestamp).toLocaleString()}
          </div>
        </div>
      )}

      {/* Switch Fronting Member Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Switch Fronting Member</h2>
        <div className="space-y-4">
          <div className="flex flex-col space-y-3">
            <label htmlFor="member-select" className="block text-sm font-medium">
              Select new fronting member:
            </label>
            
            <select 
              id="member-select"
              value={newFront}
              onChange={(e) => {
                console.log('Member selected:', e.target.value);
                const selectedMember = members.find(m => m.id === e.target.value);
                console.log('Member details:', selectedMember);
                setNewFront(e.target.value);
              }}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">-- Select a member --</option>
              {availableMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {getMemberDisplayName(member)} (ID: {member.id})
                </option>
              ))}
            </select>
            
            {/* Debug info */}
            <div className="text-xs text-gray-500 p-2 bg-gray-100 dark:bg-gray-800 rounded">
              <div>Selected: {newFront || 'None'}</div>
              <div>Available members: {availableMembers.length}</div>
              <div>Current fronter: {fronting?.members?.[0]?.name || 'None'} (ID: {fronting?.members?.[0]?.id || 'None'})</div>
            </div>
            
            <button 
              onClick={handleSwitchFront}
              disabled={loading || !newFront || availableMembers.length === 0}
              className="w-full py-2 px-4 bg-blue-600 disabled:bg-blue-300 text-white rounded-md transition-colors"
            >
              {loading ? "Switching..." : "Switch Front"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;