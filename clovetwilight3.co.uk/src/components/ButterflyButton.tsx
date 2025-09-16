import { ExternalLink } from "lucide-react";

const ButterflyButton = () => {
  return (
    <div className="fixed top-4 right-4 z-40 animate-float">
      <a
        href="https://www.butterfly-network.win"
        className="group block p-2 glass-effect rounded-full shadow-butterfly hover:shadow-magical transition-magical cursor-pointer-scheme"
      >
        <div className="relative">
          <img
            src="https://www.yuri-lover.win/pfp/butterfly.gif"
            alt="Butterfly Network"
            className="w-12 h-12 rounded-full group-hover:scale-110 transition-magical"
          />
          <div className="absolute -bottom-1 -right-1 bg-butterfly-pink text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-magical">
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </a>
    </div>
  );
};

export default ButterflyButton;