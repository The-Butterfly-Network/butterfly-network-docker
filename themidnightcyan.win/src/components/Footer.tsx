const Footer = () => {
  return (
    <footer className="py-16 fade-in-up relative">
      {/* Diamond sprinkles decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-diamond/20 sparkle-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 0.3 + 0.4}rem`
            }}
          >
            ✦
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-6">
          <div className="flex justify-center space-x-2 mb-4">
            <span className="text-2xl sparkle-animation" style={{ animationDelay: "0s" }}>✨</span>
            <span className="text-2xl bounce-animation" style={{ animationDelay: "0.2s" }}>🪻</span>
            <span className="text-2xl sparkle-animation" style={{ animationDelay: "0.4s" }}>✨</span>
          </div>
          
          <p className="text-cyan-muted mb-4">
            Made with ✨ and 🪻 | © Athena Misty McKillian | 2025
          </p>
          
          <a
            href="https://orcid.org/0009-0002-7890-2437"
            className="inline-flex items-center space-x-2 text-lavender hover:text-lavender-soft transition-smooth underline decoration-lavender/50 hover:decoration-lavender-soft"
          >
            <img
              src="https://www.yuri-lover.win/orcid/logo.png"
              alt="ORCID iD icon"
              className="w-4 h-4"
            />
            <span>https://orcid.org/0009-0002-7890-2437</span>
          </a>
          
          {/* QR Code */}
          <div className="mt-4">
            <img
              src="https://www.yuri-lover.win/orcid/qr.png"
              alt="QR Code"
              className="w-24 h-24 mx-auto border border-cyan-bright/20 rounded-lg shadow-cyan"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;