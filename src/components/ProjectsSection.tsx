import React, { useState } from 'react';
import { X, Copy, Check, Download, ArrowUpRight, BarChart2, Code2, Database, Sparkles, TrendingUp } from 'lucide-react';
import { PortfolioData, CaseFile } from '../types/portfolio';

interface ProjectsSectionProps {
  portfolio: PortfolioData;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ portfolio }) => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [activeCase, setActiveCase] = useState<CaseFile | null>(null);
  const [modalTab, setModalTab] = useState<'mystery' | 'sql' | 'dashboard' | 'data'>('mystery');
  const [copiedSql, setCopiedSql] = useState(false);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const cases = portfolio.cases;

  // Derive unique tags for the slicer
  const allTags = ['All'];
  cases.forEach((c) => {
    c.tags.forEach((t) => {
      if (!allTags.includes(t)) allTags.push(t);
    });
  });

  const filteredCases = cases.filter((c) => {
    if (selectedTag === 'All') return true;
    return c.tags.includes(selectedTag);
  });

  const handleCopySql = (sql: string) => {
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleDownloadCsv = (c: CaseFile) => {
    const blob = new Blob([c.csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${c.title.toLowerCase().replace(/\s+/g, '_')}_dataset.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-14 sm:py-20 border-b border-[var(--line)]" id="projects">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="mono text-xs sm:text-[13px] tracking-wider text-[var(--data-ink)] uppercase flex items-center gap-2">
            <span className="font-bold text-[var(--signal-ink)]">03 · #projects</span>
            <span>·</span>
            <span>SELECT * FROM case_files ORDER BY impact DESC;</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text)]">
            Every project is a mystery.{' '}
            <span className="text-[var(--signal-ink)]">Here&apos;s how each one ended.</span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[var(--text-2)] max-w-[760px]">
            Filter with the slicer like you would in an executive dashboard, then open a case file to inspect the hook, the evidence, the twist, and the measurable business ending.
          </p>
        </div>

        {/* SLICER CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-2xl border border-[var(--line)] bg-[var(--panel)] mb-8">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mono text-xs text-[var(--muted)] px-2 mr-1">slicer:</span>
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full mono text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--signal)] text-[var(--on-signal)] font-bold shadow-sm'
                      : 'border border-[var(--line-2)] text-[var(--text)] hover:border-[var(--signal)] hover:bg-[var(--panel-2)]'
                  }`}
                  aria-pressed={isSelected}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <div className="mono text-xs text-[var(--muted)] px-2">
            <span className="text-[var(--signal-ink)] font-bold">{filteredCases.length}</span>{' '}
            {filteredCases.length === 1 ? 'case file' : 'case files'} returned
          </div>
        </div>

        {/* CASES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCases.map((c, index) => (
            <div
              key={c.id}
              onClick={() => {
                setActiveCase(c);
                setModalTab('mystery');
              }}
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-7 flex flex-col justify-between gap-5 hover:border-[var(--signal)] hover:-translate-y-1.5 transition-all cursor-pointer shadow-lg group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="mono text-xs text-[var(--data-ink)] font-semibold uppercase tracking-wider">
                    CASE 0{index + 1} · {c.domain}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--signal-ink)] transition-colors" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] group-hover:text-[var(--signal-ink)] transition-colors leading-snug">
                  {c.title}
                </h3>

                <p className="text-sm text-[var(--text-2)] leading-relaxed">
                  {c.tagline}
                </p>

                {/* Mini Chart Graphic with highlighted twist */}
                <div className="pt-2">
                  <div className="h-16 flex items-end gap-1.5 border-b border-[var(--line-2)] pb-1">
                    {c.heights.map((h, bIdx) => {
                      const isTwist = bIdx === c.twistIndex;
                      return (
                        <div
                          key={bIdx}
                          style={{ height: `${h}%` }}
                          className={`flex-1 rounded-t-sm transition-all ${
                            isTwist
                              ? 'bg-[var(--signal)] shadow-[0_0_8px_var(--signal)]'
                              : 'bg-[var(--data-dim)]/60 group-hover:bg-[var(--data-dim)]'
                          }`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between items-center pt-1.5 mono text-[10px] text-[var(--muted)]">
                    <span>{c.chartTitle.slice(0, 24)}...</span>
                    <span className="text-[var(--signal-ink)]">amber = twist</span>
                  </div>
                </div>
              </div>

              {/* Bottom footer */}
              <div className="pt-4 border-t border-[var(--line)] flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="mono text-[11px] px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--bg-2)] text-[var(--text-2)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-2xl font-bold text-[var(--signal-ink)] mr-1.5">
                      {c.impact}
                    </span>
                    <span className="mono text-xs text-[var(--muted)]">{c.impactLabel}</span>
                  </div>
                  <span className="mono text-xs text-[var(--signal-ink)] font-semibold group-hover:underline">
                    read mystery →
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* "Your Project?" Placeholder Card */}
          <a
            href="#contact"
            className="rounded-2xl border-2 border-dashed border-[var(--line-2)] hover:border-[var(--signal)] bg-[var(--panel)]/40 p-6 sm:p-7 flex flex-col justify-between gap-5 transition-all text-inherit no-underline group cursor-pointer"
          >
            <div className="flex flex-col gap-3">
              <span className="mono text-xs text-[var(--signal-ink)] font-semibold uppercase">
                CASE 0{cases.length + 1} · UNWRITTEN
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] group-hover:text-[var(--signal-ink)] transition-colors">
                Your Organization&apos;s Problem?
              </h3>
              <p className="text-sm text-[var(--text-2)] leading-relaxed">
                The next mystery could be yours. Bring your messy exports, ambiguous conversion dips, or unwieldy spreadsheets — I&apos;ll bring the hypothesis testing and statistical rigor.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between mono text-xs text-[var(--signal-ink)] font-bold">
              <span>Start the query →</span>
              <span>INSERT INTO pipeline</span>
            </div>
          </a>
        </div>
      </div>

      {/* DETAILED CASE FILE MODAL */}
      {activeCase && (
        <div
          className="fixed inset-0 z-50 bg-[rgba(5,8,12,0.7)] backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setActiveCase(null)}
        >
          <div
            className="w-full max-w-[980px] max-h-[90vh] rounded-3xl border border-[var(--line-2)] bg-[var(--panel)] shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[var(--line)] bg-[var(--panel-2)] flex items-center justify-between gap-4">
              <div>
                <span className="mono text-xs text-[var(--data-ink)] uppercase font-semibold">
                  {activeCase.domain}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)]">
                  {activeCase.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveCase(null)}
                className="w-9 h-9 rounded-xl border border-[var(--line)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg-2)] transition-colors cursor-pointer"
                aria-label="Close case study modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="px-6 pt-3 border-b border-[var(--line)] flex flex-wrap gap-2 mono text-xs bg-[var(--panel)]">
              {[
                { id: 'mystery', label: '01 · The 4-Act Mystery', icon: Sparkles },
                { id: 'dashboard', label: '02 · Interactive Dashboard', icon: BarChart2 },
                { id: 'sql', label: '03 · SQL Query Engine', icon: Code2 },
                { id: 'data', label: '04 · Raw Dataset (.CSV)', icon: Database },
              ].map((tab) => {
                const isActive = modalTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setModalTab(tab.id as typeof modalTab)}
                    className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'border-[var(--signal)] text-[var(--signal-ink)] font-bold'
                        : 'border-transparent text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* TAB 1: 4-ACT MYSTERY */}
              {modalTab === 'mystery' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: 4 Acts */}
                  <div className="lg:col-span-7 space-y-5">
                    <p className="text-base text-[var(--text)] italic font-medium leading-relaxed">
                      &ldquo;{activeCase.tagline}&rdquo;
                    </p>

                    <div className="space-y-4">
                      {/* Act 1 */}
                      <div className="flex gap-4 p-3.5 rounded-xl border border-[var(--line)] bg-[var(--bg-2)]/60">
                        <div className="w-8 h-8 rounded-full border border-[var(--data)] flex items-center justify-center mono text-xs font-bold text-[var(--data-ink)] shrink-0">
                          01
                        </div>
                        <div className="space-y-1">
                          <span className="mono text-[11px] text-[var(--data-ink)] font-semibold tracking-wider">
                            THE HOOK
                          </span>
                          <p className="text-sm text-[var(--text-2)] leading-relaxed">
                            {activeCase.acts.hook}
                          </p>
                        </div>
                      </div>

                      {/* Act 2 */}
                      <div className="flex gap-4 p-3.5 rounded-xl border border-[var(--line)] bg-[var(--bg-2)]/60">
                        <div className="w-8 h-8 rounded-full border border-[var(--data)] flex items-center justify-center mono text-xs font-bold text-[var(--data-ink)] shrink-0">
                          02
                        </div>
                        <div className="space-y-1">
                          <span className="mono text-[11px] text-[var(--data-ink)] font-semibold tracking-wider">
                            THE EVIDENCE
                          </span>
                          <p className="text-sm text-[var(--text-2)] leading-relaxed">
                            {activeCase.acts.evidence}
                          </p>
                        </div>
                      </div>

                      {/* Act 3: Twist */}
                      <div className="flex gap-4 p-3.5 rounded-xl border-2 border-[var(--signal)] bg-[var(--signal-soft)]">
                        <div className="w-8 h-8 rounded-full bg-[var(--signal)] text-[var(--on-signal)] flex items-center justify-center mono text-xs font-bold shrink-0">
                          03
                        </div>
                        <div className="space-y-1">
                          <span className="mono text-[11px] text-[var(--signal-ink)] font-bold tracking-wider">
                            THE TWIST
                          </span>
                          <p className="text-sm text-[var(--text)] font-medium leading-relaxed">
                            {activeCase.acts.twist}
                          </p>
                        </div>
                      </div>

                      {/* Act 4 */}
                      <div className="flex gap-4 p-3.5 rounded-xl border border-[var(--line)] bg-[var(--bg-2)]/60">
                        <div className="w-8 h-8 rounded-full border border-[var(--ok)] text-[var(--ok)] flex items-center justify-center mono text-xs font-bold shrink-0">
                          04
                        </div>
                        <div className="space-y-1">
                          <span className="mono text-[11px] text-[var(--ok)] font-semibold tracking-wider">
                            THE ENDING
                          </span>
                          <p className="text-sm text-[var(--text-2)] leading-relaxed">
                            {activeCase.acts.ending}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Interactive Bar Chart & Impact Badge */}
                  <div className="lg:col-span-5 space-y-5">
                    {/* Interactive Bar Chart */}
                    <div className="p-5 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] space-y-3">
                      <div className="flex items-center justify-between mono text-xs text-[var(--muted)]">
                        <span>{activeCase.chartTitle}</span>
                        <span>hover bar</span>
                      </div>

                      <div className="h-44 flex items-end gap-2 border-b border-[var(--line-2)] pb-1 pt-4">
                        {activeCase.heights.map((h, bIdx) => {
                          const isTwist = bIdx === activeCase.twistIndex;
                          const isHovered = hoveredBarIndex === bIdx;
                          return (
                            <div
                              key={bIdx}
                              onMouseEnter={() => setHoveredBarIndex(bIdx)}
                              onMouseLeave={() => setHoveredBarIndex(null)}
                              style={{ height: `${h}%` }}
                              className={`flex-1 rounded-t-md transition-all cursor-pointer relative ${
                                isTwist
                                  ? 'bg-[var(--signal)] shadow-[0_0_12px_var(--signal)]'
                                  : isHovered
                                  ? 'bg-[var(--data)]'
                                  : 'bg-[var(--data-dim)]'
                              }`}
                            >
                              {isHovered && (
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-[var(--panel)] border border-[var(--line-2)] mono text-[10px] text-[var(--text)] whitespace-nowrap z-20">
                                  {h}%
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mono text-[11px] text-[var(--muted)] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-[var(--signal)]" />
                        <span>Amber bar = {activeCase.twistLabel}</span>
                      </div>
                    </div>

                    {/* Impact Result Card */}
                    <div className="p-5 rounded-2xl border-2 border-[var(--signal)] bg-[var(--signal-soft)] flex flex-col gap-1">
                      <span className="mono text-xs font-semibold text-[var(--signal-ink)]">
                        THE BUSINESS OUTCOME
                      </span>
                      <div className="text-4xl font-extrabold text-[var(--signal-ink)] tracking-tight">
                        {activeCase.impact}
                      </div>
                      <span className="text-sm font-semibold text-[var(--text)]">
                        {activeCase.impactLabel}
                      </span>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setModalTab('sql')}
                        className="flex-1 py-2 px-3 rounded-xl border border-[var(--line)] bg-[var(--panel)] mono text-xs text-[var(--text)] hover:border-[var(--signal)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Code2 className="w-3.5 h-3.5 text-[var(--data-ink)]" />
                        <span>View SQL Code</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadCsv(activeCase)}
                        className="py-2 px-3 rounded-xl border border-[var(--line)] bg-[var(--panel)] mono text-xs text-[var(--text)] hover:border-[var(--signal)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[var(--signal-ink)]" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: INTERACTIVE DASHBOARD */}
              {modalTab === 'dashboard' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 mono text-xs">
                      <span className="w-2 h-2 rounded-full bg-[var(--ok)]" />
                      <span className="text-[var(--text)] font-semibold">Production BI View:</span>
                      <span className="text-[var(--muted)]">{activeCase.title} Executive Suite</span>
                    </div>
                    <span className="mono text-xs px-2.5 py-1 rounded bg-[var(--signal-soft)] text-[var(--signal-ink)]">
                      Refreshed Daily at 06:00 UTC
                    </span>
                  </div>

                  {/* Top Scorecard Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {activeCase.dashboardMetrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-5 rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-md flex flex-col gap-1"
                      >
                        <span className="mono text-xs text-[var(--muted)]">{metric.label}</span>
                        <div className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
                          {metric.value}
                        </div>
                        <span className="mono text-xs font-semibold text-[var(--ok)]">
                          {metric.change}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Chart Preview */}
                  <div className="p-6 rounded-2xl border border-[var(--line)] bg-[var(--panel)] space-y-4 shadow-md">
                    <div className="flex items-center justify-between mono text-xs text-[var(--text)] border-b border-[var(--line)] pb-3">
                      <span className="font-semibold">{activeCase.chartTitle}</span>
                      <span className="text-[var(--signal-ink)]">
                        Statistical Impact: {activeCase.impact}
                      </span>
                    </div>

                    <div className="h-52 flex items-end gap-3 border-b border-[var(--line-2)] pb-1 pt-6">
                      {activeCase.heights.map((h, bIdx) => {
                        const isTwist = bIdx === activeCase.twistIndex;
                        return (
                          <div
                            key={bIdx}
                            style={{ height: `${h}%` }}
                            className={`flex-1 rounded-t-lg transition-all relative group/bar ${
                              isTwist
                                ? 'bg-[var(--signal)] shadow-[0_0_16px_var(--signal)]'
                                : 'bg-[var(--data)]/80 hover:bg-[var(--data)]'
                            }`}
                          >
                            <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[var(--bg-2)] border border-[var(--line)] mono text-[11px] font-bold text-[var(--text)] pointer-events-none transition-opacity">
                              {h}%
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between mono text-xs text-[var(--muted)]">
                      <span>Baseline Samples (01 to 0{activeCase.heights.length})</span>
                      <span className="text-[var(--signal-ink)]">
                        Key driver: {activeCase.twistLabel}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SQL CODE */}
              {modalTab === 'sql' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--line)] mono text-xs text-[var(--muted)]">
                    <span>transform_and_cohort_attribution.sql</span>
                    <button
                      type="button"
                      onClick={() => handleCopySql(activeCase.sqlSnippet)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--panel)] text-[var(--text)] hover:border-[var(--signal)] transition-colors cursor-pointer"
                    >
                      {copiedSql ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[var(--ok)]" />
                          <span className="text-[var(--ok)]">Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy SQL Query</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="mono text-xs sm:text-[13px] leading-relaxed text-[var(--data-ink)] p-4 rounded-2xl bg-[var(--bg-2)] border border-[var(--line)] overflow-x-auto whitespace-pre">
                    {activeCase.sqlSnippet}
                  </pre>
                </div>
              )}

              {/* TAB 4: RAW DATASET */}
              {modalTab === 'data' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--line)] mono text-xs text-[var(--muted)]">
                    <span>sample_telemetry_extract.csv</span>
                    <button
                      type="button"
                      onClick={() => handleDownloadCsv(activeCase)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--signal)] text-[var(--on-signal)] font-semibold transition-opacity hover:opacity-90 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .CSV File</span>
                    </button>
                  </div>

                  <pre className="mono text-xs leading-relaxed text-[var(--text-2)] p-4 rounded-2xl bg-[var(--bg-2)] border border-[var(--line)] overflow-x-auto whitespace-pre">
                    {activeCase.csvData}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[var(--line)] bg-[var(--panel-2)] flex items-center justify-between">
              <span className="mono text-xs text-[var(--muted)]">
                Impact: <b className="text-[var(--signal-ink)]">{activeCase.impact}</b> {activeCase.impactLabel}
              </span>
              <button
                type="button"
                onClick={() => setActiveCase(null)}
                className="px-5 py-2 rounded-xl bg-[var(--signal)] text-[var(--on-signal)] font-semibold text-xs mono cursor-pointer"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
