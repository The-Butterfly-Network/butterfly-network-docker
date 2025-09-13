const PronounsSection = () => {
  const pronounExamples = [
    { label: "Subject", example: "She is working on a new project" },
    { label: "Object", example: "I saw her at the store" },
    { label: "Possessive", example: "That's her notebook" },
    { label: "Possessive (standalone)", example: "The essay is hers" },
    { label: "Reflexive", example: "Athena treated herself to a cup of tea" }
  ];

  return (
    <section id="pronouns" className="py-16 fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-bright to-lavender bg-clip-text text-transparent">
          How to Use Pronouns
        </h2>
        
        <div className="bg-midnight-light/50 backdrop-blur-md border border-cyan-bright/20 rounded-2xl p-8 shadow-midnight">
          <h3 className="text-2xl font-semibold text-cyan-bright mb-6 text-center">
            Quick Reference: She/Her
          </h3>
          
          <div className="space-y-4">
            {pronounExamples.map((item, index) => (
              <div key={index} className="bg-midnight-lighter/50 rounded-lg p-4 border border-lavender/20">
                <p className="text-cyan-muted">
                  <span className="text-lavender font-semibold">{item.label}:</span> "{item.example}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PronounsSection;