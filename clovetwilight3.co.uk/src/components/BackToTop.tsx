import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full
        bg-gradient-magical shadow-magical hover:shadow-glow
        transition-all duration-300 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}
      `}
      size="sm"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
};

export default BackToTop;