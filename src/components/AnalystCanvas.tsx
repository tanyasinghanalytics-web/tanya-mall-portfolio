import React, { useEffect, useRef } from 'react';

interface AnalystCanvasProps {
  theme: 'dark' | 'light';
}

export const AnalystCanvas: React.FC<AnalystCanvasProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let t = 0;
    let lastTime = performance.now();
    let scrollY0 = window.scrollY;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    interface ScatterPoint {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      isSignal: boolean;
    }

    let points: ScatterPoint[] = [];

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(36, Math.max(16, (width * height) / 48000)));
      points = [];
      for (let i = 0; i < count; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          r: 1.5 + Math.random() * 2.2,
          isSignal: Math.random() < 0.22,
        });
      }

      if (isReduced) {
        drawFrame();
      }
    };

    const handleScroll = () => {
      scrollY0 = window.scrollY;
      if (isReduced) drawFrame();
    };

    const series = (x: number, seed: number, amp: number) => {
      return (
        Math.sin(x * 0.0042 + seed) * amp * 0.55 +
        Math.sin(x * 0.011 + seed * 2.1) * amp * 0.28 +
        Math.sin(x * 0.023 + seed * 3.7) * amp * 0.17
      );
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(20, 30, 50, 0.045)';
      const majorLineColor = isDark ? 'rgba(255, 255, 255, 0.025)' : 'rgba(20, 30, 50, 0.035)';
      const signalColor = isDark ? '#F2A93B' : '#EE9A2C';
      const dataColor = isDark ? '#5AB0F0' : '#2F7FC1';
      const faintColor = isDark ? '#6B7684' : '#8A919B';

      const par = (scrollY0 * 0.08) % 28;

      // 1. Grid pattern
      ctx.fillStyle = gridColor;
      for (let gx = 14; gx < width; gx += 28) {
        for (let gy = 14 - par; gy < height; gy += 28) {
          ctx.fillRect(gx, gy, 1.2, 1.2);
        }
      }

      ctx.strokeStyle = majorLineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let mx = 14; mx < width; mx += 140) {
        ctx.moveTo(mx + 0.5, 0);
        ctx.lineTo(mx + 0.5, height);
      }
      for (let my = 14 - ((scrollY0 * 0.08) % 140); my < height; my += 140) {
        ctx.moveTo(0, my + 0.5);
        ctx.lineTo(width, my + 0.5);
      }
      ctx.stroke();

      // 2. Flowing Time Series
      const lines = [
        { base: height * 0.72, amp: height * 0.16, seed: 1.3, col: dataColor, w: 1.6, al: isDark ? 0.28 : 0.2, fill: true },
        { base: height * 0.58, amp: height * 0.12, seed: 4.1, col: signalColor, w: 1.4, al: isDark ? 0.24 : 0.18, fill: false },
        { base: height * 0.34, amp: height * 0.09, seed: 7.7, col: faintColor, w: 1, al: isDark ? 0.22 : 0.16, fill: false, dash: true },
      ];

      lines.forEach((line, li) => {
        const off = t * (7 + li * 3);
        const yShift = -scrollY0 * (0.04 + li * 0.02);

        ctx.beginPath();
        for (let x = -10; x <= width + 10; x += 8) {
          const y = line.base + yShift + series(x + off, line.seed, line.amp);
          if (x === -10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        if (line.fill) {
          ctx.save();
          ctx.lineTo(width + 10, height);
          ctx.lineTo(-10, height);
          ctx.closePath();
          const grad = ctx.createLinearGradient(0, line.base - line.amp, 0, height);
          grad.addColorStop(0, isDark ? 'rgba(90, 176, 240, 0.08)' : 'rgba(47, 127, 193, 0.06)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.restore();

          ctx.beginPath();
          for (let x2 = -10; x2 <= width + 10; x2 += 8) {
            const y2 = line.base + yShift + series(x2 + off, line.seed, line.amp);
            if (x2 === -10) ctx.moveTo(x2, y2);
            else ctx.lineTo(x2, y2);
          }
        }

        ctx.setLineDash(line.dash ? [4, 6] : []);
        ctx.strokeStyle = line.col;
        ctx.globalAlpha = line.al;
        ctx.lineWidth = line.w;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        // Trailing pulse marker
        if (li === 1) {
          const mxp = width * 0.78;
          const myp = line.base + yShift + series(mxp + off, line.seed, line.amp);
          ctx.fillStyle = signalColor;
          ctx.globalAlpha = isDark ? 0.6 : 0.5;
          ctx.beginPath();
          ctx.arc(mxp, myp, 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = signalColor;
          ctx.globalAlpha = 0.25 + 0.18 * Math.sin(t * 2);
          ctx.beginPath();
          ctx.arc(mxp, myp, 9 + 3 * Math.sin(t * 2), 0, Math.PI * 2);
          ctx.stroke();

          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.moveTo(mxp, myp);
          ctx.lineTo(mxp, height);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
        }
      });

      // 3. Scatter correlation links
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 140 * 140) {
            const alpha = (1 - Math.sqrt(distSq) / 140) * (isDark ? 0.16 : 0.12);
            ctx.strokeStyle = dataColor;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }

        ctx.fillStyle = p.isSignal ? signalColor : dataColor;
        ctx.globalAlpha = p.isSignal ? (isDark ? 0.45 : 0.35) : (isDark ? 0.3 : 0.22);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000 || 0, 0.05);
      lastTime = now;

      if (!document.hidden && dt > 0) {
        t += dt;
        points.forEach((p) => {
          p.x += p.vx * 60 * dt;
          p.y += p.vy * 60 * dt;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        });
        drawFrame();
      }

      animId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (!isReduced) {
      animId = requestAnimationFrame(animate);
    } else {
      drawFrame();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none"
      />
      {/* Radial soft spotlight so text remains ultra-legible */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, color-mix(in srgb, var(--bg) 75%, transparent) 0%, transparent 70%)',
        }}
      />
      <span
        aria-hidden="true"
        className="fixed right-5 bottom-3.5 -z-10 pointer-events-none mono text-[10px] tracking-widest text-[var(--faint)] opacity-60 uppercase hidden sm:block"
      >
        time →
      </span>
      <span
        aria-hidden="true"
        className="fixed left-3 bottom-14 -z-10 pointer-events-none mono text-[10px] tracking-widest text-[var(--faint)] opacity-60 uppercase hidden sm:block [writing-mode:vertical-rl] rotate-180"
      >
        insight →
      </span>
    </>
  );
};
