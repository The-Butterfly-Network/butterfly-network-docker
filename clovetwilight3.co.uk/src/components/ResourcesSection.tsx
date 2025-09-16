import { Card } from "@/components/ui/card";
import { ExternalLink, Book, Heart } from "lucide-react";

const ResourcesSection = () => {
  const resources = [
    {
      category: "Pronoun Resources",
      icon: Book,
      links: [
        { name: "Pronouns.org", url: "https://pronouns.org/", description: "Comprehensive guide to all types of pronouns" },
        { name: "LGBTA Wiki", url: "https://lgbta.miraheze.org/", description: "Extensive documentation of LGBTQ+ identities and terminology" }
      ]
    },
    {
      category: "General LGBTQ+ Support",
      icon: Heart,
      links: [
        { name: "The Trevor Project", url: "https://www.thetrevorproject.org/", description: "Crisis support and resources" },
        { name: "PFLAG", url: "https://pflag.org/", description: "Support for families and allies" }
      ]
    }
  ];

  return (
    <section id="resources" className="py-16 animate-fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-glow-magical">Resources</h2>
        
        <Card className="p-8 glass-effect shadow-magical">
          <p className="text-lg text-center mb-8 text-muted-foreground">
            Here are some helpful links for learning more about neopronouns and LGBTQ+ topics:
          </p>
          
          <div className="space-y-8">
            {resources.map((category, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.category}
                </h3>
                
                <div className="space-y-3 pl-7">
                  {category.links.map((link, linkIndex) => (
                    <div key={linkIndex} className="group">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-magical"
                      >
                        <ExternalLink className="w-4 h-4 mt-0.5 text-accent group-hover:text-primary transition-colors" />
                        <div>
                          <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {link.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {link.description}
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ResourcesSection;