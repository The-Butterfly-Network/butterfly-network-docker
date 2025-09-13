import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete();
    }, 2000); // 2 second loading time

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-8">
          Loading Butterfly Network...
        </h1>
        <div className="loading-spinner mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;