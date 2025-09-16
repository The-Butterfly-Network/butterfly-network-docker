import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 mt-20 border-t border-border/50 relative overflow-hidden">
      {/* Background sparkles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-4 left-1/4 animate-sparkle text-twilight-glow">✨</div>
        <div className="absolute top-8 right-1/3 animate-sparkle text-butterfly-pink" style={{ animationDelay: '1s' }}>⋆</div>
        <div className="absolute bottom-6 left-1/3 animate-sparkle text-fairy-gold" style={{ animationDelay: '2s' }}>✦</div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-8">
          <p className="text-lg mb-4 text-muted-foreground flex items-center justify-center gap-2">
            Made with 
            <span className="animate-float">🦋</span>
            <span className="animate-bounce">🍩</span>
            <span className="animate-sparkle">✨</span>
          </p>
          
          <p className="text-sm text-muted-foreground">
            © Clove Nytrix Doughmination Twilight | 2025
          </p>
        </div>

        {/* ORCID Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <a
            href="https://orcid.org/0009-0002-7890-2437"
            target="_blank"
            rel="me noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <img
              src="https://yuri-lover.win/orcid/logo.png"
              alt="ORCID iD icon"
              className="w-4 h-4"
            />
            <span>https://orcid.org/0009-0002-7890-2437</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          
          <div className="hidden sm:block w-px h-6 bg-border" />
          
          <div className="relative group">
            <img
              src="https://www.yuri-lover.win/orcid/qr.png"
              alt="ORCID QR"
              className="w-16 h-16 rounded border border-border/50 hover:border-primary/50 transition-colors cursor-pointer-scheme"
            />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              ORCID QR
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;