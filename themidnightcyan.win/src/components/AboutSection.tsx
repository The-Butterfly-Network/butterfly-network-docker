const AboutSection = () => {
  return (
    <section id="about" className="py-16 fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-bright to-lavender bg-clip-text text-transparent">
          About Me
        </h2>
        
        <div className="bg-midnight-light/50 backdrop-blur-md border border-cyan-bright/20 rounded-2xl p-8 shadow-midnight">
          <p className="text-lg text-cyan-muted mb-6 leading-relaxed">
            Hey I'm Athena and welcome to this space! I'm known as Midnight Cyan for my obsession of creating 
            midnight-themed inventions with cyan themed background.
          </p>
          
          <p className="text-lg text-cyan-muted leading-relaxed">
            When I'm not working on artwork, you can find me writing books, listening to music or scrolling 
            instagram, something to let my creativity flow.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;