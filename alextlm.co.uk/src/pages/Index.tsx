import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MusicSection from "@/components/MusicSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="music">
          <MusicSection />
        </section>
        
        <section id="about">
          <AboutSection />
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
