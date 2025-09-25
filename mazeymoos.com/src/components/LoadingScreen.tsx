import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <img
            src="https://www.yuri-lover.win/cdn/pfp/estrogenhrt.png"
            alt="EstrogenHRT"
            className="w-24 h-24 mx-auto avatar-glow animate-pulse"
          />
        </div>
        <h2 className="text-3xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          EstrogenHRT Gaming
        </h2>
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-primary transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-4">Loading {progress}%</p>
      </div>
    </div>
  );
};