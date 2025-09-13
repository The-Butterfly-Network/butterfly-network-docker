const ResourcesSection = () => {
  const resources = [
    {
      title: "📚 Pronoun Resources",
      links: [
        { name: "Pronouns.org", url: "https://pronouns.org/", description: "Comprehensive guide to all types of pronouns" },
        { name: "LGBTA Wiki", url: "https://lgbta.miraheze.org/", description: "Extensive documentation of LGBTQ+ identities and terminology" }
      ]
    },
    {
      title: "🏳️‍⚧️ General LGBTQ+ Support",
      links: [
        { name: "The Trevor Project", url: "https://www.thetrevorproject.org/", description: "Crisis support and resources" },
        { name: "PFLAG", url: "https://pflag.org/", description: "Support for families and allies" }
      ]
    }
  ];

  return (
    <section id="resources" className="py-16 fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-bright to-lavender bg-clip-text text-transparent">
          Resources
        </h2>
        
        <p className="text-lg text-cyan-muted text-center mb-12">
          Here are some helpful links for learning more about neopronouns and LGBTQ+ topics:
        </p>
        
        <div className="space-y-8">
          {resources.map((category, index) => (
            <div
              key={index}
              className="bg-midnight-light/50 backdrop-blur-md border border-cyan-bright/20 rounded-2xl p-8 shadow-midnight"
            >
              <h3 className="text-xl font-semibold text-cyan-bright mb-6">
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.links.map((link, linkIndex) => (
                  <div
                    key={linkIndex}
                    className="bg-midnight-lighter/50 rounded-lg p-4 border border-lavender/20"
                  >
                    <a
                      href={link.url}
                      className="text-lavender hover:text-lavender-soft transition-smooth font-semibold underline decoration-lavender/50 hover:decoration-lavender-soft"
                    >
                      {link.name}
                    </a>
                    <p className="text-cyan-muted text-sm mt-1">
                      {link.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;