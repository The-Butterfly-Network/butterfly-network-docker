import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import ButterflyButton from "@/components/ButterflyButton";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import FlagsSection from "@/components/FlagsSection";
import PronounsSection from "@/components/PronounsSection";
import InterestsSection from "@/components/InterestsSection";
import ArtistsSection from "@/components/ArtistsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import ResourcesSection from "@/components/ResourcesSection";
import DiscordSection from "@/components/DiscordSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Add fade-in animation to elements when they come into view
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-hero text-foreground">
      <ButterflyButton />
      <ScrollToTop />
      
      <div className="relative">
        <Header />
        <Navigation />
        
        <main className="space-y-0">
          <AboutSection />
          <FlagsSection />
          <PronounsSection />
          <InterestsSection />
          <ArtistsSection />
          <ProjectsSection />
          <ContactSection />
          <FAQSection />
          <ResourcesSection />
          <DiscordSection />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;