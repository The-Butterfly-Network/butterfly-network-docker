import { useState } from "react";

const ButterflyButton = () => {
  const [isTransferring, setIsTransferring] = useState(false);

  const handleClick = () => {
    setIsTransferring(true);
    setTimeout(() => {
      window.location.href = "https://www.butterfly-network.win";
    }, 1000);
  };

  return (
    <div className="fixed top-20 right-6 z-40 group">
      <button
        onClick={handleClick}
        disabled={isTransferring}
        className="flex items-center space-x-2 bg-midnight-light/80 backdrop-blur-md border border-cyan-bright/30 rounded-full px-4 py-2 transition-smooth hover:bg-midnight-light hover:border-cyan-bright/50 hover:shadow-cyan disabled:opacity-75"
      >
        <img
          src="https://www.yuri-lover.win/cdn/pfp/butterfly.gif"
          alt="Butterfly Network"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm text-cyan-soft group-hover:text-cyan-bright transition-smooth">
          {isTransferring ? "Transferring..." : "Butterfly Network"}
        </span>
      </button>
    </div>
  );
};

export default ButterflyButton;