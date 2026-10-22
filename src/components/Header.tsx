import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, Menu, X, SlidersHorizontal, FileText } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface HeaderProps {
  portfolio: PortfolioData;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenPalette: () => void;
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
}

const SECTIONS = [
  { id: 'home', num: '00', label: 'Home', sub: 'start here' },
  { id: 'about', num: '01', label: 'About', sub: 'who I am' },
  { id: 'skills', num: '02', label: 'Skills', sub: 'my pipeline' },
  { id: 'resume-section', num: '03', label: 'PDF Resume', sub: 'official document' },
  { id: 'projects', num: '04', label: 'Projects', sub: 'case files' },
  { id: 'impact', num: '05', label: 'Impact', sub: 'results & proof' },
  { id: 'contact', num: '06', label: 'Contact', sub: "let's talk" },
];

export const Header: React.FC<HeaderProps> = ({
  portfolio,
  theme,
  onToggleTheme,
  onOpenPalette,
  onOpenResume,
  onOpenCustomizer,
}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(progress);

      const sectionElements = SECTIONS.map((sec) => document.getElementById(sec.id));
      const scrollPosition = window.scrollY + 220;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentSecObj = SECTIONS.find((s) => s.id === activeSection) || SECTIONS[0];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[var(--signal)] z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className="sticky top-0 z-50 bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur-md border-b border-[var(--line)] transition-colors shadow-sm">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3 text-inherit no-underline group shrink-0"
          >
            <b className="w-10 h-10 rounded-xl border-[1.5px] border-[var(--signal)] flex items-center justify-center mono text-sm text-[var(--signal-ink)] bg-[var(--signal-soft)] group-hover:bg-[var(--signal)] group-hover:text-[var(--on-signal)] transition-colors">
              {portfolio.initials}
            </b>
            <div className="flex flex-col">
              <span className="font-semibold text-[16px] sm:text-[17px] tracking-tight text-[var(--text)] group-hover:text-[var(--signal-ink)] transition-colors">
                {portfolio.name}
              </span>
              <small className="mono text-[11px] text-[var(--muted)] font-normal hidden sm:block">
                {portfolio.role}
              </small>
            </div>
          </a>

          {/* "You are here" chip for tablets */}
          <div className="hidden md:flex xl:hidden items-center justify-center gap-2 h-9 px-3 rounded-full border border-dashed border-[var(--line-2)] mono text-xs text-[var(--muted)] max-w-[210px] overflow-hidden whitespace-nowrap bg-[var(--panel)]">
            <span className="text-[var(--signal-ink)] font-bold">{currentSecObj.num}/06</span>
            <span className="w-1 h-1 rounded-full bg-[var(--faint)]" />
            <span className="text-[var(--text)] font-medium truncate">{currentSecObj.label}</span>
          </div>

          {/* Desktop Navigation Header */}
          <nav
            className="hidden lg:flex items-center gap-1 mono text-[13px]"
            aria-label="Sections"
          >
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => handleNavClick(sec.id)}
                  className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[var(--signal-ink)] bg-[var(--signal-soft)] font-semibold border border-[var(--signal)]/30 shadow-xs'
                      : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--panel-2)]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="text-[var(--faint)] text-[11px] font-normal">{sec.num}</span>
                  <span className="font-medium">{sec.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Site Tools: Query palette, Theme, Resume, Customizer, Mobile Menu */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-2xl border border-[var(--line)] bg-[var(--panel)] shrink-0">
            {/* Quick Resume Button */}
            <button
              type="button"
              onClick={onOpenResume}
              className="h-9 px-2.5 sm:px-3 rounded-xl text-[var(--text)] hover:bg-[var(--signal-soft)] flex items-center gap-1.5 mono text-xs cursor-pointer border border-[var(--signal)]/30 hover:border-[var(--signal)] transition-all"
              title="View & Download Authentic PDF Résumé"
              aria-label="View Résumé"
            >
              <FileText className="w-4 h-4 text-[var(--signal-ink)]" />
              <span className="text-[var(--text)] font-semibold">Résumé</span>
            </button>

            {/* Query Palette Button */}
            <button
              type="button"
              onClick={onOpenPalette}
              className="h-9 px-2.5 rounded-xl text-[var(--text)] hover:bg-[var(--panel-2)] flex items-center gap-1.5 mono text-xs cursor-pointer border border-transparent hover:border-[var(--line)] transition-all"
              aria-label="Open query palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-[var(--data-ink)]" />
              <span className="hidden sm:inline text-[var(--text-2)]">query</span>
              <kbd className="hidden md:inline-block mono text-[10px] px-1.5 py-0.5 rounded border border-[var(--line-2)] text-[var(--muted)] bg-[var(--bg-2)]">
                Ctrl K
              </kbd>
            </button>

            {/* Edit Profile / Customize */}
            <button
              type="button"
              onClick={onOpenCustomizer}
              className="h-9 w-9 rounded-xl flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--panel-2)] cursor-pointer transition-colors"
              title="Customize Portfolio (Profile, KPIs, Contact)"
              aria-label="Customize Portfolio Data"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="h-9 w-9 rounded-xl flex items-center justify-center text-[var(--text)] hover:bg-[var(--panel-2)] cursor-pointer transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[var(--signal)]" />
              ) : (
                <Moon className="w-4 h-4 text-[var(--data)]" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-9 w-9 rounded-xl flex items-center justify-center text-[var(--text)] hover:bg-[var(--panel-2)] cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Sub-Navigation Strip (Always docked below header) */}
        <div className="lg:hidden border-t border-[var(--line)] bg-[var(--panel)]/95 backdrop-blur-sm overflow-x-auto py-2 px-4 flex items-center gap-1.5 scroll-smooth">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleNavClick(sec.id)}
                className={`px-3 py-1.5 rounded-lg mono text-xs shrink-0 flex items-center gap-1 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--signal)] text-[var(--on-signal)] font-bold shadow-xs'
                    : 'bg-[var(--bg-2)] border border-[var(--line)] text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                <span className="opacity-70 text-[10px]">{sec.num}</span>
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 sm:px-8 pb-5 pt-2 border-t border-[var(--line)] bg-[var(--panel)] animate-fadeIn">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleNavClick(sec.id)}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      isActive
                        ? 'border-[var(--signal)] bg-[var(--signal-soft)] text-[var(--signal-ink)] font-bold'
                        : 'border-[var(--line)] bg-[var(--bg-2)] text-[var(--text)] hover:border-[var(--signal)]/50'
                    }`}
                  >
                    <span className="mono text-xs text-[var(--muted)] font-medium">{sec.num}</span>
                    <span className="font-semibold text-sm">{sec.label}</span>
                    <small className="text-[11px] text-[var(--muted)]">{sec.sub}</small>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
