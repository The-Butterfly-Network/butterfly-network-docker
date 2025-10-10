import { Card } from "@/components/ui/card";

const DiscordSection = () => {
  return (
    <section id="discord" className="py-16 animate-fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-16">
          {/* Discord Status */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-12 text-glow-magical">My Discord Status!</h2>
            
            <Card className="p-8 glass-effect shadow-magical text-center">
              <div className="inline-block bg-muted/20 rounded-lg p-4">
                <object
                  data="https://discord.butterfly-network.win/api/user/1025770042245251122?aboutMe=Founder+of+the+Butterfly+Network%E2%84%A2%0AWife+to+Zoey%0AGirlfriend+to+Eilza%0AMother+to+Aria%2C+Angel+%26+Nytrix&theme=nitroDark&primaryColor=aaff4e&accentColor=ff44da&width=512"
                  type="image/png"
                  className="discord-embed max-w-full h-auto"
                  aria-label="Discord Status"
                >
                  <div className="text-muted-foreground">
                    Your browser does not support this feature.
                  </div>
                </object>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DiscordSection;
