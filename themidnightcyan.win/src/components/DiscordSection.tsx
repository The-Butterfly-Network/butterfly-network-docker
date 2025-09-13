const DiscordSection = () => {
  return (
    <section id="discord" className="py-16 fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-bright to-lavender bg-clip-text text-transparent">
          My Discord Status!
        </h2>
        
        <div className="bg-midnight-light/50 backdrop-blur-md border border-cyan-bright/20 rounded-2xl p-8 shadow-midnight text-center">
          <img
            src="https://status.butterfly-network.win/api/user/1394668171415523351?aboutMe=Proud+syster+of+Clove+%28%40estrogenhrt%29%0AWriting+a+book...%0ALover+of+loud+tunes%2C+literature+%26+pixel+blocks%2C+just+a+trans+gamer+girl+vibing+through+the+chaos&theme=nitroDark&primaryColor=2770e3&accentColor=0e203d&width=700"
            alt="Discord Status"
            className="max-w-full h-auto rounded-lg mx-auto shadow-cyan"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default DiscordSection;