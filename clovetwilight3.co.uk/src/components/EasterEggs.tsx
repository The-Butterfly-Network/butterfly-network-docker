import { useEffect } from "react";

const EasterEggs = () => {
  useEffect(() => {
    let typedKeys: string[] = [];
    let konamiKeys: string[] = [];
    let gayKeys: string[] = [];
    
    const doughnutTrigger = 'doughnut';
    const gayTrigger = 'gay';
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    // Hint function
    const showHint = (message: string) => {
      const existingHint = document.getElementById('easter-egg-hint');
      if (existingHint) existingHint.remove();

      const hint = document.createElement('div');
      hint.id = 'easter-egg-hint';
      hint.innerText = message;
      Object.assign(hint.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '6px 12px',
        background: 'rgba(0,0,0,0.7)',
        color: 'hsl(var(--foreground))',
        fontSize: '16px',
        borderRadius: '6px',
        zIndex: '10000',
        textShadow: '0 0 10px hsl(var(--primary))',
        pointerEvents: 'none',
        opacity: '0',
        transition: 'opacity 0.3s ease'
      });
      document.body.appendChild(hint);
      requestAnimationFrame(() => hint.style.opacity = '1');
      setTimeout(() => {
        hint.style.opacity = '0';
        setTimeout(() => hint.remove(), 500);
      }, 1500);
    };

    // Doughnut Game
    const launchDoughnutGame = () => {
      if (document.getElementById('doughnut-game')) return;

      const gameContainer = document.createElement('div');
      gameContainer.id = 'doughnut-game';
      Object.assign(gameContainer.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        zIndex: '9999', background: 'rgba(0,0,0,0.7)', overflow: 'hidden',
        userSelect: 'none'
      });
      document.body.appendChild(gameContainer);

      const scoreEl = document.createElement('div');
      Object.assign(scoreEl.style, {
        position: 'fixed', top: '10px', left: '10px', color: 'hsl(var(--foreground))',
        fontSize: '24px', zIndex: '10000', textShadow: '0 0 15px hsl(var(--primary))',
        userSelect: 'none'
      });
      scoreEl.innerText = 'Score: 0';
      document.body.appendChild(scoreEl);

      let score = 0;
      const doughnuts: { el: HTMLElement; speed: number; sway: number; direction: number }[] = [];

      const spawnDoughnut = () => {
        const d = document.createElement('div');
        d.innerText = '🍩';
      Object.assign(d.style, {
        position: 'absolute',
        left: Math.random() * window.innerWidth + 'px',
        top: '-50px',
        fontSize: `${30 + Math.random() * 20}px`,
        cursor: 'pointer',
        color: 'hsl(var(--foreground))',
        textShadow: '0 0 10px hsl(var(--primary)), 0 0 25px hsl(var(--primary))',
        userSelect: 'none'
      });
        gameContainer.appendChild(d);

        d.addEventListener('click', () => {
          d.remove();
          score++;
          scoreEl.innerText = `Score: ${score}`;
        });

        doughnuts.push({ 
          el: d, 
          speed: 2 + Math.random() * 3, 
          sway: Math.random() * 1.5, 
          direction: Math.random() < 0.5 ? -1 : 1 
        });
      };

      const updateDoughnuts = () => {
        for (let i = doughnuts.length - 1; i >= 0; i--) {
          const d = doughnuts[i];
          let top = parseFloat(d.el.style.top);
          let left = parseFloat(d.el.style.left);
          d.el.style.top = top + d.speed + 'px';
          d.el.style.left = left + d.sway * d.direction + 'px';
          if (Math.random() < 0.01) d.direction *= -1;
          if (top > window.innerHeight) {
            d.el.remove();
            doughnuts.splice(i, 1);
          }
        }
      };

      const loop = () => {
        if (Math.random() < 0.03) spawnDoughnut();
        updateDoughnuts();
        requestAnimationFrame(loop);
      };

      loop();

      const escListener = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          gameContainer.remove();
          scoreEl.remove();
          window.removeEventListener('keydown', escListener);
        }
      };

      window.addEventListener('keydown', escListener);
    };

    // Butterfly Rain
    const launchButterflies = () => {
      const numButterflies = 30;
      for (let i = 0; i < numButterflies; i++) {
        const b = document.createElement('div');
        b.innerText = '🦋';
        Object.assign(b.style, {
          position: 'fixed',
          top: '-50px',
          left: Math.random() * window.innerWidth + 'px',
          fontSize: `${20 + Math.random() * 30}px`,
          zIndex: '9999',
          pointerEvents: 'none',
          color: 'hsl(var(--foreground))',
          textShadow: '0 0 10px hsl(var(--primary)), 0 0 25px hsl(var(--primary))',
          filter: 'drop-shadow(0 0 10px hsl(var(--primary)))',
          transform: `rotate(${Math.random() * 360}deg)`
        });
        document.body.appendChild(b);

        let startX = parseFloat(b.style.left);
        let y = -50;
        const speed = 2 + Math.random() * 2;
        const swayAmplitude = 20 + Math.random() * 30;
        const swayFrequency = 0.02 + Math.random() * 0.02;
        let rotation = Math.random() * 360;

        const animate = (time = 0) => {
          y += speed;
          const sway = Math.sin(time * swayFrequency) * swayAmplitude;
          b.style.top = y + 'px';
          b.style.left = startX + sway + 'px';
          rotation += Math.random() * 2 - 1;
          b.style.transform = `rotate(${rotation}deg)`;
          if (y < window.innerHeight + 50) {
            requestAnimationFrame(() => animate(time + 1));
          } else {
            b.remove();
          }
        };

        animate();
      }
    };

    // Gay Video Easter Egg
    const gayVideo = document.createElement('video');
    gayVideo.src = 'https://www.yuri-lover.win/cdn/videos/gay.mp4';
    gayVideo.preload = 'auto';
    gayVideo.loop = true;
    gayVideo.style.display = 'none';
    gayVideo.muted = true;
    gayVideo.setAttribute('type', 'video/mp4');
    document.body.appendChild(gayVideo);

    const launchGayVideo = () => {
      gayVideo.currentTime = 0;
      gayVideo.style.display = 'block';
      
      Object.assign(gayVideo.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: '9999'
      });
      
      gayVideo.muted = false;
      gayVideo.play();

      const escListener = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          gayVideo.pause();
          gayVideo.style.display = 'none';
          window.removeEventListener('keydown', escListener);
        }
      };

      window.addEventListener('keydown', escListener);
    };

    // Key listener
    const handleKeydown = (e: KeyboardEvent) => {
      // Prevent arrow up/down scrolling for Konami sequence
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) e.preventDefault();

      typedKeys.push(e.key.toLowerCase());
      konamiKeys.push(e.key);
      gayKeys.push(e.key.toLowerCase());

      // Show hint only when exact trigger sequences are complete
      if (typedKeys.join('').includes(doughnutTrigger)) showHint('Press [+] to confirm!');
      if (konamiKeys.slice(-konamiCode.length).join(',') === konamiCode.join(',')) showHint('Press [+] to confirm!');
      if (gayKeys.join('').includes(gayTrigger)) showHint('Press [+] to confirm!');

      // Confirm triggers
      if (typedKeys.join('').includes(doughnutTrigger) && e.key === '+') {
        launchDoughnutGame();
        typedKeys = [];
      }

      if (konamiKeys.slice(-konamiCode.length - 1).join(',') === [...konamiCode, '+'].join(',')) {
        launchButterflies();
        konamiKeys = [];
      }

      if (gayKeys.join('').includes(gayTrigger) && e.key === '+') {
        launchGayVideo();
        gayKeys = [];
      }
    };

    window.addEventListener('keydown', handleKeydown);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      gayVideo.remove();
    };
  }, []);

  return null;
};

export default EasterEggs;