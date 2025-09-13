import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import ButterflyHeader from "@/components/ButterflyHeader";
import LinkHub from "@/components/LinkHub";
import ButterflyFooter from "@/components/ButterflyFooter";

const Index = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const [showCenterTitle, setShowCenterTitle] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const handleLoadingComplete = () => {
    setShowCenterTitle(true);
    setTimeout(() => {
      setShowMainContent(true);
      setTimeout(() => {
        setShowLinks(true);
      }, 500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      
      {showCenterTitle && !showMainContent && (
        <div className="fixed inset-0 flex items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold text-center animate-pulse">
            <span className="text-primary">Butterfly</span>{" "}
            <span className="text-green">Network</span>
          </h1>
        </div>
      )}
      
      {showMainContent && (
        <div id="main-content" className={showLinks ? "animate-fade-in" : ""}>
          <div className={`transition-all duration-1000 ${showLinks ? 'transform scale-100' : 'transform scale-150 translate-y-32'}`}>
            <ButterflyHeader />
          </div>
          {showLinks && (
            <div className="animate-fade-in">
              <LinkHub />
              <ButterflyFooter />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
