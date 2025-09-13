import { Card } from "@/components/ui/card";

export const DiscordStatus = () => {
  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Discord Status
        </h2>
        <div className="flex justify-center">
          <iframe
            src="https://status.butterfly-network.win/api/user/1025770042245251122?aboutMe=Founder+of+the+Butterfly+Network%E2%84%A2%0AWife+to+Zoey%0AGirlfriend+to+Eilza%0AMother+to+Aria%2C+Angel+%26+Nytrix&theme=nitroDark&primaryColor=aaff4e&accentColor=ff44da&width=700"
            width="700"
            height="200"
            frameBorder="0"
            className="rounded-lg w-full max-w-[700px]"
            title="Discord Status"
          />
        </div>
      </div>
    </Card>
  );
};