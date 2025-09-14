import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const youtubeVideos = [
  {
    id: 1,
    title: "Recoil",
    embedId: "rSITc5Ugf0k", // Replace with actual video ID
    year: "2025",
    isNew: true
  },
  {
    id: 2,
    title: "Toxicity",
    embedId: "rSITc5Ugf0k", // Replace with actual video ID
    year: "2025",
    isNew: false
  },
  {
    id: 3,
    title: "Loyalty",
    embedId: "rSITc5Ugf0k", // Replace with actual video ID
    year: "2025",
    isNew: false
  }
];

const streamingPlatforms = [
  { name: "Spotify", url: "https://open.spotify.com/artist/38MZHYGAiCzB6CBXHZXVQN", color: "bg-green-500" },
  { name: "Apple Music", url: "https://music.apple.com/us/artist/clove-nytrix/1812303885", color: "bg-gray-600" },
  { name: "SoundCloud", url: "https://soundcloud.com/clovenytrix", color: "bg-orange-500" },
  { name: "Bandcamp", url: "https://alextlm.bandcamp.com/", color: "bg-blue-500" },
];

const MusicSection = () => {

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] mb-6 text-foreground">
            Latest <span className="text-transparent bg-gradient-accent bg-clip-text">Tracks</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my latest compositions - powerful pop rock anthems that blend 
            emotional depth with modern energy, creating songs that connect with 
            listeners on both visceral and emotional levels.
          </p>
        </div>

        {/* YouTube Videos */}
        <div className="grid gap-6 mb-12 max-w-4xl mx-auto">
          {youtubeVideos.map((video, index) => (
            <div 
              key={video.id}
              className="glass-card p-6 hover-lift animate-slide-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-xl text-foreground">{video.title}</h3>
                  {video.isNew && (
                    <span className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded-full font-medium">
                      NEW
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{video.year}</p>
              </div>
              
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Streaming Platforms */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-8 text-foreground">
            Stream on Your Favorite Platform
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {streamingPlatforms.map((platform, index) => (
              <Button
                key={platform.name}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                asChild
              >
                <a href={platform.url} target="_blank" rel="noopener noreferrer">
                  <span className={`w-3 h-3 rounded-full ${platform.color} mr-2`} />
                  {platform.name}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;