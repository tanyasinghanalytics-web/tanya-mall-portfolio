import React, { useState, useEffect } from 'react';
import { AnalystCanvas } from './components/AnalystCanvas';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ImpactSection } from './components/ImpactSection';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { EditProfileModal } from './components/EditProfileModal';
import { defaultPortfolio } from './data/defaultPortfolio';
import { PortfolioData } from './types/portfolio';

export default function App() {
  // Theme management
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch {
      // ignore
    }
    return 'dark';
  });

  // Portfolio data with localStorage override support
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    try {
      const stored = localStorage.getItem('custom_portfolio_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name && parsed.name === 'Tanya Mall') {
          return { ...defaultPortfolio, ...parsed };
        } else {
          localStorage.removeItem('custom_portfolio_data');
        }
      }
    } catch {
      // ignore
    }
    return defaultPortfolio;
  });

  // Modal states
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Apply theme to html data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSaveProfile = (updated: Partial<PortfolioData>) => {
    const next = { ...portfolio, ...updated };
    setPortfolio(next);
    try {
      localStorage.setItem('custom_portfolio_data', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetProfile = () => {
    setPortfolio(defaultPortfolio);
    try {
      localStorage.removeItem('custom_portfolio_data');
    } catch {
      // ignore
    }
  };

  const handleFilterProjects = (tag: string) => {
    // Scroll to projects and set filter
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-[var(--text)] transition-colors relative selection:bg-[var(--signal)] selection:text-[var(--on-signal)]">
      {/* Dynamic Animated Canvas Background */}
      <AnalystCanvas theme={theme} />

      {/* Top Header */}
      <Header
        portfolio={portfolio}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection
          portfolio={portfolio}
          onOpenResume={() => setIsResumeOpen(true)}
        />
        <AboutSection
          portfolio={portfolio}
          onOpenResume={() => setIsResumeOpen(true)}
        />
        <SkillsSection portfolio={portfolio} />
        <ProjectsSection portfolio={portfolio} />
        <ImpactSection portfolio={portfolio} />
        <ContactSection
          portfolio={portfolio}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </main>

      {/* Site Footer */}
      <footer className="border-t border-[var(--line)] py-8 bg-[var(--panel)]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 mono text-xs text-[var(--muted)]">
          <div>
            © {new Date().getFullYear()} <span className="text-[var(--text)] font-semibold">{portfolio.name}</span> · {portfolio.role}
          </div>
          <div className="flex items-center gap-3">
            <span>built with SQL-flavoured curiosity</span>
            <span>·</span>
            <span>press <kbd className="px-1.5 py-0.5 rounded border border-[var(--line-2)] text-[var(--text)] bg-[var(--bg-2)]">Ctrl K</kbd> to query</span>
            <span>·</span>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[var(--signal-ink)] hover:underline font-semibold"
            >
              back to top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Command Palette Modal */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        portfolio={portfolio}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        onFilterProjectsByTag={handleFilterProjects}
        onResetPortfolio={handleResetProfile}
      />

      {/* Résumé Viewer / Downloader Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        portfolio={portfolio}
      />

      {/* Live Profile Configurator Modal */}
      <EditProfileModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        portfolio={portfolio}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
      />
    </div>
  );
}
