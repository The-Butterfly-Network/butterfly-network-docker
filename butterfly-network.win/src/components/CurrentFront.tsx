import { useState, useEffect } from "react";

interface Fronter {
  id: string;
  uuid: string;
  name: string;
  display_name?: string;
  avatar_url?: string;
  timestamp: string;
}

interface FrontersResponse {
  members: Fronter[];
  timestamp: string;
}

const CurrentFront = () => {
  const [fronter, setFronter] = useState<Fronter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFronter = async () => {
      try {
        const response = await fetch('https://api.pluralkit.me/v2/systems/hoygey/fronters');
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data: FrontersResponse = await response.json();
        
        // Get the most recent fronter with an avatar
        const fronterWithAvatar = data.members.find(member => member.avatar_url);
        setFronter(fronterWithAvatar || data.members[0] || null);
      } catch (err) {
        setError(true);
        console.error('Error fetching fronter:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFronter();
  }, []);

  if (loading || error || !fronter) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-center gap-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
        {fronter.avatar_url ? (
          <img 
            src={fronter.avatar_url} 
            alt={`${fronter.display_name || fronter.name} avatar`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
            {(fronter.display_name || fronter.name).charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <span className="text-xs text-muted-foreground text-center">
        current front
      </span>
    </div>
  );
};

export default CurrentFront;