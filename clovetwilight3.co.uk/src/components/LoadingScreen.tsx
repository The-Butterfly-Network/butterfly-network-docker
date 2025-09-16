import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) {
    return (
      <div className="loading-screen fixed inset-0 z-50 bg-gradient-twilight flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-500">
      </div>
    );
  }

  return (
    <div className="loading-screen fixed inset-0 z-50 bg-gradient-twilight flex items-center justify-center">
      <div className="loading-content text-center">
        <div className="rotating-doughnut text-6xl mb-8 animate-spin">
          🍩
        </div>
        <div className="bouncing-diamonds flex justify-center gap-4 mb-8">
          <span className="diamond text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>✦</span>
          <span className="diamond text-2xl animate-bounce" style={{ animationDelay: '200ms' }}>✧</span>
          <span className="diamond text-2xl animate-bounce" style={{ animationDelay: '400ms' }}>⋆</span>
          <span className="diamond text-2xl animate-bounce" style={{ animationDelay: '600ms' }}>✦</span>
          <span className="diamond text-2xl animate-bounce" style={{ animationDelay: '800ms' }}>✧</span>
        </div>
        <p className="loading-text text-xl mb-4 text-glow-magical">Loading magical content...</p>
        <div className="loading-cursor animate-pulse text-primary">▋</div>
      </div>
    </div>
  );
};

export default LoadingScreen;