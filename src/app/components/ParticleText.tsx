import React, { useRef, useEffect, useCallback } from 'react';

export function ParticleText({
  text = 'brilliant.',
  fontSize = 90,
  gap = 5,
  particleSize = 2.5,
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number | null>(null);
  
  // Sample the text into a grid of particles using an offscreen canvas.
  const buildParticles = useCallback(
    (canvas: HTMLCanvasElement, str: string) => {
      const width = canvas.width;
      const height = canvas.height;
      if (!width || !height) return;

      const off = document.createElement('canvas');
      off.width = width;
      off.height = height;
      const octx = off.getContext('2d');
      if (!octx) return;
      
      octx.clearRect(0, 0, width, height);
      octx.fillStyle = '#fff';

      let size = fontSize;
      octx.font = `900 ${size}px "Arial Black", Arial, sans-serif`;
      let textWidth = octx.measureText(str).width;
      const maxWidth = width * 0.9;
      if (textWidth > maxWidth && textWidth > 0) {
        size = Math.floor(size * (maxWidth / textWidth));
        octx.font = `900 ${size}px "Arial Black", Arial, sans-serif`;
        textWidth = octx.measureText(str).width;
      }
      octx.textBaseline = 'middle';
      octx.fillText(str, (width - textWidth) / 2, height / 2);

      const imgData = octx.getImageData(0, 0, width, height).data;
      const particles = [];
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const alphaIdx = (y * width + x) * 4 + 3;
          if (imgData[alphaIdx] > 128) {
            particles.push({
              x,
              y,
              homeX: x,
              homeY: y,
              vx: 0,
              vy: 0,
              color: '#ffffff', // Changed to white as requested
              gravity: 0.25 + Math.random() * 0.35,
              drift: (Math.random() - 0.5) * 1.2,
              delay: Math.random() * 18,
            });
          }
        }
      }
      particlesRef.current = particles;
    },
    [fontSize, gap]
  );

  // (Re)build the particle grid whenever the canvas resizes.
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      buildParticles(canvas, text);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [text, buildParticles]);

  // Animation loop: particles are repelled by the cursor and spring back home.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const REPEL_RADIUS = 50;
    const REPEL_STRENGTH = 6;
    const SPRING = 0.06;
    const FRICTION = 0.82;

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        }

        p.vx += (p.homeX - p.x) * SPRING;
        p.vy += (p.homeY - p.y) * SPRING;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, particleSize, particleSize);
      }

      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [particleSize]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    if (touch) {
      mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
  };

  const handleLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 };
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        boxSizing: 'border-box',
      }}
    >
      <div
        ref={containerRef}
        style={{ width: '100%', maxWidth: '900px', height: '200px', position: 'relative' }}
      >
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleLeave}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>
    </div>
  );
}

