const FAQSection = () => {
  return (
    <section id="faq" className="py-16 fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-bright to-lavender bg-clip-text text-transparent">
          FAQ
        </h2>
        
        <div className="bg-midnight-light/50 backdrop-blur-md border border-cyan-bright/20 rounded-2xl p-8 shadow-midnight">
          <div className="border-l-4 border-lavender pl-6">
            <h3 className="text-xl font-semibold text-cyan-bright mb-4">
              Are you open to doing work with me?
            </h3>
            
            <p className="text-cyan-muted leading-relaxed">
              Absolutely! I love working on projects that unleash my creativity. Feel free to reach out through 
              Discord or email to discuss ideas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;