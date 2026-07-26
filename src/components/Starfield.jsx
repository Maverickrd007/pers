import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star configuration
    const numStars = 200;
    const numParticles = 40;
    const stars = [];
    const particles = [];
    let shootingStar = null;
    let nextShootingStarTime = Date.now() + Math.random() * 15000 + 10000; // 10s to 25s

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.2, // Small and elegant
        depth: Math.random() * 0.8 + 0.2, // Depth for parallax (0.2 to 1.0)
        twinkleSpeed: Math.random() * 0.03 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        opacity: Math.random(),
      });
    }

    // Initialize dust particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        alpha: Math.random() * 0.3 + 0.1,
        depth: Math.random() * 0.4 + 0.1,
      });
    }

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Re-distribute stars that fall outside screen
      stars.forEach((star) => {
        if (star.x > width) star.x = Math.random() * width;
        if (star.y > height) star.y = Math.random() * height;
      });
      particles.forEach((p) => {
        if (p.x > width) p.x = Math.random() * width;
        if (p.y > height) p.y = Math.random() * height;
      });
    };

    // Mouse movement handler
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates from -0.5 to 0.5 relative to center
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Shooting Star class-like generator
    const spawnShootingStar = () => {
      const startX = Math.random() * width * 0.7;
      const startY = Math.random() * height * 0.4;
      const length = Math.random() * 100 + 100;
      const angle = (Math.PI / 6) + (Math.random() * Math.PI / 12); // Diagonal angle
      
      shootingStar = {
        x: startX,
        y: startY,
        startX,
        startY,
        dx: Math.cos(angle) * 15,
        dy: Math.sin(angle) * 15,
        length,
        life: 1.0,
        decay: Math.random() * 0.015 + 0.015,
      };
      
      nextShootingStarTime = Date.now() + Math.random() * 15000 + 15000; // Next in 15-30s
    };

    // Render loop
    const tick = () => {
      // Background gradient
      ctx.clearRect(0, 0, width, height);
      
      // Update mouse position with smooth lerp
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw and update stars
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        
        // Calculate parallax coordinates
        // Parallax is scale-dependent (stars with higher depth move more)
        const px = star.x - mouse.x * 40 * star.depth;
        const py = star.y - mouse.y * 40 * star.depth;

        // Wrap around screen edge if shifted too far
        let rx = ((px % width) + width) % width;
        let ry = ((py % height) + height) % height;

        // Twinkle effect (varying opacity)
        const currentOpacity = Math.abs(Math.sin(Date.now() * star.twinkleSpeed + star.twinkleOffset));
        
        ctx.fillStyle = `rgba(244, 243, 236, ${currentOpacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(rx, ry, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Bright star glow
        if (star.size > 1.2 && currentOpacity > 0.8) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.2})`;
          ctx.beginPath();
          ctx.arc(rx, ry, star.size * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // Draw and update dust particles
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Parallax coordinates
        const px = p.x - mouse.x * 20 * p.depth;
        const py = p.y - mouse.y * 20 * p.depth;
        const rx = ((px % width) + width) % width;
        const ry = ((py % height) + height) % height;

        // Draw particle
        ctx.fillStyle = `rgba(244, 243, 236, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(rx, ry, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Spawn shooting stars
      if (!shootingStar && Date.now() > nextShootingStarTime) {
        spawnShootingStar();
      }

      // Draw and update shooting star
      if (shootingStar) {
        ctx.beginPath();
        const grad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - shootingStar.dx * (shootingStar.length / 50),
          shootingStar.y - shootingStar.dy * (shootingStar.length / 50)
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.life})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - shootingStar.dx * (shootingStar.length / 50),
          shootingStar.y - shootingStar.dy * (shootingStar.length / 50)
        );
        ctx.stroke();

        // Update positions
        shootingStar.x += shootingStar.dx;
        shootingStar.y += shootingStar.dy;
        shootingStar.life -= shootingStar.decay;

        if (shootingStar.life <= 0) {
          shootingStar = null;
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
    />
  );
}
