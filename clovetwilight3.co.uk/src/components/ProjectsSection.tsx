import { Card } from "@/components/ui/card";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 animate-fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-glow-magical">Projects</h2>
        
        <Card className="p-8 glass-effect shadow-magical">
          <p className="text-lg text-center mb-8 text-muted-foreground">
            Here are some things I've been working on or am excited about:
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-butterfly-pink pl-6">
              <h4 className="text-xl font-semibold mb-3 text-primary flex items-center gap-2">
                🦋 This Personal Website
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                A personal space to share who I am and help others understand neopronouns better. 
                Built with love, React, TypeScript, and lots of butterfly energy! Now with modern 
                components, smooth animations, and enhanced interactivity.
              </p>
            </div>
          </div>
          
          <p className="text-center mt-8 text-muted-foreground italic">
            More projects coming soon! I'm always tinkering with something new.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default ProjectsSection;