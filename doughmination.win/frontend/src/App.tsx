import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserProfile from "./pages/UserProfile";
import MemberDetails from "./pages/MemberDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import UserEdit from "./pages/UserEdit";

// Easter egg: ASCII art in console
console.log(`
%cWelcome to the Doughmination System®!

%c🎨 Looking for easter eggs? You never know where they are! :D
%c💼 Interested in the code? Check out our GitHub: https://github.com/The-Butterfly-Network/docker
%c🦋 Part of the Butterfly Network: https://www.butterfly-network.win

`, 
'color: #FF69B4; font-size: 18px; font-weight: bold;',
'color: #8b5cf6; font-size: 14px;',
'color: #3b82f6; font-size: 14px;',
'color: #10b981; font-size: 14px;',
);

// PARTY MODE (Konami Code Easter Egg) — Enhanced
(window as any).party = (() => {
  let enabled = false;
  let confettiInterval: number | null = null;
  let audio: HTMLAudioElement | null = null;

  // Create a single confetto element
  const makeConfetto = () => {
    const confetto = document.createElement("div");
    confetto.className = "confetto";
    confetto.style.left = Math.random() * 100 + "vw";
    confetto.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetto.style.animationDuration = (3 + Math.random() * 3) + "s"; // between 3–6s
    document.body.appendChild(confetto);

    // Remove it after animation ends
    confetto.addEventListener("animationend", () => {
      confetto.remove();
    });
  };

  // Start spawning confetti at intervals
  const startConfetti = () => {
    if (confettiInterval !== null) return;
    confettiInterval = window.setInterval(makeConfetto, 300); // every 300ms
  };

  // Stop spawning confetti
  const stopConfetti = () => {
    if (confettiInterval !== null) {
      clearInterval(confettiInterval);
      confettiInterval = null;
    }
  };

  // Load audio
  const initAudio = () => {
    if (audio) return;
    audio = new Audio("https://www.yuri-lover.win/cdn/audio/Ta-Da.mp3");
    audio.loop = false;
    audio.volume = 0.5;
  };

  return () => {
    enabled = !enabled;

    if (enabled) {
      console.log(`
%c🎉 PARTY MODE ACTIVATED! 🎉
`, 'color: #FF69B4; font-size: 16px; font-weight: bold;');

      document.body.style.animation = "rainbow 2s linear infinite";
      startConfetti();
      initAudio();
      if (audio) audio.play();
    } else {
      console.log(`
%c🛑 PARTY MODE DEACTIVATED 🛑

Back to normal!

`, 'color: #888; font-size: 14px; font-weight: bold;');

      document.body.style.animation = "";
      stopConfetti();
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  };
})();

// Add rainbow animation + confetti styling
const style = document.createElement("style");
style.textContent = `
@keyframes rainbow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

.confetto {
  position: fixed;
  top: -10px;
  width: 10px;
  height: 10px;
  opacity: 0.9;
  border-radius: 2px;
  animation-name: fall;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

@keyframes fall {
  to {
    transform: translateY(110vh) rotate(720deg);
  }
}
`;
document.head.appendChild(style);

(window as any).nyan = (() => {
  let active = false;
  let angle = 0;
  let audio: HTMLAudioElement | null = null;

  return () => {
    active = !active;

    if (active) {
      console.log("🌈 NYAN MODE — ON");

      // Play Nyan audio
      audio = new Audio("/nyan.mp3");
      audio.loop = true;
      audio.volume = 0.2;

      audio.play().catch(() => {
        console.warn("Audio blocked — user interaction required");
      });

      // Add rainbow page animation
      document.body.classList.add("nyan-rainbow");

      // Start rotation
      const rotate = () => {
        if (!active) return;
        angle += 1.2;
        document.body.style.transform = `rotate(${angle}deg)`;
        requestAnimationFrame(rotate);
      };
      rotate();

    } else {
      console.log("❌ NYAN MODE — OFF");

      // Remove rainbow
      document.body.classList.remove("nyan-rainbow");

      // Stop rotate
      document.body.style.transform = "";

      // Stop audio
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio = null;
      }
    }
  };
})();
const nyanStyle = document.createElement("style");
nyanStyle.textContent = `
.nyan-rainbow {
  animation: nyanHue 3s linear infinite;
}

@keyframes nyanHue {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

body {
  transition: transform 0.1s linear;
}
`;
document.head.appendChild(nyanStyle);


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/:member_id" element={<MemberDetails />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute adminRequired={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/user" element={
            <ProtectedRoute adminRequired={false}>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/admin/user/edit" element={
            <ProtectedRoute adminRequired={false}>
              <UserEdit />
            </ProtectedRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
