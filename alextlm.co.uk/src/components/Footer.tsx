import { Music, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-hero-bg border-t border-border/20 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 bg-primary/20 rounded-full">
              <Music className="h-6 w-6 text-primary" />
            </div>
            <span className="text-2xl font-bold font-['Space_Grotesk'] text-foreground">
              CLOVE NYTRIX
            </span>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground max-w-md mx-auto">
            Creating powerful pop rock anthems for the modern generation.
          </p>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-accent mx-auto" />

          {/* Copyright */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Clove Nytrix. Made with</span>
            <Heart className="h-4 w-4 text-primary" />
            <span>for music lovers everywhere.</span>
          </div>

          {/* Additional Info */}
          <div className="text-xs text-muted-foreground/70">
            All tracks are original compositions. Contact for licensing inquiries.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;