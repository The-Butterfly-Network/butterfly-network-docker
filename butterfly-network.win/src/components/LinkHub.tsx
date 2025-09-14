import { useEffect } from "react";
import LinkButton from "./LinkButton";

const LinkHub = () => {
  useEffect(() => {
    // Fade in animation for elements
    const elements = document.querySelectorAll('.fade-in-element');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const links = [
    {
      url: "https://www.alextlm.co.uk/",
      imageUrl: "https://www.yuri-lover.win/artists/alextlm.jpg",
      imageAlt: "Clove Icon",
      title: "Clove Nytrix",
      info: "Artist and creative content creator!"
    },
    {
      url: "https://www.clovetwilight3.co.uk/",
      imageUrl: "https://yuri-lover.win/pfp/clove.jpg",
      imageAlt: "Clove Icon",
      title: "CloveTwilight3",
      info: "Personal website and portfolio showcase!"
    },
    {
      url: "https://www.doughmination.win/",
      imageUrl: "https://www.yuri-lover.win/pfp/fallback_avatar.png",
      imageAlt: "Doughmination Icon",
      title: "Doughmination System™",
      info: "Creative system and collaborative projects!"
    },
    {
      url: "https://www.mazeymoos.com/",
      imageUrl: "https://yuri-lover.win/pfp/estrogenhrt.png",
      imageAlt: "MazeyMoos Icon",
      title: "EstrogenHRT Gaming",
      subtitle: "formerly MazeyMoos0022",
      info: "Gaming content and streaming hub!"
    },
    {
      url: "https://www.hunt-rix.rocks/",
      imageUrl: "https://www.yuri-lover.win/pfp/huntrix.png",
      imageAlt: "Hunt-Rix Icon",
      title: "Huntrix Rocks!",
      info: "Music and creative content platform!"
    },
    {
      url: "https://www.lgbwitht.win/",
      imageUrl: "https://yuri-lover.win/pfp/lgbwitht.png",
      imageAlt: "LGBwithT Icon",
      title: "LGBwithT Socials!",
      info: "LGBwithT is the center for all my social media!"
    },
    {
      url: "https://www.iwantedthislongdomainnamesoibroughtit.win/",
      imageUrl: "https://www.yuri-lover.win/pfp/hope.jpg",
      imageAlt: "Long Domain Icon",
      title: "Long Domain",
      subtitle: "I don't know why",
      info: "A domain with an amusing backstory!"
    },
    {
      url: "https://www.myluminarasystem.pro/",
      imageUrl: "https://yuri-lover.win/pfp/luminara.png",
      imageAlt: "Luminara System Icon",
      title: "MyLuminaraSystem",
      info: "Professional system services and solutions!"
    },
    {
      url: "https://www.clove-portfolio.win/",
      imageUrl: "https://yuri-lover.win/pfp/clove.jpg",
      imageAlt: "Clove Portfolio Icon",
      title: "Portfolio",
      info: "Showcase of creative works and projects!"
    },
    {
      url: "https://www.mc-svg.win/",
      imageUrl: "https://www.yuri-lover.win/pfp/svg.png",
      imageAlt: "SVG Minecraft Icon",
      title: "SVG Minecraft",
      info: "Minecraft-themed SVG graphics and resources!"
    },
    {
      url: "https://www.themidnightcyan.win/",
      imageUrl: "https://yuri-lover.win/pfp/athena.jpg",
      imageAlt: "Athena Icon",
      title: "TheMidnightCyan",
      info: "Personal creative space and projects!"
    },
    {
      url: "https://www.trans4trans.win/",
      imageUrl: "https://www.yuri-lover.win/pfp/trans4trans.gif",
      imageAlt: "Trans4Trans Icon",
      title: "Trans4Trans Letters",
      info: "Community support and correspondence platform!"
    },
    {
      url: "https://www.transgamers.org/",
      imageUrl: "https://yuri-lover.win/pfp/transgamers.png",
      imageAlt: "TransGamers Icon",
      title: "TransGamers",
      info: "Gaming community for transgender players!"
    },
    {
      url: "https://www.unifiedgaming-systems.co.uk/",
      imageUrl: "https://yuri-lover.win/pfp/unifiedgaming-systems.png",
      imageAlt: "Unified Gaming Systems Icon",
      title: "UnifiedGaming Systems Ltd.",
      info: "Professional gaming systems and services!"
    },
    {
      url: "https://www.yaoi-lover.win/",
      imageUrl: "https://www.yuri-lover.win/yuri-and-yaoi/yaoi.png",
      imageAlt: "Yaoi Lover Icon",
      title: "Yaoi Lover Cheat Sheets",
      info: "Resources and guides for yaoi content!"
    },
    {
      url: "https://www.yuri-lover.win/",
      imageUrl: "https://www.yuri-lover.win/yuri-and-yaoi/yuri.png",
      imageAlt: "Yuri Lover Icon",
      title: "Yuri Lover Files",
      info: "Collection of yuri content and resources!"
    }
  ];

  return (
    <section className="fade-in-element py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {links.map((link, index) => (
            <LinkButton
              key={index}
              url={link.url}
              imageUrl={link.imageUrl}
              imageAlt={link.imageAlt}
              title={link.title}
              subtitle={link.subtitle}
              info={link.info}
              className="animate-delay-[${index * 100}ms]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinkHub;