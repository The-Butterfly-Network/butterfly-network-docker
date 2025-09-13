const InterestsSection = () => {
  const interests = [
    {
      icon: "🎨",
      title: "Artwork",
      description: "Midnight themed works, and cozy vibes is how I work, my sketches inspire both myself, my headmate and my friends to do well and keep working!"
    },
    {
      icon: "📚",
      title: "Reading", 
      description: "Reading is a hobby I have picked up over time, from reading poems like Ozymandias, to books like Lord of the Flies, and even The Holy Bible"
    },
    {
      icon: "🎧",
      title: "Music",
      description: "I enjoy a lot of different music, from classical, to rock, even artists like Bemax and Little Mix"
    }
  ];

  return (
    <section id="interests" className="py-16 fade-in-up">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-bright to-lavender bg-clip-text text-transparent">
          Interests & Hobbies
        </h2>
        
        <p className="text-lg text-cyan-muted text-center mb-12 max-w-3xl mx-auto">
          I'm passionate about a lot of things! Here's what keeps me busy when I'm not working:
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="bg-midnight-light/50 backdrop-blur-md border border-cyan-bright/20 rounded-2xl p-6 transition-smooth hover:border-cyan-bright/40 hover:shadow-cyan group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-bounce">
                {interest.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-cyan-bright mb-3">
                {interest.title}
              </h3>
              
              <p className="text-cyan-muted leading-relaxed">
                {interest.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;