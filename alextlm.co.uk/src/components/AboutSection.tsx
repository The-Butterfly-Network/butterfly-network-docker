import { Card } from "@/components/ui/card";
import { Headphones, Zap, Heart, Music } from "lucide-react";

const stats = [
  { label: "Tracks Released", value: "24+", icon: Music },
  { label: "Monthly Listeners", value: "1.5K", icon: Headphones },
  { label: "Years Creating", value: "5", icon: Zap },
  { label: "Genre Fusion", value: "∞", icon: Heart },
];

const AboutSection = () => {
  return (
    <section className="py-20 px-6 relative">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] mb-6 text-foreground">
                About <span className="text-transparent bg-gradient-accent bg-clip-text">Clove Nytrix</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm Clove Nytrix, a pop rock artist passionate about creating music that 
                  speaks to the soul while energizing the spirit. My sound combines the 
                  emotional depth of classic rock with the polished energy of modern pop, 
                  creating anthems for those who dare to dream big.
                </p>
                <p>
                  With a background in songwriting and a love for powerful melodies, 
                  I craft tracks that tell stories of resilience, love, and the human experience. 
                  Each song is a journey through soaring choruses, driving rhythms, and 
                  heartfelt lyrics that resonate with anyone who's ever felt misunderstood.
                </p>
                <p>
                  When I'm not in the studio, you'll find me exploring new guitar tones, 
                  collaborating with fellow musicians, or diving deep into the latest rock 
                  and pop releases that push the boundaries of what modern music can be.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium">
                Pop Rock
              </span>
              <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium">
                Alternative Rock
              </span>
              <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium">
                Indie Pop
              </span>
              <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium">
                Rock Ballads
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {stats.map((stat, index) => (
              <Card 
                key={stat.label} 
                className="glass-card p-6 text-center hover-lift animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 font-['Space_Grotesk']">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;