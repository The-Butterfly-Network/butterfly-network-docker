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
      imageUrl: "https://www.yuri-lover.win/cdn/artists/alextlm.jpg",
      imageAlt: "Clove Icon",
      title: "Clove Nytrix",
      info: "Music Artist Content!"
    },
    {
      url: "https://www.clovetwilight3.co.uk/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/clove.jpg",
      imageAlt: "Clove Icon",
      title: "CloveTwilight3",
      info: "Personal website for Clove!"
    },
    {
      url: "https://www.doughmination.win/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/fallback_avatar.png",
      imageAlt: "Doughmination Icon",
      title: "Doughmination System™",
      info: "Plural System Website!"
    },
    {
      url: "https://www.mazeymoos.com/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/estrogenhrt.png",
      imageAlt: "MazeyMoos Icon",
      title: "EstrogenHRT Gaming",
      subtitle: "formerly MazeyMoos0022",
      info: "Gaming content hub!"
    },
    {
      url: "https://www.hunt-rix.rocks/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/huntrix.png",
      imageAlt: "Hunt-Rix Icon",
      title: "Huntrix Rocks!",
      info: "Fan page for Huntrix!"
    },
    {
      url: "https://www.lgbwitht.win/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/lgbwitht.png",
      imageAlt: "LGBwithT Icon",
      title: "LGBwithT Socials!",
      info: "LGBwithT is the center for all my social media!"
    },
    {
      url: "https://www.iwantedthislongdomainnamesoibroughtit.win/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/hope.jpg",
      imageAlt: "Long Domain Icon",
      title: "Long Domain",
      subtitle: "I don't know why",
      info: "My Calender!"
    },
    {
      url: "https://www.myluminarasystem.pro/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/luminara.png",
      imageAlt: "Luminara System Icon",
      title: "MyLuminaraSystem",
      info: "Work in Progress Plural System Site"
    },
    {
      url: "https://www.clove-portfolio.win/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/clove.jpg",
      imageAlt: "Clove Portfolio Icon",
      title: "Portfolio",
      info: "Showcase of creative works and projects!"
    },
    {
      url: "https://www.mc-svg.win/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/svg.png",
      imageAlt: "SVG Minecraft Icon",
      title: "SVG Minecraft",
      info: "Website for Solent Video Games Minecraft"
    },
    {
      url: "https://www.themidnightcyan.win/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/athena.jpg",
      imageAlt: "Athena Icon",
      title: "TheMidnightCyan",
      info: "Athena's personal website"
    },
    {
      url: "https://www.themotorbikeone.win",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/jessa.png",
      imageAlt: "Jessa Icon",
      title: "The Motorbike One",
      info: "Jessa's personal space"
    },
    {
      url: "https://www.trans4trans.win/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/trans4trans.gif",
      imageAlt: "Trans4Trans Icon",
      title: "Trans4Trans Letters",
      info: "Letters to vent out our issues!"
    },
    {
      url: "https://www.transgamers.org/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/transgamers.png",
      imageAlt: "TransGamers Icon",
      title: "TransGamers",
      info: "A domain we love!"
    },
    {
      url: "https://www.unifiedgaming-systems.co.uk/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/unifiedgaming-systems.png",
      imageAlt: "Unified Gaming Systems Icon",
      title: "UnifiedGaming Systems Ltd.",
      info: "Professional gaming systems and services!"
    },
    {
      url: "https://www.yaoi-lover.win/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/yaoi.png",
      imageAlt: "Yaoi Lover Icon",
      title: "Yaoi Lover Cheat Sheets",
      info: "Life Cheat Sheets!"
    },
    {
      url: "https://www.yuri-lover.win/",
      imageUrl: "https://www.yuri-lover.win/cdn/pfp/yuri.png",
      imageAlt: "Yuri Lover Icon",
      title: "Yuri Lover Files",
      info: "My public CDN!"
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