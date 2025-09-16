import { useState, useEffect } from "react";

const Header = () => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; left: number; top: number; delay: number }>>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2000,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <header className="relative py-20 text-center overflow-visible">
      {/* Animated sparkles background */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-sparkle text-twilight-glow opacity-60"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.delay}ms`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 animate-fade-in-up">
        <div className="relative inline-block mb-6">
          <img
            src="https://www.yuri-lover.win/pfp/clove.jpg"
            alt="Clove's Profile"
            className="w-32 h-32 rounded-full shadow-glow mx-auto border-4 border-primary animate-glow-pulse"
          />
          <div className="absolute -top-2 -right-2 text-3xl animate-butterfly-dance">🦋</div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-[1.15] pb-1">
          CloveTwilight3
        </h1>

        <div className="text-2xl animate-float">🦋</div>
      </div>
    </header>
  );
};

export default Header;