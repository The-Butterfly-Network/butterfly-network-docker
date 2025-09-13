import { useState } from "react";

const ArtistsSection = () => {
  const [hoveredArtist, setHoveredArtist] = useState<string | null>(null);

  const artists = [
    {
      id: "linkin-park",
      name: "Linkin Park",
      image: "https://yuri-lover.win/artists/linkin-park.jpg",
      description: "I found Linkin Park when Emily joined, and Emptiness Machine was the song that hooked me."
    }
  ];

  return (
    <section id="artists" className="py-16 fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-bright to-lavender bg-clip-text text-transparent">
          My Favorite Artists
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="relative group overflow-hidden rounded-2xl"
              onMouseEnter={() => setHoveredArtist(artist.id)}
              onMouseLeave={() => setHoveredArtist(null)}
            >
              <div className="aspect-square relative">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent opacity-70" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-cyan-bright mb-2">
                    {artist.name}
                  </h3>
                </div>
                
                <div className={`absolute inset-0 bg-midnight/90 backdrop-blur-sm p-6 flex items-center justify-center transition-smooth ${
                  hoveredArtist === artist.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-cyan-bright mb-3">
                      {artist.name}
                    </h3>
                    <p className="text-cyan-muted text-sm leading-relaxed">
                      {artist.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistsSection;