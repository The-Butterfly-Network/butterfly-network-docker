import { useState } from "react";
import { Card } from "@/components/ui/card";

interface Artist {
  name: string;
  image: string;
  description: string;
}

const artists: Artist[] = [
  {
    name: "Linkin Park",
    image: "https://www.yuri-lover.win/cdn/artists/linkin-park.jpg",
    description: "I found Linkin Park when Emily joined, and Emptiness Machine was the song that hooked me."
  },
  {
    name: "Falling in Reverse",
    image: "https://www.yuri-lover.win/cdn/artists/falling-in-reverse.jpg",
    description: "Falling in Reverse helped me accept who I am and the ghosts of my past."
  },
  {
    name: "HYPERPUP",
    image: "https://www.yuri-lover.win/cdn/artists/hyperpup.jpg",
    description: "I discovered HYPERPUP via Miku and have been hooked ever since."
  },
  {
    name: "Citizen Soldier",
    image: "https://www.yuri-lover.win/cdn/artists/citizen-soldier.jpg",
    description: "Citizen Soldier's music resonates with my journey of overcoming addiction and finding strength."
  },
  {
    name: "NF",
    image: "https://www.yuri-lover.win/cdn/artists/nf.jpg",
    description: "NF's raw and honest lyrics have been a source of comfort during tough times."
  },
  {
    name: "Bemax",
    image: "https://www.yuri-lover.win/cdn/artists/bemax.jpg",
    description: "Bemax's upbeat music always lifts my spirits and is on my happier side."
  },
  {
    name: "REVENGEOFPARIS",
    image: "https://www.yuri-lover.win/cdn/artists/REVENGEOFPARIS.jpg",
    description: "REVENGEOFPARIS's energetic tracks are perfect for gaming sessions and getting pumped up."
  },
  {
    name: "Juice WRLD",
    image: "https://www.yuri-lover.win/cdn/artists/Juice-WRLD.jpg",
    description: "Juice WRLD's music speaks to my experiences and emotions in a profound way."
  },
  {
    name: "Eminem",
    image: "https://www.yuri-lover.win/cdn/artists/eminem.jpg",
    description: "Eminem's storytelling and lyrical prowess have always inspired me."
  },
  {
    name: "Hatsune Miku",
    image: "https://www.yuri-lover.win/cdn/artists/hatsune-miku.png",
    description: "Hatsune Miku's vocaloid performances and catchy tunes are a unique delight."
  },
  {
    name: "Charli XcX",
    image: "https://www.yuri-lover.win/cdn/artists/charli-xcx.png",
    description: "Charli XcX's innovative pop music always gets me dancing and feeling empowered."
  },
  {
    name: "Billie Eilish",
    image: "https://www.yuri-lover.win/cdn/artists/billie-eilish.jpg",
    description: "Billie Eilish's unique style and haunting melodies captivate me every time."
  },
  {
    name: "Marshmello",
    image: "https://www.yuri-lover.win/cdn/artists/marshmello.jpg",
    description: "Marshmello's upbeat electronic music is perfect for lifting my mood and energizing me."
  },
  {
    name: "6arelyhuman",
    image: "https://www.yuri-lover.win/cdn/artists/6arelyhuman.jpg",
    description: "6arelyhuman's music resonates with my experiences and emotions in a profound way."
  },
  {
    name: "Alan Walker",
    image: "https://www.yuri-lover.win/cdn/artists/alan-walker.jpg",
    description: "Alan Walker's electronic music and captivating visuals always draw me in."
  },
  {
    name: "Sik World",
    image: "https://www.yuri-lover.win/cdn/artists/sik-world.png",
    description: "Sik World's energetic tracks are perfect for gaming sessions and getting pumped up."
  },
  {
    name: "One Direction",
    image: "https://www.yuri-lover.win/cdn/artists/one-direction.jpg",
    description: "One Direction's catchy pop tunes always lift my spirits and bring back fond memories."
  },
  {
    name: "Little Mix",
    image: "https://www.yuri-lover.win/cdn/artists/little-mix.jpg",
    description: "Little Mix's empowering anthems and harmonies always inspire me."
  },
  {
    name: "Skillet",
    image: "https://www.yuri-lover.win/cdn/artists/skillet.jpg",
    description: "Skillet's powerful rock music and uplifting lyrics resonate with me deeply."
  }
];

const ArtistsSection = () => {
  const [hoveredArtist, setHoveredArtist] = useState<string | null>(null);

  return (
    <section id="artists" className="py-16 animate-fade-in-up">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-glow-magical">My Favorite Artists</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {artists.map((artist, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl cursor-help-scheme"
              onMouseEnter={() => setHoveredArtist(artist.name)}
              onMouseLeave={() => setHoveredArtist(null)}
            >
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover rounded-2xl transition-smooth group-hover:scale-110"
                />
                
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-70" />
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-sm font-bold text-cyan-400">
                    {artist.name}
                  </h3>
                </div>
                
                <div className={`absolute inset-0 rounded-2xl bg-slate-900/90 backdrop-blur-sm p-4 flex items-center justify-center transition-smooth ${
                  hoveredArtist === artist.name ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="text-center">
                    <h3 className="text-sm font-bold text-cyan-400 mb-2">
                      {artist.name}
                    </h3>
                    <p className="text-white text-xs leading-relaxed">
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