import { Card } from "@/components/ui/card";

const PronounsSection = () => {
  const examples = [
    { label: "Subject", text: "Fae is working on a new project", highlight: "Fae" },
    { label: "Object", text: "I saw faer at the store", highlight: "faer" },
    { label: "Possessive", text: "That's faer laptop", highlight: "faer" },
    { label: "Possessive (standalone)", text: "The code is faers", highlight: "faers" },
    { label: "Reflexive", text: "Clove treated faeself to boba", highlight: "faeself" },
  ];

  return (
    <section id="pronouns" className="py-16 animate-fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-glow-magical">How to Use Pronouns</h2>
        
        <Card className="p-8 glass-effect shadow-magical mb-8">
          <h3 className="text-2xl font-semibold mb-6 text-center text-primary">Quick Reference: fae/faer</h3>
          
          <div className="space-y-4">
            {examples.map((example, index) => (
              <div key={index} className="border-l-4 border-primary/50 pl-4 py-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-medium text-accent min-w-[140px]">{example.label}:</span>
                  <span className="text-foreground">
                    {example.text.split(example.highlight).map((part, i) => (
                      i === 0 ? part : (
                        <span key={i}>
                          <span className="font-bold text-primary bg-primary/20 px-1 rounded">
                            {example.highlight}
                          </span>
                          {part}
                        </span>
                      )
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I use neopronouns, <span className="text-primary font-semibold">fae/faer</span>. 
            Neopronouns can be difficult to use at first, but practice makes perfect! 
            Don't worry about making mistakes - I appreciate the effort to get them right.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PronounsSection;