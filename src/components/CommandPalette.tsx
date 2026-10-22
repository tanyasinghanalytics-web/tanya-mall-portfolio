import React, { useState, useEffect, useRef } from 'react';
import { Search, CornerDownLeft, Sparkles, Terminal, FileText, Moon, Sun } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onFilterProjectsByTag: (tag: string) => void;
  onResetPortfolio: () => void;
}

interface PaletteItem {
  id: string;
  sql: string;
  hint: string;
  category: 'navigation' | 'action' | 'filter';
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  portfolio,
  theme,
  onToggleTheme,
  onOpenResume,
  onFilterProjectsByTag,
  onResetPortfolio,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const items: PaletteItem[] = [
    {
      id: 'nav-home',
      sql: 'SELECT * FROM portfolio;',
      hint: 'Home Hub',
      category: 'navigation',
      action: () => scrollTo('home'),
    },
    {
      id: 'nav-about',
      sql: `SELECT * FROM analyst WHERE name = '${portfolio.name.split(' ')[0]}';`,
      hint: 'About & Time Series',
      category: 'navigation',
      action: () => scrollTo('about'),
    },
    {
      id: 'nav-skills',
      sql: 'SELECT tool, stage FROM pipeline ORDER BY stage;',
      hint: 'Survey Pipeline & Matrix',
      category: 'navigation',
      action: () => scrollTo('skills'),
    },
    {
      id: 'nav-projects',
      sql: 'SELECT * FROM case_files ORDER BY impact DESC;',
      hint: 'Case Files & Projects',
      category: 'navigation',
      action: () => scrollTo('projects'),
    },
    {
      id: 'nav-impact',
      sql: 'SELECT metric, value FROM results;',
      hint: 'Impact & Before/After',
      category: 'navigation',
      action: () => scrollTo('impact'),
    },
    {
      id: 'nav-contact',
      sql: 'INSERT INTO next_steps VALUES (you);',
      hint: 'Run Query / Get In Touch',
      category: 'navigation',
      action: () => scrollTo('contact'),
    },
    {
      id: 'act-resume',
      sql: `COPY resume TO downloads; -- ${portfolio.resumeFileName}`,
      hint: 'Download Résumé',
      category: 'action',
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'act-theme',
      sql: `UPDATE site SET theme = '${theme === 'dark' ? 'light' : 'dark'}';`,
      hint: 'Toggle Theme',
      category: 'action',
      action: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'filter-pbi',
      sql: "SELECT * FROM case_files WHERE tag = 'Power BI';",
      hint: 'Filter: Power BI',
      category: 'filter',
      action: () => {
        onClose();
        onFilterProjectsByTag('Power BI');
        scrollTo('projects');
      },
    },
    {
      id: 'filter-excel',
      sql: "SELECT * FROM case_files WHERE tag = 'Excel';",
      hint: 'Filter: Excel',
      category: 'filter',
      action: () => {
        onClose();
        onFilterProjectsByTag('Excel');
        scrollTo('projects');
      },
    },
    {
      id: 'filter-sql',
      sql: "SELECT * FROM case_files WHERE tag = 'SQL';",
      hint: 'Filter: SQL',
      category: 'filter',
      action: () => {
        onClose();
        onFilterProjectsByTag('SQL');
        scrollTo('projects');
      },
    },
    {
      id: 'filter-api',
      sql: "SELECT * FROM case_files WHERE tag = 'API';",
      hint: 'Filter: API Automation',
      category: 'filter',
      action: () => {
        onClose();
        onFilterProjectsByTag('API');
        scrollTo('projects');
      },
    },
    {
      id: 'act-reset',
      sql: 'ROLLBACK; -- Reset custom modifications to default',
      hint: 'Reset Defaults',
      category: 'action',
      action: () => {
        onResetPortfolio();
        onClose();
      },
    },
  ];

  const filteredItems = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.sql.toLowerCase().includes(q) ||
      item.hint.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via parent
          const btn = document.getElementById('openPalette');
          if (btn) btn.click();
        }
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(5,8,12,0.65)] backdrop-blur-sm flex items-start justify-center p-4 pt-[10vh] sm:pt-[14vh] animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[640px] rounded-2xl border border-[var(--line-2)] bg-[var(--panel)] shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Command Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--line)] bg-[var(--panel-2)]">
          <Terminal className="w-5 h-5 text-[var(--signal-ink)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a table, query, or command (e.g. projects, resume, python)..."
            className="w-full bg-transparent border-0 outline-none mono text-[15px] text-[var(--text)] placeholder-[var(--muted)]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs mono text-[var(--muted)] hover:text-[var(--text)] px-1.5 py-0.5 rounded border border-[var(--line)]"
            >
              clear
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center mono text-sm text-[var(--muted)]">
              0 rows returned for &ldquo;{query}&rdquo;.
              <div className="mt-2 text-xs text-[var(--faint)]">
                Try searching for &quot;about&quot;, &quot;case&quot;, &quot;resume&quot;, or &quot;theme&quot;.
              </div>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-colors mono text-sm cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--signal-soft)] border border-[var(--signal)]/40 text-[var(--text)]'
                      : 'hover:bg-[var(--panel-2)] text-[var(--text-2)] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-[var(--signal-ink)] font-bold text-xs">›</span>
                    <span className="truncate">{item.sql}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded-md border border-[var(--line-2)] text-[var(--muted)] bg-[var(--bg-2)]">
                      {item.hint}
                    </span>
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-[var(--signal-ink)]" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-[var(--line)] bg-[var(--panel-2)] mono text-[11px] text-[var(--muted)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑ ↓ to navigate</span>
            <span>↵ to execute</span>
            <span>esc to close</span>
          </div>
          <span className="text-[var(--faint)]">{filteredItems.length} query targets</span>
        </div>
      </div>
    </div>
  );
};
