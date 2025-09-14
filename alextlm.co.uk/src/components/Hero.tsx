import { Button } from "@/components/ui/button";
import { Play, Download, ExternalLink } from "lucide-react";


const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-music-primary/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold font-['Space_Grotesk'] text-foreground">
                <span className="block">CLOVE</span>
                <span className="block text-transparent bg-gradient-accent bg-clip-text">
                  NYTRIX
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Pop rock artist crafting powerful anthems and emotional soundscapes 
                with a modern edge that resonates with the hearts of a new generation.
              </p>
            </div>


            <div className="flex items-center gap-6 pt-4">
              <div className="text-sm text-muted-foreground">
                Latest Release:
              </div>
              <a 
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent font-medium hover:text-accent/80 transition-colors"
              >
                <span>"Recoil"</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Character Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-accent rounded-3xl blur-xl opacity-30 animate-glow-pulse" />
              <div className="relative glass-card rounded-3xl p-6 hover-lift">
                <img 
                  src="https://www.yuri-lover.win/artists/alextlm.jpg" 
                  alt="Clove Nytrix - Pop Rock Artist" 
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;