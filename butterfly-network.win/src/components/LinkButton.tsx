import { useState } from "react";
import { createPortal } from "react-dom";

interface LinkButtonProps {
  url: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  info?: string;
  className?: string;
}

const getEmojiForTitle = (title: string): string => {
  const emojiMap: { [key: string]: string } = {
    "Vencord Themes": "📝",
    "Clove Nytrix": "🎧",
    "CloveTwilight3": "🍃", 
    "Doughmination System®": "🍩",
    "EstrogenHRT Gaming": "🎮",
    "Huntrix Rocks!": "🎵",
    "LGBwithT Socials!": "🏳️‍⚧️",
    "MyLuminaraSystem": "⚡",
    "TheMidnightCyan": "💙",
    "The Motorbike One": "🏍️",
    "Trans4Trans Letters": "💌",
    "TransGamers": "🕹️",
    "UnifiedGaming Systems Ltd.": "🖥️",
    "Yaoi Lover Cheat Sheets": "👨‍❤️‍💋‍👨",
    "Yuri Lover Files": "👩‍❤️‍💋‍👩"
  };
  
  return emojiMap[title] || "🦋";
};

const LinkButton = ({ url, imageUrl, imageAlt, title, subtitle, info, className = "" }: LinkButtonProps) => {
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
      <div className={`relative group ${className}`}>
        <button
          onClick={handleClick}
          className="link-button fade-in-element w-full h-40 flex flex-col items-center justify-center p-4"
          aria-label={`Visit ${title}`}
        >
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="butterfly-image w-16 h-16 object-cover mb-3"
            loading="lazy"
          />
          <div className="text-center flex-1 flex flex-col justify-center">
            <span className="text-foreground font-medium block text-base leading-tight">{title}</span>
            {subtitle && <span className="text-muted-foreground text-sm block mt-1 leading-tight">{subtitle}</span>}
          </div>

          {info && (
            <div className="pointer-events-auto absolute inset-0 rounded-lg bg-background/90 backdrop-blur-sm border border-border opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4 z-10">
              <div className="text-center animate-scale-in">
                <div className="text-3xl mb-2">{getEmojiForTitle(title)}</div>
                <h3 className="text-lg font-semibold text-primary">{title}</h3>
                {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
                <p className="text-foreground text-sm mt-2">{info}</p>
              </div>
            </div>
          )}
        </button>
      </div>

      
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