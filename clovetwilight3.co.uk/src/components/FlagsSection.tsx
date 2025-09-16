import { useState } from "react";
import { Card } from "@/components/ui/card";

interface Flag {
  src: string;
  alt: string;
  description: string;
  tooltip: string;
}

const flags: Flag[] = [
  {
    src: "https://www.yuri-lover.win/flags/english-flag.png",
    alt: "English Flag",
    description: "English",
    tooltip: "I am born in England, and thus I am English"
  },
  {
    src: "https://www.yuri-lover.win/flags/welsh-flag.png",
    alt: "Welsh Flag",
    description: "Welsh",
    tooltip: "My biological mother was Welsh, hence I am half Welsh"
  },
  {
    src: "https://www.yuri-lover.win/flags/scottish-flag.png",
    alt: "Scottish Flag",
    description: "Scottish",
    tooltip: "By my VALORANT Lore, I am Scottish"
  },
  {
    src: "https://www.yuri-lover.win/flags/genderfae.png",
    alt: "Genderfae Flag",
    description: "Genderfae",
    tooltip: "I am Genderfae, and my gender is mostly fluid, but never masculine or male"
  },
  {
    src: "https://www.yuri-lover.win/flags/plural.png",
    alt: "Plural Flag",
    description: "Plural",
    tooltip: "I am part of a plural system"
  },
  {
    src: "https://www.yuri-lover.win/flags/polyamorus.png",
    alt: "Polyamory Flag",
    description: "Polyamorous",
    tooltip: "I am polyamorous and open to multiple loving relationships"
  },
  {
    src: "https://www.yuri-lover.win/flags/faesexual.png",
    alt: "Faesexual Flag",
    description: "Faesexual",
    tooltip: "My sexual attraction to all genders except masculine or male ones"
  },
  {
    src: "https://www.yuri-lover.win/flags/trans.png",
    alt: "Transgender Flag",
    description: "Transgender",
    tooltip: "I am transgender and have been on feminizing hormones since Dec 21st 2023"
  },
  {
    src: "https://www.yuri-lover.win/flags/transfeminine.png",
    alt: "Transfeminine Flag",
    description: "Transfeminine",
    tooltip: "I am Transfeminine, meaning I was born in a male body but aim to get a feminine one"
  },
  {
    src: "https://www.yuri-lover.win/flags/therian.png",
    alt: "Therian Flag",
    description: "Therian",
    tooltip: "I am a Therian and I am a black cat therotype"
  }
];

const FlagsSection = () => {
  const [hoveredFlag, setHoveredFlag] = useState<string | null>(null);

  return (
    <section id="flags" className="py-16 animate-fade-in-up">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-glow-magical">My Flags</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {flags.map((flag, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl cursor-help-scheme"
              onMouseEnter={() => setHoveredFlag(flag.alt)}
              onMouseLeave={() => setHoveredFlag(null)}
            >
              <div className="aspect-[3/2] relative rounded-2xl overflow-hidden">
                <img
                  src={flag.src}
                  alt={flag.alt}
                  className="w-full h-full object-cover rounded-2xl transition-smooth group-hover:scale-110"
                />
                
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-70" />
                
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-sm font-bold text-cyan-400">
                    {flag.description}
                  </h3>
                </div>
                
                <div className={`absolute inset-0 rounded-2xl bg-slate-900/90 backdrop-blur-sm p-4 flex items-center justify-center transition-smooth ${
                  hoveredFlag === flag.alt ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="text-center">
                    <h3 className="text-sm font-bold text-cyan-400 mb-2">
                      {flag.description}
                    </h3>
                    <p className="text-white text-xs leading-relaxed">
                      {flag.tooltip}
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

export default FlagsSection;