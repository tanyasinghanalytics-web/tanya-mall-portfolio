import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Copy, Check, RefreshCw, Play, Pause, Database, Layers, Sparkles, FileText } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface HeroSectionProps {
  portfolio: PortfolioData;
  onOpenResume?: () => void;
}

interface ScatterPoint {
  id: number;
  rawX: number;
  rawY: number;
  cleanX: number;
  cleanY: number;
  isOutlier: boolean;
  value: number;
  week: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ portfolio, onOpenResume }) => {
  // Rotating headline index
  const [rotateIndex, setRotateIndex] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);

  // Lab step: 0: raw, 1: clean, 2: insight
  const [labStep, setLabStep] = useState<0 | 1 | 2>(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hoveredDot, setHoveredDot] = useState<ScatterPoint | null>(null);
  const [copiedQuery, setCopiedQuery] = useState(false);
  const [activeSchemaTable, setActiveSchemaTable] = useState<string | null>(null);

  // Rotate tagline
  useEffect(() => {
    const timer = setInterval(() => {
      setIsSwapping(true);
      setTimeout(() => {
        setRotateIndex((prev) => (prev + 1) % portfolio.rotateFrom.length);
        setIsSwapping(false);
      }, 240);
    }, 3200);

    return () => clearInterval(timer);
  }, [portfolio.rotateFrom.length]);

  // Generate reproducible pseudo-random points for the interactive lab
  const [seed, setSeed] = useState(1);
  const scatterPoints = useMemo<ScatterPoint[]>(() => {
    let s = seed * 997 + 13;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };

    const pts: ScatterPoint[] = [];
    const total = 44;
    for (let i = 0; i < total; i++) {
      const isOut = i >= 38;
      const t = (i % 38) / 37;
      const jitter = (rnd() - 0.5) * 12;

      pts.push({
        id: i,
        rawX: 6 + rnd() * 88,
        rawY: 8 + rnd() * 84,
        cleanX: isOut ? 12 + rnd() * 76 : 8 + t * 84,
        cleanY: isOut ? 10 + rnd() * 25 : 84 - t * 66 + jitter,
        isOutlier: isOut,
        week: Math.round(1 + t * 12),
        value: Math.round(120 + t * 450 + jitter * 8),
      });
    }
    return pts;
  }, [seed]);

  // Auto cycle lab step
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setLabStep((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }, 2800);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const labCaptions = [
    'fig. 00 · raw_events.csv — 44 untamed rows, 6 noisy outliers, zero meaning… yet.',
    'fig. 00 · clean_events — 6 misleading anomalies filtered out, 38 honest records verified.',
    'fig. 00 · linear_regression(t) — strong positive trend detected (r = 0.89, +34% retention impact).',
  ];

  const methodSqlQuery = `SELECT   decision
FROM     your_data
WHERE    question IS NOT NULL  -- a real business problem
GROUP BY what_matters          -- filter out noise & bias
HAVING   impact > 0;           -- only done when behavior changes`;

  const handleCopyMethodSql = () => {
    navigator.clipboard.writeText(methodSqlQuery);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2000);
  };

  const handleSchemaNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="border-b border-[var(--line)] pb-12 pt-6 sm:pt-10 scroll-mt-20" id="home">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pt-4 pb-12">
          {/* Left Hero Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="mono text-xs sm:text-[13px] tracking-wider text-[var(--data-ink)] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--data)]" />
              <span>00 · home · SELECT * FROM portfolio;</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.08] text-[var(--text)]">
              I turn{' '}
              <span
                className={`text-[var(--signal-ink)] underline decoration-[3px] decoration-[var(--signal)] underline-offset-8 transition-opacity duration-200 inline-block ${
                  isSwapping ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
                }`}
              >
                {portfolio.rotateFrom[rotateIndex]}
              </span>
              <br />
              into{' '}
              <span
                className={`text-[var(--signal-ink)] underline decoration-[3px] decoration-[var(--signal)] underline-offset-8 transition-opacity duration-200 inline-block ${
                  isSwapping ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
                }`}
              >
                {portfolio.rotateTo[rotateIndex]}
              </span>
              .
            </h1>

            <p className="text-lg sm:text-[19px] leading-relaxed text-[var(--text-2)] max-w-[580px]">
              Hi, I&apos;m <span className="text-[var(--text)] font-semibold">{portfolio.name}</span> — a{' '}
              {portfolio.role} based in <span className="text-[var(--text)]">{portfolio.city}</span>. I ask better questions of data, then architect solutions people can actually act on.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 h-12 rounded-full font-semibold text-sm sm:text-base bg-[var(--signal)] text-[var(--on-signal)] hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg cursor-pointer"
              >
                Open the case files
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 h-12 rounded-full mono text-xs sm:text-sm font-medium border border-[var(--line-2)] text-[var(--text)] hover:border-[var(--signal)] hover:bg-[var(--panel-2)] transition-all cursor-pointer"
              >
                Meet the analyst
              </a>

              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-5 h-12 rounded-full mono text-xs sm:text-sm font-semibold border border-[var(--signal)] text-[var(--signal-ink)] bg-[var(--signal-soft)] hover:bg-[var(--signal)] hover:text-[var(--on-signal)] transition-all cursor-pointer shadow-md"
                  title="View Authentic PDF Résumé Frame"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Résumé (PDF)</span>
                </button>
              )}
            </div>

            {/* Status pills */}
            <div className="pt-2 flex flex-wrap items-center gap-4 mono text-xs text-[var(--muted)] border-t border-[var(--line)]">
              <span className="flex items-center gap-2 text-[var(--text-2)]">
                <span className="w-2 h-2 rounded-full bg-[var(--ok)] animate-pulse" />
                {portfolio.status}
              </span>
              <span className="text-[var(--faint)]">·</span>
              <span className="text-[var(--muted)]">{portfolio.skillsSummary}</span>
            </div>
          </div>

          {/* Right Hero Column: Interactive Lab */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            {/* Lab Step Selector */}
            <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl border border-[var(--line)] bg-[var(--panel)]">
              <div className="flex gap-1 flex-1">
                {(['01 · raw', '02 · clean', '03 · insight'] as const).map((label, stepIdx) => {
                  const isActive = labStep === stepIdx;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        setIsAutoPlay(false);
                        setLabStep(stepIdx as 0 | 1 | 2);
                      }}
                      className={`flex-1 py-2 sm:py-2.5 rounded-xl mono text-xs sm:text-[13px] font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[var(--signal)] text-[var(--on-signal)] font-semibold shadow-sm'
                          : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--panel-2)]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Lab playback controls */}
              <div className="flex items-center gap-1 pl-1 pr-1 border-l border-[var(--line)]">
                <button
                  type="button"
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg-2)] cursor-pointer"
                  title={isAutoPlay ? 'Pause auto-cycle' : 'Start auto-cycle'}
                  aria-label={isAutoPlay ? 'Pause auto-cycle' : 'Start auto-cycle'}
                >
                  {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setSeed((prev) => prev + 1)}
                  className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg-2)] cursor-pointer"
                  title="Generate new random sample dataset"
                  aria-label="Generate new random sample dataset"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Scatter Plot Chart */}
            <div className="relative h-[360px] sm:h-[420px] rounded-2xl border border-[var(--line)] bg-[var(--panel)] overflow-hidden shadow-xl">
              {/* Axes labels */}
              <div className="absolute left-10 bottom-3.5 mono text-[11px] text-[var(--muted)] tracking-wider">
                weeks on platform (t) →
              </div>
              <div className="absolute left-3 top-7 mono text-[11px] text-[var(--muted)] tracking-wider [writing-mode:vertical-rl] rotate-180">
                active customer ltv ($) →
              </div>

              {/* Plot Surface */}
              <div className="absolute left-10 right-6 top-7 bottom-11 border-l border-b border-[var(--line-2)] relative overflow-hidden">
                {/* SVG Trendline for step 3 */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {/* Subtle Grid reference lines */}
                  <line x1="0" y1="25" x2="100" y2="25" stroke="var(--line)" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="var(--line)" strokeDasharray="3 3" />
                  <line x1="0" y1="75" x2="100" y2="75" stroke="var(--line)" strokeDasharray="3 3" />

                  {/* Trend line */}
                  <polyline
                    points="6,84 94,18"
                    fill="none"
                    stroke="var(--data)"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray="400"
                    strokeDashoffset={labStep === 2 ? 0 : 400}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Signal Annotation */}
                <div
                  className={`absolute right-4 top-4 px-3 py-2 rounded-xl bg-[var(--signal)] text-[var(--on-signal)] mono text-xs font-bold shadow-lg transition-all duration-500 flex items-center gap-1.5 z-10 ${
                    labStep === 2
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>signal ↑ found: r = 0.89 (+34% MoM)</span>
                </div>

                {/* Scatter Points */}
                {scatterPoints.map((pt) => {
                  const x = labStep === 0 ? pt.rawX : pt.cleanX;
                  const y = labStep === 0 ? pt.rawY : pt.cleanY;
                  const isFiltered = pt.isOutlier && labStep > 0;
                  const isHighlighted = labStep === 2 && !pt.isOutlier;

                  return (
                    <div
                      key={pt.id}
                      onMouseEnter={() => setHoveredDot(pt)}
                      onMouseLeave={() => setHoveredDot(null)}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transition:
                          'left 1.2s cubic-bezier(0.4, 0, 0.2, 1), top 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease, transform 0.6s ease',
                      }}
                      className={`absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full cursor-pointer z-0 hover:scale-150 transition-transform ${
                        isFiltered
                          ? 'opacity-0 scale-0 pointer-events-none'
                          : pt.isOutlier && labStep === 0
                          ? 'bg-transparent border-2 border-[var(--signal)] ring-4 ring-[var(--signal)]/20'
                          : isHighlighted
                          ? pt.id % 5 === 0
                            ? 'bg-[var(--data)] shadow-[0_0_8px_var(--data)]'
                            : 'bg-[var(--signal)] shadow-[0_0_8px_var(--signal)]'
                          : 'bg-[var(--noise)] hover:bg-[var(--text)]'
                      }`}
                    />
                  );
                })}

                {/* Dot Tooltip */}
                {hoveredDot && (
                  <div
                    className="absolute z-20 pointer-events-none bg-[var(--panel-2)] border border-[var(--line-2)] rounded-lg p-2 mono text-[11px] shadow-xl text-[var(--text)]"
                    style={{
                      left: `${Math.min(labStep === 0 ? hoveredDot.rawX : hoveredDot.cleanX, 75)}%`,
                      top: `${Math.max((labStep === 0 ? hoveredDot.rawY : hoveredDot.cleanY) - 18, 5)}%`,
                    }}
                  >
                    <div className="font-semibold text-[var(--signal-ink)]">
                      {hoveredDot.isOutlier ? 'Outlier Point' : `Customer #${hoveredDot.id + 100}`}
                    </div>
                    <div>Week: {hoveredDot.week}</div>
                    <div>LTV: ${hoveredDot.value}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Figcaption */}
            <figcaption className="mono text-xs text-[var(--muted)] min-h-[22px] flex items-center justify-between px-1">
              <span>{labCaptions[labStep]}</span>
              <span className="text-[var(--faint)] text-[11px]">click dots to inspect</span>
            </figcaption>
          </div>
        </div>

        {/* METHOD IN ONE QUERY */}
        <div className="pt-8 pb-12 border-t border-[var(--line)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="mono text-xs text-[var(--data-ink)] uppercase tracking-wider font-semibold">
                my method, in one query
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)]">
                Every project I take on runs the same query.
              </h2>
              <p className="text-[16px] leading-relaxed text-[var(--text-2)]">
                Start with a real question, ignore what doesn&apos;t matter, and only call it done when something changes in the real world. The tools vary — the query never does.
              </p>
              <a
                href="#skills"
                className="mono text-xs text-[var(--signal-ink)] hover:underline inline-flex items-center gap-1.5 pt-1 font-medium"
              >
                see the full pipeline →
              </a>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-5 sm:p-6 overflow-hidden shadow-md">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--line)] mono text-xs text-[var(--muted)]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--line-2)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--line-2)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--line-2)]" />
                    <span className="ml-2 text-[var(--faint)]">methodology.sql</span>
                  </div>
                  <button
                    onClick={handleCopyMethodSql}
                    className="flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--text)] px-2 py-1 rounded border border-[var(--line)] bg-[var(--panel)] cursor-pointer transition-colors"
                  >
                    {copiedQuery ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[var(--ok)]" />
                        <span className="text-[var(--ok)]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="mono text-xs sm:text-sm leading-relaxed text-[var(--text)] overflow-x-auto whitespace-pre">
                  <span className="text-[var(--data-ink)] font-bold">SELECT</span>   decision{'\n'}
                  <span className="text-[var(--data-ink)] font-bold">FROM</span>     your_data{'\n'}
                  <span className="text-[var(--data-ink)] font-bold">WHERE</span>    question <span className="text-[var(--data-ink)] font-bold">IS NOT NULL</span>  <span className="text-[var(--muted)]">-- a real question</span>{'\n'}
                  <span className="text-[var(--data-ink)] font-bold">GROUP BY</span> what_matters          <span className="text-[var(--muted)]">-- cut the noise</span>{'\n'}
                  <span className="text-[var(--data-ink)] font-bold">HAVING</span>   impact &gt; <span className="text-[var(--signal-ink)]">0</span>;           <span className="text-[var(--muted)]">-- something changed</span>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* SITE SCHEMA: ER DIAGRAM NAVIGATION */}
        <div className="pt-6 pb-14 border-t border-[var(--line)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
            <div>
              <span className="mono text-xs text-[var(--data-ink)] uppercase tracking-wider font-semibold">
                how this portfolio is structured
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)] mt-1">
                Explore this portfolio like a relational database.
              </h2>
            </div>
            <span className="mono text-xs text-[var(--muted)]">
              every section is a table · click to query & navigate
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Table 1: analyst */}
            <div
              onClick={() => handleSchemaNavigate('about')}
              onMouseEnter={() => setActiveSchemaTable('analyst')}
              onMouseLeave={() => setActiveSchemaTable(null)}
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 hover:border-[var(--signal)] hover:-translate-y-1 transition-all cursor-pointer shadow-md group"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--line)] mono text-sm font-bold text-[var(--text)] group-hover:text-[var(--signal-ink)]">
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[var(--data-ink)]" />
                  analyst
                </span>
                <span className="text-xs font-normal text-[var(--muted)]">about.html</span>
              </div>
              <ul className="mono text-xs space-y-1.5 text-[var(--text-2)] mb-3">
                <li className="flex justify-between">
                  <span className="text-[var(--signal-ink)] font-medium">PK · name</span>
                  <span className="text-[var(--muted)]">str</span>
                </li>
                <li className="flex justify-between">
                  <span>role</span>
                  <span className="text-[var(--muted)]">str</span>
                </li>
                <li className="flex justify-between">
                  <span>journey</span>
                  <span className="text-[var(--muted)]">timeseries</span>
                </li>
                <li className="flex justify-between">
                  <span>beliefs</span>
                  <span className="text-[var(--muted)]">list</span>
                </li>
              </ul>
              <p className="text-xs text-[var(--muted)] pt-3 border-t border-[var(--line)] leading-relaxed">
                Who I am, how I got here, and what I believe about data integrity.
              </p>
            </div>

            {/* Table 2: pipeline */}
            <div
              onClick={() => handleSchemaNavigate('skills')}
              onMouseEnter={() => setActiveSchemaTable('pipeline')}
              onMouseLeave={() => setActiveSchemaTable(null)}
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 hover:border-[var(--signal)] hover:-translate-y-1 transition-all cursor-pointer shadow-md group"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--line)] mono text-sm font-bold text-[var(--text)] group-hover:text-[var(--signal-ink)]">
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[var(--data-ink)]" />
                  pipeline
                </span>
                <span className="text-xs font-normal text-[var(--muted)]">skills.html</span>
              </div>
              <ul className="mono text-xs space-y-1.5 text-[var(--text-2)] mb-3">
                <li className="flex justify-between">
                  <span className="text-[var(--signal-ink)] font-medium">PK · stage</span>
                  <span className="text-[var(--muted)]">int</span>
                </li>
                <li className="flex justify-between">
                  <span>tools</span>
                  <span className="text-[var(--muted)]">list</span>
                </li>
                <li className="flex justify-between">
                  <span>input</span>
                  <span className="text-[var(--muted)]">raw</span>
                </li>
                <li className="flex justify-between">
                  <span>output</span>
                  <span className="text-[var(--muted)]">decision</span>
                </li>
              </ul>
              <p className="text-xs text-[var(--muted)] pt-3 border-t border-[var(--line)] leading-relaxed">
                My skills structured as an ETL pipeline — from raw extraction to decisions.
              </p>
            </div>

            {/* Table 3: portfolio (Center hub) */}
            <div
              onClick={() => handleSchemaNavigate('home')}
              onMouseEnter={() => setActiveSchemaTable('portfolio')}
              onMouseLeave={() => setActiveSchemaTable(null)}
              className="rounded-2xl border-2 border-[var(--signal)] bg-[var(--panel)] p-5 shadow-lg group hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--line)] mono text-sm font-bold text-[var(--signal-ink)]">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--signal)]" />
                  portfolio
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-[var(--signal-soft)] text-[var(--signal-ink)]">
                  you are here
                </span>
              </div>
              <ul className="mono text-xs space-y-1.5 text-[var(--text-2)] mb-3">
                <li className="flex justify-between">
                  <span className="text-[var(--signal-ink)] font-medium">PK · owner</span>
                  <span className="text-[var(--text)]">{portfolio.name}</span>
                </li>
                <li className="flex justify-between">
                  <span>tables</span>
                  <span className="text-[var(--muted)]">6 relational</span>
                </li>
                <li className="flex justify-between">
                  <span>theme</span>
                  <span className="text-[var(--muted)]">dark | light</span>
                </li>
                <li className="flex justify-between">
                  <span>status</span>
                  <span className="text-[var(--ok)]">hiring-ready</span>
                </li>
              </ul>
              <p className="text-xs text-[var(--muted)] pt-3 border-t border-[var(--line)] leading-relaxed">
                The central database hub. Every case study and metric joins back here.
              </p>
            </div>

            {/* Table 4: case_files */}
            <div
              onClick={() => handleSchemaNavigate('projects')}
              onMouseEnter={() => setActiveSchemaTable('case_files')}
              onMouseLeave={() => setActiveSchemaTable(null)}
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 hover:border-[var(--signal)] hover:-translate-y-1 transition-all cursor-pointer shadow-md group"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--line)] mono text-sm font-bold text-[var(--text)] group-hover:text-[var(--signal-ink)]">
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[var(--data-ink)]" />
                  case_files
                </span>
                <span className="text-xs font-normal text-[var(--muted)]">projects.html</span>
              </div>
              <ul className="mono text-xs space-y-1.5 text-[var(--text-2)] mb-3">
                <li className="flex justify-between">
                  <span className="text-[var(--signal-ink)] font-medium">PK · case_id</span>
                  <span className="text-[var(--muted)]">int</span>
                </li>
                <li className="flex justify-between">
                  <span>question</span>
                  <span className="text-[var(--muted)]">str</span>
                </li>
                <li className="flex justify-between">
                  <span>twist</span>
                  <span className="text-[var(--muted)]">insight</span>
                </li>
                <li className="flex justify-between">
                  <span>impact</span>
                  <span className="text-[var(--signal-ink)]">% gains</span>
                </li>
              </ul>
              <p className="text-xs text-[var(--muted)] pt-3 border-t border-[var(--line)] leading-relaxed">
                Projects structured as investigative mysteries: hook, evidence, twist, ending.
              </p>
            </div>

            {/* Table 5: results */}
            <div
              onClick={() => handleSchemaNavigate('impact')}
              onMouseEnter={() => setActiveSchemaTable('results')}
              onMouseLeave={() => setActiveSchemaTable(null)}
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 hover:border-[var(--signal)] hover:-translate-y-1 transition-all cursor-pointer shadow-md group"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--line)] mono text-sm font-bold text-[var(--text)] group-hover:text-[var(--signal-ink)]">
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[var(--data-ink)]" />
                  results
                </span>
                <span className="text-xs font-normal text-[var(--muted)]">impact.html</span>
              </div>
              <ul className="mono text-xs space-y-1.5 text-[var(--text-2)] mb-3">
                <li className="flex justify-between">
                  <span className="text-[var(--signal-ink)] font-medium">PK · metric</span>
                  <span className="text-[var(--muted)]">str</span>
                </li>
                <li className="flex justify-between">
                  <span>value</span>
                  <span className="text-[var(--muted)]">float</span>
                </li>
                <li className="flex justify-between">
                  <span>story</span>
                  <span className="text-[var(--muted)]">narrative</span>
                </li>
                <li className="flex justify-between">
                  <span>proof</span>
                  <span className="text-[var(--muted)]">certs, quotes</span>
                </li>
              </ul>
              <p className="text-xs text-[var(--muted)] pt-3 border-t border-[var(--line)] leading-relaxed">
                The business scorecards: hard numbers, the human story, and stakeholder proof.
              </p>
            </div>

            {/* Table 6: next_steps */}
            <div
              onClick={() => handleSchemaNavigate('contact')}
              onMouseEnter={() => setActiveSchemaTable('next_steps')}
              onMouseLeave={() => setActiveSchemaTable(null)}
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 hover:border-[var(--signal)] hover:-translate-y-1 transition-all cursor-pointer shadow-md group"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--line)] mono text-sm font-bold text-[var(--text)] group-hover:text-[var(--signal-ink)]">
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[var(--data-ink)]" />
                  next_steps
                </span>
                <span className="text-xs font-normal text-[var(--muted)]">contact.html</span>
              </div>
              <ul className="mono text-xs space-y-1.5 text-[var(--text-2)] mb-3">
                <li className="flex justify-between">
                  <span className="text-[var(--signal-ink)] font-medium">FK · you</span>
                  <span className="text-[var(--muted)]">hiring_lead</span>
                </li>
                <li className="flex justify-between">
                  <span>intent</span>
                  <span className="text-[var(--muted)]">hire | collab</span>
                </li>
                <li className="flex justify-between">
                  <span>timeline</span>
                  <span className="text-[var(--muted)]">date</span>
                </li>
                <li className="flex justify-between">
                  <span>message</span>
                  <span className="text-[var(--muted)]">str</span>
                </li>
              </ul>
              <p className="text-xs text-[var(--muted)] pt-3 border-t border-[var(--line)] leading-relaxed">
                Insert yourself into the pipeline — build a SQL query to message me directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MARQUEE BANNER */}
      <div className="border-y border-[var(--line)] py-3 overflow-hidden whitespace-nowrap bg-[var(--panel)]" aria-hidden="true">
        <div className="animate-marquee flex items-center gap-8 mono text-xs sm:text-sm text-[var(--faint)]">
          <span>SELECT insight FROM chaos;</span>
          <i className="text-[var(--signal-ink)] not-italic">◆</i>
          <span>df.dropna().tell_story()</span>
          <i className="text-[var(--signal-ink)] not-italic">◆</i>
          <span>=XLOOKUP(question, data, answer)</span>
          <i className="text-[var(--signal-ink)] not-italic">◆</i>
          <span>correlation ≠ causation</span>
          <i className="text-[var(--signal-ink)] not-italic">◆</i>
          <span>GROUP BY what_matters</span>
          <i className="text-[var(--signal-ink)] not-italic">◆</i>
          <span>CALCULATE([True Impact])</span>
          <i className="text-[var(--signal-ink)] not-italic">◆</i>
          <span>dbt test --store-failures</span>
          <i className="text-[var(--signal-ink)] not-italic">◆</i>
          <span>SELECT insight FROM chaos;</span>
          <i className="text-[var(--signal-ink)] not-italic">◆</i>
          <span>df.dropna().tell_story()</span>
          <i className="text-[var(--signal-ink)] not-italic">◆</i>
          <span>=XLOOKUP(question, data, answer)</span>
          <i className="text-[var(--signal-ink)] not-italic">◆</i>
          <span>correlation ≠ causation</span>
          <i className="text-[var(--signal-ink)] not-italic">◆</i>
          <span>GROUP BY what_matters</span>
          <i className="text-[var(--signal-ink)] not-italic">◆</i>
          <span>CALCULATE([True Impact])</span>
          <i className="text-[var(--signal-ink)] not-italic">◆</i>
        </div>
      </div>
    </section>
  );
};
