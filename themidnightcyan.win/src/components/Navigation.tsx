const Navigation = () => {
  const navItems = [
    { href: "#about", label: "About!" },
    { href: "#flags", label: "My Flags!" },
    { href: "#pronouns", label: "Pronouns!" },
    { href: "#interests", label: "Interests!" },
    { href: "#artists", label: "Artists I love!" },
    { href: "#projects", label: "Projects!" },
    { href: "#contact", label: "Contact!" },
    { href: "#faq", label: "FAQ!" },
    { href: "#resources", label: "Resources!" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-30 bg-midnight-light/80 backdrop-blur-md border-b border-cyan-bright/20 fade-in-up">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 py-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="px-4 py-2 text-sm text-cyan-muted hover:text-cyan-bright border border-transparent hover:border-cyan-bright/30 rounded-full transition-smooth hover:bg-midnight-light/50"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;