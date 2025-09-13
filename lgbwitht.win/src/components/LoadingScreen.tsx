import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-[var(--glow-primary)] mx-auto animate-pulse">
          <img 
            src="https://www.yuri-lover.win/pfp/LGBwithT.png" 
            alt="LGBwithT" 
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LGBwithT
          </h1>
          
          <div className="w-64 h-2 bg-muted rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <p className="text-muted-foreground text-sm">Loading social links...</p>
        </div>
      </div>
    </div>
  );
};