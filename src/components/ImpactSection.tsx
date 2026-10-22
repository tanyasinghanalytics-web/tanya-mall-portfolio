import React, { useState } from 'react';
import { Award, GraduationCap, CheckCircle2, ChevronRight, X, Sparkles, Sliders } from 'lucide-react';
import { PortfolioData, Credential } from '../types/portfolio';

interface ImpactSectionProps {
  portfolio: PortfolioData;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ portfolio }) => {
  const [viewMode, setViewMode] = useState<'numbers' | 'story'>('numbers');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [selectedCred, setSelectedCred] = useState<Credential | null>(null);

  const kpis = portfolio.kpis;
  const credentials = portfolio.credentials;
  const quotes = portfolio.quotes;

  return (
    <section className="py-14 sm:py-20 border-b border-[var(--line)] scroll-mt-20" id="impact">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-3">
            <div className="mono text-xs sm:text-[13px] tracking-wider text-[var(--data-ink)] uppercase flex items-center gap-2">
              <span className="font-bold text-[var(--signal-ink)]">04 · #impact</span>
              <span>·</span>
              <span>SELECT metric, value FROM results;</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text)]">
              Numbers are the plot.{' '}
              <span className="text-[var(--signal-ink)]">Decisions are the ending.</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-[var(--text-2)] max-w-[620px]">
              Read my results the way an executive dashboard shows them — or flip to Story mode and read the human sentence behind every number.
            </p>
          </div>

          {/* Mode Switch: Numbers vs Story */}
          <div className="inline-flex p-1 rounded-full border border-[var(--line)] bg-[var(--panel)] shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('numbers')}
              className={`px-5 py-2 rounded-full mono text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                viewMode === 'numbers'
                  ? 'bg-[var(--signal)] text-[var(--on-signal)] shadow-sm'
                  : 'text-[var(--text)] hover:bg-[var(--panel-2)]'
              }`}
              aria-pressed={viewMode === 'numbers'}
            >
              Numbers
            </button>
            <button
              type="button"
              onClick={() => setViewMode('story')}
              className={`px-5 py-2 rounded-full mono text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                viewMode === 'story'
                  ? 'bg-[var(--signal)] text-[var(--on-signal)] shadow-sm'
                  : 'text-[var(--text)] hover:bg-[var(--panel-2)]'
              }`}
              aria-pressed={viewMode === 'story'}
            >
              Story
            </button>
          </div>
        </div>

        {/* 4 KPI STRIP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {kpis.map((kpi, index) => (
            <div
              key={kpi.id}
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 flex flex-col justify-between gap-4 hover:-translate-y-1 hover:border-[var(--signal)] transition-all shadow-md group"
            >
              <div className="flex flex-col gap-2">
                <span className="mono text-xs uppercase tracking-wider text-[var(--muted)]">
                  {kpi.label}
                </span>

                {viewMode === 'numbers' ? (
                  <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--signal-ink)] leading-none">
                    {kpi.value}
                    <span className="text-3xl font-bold">{kpi.suffix}</span>
                  </div>
                ) : (
                  <p className="text-sm sm:text-[15px] font-medium leading-relaxed text-[var(--text)] min-h-[56px]">
                    {kpi.sentence}
                  </p>
                )}
              </div>

              {/* Sparkline */}
              <div className="pt-2 border-t border-[var(--line)]">
                <svg
                  className="w-full h-8 overflow-visible"
                  viewBox="0 0 100 30"
                  preserveAspectRatio="none"
                >
                  <polyline
                    fill="none"
                    stroke="var(--data)"
                    strokeWidth="2.5"
                    vectorEffect="non-scaling-stroke"
                    points={kpi.trend
                      .map((val, i) => `${(i / (kpi.trend.length - 1)) * 100},${30 - (val / 160) * 26}`)
                      .join(' ')}
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* BEFORE / AFTER INTERACTIVE SLIDER */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="mono text-xs text-[var(--data-ink)] uppercase font-semibold">
                before vs after
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)] mt-1">
                What a team&apos;s reporting looks like before and after me.
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="mono text-xs text-[var(--muted)] mr-1">presets:</span>
              <button
                type="button"
                onClick={() => setSliderPosition(15)}
                className="mono text-xs px-2.5 py-1 rounded-lg border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--signal)] cursor-pointer text-[var(--text-2)]"
              >
                Before
              </button>
              <button
                type="button"
                onClick={() => setSliderPosition(50)}
                className="mono text-xs px-2.5 py-1 rounded-lg border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--signal)] cursor-pointer text-[var(--text-2)]"
              >
                50 / 50
              </button>
              <button
                type="button"
                onClick={() => setSliderPosition(85)}
                className="mono text-xs px-2.5 py-1 rounded-lg border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--signal)] cursor-pointer text-[var(--text-2)]"
              >
                After
              </button>
            </div>
          </div>

          {/* Interactive Split Container */}
          <div className="relative h-[400px] sm:h-[440px] rounded-3xl overflow-hidden border border-[var(--line)] bg-[var(--bg-2)] select-none shadow-xl">
            {/* Left side: BEFORE (Chaotic spreadsheets) */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between bg-[var(--bg-2)]">
              <div className="inline-flex self-start mono text-xs px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--panel)] text-[var(--muted)]">
                BEFORE · 14 disconnected tabs, #REF! errors, 1 weekly panic
              </div>

              {/* Chaotic spreadsheet matrix simulation */}
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 opacity-70 my-auto">
                {Array.from({ length: 48 }).map((_, i) => {
                  const hasRefError = i % 11 === 3;
                  const isStale = i % 7 === 2;
                  return (
                    <div
                      key={i}
                      className={`h-7 sm:h-8 rounded border mono text-[10px] flex items-center justify-center ${
                        hasRefError
                          ? 'border-red-500/50 bg-red-950/20 text-red-400 font-bold'
                          : isStale
                          ? 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                          : 'border-[var(--line)] bg-[var(--panel)] text-[var(--muted)]'
                      }`}
                    >
                      {hasRefError ? '#REF!' : isStale ? '$84,200*' : `$${(i * 123) % 999}`}
                    </div>
                  );
                })}
              </div>

              <div className="mono text-xs text-red-400/80">
                ⚠ Multiple versions in circulation · Manual copy-paste errors · 16 hours wasted weekly
              </div>
            </div>

            {/* Right side: AFTER (Unified Dashboard), clipped by slider */}
            <div
              className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between bg-[var(--panel)]"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
              <div className="inline-flex self-end mono text-xs px-3 py-1.5 rounded-lg bg-[var(--signal)] text-[var(--on-signal)] font-bold shadow-md">
                AFTER · one source of truth, automated daily refreshes
              </div>

              {/* Sleek dashboard layout */}
              <div className="space-y-4 my-auto">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--panel-2)] mono text-xs">
                    <span className="text-[var(--muted)] block">ARR Run Rate</span>
                    <b className="text-xl sm:text-2xl text-[var(--text)]">$4.25M</b>
                    <span className="text-[var(--ok)] text-[11px] block">+18.4% YoY</span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--panel-2)] mono text-xs">
                    <span className="text-[var(--muted)] block">90D Retention</span>
                    <b className="text-xl sm:text-2xl text-[var(--text)]">84.2%</b>
                    <span className="text-[var(--ok)] text-[11px] block">+34% vs baseline</span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--panel-2)] mono text-xs">
                    <span className="text-[var(--muted)] block">Data Latency</span>
                    <b className="text-xl sm:text-2xl text-[var(--signal-ink)]">&lt; 15 mins</b>
                    <span className="text-[var(--text-2)] text-[11px] block">Automated dbt</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--panel-2)] h-28 flex items-end gap-2.5 pb-2">
                  {[35, 48, 52, 60, 92, 75, 80, 85].map((val, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${val}%` }}
                      className={`flex-1 rounded-t-md ${
                        idx === 4
                          ? 'bg-[var(--signal)] shadow-[0_0_12px_var(--signal)]'
                          : 'bg-[var(--data)]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mono text-xs text-[var(--ok)] flex items-center justify-end gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Single source of truth verified across 150+ stakeholders</span>
              </div>
            </div>

            {/* Dividing Handle */}
            <div
              className="absolute top-0 bottom-0 w-[3px] bg-[var(--signal)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[var(--signal)] text-[var(--on-signal)] flex items-center justify-center font-bold text-base shadow-xl">
                ⇆
              </div>
            </div>

            {/* Invisible Range Input for dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              aria-label="Compare before and after: slide to reveal more of the clean dashboard"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0"
            />
          </div>
        </div>

        {/* VALIDATED CREDENTIALS */}
        <div className="mb-14">
          <div className="mb-6">
            <span className="mono text-xs text-[var(--data-ink)] uppercase font-semibold">
              validated by
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)] mt-1">
              Credentials &amp; Certifications, Earned.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {credentials.map((cred) => (
              <div
                key={cred.id}
                onClick={() => setSelectedCred(cred)}
                className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 flex items-start gap-4 hover:border-[var(--signal)] hover:-translate-y-1 transition-all shadow-md cursor-pointer group"
              >
                <div className="p-3 rounded-xl bg-[var(--signal-soft)] text-[var(--signal-ink)] shrink-0">
                  {cred.kind === 'cert' ? (
                    <Award className="w-6 h-6" />
                  ) : (
                    <GraduationCap className="w-6 h-6 text-[var(--data-ink)]" />
                  )}
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <h4 className="font-bold text-sm sm:text-base text-[var(--text)] group-hover:text-[var(--signal-ink)] transition-colors leading-snug">
                    {cred.title}
                  </h4>
                  <span className="mono text-xs text-[var(--muted)]">
                    {cred.issuer} · {cred.year}
                  </span>
                  <div className="mono text-[11px] text-[var(--signal-ink)] pt-1 flex items-center gap-1 font-semibold">
                    <span>verify certificate</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUALITATIVE DATA: QUOTES */}
        <div>
          <div className="mb-6">
            <span className="mono text-xs text-[var(--data-ink)] uppercase font-semibold">
              qualitative data
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)] mt-1">
              What the people I worked with said.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quotes.map((quote) => (
              <figure
                key={quote.id}
                className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-7 flex flex-col justify-between gap-5 shadow-md"
              >
                <blockquote className="text-base sm:text-lg italic leading-relaxed text-[var(--text)] m-0">
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
                <figcaption className="mono text-xs text-[var(--muted)] pt-3 border-t border-[var(--line)]">
                  <span className="text-[var(--signal-ink)] font-bold block mb-0.5">
                    — {quote.who}
                  </span>
                  <span>
                    {quote.role} at {quote.company}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* CREDENTIAL DETAIL MODAL */}
      {selectedCred && (
        <div
          className="fixed inset-0 z-50 bg-[rgba(5,8,12,0.65)] backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedCred(null)}
        >
          <div
            className="w-full max-w-[500px] rounded-3xl border border-[var(--line-2)] bg-[var(--panel)] p-6 shadow-2xl animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
              <span className="mono text-xs text-[var(--ok)] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                VERIFIED CREDENTIAL
              </span>
              <button
                type="button"
                onClick={() => setSelectedCred(null)}
                className="text-[var(--muted)] hover:text-[var(--text)] mono text-xs px-2.5 py-1 rounded border border-[var(--line)]"
              >
                close
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div>
                <h4 className="text-xl font-bold text-[var(--text)]">{selectedCred.title}</h4>
                <div className="mono text-xs text-[var(--muted)] mt-1">
                  Issued by: <b className="text-[var(--text)]">{selectedCred.issuer}</b> ({selectedCred.year})
                </div>
                <div className="mono text-xs text-[var(--faint)] mt-0.5">
                  ID: {selectedCred.credentialId}
                </div>
              </div>

              <div>
                <span className="mono text-xs text-[var(--muted)] block mb-2 font-medium">
                  Core Skills Assessed &amp; Validated:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCred.skills.map((s) => (
                    <span
                      key={s}
                      className="mono text-xs px-3 py-1 rounded-lg bg-[var(--signal-soft)] text-[var(--signal-ink)] border border-[var(--signal)]/30 font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--line)] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCred(null)}
                className="px-5 py-2 rounded-xl bg-[var(--signal)] text-[var(--on-signal)] font-semibold text-xs mono cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
