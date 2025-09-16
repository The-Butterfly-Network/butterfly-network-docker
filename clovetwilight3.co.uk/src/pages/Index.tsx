import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import FlagsSection from "@/components/FlagsSection";
import AboutSection from "@/components/AboutSection";
import PronounsSection from "@/components/PronounsSection";
import ArtistsSection from "@/components/ArtistsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import ResourcesSection from "@/components/ResourcesSection";
import DiscordSection from "@/components/DiscordSection";
import Footer from "@/components/Footer";
import ButterflyButton from "@/components/ButterflyButton";
import BackToTop from "@/components/BackToTop";
import EasterEggs from "@/components/EasterEggs";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setIsVisible(true), 100);
  };

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`min-h-screen bg-gradient-twilight transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Fixed elements */}
      <ButterflyButton />
      <BackToTop />
      <EasterEggs />
      
      {/* Main content */}
      <main className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Header />
        </div>
      </main>
      
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50 bg-background/70 backdrop-blur-sm border-b border-border/20 py-2">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Navigation />
          </div>
        </div>
      </div>
      
      {/* Content Sections */}
      <main className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-0">
            <FlagsSection />
            <AboutSection />
            <PronounsSection />
            <ArtistsSection />
            <ProjectsSection />
            <ContactSection />
            <FAQSection />
            <ResourcesSection />
            <DiscordSection />
          </div>
          
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Index;