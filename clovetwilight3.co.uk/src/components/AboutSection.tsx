import { Card } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 animate-fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-glow-magical">About Me</h2>
        
        <Card className="p-8 glass-effect shadow-magical">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6 text-foreground">
              Hey I'm Clove and welcome to this space! Like a butterfly at twilight, I'm here creating something
              sweet and meaningful. I'm a developer, gamer, and creative soul who loves building things that bring
              joy to others.
            </p>
            
            <p className="text-lg leading-relaxed text-foreground">
              When I'm not coding or gaming, you'll find me exploring new technologies, creating digital art, or
              just vibing in cozy spaces online. I believe in making the internet a more inclusive and beautiful
              place, one project at a time.
            </p>
          </div>
        </Card>

        {/* Interests Grid */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-center mb-8 text-glow">Interests & Hobbies</h3>
          <p className="text-center mb-8 text-muted-foreground">
            I'm passionate about a lot of things! Here's what keeps me busy when I'm not working:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 glass-effect hover:shadow-butterfly transition-magical">
              <div className="text-center">
                <div className="text-4xl mb-4">🎮</div>
                <h4 className="text-xl font-semibold mb-2 text-primary">Gaming</h4>
                <p className="text-muted-foreground">
                  RPGs, indie games, cozy simulators, and the occasional competitive match
                </p>
              </div>
            </Card>
            
            <Card className="p-6 glass-effect hover:shadow-butterfly transition-magical">
              <div className="text-center">
                <div className="text-4xl mb-4">💻</div>
                <h4 className="text-xl font-semibold mb-2 text-primary">Development</h4>
                <p className="text-muted-foreground">
                  Web development, UI/UX design, and creating tools that help others
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;