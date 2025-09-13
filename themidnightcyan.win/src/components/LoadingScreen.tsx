import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className={`fixed inset-0 bg-gradient-hero flex items-center justify-center z-50 transition-opacity duration-500 ${isComplete ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center space-y-8">
        <div className="text-6xl rotate-animation">
          🪻
        </div>
        
        <div className="flex space-x-4 justify-center">
          {['✦', '✧', '⋆', '✦', '✧'].map((diamond, index) => (
            <span
              key={index}
              className="text-2xl text-diamond sparkle-animation"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {diamond}
            </span>
          ))}
        </div>
        
        <p className="text-lg text-lavender-soft animate-pulse">
          Loading blossoming content...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;