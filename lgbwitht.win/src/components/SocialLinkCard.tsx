import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface SocialLinkCardProps {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}

export const SocialLinkCard = ({ title, description, url, icon }: SocialLinkCardProps) => {
  const isDiscord = title === "Discord";

  if (isDiscord) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--glow-primary)] hover:-translate-y-1 cursor-pointer">
            <Button
              variant="ghost"
              className="w-full h-auto p-6 flex items-center justify-between text-left group-hover:bg-transparent"
              asChild
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                <div className="flex items-center gap-4">
                  <div className="text-primary group-hover:text-secondary transition-colors duration-300">
                    {icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors duration-300" />
              </a>
            </Button>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto p-0 border-border/50 bg-card/95 backdrop-blur-sm z-50" side="left" align="start">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-center mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Discord Status
            </h3>
            <div className="flex justify-center">
              <iframe
                src="https://status.butterfly-network.win/api/user/1025770042245251122?aboutMe=Founder+of+the+Butterfly+Network%E2%84%A2%0AWife+to+Zoey%0AGirlfriend+to+Eilza%0AMother+to+Aria%2C+Angel+%26+Nytrix&theme=nitroDark&primaryColor=aaff4e&accentColor=ff44da&width=700"
                width="700"
                height="200"
                frameBorder="0"
                className="rounded-lg"
                title="Discord Status"
                style={{ minHeight: '150px' }}
              />
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--glow-primary)] hover:-translate-y-1">
      <Button
        variant="ghost"
        className="w-full h-auto p-6 flex items-center justify-between text-left group-hover:bg-transparent"
        asChild
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          <div className="flex items-center gap-4">
            <div className="text-primary group-hover:text-secondary transition-colors duration-300">
              {icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
          <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors duration-300" />
        </a>
      </Button>
    </Card>
  );
};