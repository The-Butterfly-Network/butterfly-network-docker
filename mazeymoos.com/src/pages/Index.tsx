import { TooltipButton } from "@/components/TooltipButton";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Home, Gamepad2, Zap, Building, Monitor, Video, Play, Sword, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const gamingLinks = [
    { href: "https://www.butterfly-network.win", label: "Homepage", icon: Home },
    { href: "https://steamcommunity.com/id/EstrogenHRT", label: "Steam", icon: Gamepad2 },
    { href: "https://steamcommunity.com/id/CloveTwilight2", label: "Steam (Alt)", icon: Gamepad2 },
    { href: "https://store.epicgames.com/en-US/u/32bf0198b4304f6ca34c0f60819f038a", label: "Epic Games", icon: Zap },
    { href: "https://www.roblox.com/users/5386958615/profile", label: "Roblox", icon: Building },
    { href: "https://www.xbox.com/en-GB/play/user/CloTwilight3", label: "Xbox", icon: Monitor },
    { href: "https://m.twitch.tv/estrogenhrt/home", label: "Twitch", icon: Video },
    { href: "https://youtube.com/@estrogenhrt", label: "YouTube", icon: Play },
  ];

  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsExiting(true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className={`min-h-screen bg-background relative overflow-hidden transition-all duration-500 ${isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <header className="text-center mb-12">
          <div className="mb-6">
            <img
              src="https://www.yuri-lover.win/pfp/estrogenhrt.png"
              alt="EstrogenHRT"
              className="w-32 h-32 mx-auto avatar-glow animate-pulse"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            EstrogenHRT Gaming
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Click these links to get my gaming profiles!
          </p>
          <p className="text-lg text-primary font-semibold">
            Don't forget to subscribe to my YouTube!
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          {/* Gaming Links Section */}
          <section className="gaming-card mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-primary">
              Gaming Profiles
            </h3>
            <div className="space-y-4">
              {gamingLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gaming-btn group block text-center no-underline"
                    style={{ textDecoration: 'none' }}
                    onMouseEnter={(e) => e.preventDefault()}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <IconComponent size={20} className="text-primary" />
                      <span>{link.label}</span>
                    </div>
                  </a>
                );
              })}
              
              {/* Tooltip Buttons */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-4 border-t border-primary/20">
                <TooltipButton 
                  label="Riot Games" 
                  username="estrogenhrt#clove"
                  icon={Sword}
                />
                <TooltipButton 
                  label="Discord" 
                  username="estrogenhrt"
                  icon={MessageCircle}
                />
                <TooltipButton 
                  label="Nintendo Switch" 
                  username="SW-0000-0000-0001"
                  icon={Gamepad2}
                />
              </div>
            </div>
          </section>

          {/* Discord Status Section */}
          <section className="gaming-card">
            <h3 className="text-2xl font-bold mb-6 text-center text-primary">
              My Current Discord Status
            </h3>
            <div className="rounded-lg overflow-hidden border border-primary/30">
              <img
                src="https://status.butterfly-network.win/api/user/1209539928866816143?aboutMe=Estrogen+HRT+Gaming%21%0ABringing+Fresh+Content+to+your+screens%21%0A&theme=nitroDark&primaryColor=000000&accentColor=e93fd7&width=700"
                alt="Discord Status"
                className="w-full h-auto"
              />
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 py-6 border-t border-primary/20">
          <p className="text-muted-foreground">
            © EstrogenHRT Gaming | 2025
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;