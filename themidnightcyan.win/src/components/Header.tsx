// Using original image URL

const Header = () => {
  return (
    <header className="text-center py-16 fade-in-up relative">
      {/* Diamond sprinkles decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-diamond/30 sparkle-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 0.5 + 0.5}rem`
            }}
          >
            ✦
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <img
          src="https://yuri-lover.win/pfp/athena.jpg"
          alt="Athena's Profile"
          className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-cyan-bright shadow-cyan glow-animation"
        />
        
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-bright to-lavender bg-clip-text text-transparent mb-4">
          TheMidnightCyan
        </h1>
        
        <div className="text-4xl mb-2 bounce-animation">
          🪻
        </div>
        
        <p className="text-xl text-cyan-muted max-w-2xl mx-auto">
          Welcome to my midnight world of creativity, code, and self-expression
        </p>
      </div>
    </header>
  );
};

export default Header;