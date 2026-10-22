import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Terminal, Award, BookOpen, Sparkles, CheckCircle2, FileText } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface AboutSectionProps {
  portfolio: PortfolioData;
  onOpenResume?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ portfolio, onOpenResume }) => {
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState(0);
  const [dictSearch, setDictSearch] = useState('');
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  const milestones = portfolio.milestones;
  const currentMilestone = milestones[selectedMilestoneIndex] || milestones[0];

  const filteredProfile = portfolio.profile.filter((row) => {
    if (!dictSearch.trim()) return true;
    const q = dictSearch.toLowerCase();
    return (
      row.col.toLowerCase().includes(q) ||
      row.type.toLowerCase().includes(q) ||
      row.value.toLowerCase().includes(q)
    );
  });

  const journeySvgPoints = milestones.map((m) => `${m.x},${m.y}`).join(' ');

  return (
    <section className="py-14 sm:py-20 border-b border-[var(--line)] scroll-mt-20" id="about">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="mono text-xs sm:text-[13px] tracking-wider text-[var(--data-ink)] uppercase flex items-center gap-2">
            <span className="font-bold text-[var(--signal-ink)]">01 · #about</span>
            <span>·</span>
            <span>SELECT * FROM analyst WHERE name = &apos;{portfolio.name.split(' ')[0]}&apos;;</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text)]">
            Exploratory data analysis of{' '}
            <span className="text-[var(--signal-ink)]">one curious analyst.</span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[var(--text-2)] max-w-[760px]">
            Before I profile and analyze anyone else&apos;s data, here is mine — profiled, plotted, and annotated the exact way I would handle any new enterprise dataset.
          </p>
        </div>

        {/* PROFILE AS A DATA DICTIONARY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-14">
          {/* Table side */}
          <div className="lg:col-span-7 rounded-2xl border border-[var(--line)] bg-[var(--panel)] overflow-hidden shadow-lg flex flex-col">
            <div className="px-5 py-3.5 border-b border-[var(--line)] bg-[var(--panel-2)] flex flex-wrap items-center justify-between gap-2 mono text-xs">
              <span className="flex items-center gap-2 text-[var(--text)]">
                <span className="text-[var(--signal-ink)] font-bold">&gt;&gt;&gt;</span>
                <span>df.describe(include=&quot;all&quot;)</span>
              </span>
              <span className="text-[var(--muted)] text-[11px]">
                df.shape → (1, {portfolio.profile.length}) · {portfolio.profile.length} features
              </span>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left mono text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--muted)] text-xs bg-[var(--bg-2)]/60">
                    <th className="py-2.5 px-4 font-medium">column</th>
                    <th className="py-2.5 px-4 font-medium">dtype</th>
                    <th className="py-2.5 px-4 font-medium">value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  {filteredProfile.map((row) => (
                    <tr
                      key={row.col}
                      onClick={() => setSelectedColumn(row.col === selectedColumn ? null : row.col)}
                      className={`hover:bg-[var(--signal-soft)] transition-colors cursor-pointer ${
                        selectedColumn === row.col ? 'bg-[var(--signal-soft)]' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-[var(--data-ink)]">
                        {row.col}
                      </td>
                      <td className="py-3 px-4 text-[var(--muted)] text-xs">
                        {row.type}
                      </td>
                      <td className="py-3 px-4 text-[var(--text)]">
                        {row.value}
                        {row.details && selectedColumn === row.col && (
                          <div className="text-[11px] text-[var(--signal-ink)] font-normal mt-1">
                            ℹ {row.details}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-2 border-t border-[var(--line)] bg-[var(--bg-2)] mono text-[11px] text-[var(--muted)] flex items-center justify-between">
              <span>Click any row for metadata definition</span>
              <span className="text-[var(--ok)]">0 nulls detected</span>
            </div>
          </div>

          {/* Narrative Origin Side */}
          <div className="lg:col-span-5 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-8 flex flex-col justify-between shadow-lg">
            <div className="flex flex-col gap-4">
              <span className="mono text-xs text-[var(--data-ink)] uppercase font-semibold">
                df.head() isn&apos;t the whole story
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text)] leading-snug">
                Advancing from Research Analyst to Team Leader through data precision.
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--text-2)]">
                My journey began with auditing day-to-day survey data records at Stagnate Research PVT. Ltd in Noida. As research associates gathered complex secondary and primary survey data across multiple concurrent projects, data fragmentation and manual reporting delays were common.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--text-2)]">
                I built automated Power BI and Advanced Excel dashboards, audited over 2.4 million survey records, and engineered direct API integration between our database and Power BI—eliminating manual uploads and saving over 120 hours monthly.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--text-2)]">
                Consistently delivering actionable insights directly to organizational decision-makers drove my promotion from Research Analyst to Senior Research Analyst to Team Leader. Today, I lead research associates to turn messy survey records into clear strategic decisions.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-3 mono text-xs text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--ok)]" />
                <span>Dedicated to evidence-based decision making</span>
              </div>
              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="px-3 py-1.5 rounded-xl border border-[var(--signal)] bg-[var(--signal-soft)] text-[var(--signal-ink)] hover:bg-[var(--signal)] hover:text-[var(--on-signal)] font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Original Résumé (PDF)</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* JOURNEY AS A TIME SERIES */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <span className="mono text-xs text-[var(--data-ink)] uppercase font-semibold">
                time series
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)] mt-1">
                How I got here, plotted across time.
              </h3>
            </div>
            <span className="mono text-xs text-[var(--muted)]">
              select a data point — every point is a chapter
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* SVG Interactive Time Series Track */}
            <div className="lg:col-span-7 relative h-[320px] sm:h-[380px] rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-md overflow-hidden">
              <div className="absolute inset-x-8 top-10 bottom-14 border-b border-[var(--line-2)] relative">
                {/* SVG Curve */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polyline
                    points={journeySvgPoints}
                    fill="none"
                    stroke="var(--data)"
                    strokeWidth="2.5"
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray="300"
                    strokeDashoffset="0"
                  />
                </svg>

                {/* Milestone Nodes */}
                {milestones.map((m, idx) => {
                  const isSelected = idx === selectedMilestoneIndex;
                  return (
                    <React.Fragment key={m.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedMilestoneIndex(idx)}
                        style={{
                          left: `${m.x}%`,
                          top: `${m.y}%`,
                        }}
                        className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-[var(--panel)] cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[var(--signal)] scale-125 pulse-node z-10'
                            : 'bg-[var(--data)] hover:scale-110 z-0'
                        }`}
                        title={`${m.year}: ${m.title}`}
                        aria-label={`Milestone ${idx + 1}: ${m.year} - ${m.title}`}
                      />
                      <span
                        style={{ left: `${m.x}%` }}
                        className={`absolute -bottom-8 -translate-x-1/2 mono text-xs whitespace-nowrap transition-colors ${
                          isSelected ? 'text-[var(--signal-ink)] font-bold' : 'text-[var(--muted)]'
                        }`}
                      >
                        {m.year}
                      </span>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Axis guidance */}
              <div className="absolute left-6 bottom-3 mono text-[10px] text-[var(--muted)]">
                2020 (foundation) →
              </div>
              <div className="absolute right-6 bottom-3 mono text-[10px] text-[var(--muted)]">
                2026 (strategic impact)
              </div>
            </div>

            {/* Milestone Detail Card */}
            <div className="lg:col-span-5 rounded-2xl border-2 border-[var(--signal)] bg-[var(--panel)] p-6 sm:p-7 flex flex-col justify-between shadow-xl">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="mono text-xs font-bold text-[var(--signal-ink)]">
                    MILESTONE 0{selectedMilestoneIndex + 1} OF 0{milestones.length} · {currentMilestone.year}
                  </span>
                  <span className="mono text-xs text-[var(--muted)]">{currentMilestone.subtitle}</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-[var(--text)] leading-snug">
                  {currentMilestone.title}
                </h4>

                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-2)]">
                  {currentMilestone.body}
                </p>

                <div className="pt-2">
                  <div className="text-xs mono text-[var(--muted)] mb-1.5">Stack utilized:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentMilestone.toolsUsed.map((tool) => (
                      <span
                        key={tool}
                        className="mono text-xs px-2.5 py-1 rounded-md border border-[var(--line)] bg-[var(--bg-2)] text-[var(--text)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-[var(--signal-soft)] border border-[var(--signal)]/30 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--signal-ink)] shrink-0 mt-0.5" />
                  <div className="text-xs text-[var(--text)] leading-relaxed">
                    <strong className="text-[var(--signal-ink)]">Key Win: </strong>
                    {currentMilestone.keyWin}
                  </div>
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="pt-5 flex items-center justify-between gap-3 border-t border-[var(--line)] mt-4">
                <button
                  type="button"
                  disabled={selectedMilestoneIndex === 0}
                  onClick={() => setSelectedMilestoneIndex((prev) => Math.max(0, prev - 1))}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--line-2)] text-xs mono text-[var(--text)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--signal)] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  earlier
                </button>

                <span className="mono text-xs text-[var(--muted)]">
                  {selectedMilestoneIndex + 1} / {milestones.length}
                </span>

                <button
                  type="button"
                  disabled={selectedMilestoneIndex === milestones.length - 1}
                  onClick={() =>
                    setSelectedMilestoneIndex((prev) => Math.min(milestones.length - 1, prev + 1))
                  }
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--line-2)] text-xs mono text-[var(--text)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--signal)] transition-colors cursor-pointer"
                >
                  later
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODEL ASSUMPTIONS (H1, H2, H3) */}
        <div className="mb-14">
          <div className="mb-6">
            <span className="mono text-xs text-[var(--data-ink)] uppercase font-semibold">
              model assumptions
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)] mt-1">
              Three analytical principles I never compromise.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 flex flex-col gap-3 hover:-translate-y-1 hover:border-[var(--signal)] transition-all shadow-md">
              <span className="mono text-3xl font-bold text-[var(--data-ink)]">H₁</span>
              <h4 className="text-lg font-semibold text-[var(--text)] leading-snug">
                Clean data is a kindness to your future self.
              </h4>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Most of the highest-impact engineering happens invisibly — strict schema contracts, idempotent migrations, and automated testing. That is why it earns executive trust.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 flex flex-col gap-3 hover:-translate-y-1 hover:border-[var(--signal)] transition-all shadow-md">
              <span className="mono text-3xl font-bold text-[var(--data-ink)]">H₂</span>
              <h4 className="text-lg font-semibold text-[var(--text)] leading-snug">
                A chart should answer a question, not decorate a slide.
              </h4>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                If the title of a visual cannot be written as an active declarative sentence, the chart is not finished. Visuals exist to resolve ambiguity, not produce it.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 flex flex-col gap-3 hover:-translate-y-1 hover:border-[var(--signal)] transition-all shadow-md">
              <span className="mono text-3xl font-bold text-[var(--data-ink)]">H₃</span>
              <h4 className="text-lg font-semibold text-[var(--text)] leading-snug">
                The best insight is the one someone actually acts on.
              </h4>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                Statistical accuracy earns permission to speak; clarity and business empathy earn decisions. A 95% accurate model implemented today beats a 99% model shelved forever.
              </p>
            </div>
          </div>
        </div>

        {/* STREAMING DATA CONSOLE */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-6 sm:p-7 shadow-lg">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--line)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--ok)] animate-ping" />
              <span className="mono text-xs font-semibold text-[var(--text)]">
                STREAMING TELEMETRY · LIVE FEED
              </span>
            </div>
            <span className="mono text-xs text-[var(--muted)]">updated today</span>
          </div>

          <div className="space-y-2 mono text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
            {portfolio.nowLog.map((log, index) => {
              const [key, ...rest] = log.split('→');
              return (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-[var(--signal-ink)] font-bold select-none">›</span>
                  <span className="text-[var(--data-ink)] font-semibold shrink-0 min-w-[90px]">
                    {key.trim()}
                  </span>
                  <span className="text-[var(--faint)]">→</span>
                  <span className="text-[var(--text)]">{rest.join('→').trim()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
