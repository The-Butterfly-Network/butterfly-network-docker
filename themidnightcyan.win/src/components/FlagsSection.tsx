import { useState } from "react";

const FlagsSection = () => {
  const [hoveredFlag, setHoveredFlag] = useState<string | null>(null);

  const flags = [
    {
      id: "plural",
      name: "Plural Flag",
      description: "I am part of a plural system",
      image: "https://www.yuri-lover.win/flags/plural.png"
    },
    {
      id: "trans",
      name: "Transgender Flag", 
      description: "I am transgender and have been on feminizing hormones since Dec 21st 2023",
      image: "https://www.yuri-lover.win/flags/trans.png"
    },
    {
      id: "lesbian",
      name: "Lesbian Flag",
      description: "I am a proud lesbian and love women!",
      image: "https://www.yuri-lover.win/flags/lesbian.png"
    },
    {
      id: "romanticannic",
      name: "Romanticannic",
      description: "Symbollially feel connected to cannibalism and romance in some way",
      image: "https://www.yuri-lover.win/flags/romanticannic.png"
    },
    {
      id: "digitalgirlsongic",
      name: "DigitalGirlsongic",
      description: "a -songic gender that feels connected to Digital Girl by KIRA and miku.",
      image: "https://www.yuri-lover.win/flags/digitalgirlsongic.png"
    }
  ];

  const FlagDisplay = ({ flag }: { flag: typeof flags[0] }) => (
    <div className="relative">
      <img
        src={flag.image}
        alt={flag.name}
        className="w-full h-32 object-cover rounded-lg shadow-midnight border border-cyan-bright/20"
      />
    </div>
  );

  return (
    <section id="flags" className="py-16 fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-bright to-lavender bg-clip-text text-transparent">
          My Flags
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {flags.map((flag) => (
            <div
              key={flag.id}
              className="relative group"
              onMouseEnter={() => setHoveredFlag(flag.id)}
              onMouseLeave={() => setHoveredFlag(null)}
            >
              <div className="bg-midnight-light/50 backdrop-blur-md border border-cyan-bright/20 rounded-2xl p-6 transition-smooth hover:border-cyan-bright/40 hover:shadow-cyan">
                <FlagDisplay flag={flag} />
                
                <div className={`mt-4 transition-smooth ${hoveredFlag === flag.id ? 'opacity-100' : 'opacity-70'}`}>
                  <h3 className="text-lg font-semibold text-cyan-bright mb-2">
                    {flag.name}
                  </h3>
                  <p className="text-sm text-cyan-muted">
                    {flag.description}
                  </p>
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