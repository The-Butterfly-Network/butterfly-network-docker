const ContactSection = () => {
  const contactMethods = [
    { icon: "🎮", label: "Discord", value: "@themidnightcyan" },
    { icon: "📧", label: "Email", value: "themidnightcyan@outlook.com" },
    { icon: "📸", label: "Instagram", value: "@themidnightcyan" },
  ];

  return (
    <section id="contact" className="py-16 fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-bright to-lavender bg-clip-text text-transparent">
          Contact
        </h2>
        
        <p className="text-lg text-cyan-muted text-center mb-12">
          Best way to reach me is through Discord, but here are all my socials:
        </p>
        
        <div className="bg-midnight-light/50 backdrop-blur-md border border-cyan-bright/20 rounded-2xl p-8 shadow-midnight">
          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-midnight-lighter/50 rounded-lg border border-lavender/20 transition-smooth hover:border-lavender/40"
              >
                <span className="text-2xl">{method.icon}</span>
                <div>
                  <span className="text-lavender font-semibold">{method.label}:</span>
                  <span className="text-cyan-muted ml-2">{method.value}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-lavender-soft italic">
              Feel free to reach out about some of my works! I love meeting new people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;