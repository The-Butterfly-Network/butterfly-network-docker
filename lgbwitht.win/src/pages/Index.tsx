import { useState, useEffect } from "react";
import { 
  Github, 
  Twitter, 
  Instagram, 
  Youtube, 
  Twitch, 
  MessageCircle,
  Mail,
  Globe,
  Heart,
  Home,
  Linkedin,
  Facebook
} from "lucide-react";
import { SiDiscord, SiReddit, SiSnapchat, SiTiktok, SiBluesky, SiSpotify, SiTumblr, SiThreads, SiPinterest, SiTelegram } from "react-icons/si";
import { SocialLinkCard } from "@/components/SocialLinkCard";
import { LoadingScreen } from "@/components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const socialLinks = [
    {
      title: "Homepage",
      description: "Visit my main website",
      url: "https://www.clovetwilight3.co.uk",
      icon: <Home className="h-6 w-6" />
    },
    {
      title: "Reddit",
      description: "Follow me on Reddit",
      url: "https://www.reddit.com/user/CloveTwilight",
      icon: <SiReddit className="h-6 w-6" />
    },
    {
      title: "Snapchat",
      description: "Add me on Snapchat",
      url: "https://t.snapchat.com/qoAPY6RC",
      icon: <SiSnapchat className="h-6 w-6" />
    },
    {
      title: "LinkedIn",
      description: "Connect with me professionally",
      url: "https://linkedin.com/in/mazey-jessica-twilight",
      icon: <Linkedin className="h-6 w-6" />
    },
    {
      title: "Instagram",
      description: "Follow my Instagram",
      url: "https://www.instagram.com/clovetwilight3",
      icon: <Instagram className="h-6 w-6" />
    },
    {
      title: "TikTok",
      description: "Check out my TikToks",
      url: "https://www.tiktok.com/@clovetwilight3",
      icon: <SiTiktok className="h-6 w-6" />
    },
    {
      title: "Twitter/X",
      description: "Follow me on X",
      url: "https://x.com/estrogenhrt",
      icon: <Twitter className="h-6 w-6" />
    },
    {
      title: "Facebook",
      description: "Connect on Facebook",
      url: "https://facebook.com/CloveTwilight3",
      icon: <Facebook className="h-6 w-6" />
    },
    {
      title: "BlueSky",
      description: "Follow me on BlueSky",
      url: "https://bsky.app/profile/clovetwilight3.co.uk",
      icon: <SiBluesky className="h-6 w-6" />
    },
    {
      title: "Discord",
      description: "Join my Discord server",
      url: "https://discord.gg/k8HrBvDaQn",
      icon: <SiDiscord className="h-6 w-6" />
    },
    {
      title: "Threads",
      description: "Follow me on Threads",
      url: "https://threads.net/@clovetwilight3",
      icon: <SiThreads className="h-6 w-6" />
    },
    {
      title: "Spotify",
      description: "Listen to my playlists",
      url: "https://open.spotify.com/user/x060f5w4ftwv8zc8fi9662t70",
      icon: <SiSpotify className="h-6 w-6" />
    },
    {
      title: "Tumblr",
      description: "Follow my Tumblr",
      url: "https://tumblr.com/harlotestrogenhrt",
      icon: <SiTumblr className="h-6 w-6" />
    },
    {
      title: "Pinterest",
      description: "Follow my Pinterest boards",
      url: "https://uk.pinterest.com/clovetwilight3/",
      icon: <SiPinterest className="h-6 w-6" />
    },
    {
      title: "Telegram",
      description: "Message me on Telegram",
      url: "https://t.me/estrogenhrt",
      icon: <SiTelegram className="h-6 w-6" />
    }
  ];

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1 shadow-[var(--glow-primary)]">
              <img 
                src="https://www.yuri-lover.win/pfp/lgbwitht.png" 
                alt="LGBwithT Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LGB with T Socials
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Follow all my Socials!
          </p>
          <div className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
            <Heart className="h-5 w-5 text-primary" />
            <span>Connect with me across all platforms</span>
            <Heart className="h-5 w-5 text-primary" />
          </div>
        </header>


        {/* Social Links */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
            Connect With Me
          </h2>
          <div className="grid gap-4 md:gap-6">
            {socialLinks.map((link, index) => (
              <div
                key={link.title}
                className="animate-in slide-in-from-bottom-8 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <SocialLinkCard {...link} />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-border/50">
          <p className="text-muted-foreground">
            © LGB with T | 2025
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;