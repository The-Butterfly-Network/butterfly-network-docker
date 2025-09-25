const ButterflyHeader = () => {
  return (
    <header className="fade-in-element text-center py-12">
      <div className="flex items-center justify-center gap-4 mb-4">
        <img 
          src="https://www.yuri-lover.win/cdn/pfp/butterfly.gif" 
          alt="Butterfly Network Logo"
          className="w-16 h-16 rounded-full object-cover"
        />
        <h1 className="text-5xl md:text-6xl font-bold">
          <span className="text-primary">Butterfly</span>{" "}
          <span className="text-green">Network</span>
        </h1>
      </div>
      <p className="text-xl text-muted-foreground">
        Explore our links below
      </p>
    </header>
  );
};

export default ButterflyHeader;