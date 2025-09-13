import { useState } from "react";
import { createPortal } from "react-dom";

interface LinkButtonProps {
  url: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  className?: string;
}

const getEmojiForTitle = (title: string): string => {
  const emojiMap: { [key: string]: string } = {
    "AlexTLM": "🎧",
    "CloveTwilight3": "🍃", 
    "Doughmination System™": "🍩",
    "EstrogenHRT Gaming": "🎮",
    "Huntrix Rocks!": "🎵",
    "LGBwithT Socials!": "🏳️‍⚧️",
    "MyLuminaraSystem": "⚡",
    "TheMidnightCyan": "💙",
    "Trans4Trans Letters": "💌",
    "TransGamers": "🕹️",
    "UnifiedGaming Systems Ltd.": "🖥️",
    "Yaoi Lover Cheat Sheets": "👨‍❤️‍💋‍👨",
    "Yuri Lover Files": "👩‍❤️‍💋‍👩"
  };
  
  return emojiMap[title] || "🦋";
};

const LinkButton = ({ url, imageUrl, imageAlt, title, subtitle, className = "" }: LinkButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = url;
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`link-button fade-in-element ${className}`}
        aria-label={`Visit ${title}`}
      >
        <img 
          src={imageUrl} 
          alt={imageAlt} 
          className="butterfly-image"
          loading="lazy"
        />
        <div className="text-center">
          <span className="text-foreground font-medium block">{title}</span>
          {subtitle && <span className="text-muted-foreground text-sm block">{subtitle}</span>}
        </div>
      </button>
      
      {isLoading &&
        createPortal(
          <div className="fixed top-0 left-0 w-screen h-screen bg-background/90 flex items-center justify-center z-[9999]">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">{getEmojiForTitle(title)}</div>
              <p className="text-xl text-primary">Opening {title}...</p>
            </div>
          </div>,
          document.body
        )
      }
    </>
  );
};

export default LinkButton;