const Navigation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="py-2">
      <div className="flex justify-center gap-4 flex-wrap px-2">
        <button onClick={() => scrollToSection('about')} className="nav-link">
          About
        </button>
        <button onClick={() => scrollToSection('flags')} className="nav-link">
          My Flags
        </button>
        <button onClick={() => scrollToSection('pronouns')} className="nav-link">
          Pronouns
        </button>
        <button onClick={() => scrollToSection('interests')} className="nav-link">
          Interests
        </button>
        <button onClick={() => scrollToSection('artists')} className="nav-link">
          My Fave Artists
        </button>
        <button onClick={() => scrollToSection('projects')} className="nav-link">
          Projects
        </button>
        <button onClick={() => scrollToSection('contact')} className="nav-link">
          Contact
        </button>
        <button onClick={() => scrollToSection('faq')} className="nav-link">
          FAQ
        </button>
        <button onClick={() => scrollToSection('resources')} className="nav-link">
          Resources
        </button>
        <button onClick={() => scrollToSection('discord')} className="nav-link">
          Discord Status
        </button>
      </div>
    </nav>
  );
};

export default Navigation;