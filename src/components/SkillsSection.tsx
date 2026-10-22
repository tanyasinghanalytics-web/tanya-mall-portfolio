import React, { useState } from 'react';
import { Copy, Check, Play, Terminal, Layers, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { PortfolioData, PipelineStage, ToolMatrixItem } from '../types/portfolio';

interface SkillsSectionProps {
  portfolio: PortfolioData;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ portfolio }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simOutputShown, setSimOutputShown] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ToolMatrixItem | null>(null);
  const [activeMethod, setActiveMethod] = useState<string | null>(null);

  const stages = portfolio.stages;
  const currentStage: PipelineStage = stages[activeStageIndex] || stages[0];
  const tools = portfolio.tools;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentStage.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsRunningSim(true);
    setSimOutputShown(false);
    setTimeout(() => {
      setIsRunningSim(false);
      setSimOutputShown(true);
    }, 600);
  };

  const methodsList = [
    { name: 'Cohort Analysis', desc: 'Tracking user retention curves over tenure intervals (30/60/90 days).' },
    { name: 'Funnel Decomposition', desc: 'Diagnosing conversion leakage at key onboarding and purchase steps.' },
    { name: 'A/B Testing & Power', desc: 'Designing hypothesis tests with adequate sample sizes and statistical power.' },
    { name: 'Time-Series Forecasting', desc: 'Seasonal decomposition, ARIMA, and moving averages for demand planning.' },
    { name: 'RFM Segmentation', desc: 'Clustering customers by Recency, Frequency, and Monetary enterprise value.' },
    { name: 'Star-Schema Modeling', desc: 'Designing Kimball fact & dimension tables for low-latency BI aggregations.' },
    { name: 'DAX Calculation Groups', desc: 'Building modular time-intelligence patterns without duplicate measures.' },
    { name: 'Anomaly Detection', desc: 'Z-score and interquartile range checks to flag data pipeline outliers.' },
    { name: 'Executive Storytelling', desc: 'Structuring findings into Situation, Complication, Resolution narrative memos.' },
  ];

  return (
    <section className="py-14 sm:py-20 border-b border-[var(--line)] scroll-mt-20" id="skills">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="mono text-xs sm:text-[13px] tracking-wider text-[var(--data-ink)] uppercase flex items-center gap-2">
            <span className="font-bold text-[var(--signal-ink)]">02 · #skills</span>
            <span>·</span>
            <span>SELECT tool, stage FROM pipeline;</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text)]">
            My skills aren&apos;t a static list.{' '}
            <span className="text-[var(--signal-ink)]">They&apos;re a pipeline.</span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[var(--text-2)] max-w-[760px]">
            Follow one dataset from raw source to final executive decision. Select any stage to see what happens there, the code I write, and the tools I reach for.
          </p>
        </div>

        {/* 5-STAGE PIPELINE NAVIGATOR */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-stretch gap-2.5">
            {stages.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              return (
                <div key={stage.id} className="flex-1 flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveStageIndex(idx);
                      setSimOutputShown(false);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? 'border-[var(--signal)] bg-[var(--signal-soft)] shadow-md -translate-y-1'
                        : 'border-[var(--line)] bg-[var(--panel)] hover:border-[var(--line-2)] hover:bg-[var(--panel-2)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`mono text-xs font-semibold ${
                          isActive ? 'text-[var(--signal-ink)]' : 'text-[var(--data-ink)]'
                        }`}
                      >
                        STAGE 0{idx + 1}
                      </span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[var(--signal)]" />}
                    </div>
                    <span className="font-bold text-lg sm:text-xl text-[var(--text)]">
                      {stage.name}
                    </span>
                    <span className="text-xs text-[var(--muted)]">{stage.short}</span>
                  </button>
                  {/* Flow connector between buttons on desktop */}
                  {idx < stages.length - 1 && (
                    <div className="hidden md:block w-4 h-[2px] bg-[var(--line-2)] shrink-0 mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* STAGE WORKBENCH: STORY + CODE TERMINAL */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-8 shadow-xl mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Story & Tools */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <span className="mono text-xs text-[var(--signal-ink)] font-semibold uppercase tracking-wider">
                STAGE 0{activeStageIndex + 1} OF 0{stages.length} · {currentStage.name.toUpperCase()}
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text)] leading-snug">
                {currentStage.headline}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-[var(--text-2)]">
                {currentStage.story}
              </p>

              <div>
                <span className="mono text-xs text-[var(--muted)] block mb-2">
                  primary tools at this stage:
                </span>
                <div className="flex flex-wrap gap-2">
                  {tools
                    .filter((t) => t.use && t.use[activeStageIndex] === 1)
                    .map((t) => (
                      <button
                        key={t.name}
                        onClick={() => setSelectedTool(t)}
                        className="mono text-xs px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--bg-2)] text-[var(--text)] hover:border-[var(--signal)] transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{t.name}</span>
                        <Info className="w-3 h-3 text-[var(--muted)]" />
                      </button>
                    ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--bg-2)] mono text-xs text-[var(--muted)]">
                <span className="text-[var(--text)] font-semibold">Stage Deliverable: </span>
                <span className="text-[var(--signal-ink)] font-bold">{currentStage.output}</span>
              </div>
            </div>

            {/* Terminal with Executable Code Simulation */}
            <div className="lg:col-span-7 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-5 sm:p-6 shadow-inner flex flex-col gap-3">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)] mono text-xs text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--line-2)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--line-2)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--line-2)]" />
                  </div>
                  <span className="text-[var(--faint)] ml-2">{currentStage.comment}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRunSimulation}
                    disabled={isRunningSim}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-[var(--signal)] text-[var(--on-signal)] font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isRunningSim ? 'Executing...' : 'Run Simulation'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-[var(--line)] bg-[var(--panel)] text-[var(--text)] hover:border-[var(--signal)] transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[var(--ok)]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Code Display */}
              <pre className="mono text-xs sm:text-[13px] leading-relaxed text-[var(--data-ink)] overflow-x-auto p-2 bg-[var(--panel)]/40 rounded-xl border border-[var(--line)]/50 whitespace-pre">
                {currentStage.code}
              </pre>

              {/* Simulation Result Output */}
              {simOutputShown && currentStage.simulatedResult && (
                <div className="mt-2 p-3.5 rounded-xl border border-[var(--ok)]/40 bg-[var(--panel)] animate-fadeIn">
                  <div className="mono text-xs font-semibold text-[var(--ok)] flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Execution Succeeded (0.04s)</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left mono text-[11px] text-[var(--text-2)]">
                      <thead>
                        <tr className="border-b border-[var(--line)] text-[var(--muted)]">
                          {currentStage.simulatedResult.headers.map((h, i) => (
                            <th key={i} className="py-1 px-2 font-medium">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--line)]">
                        {currentStage.simulatedResult.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[var(--panel-2)]">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-1 px-2">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[var(--line)] mono text-[11px] text-[var(--muted)]">
                    {currentStage.simulatedResult.summaryText}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TOOL × STAGE MATRIX HEATMAP */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <span className="mono text-xs text-[var(--data-ink)] uppercase font-semibold">
                matrix heatmap
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)] mt-1">
                Tool × Stage Matrix.
              </h3>
            </div>
            <span className="mono text-xs text-[var(--muted)]">
              click any tool row to view production experience &amp; use cases
            </span>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 sm:p-6 overflow-x-auto shadow-md">
            <table className="w-full min-w-[620px] border-separate border-spacing-2 mono text-xs sm:text-sm">
              <thead>
                <tr>
                  <th className="text-left font-semibold text-[var(--muted)] p-2">Tool / Technology</th>
                  <th className="font-semibold text-[var(--muted)] p-2 text-center">01 Collect</th>
                  <th className="font-semibold text-[var(--muted)] p-2 text-center">02 Clean</th>
                  <th className="font-semibold text-[var(--muted)] p-2 text-center">03 Analyse</th>
                  <th className="font-semibold text-[var(--muted)] p-2 text-center">04 Visualise</th>
                  <th className="font-semibold text-[var(--muted)] p-2 text-center">05 Communicate</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr
                    key={tool.name}
                    onClick={() => setSelectedTool(tool)}
                    className="hover:bg-[var(--panel-2)] transition-colors cursor-pointer group"
                  >
                    <th scope="row" className="text-left py-2.5 px-3 rounded-lg text-[var(--text)] group-hover:text-[var(--signal-ink)] font-medium">
                      {tool.name}
                    </th>
                    {tool.use.map((isActive, sIdx) => {
                      const isHighlightedStage = sIdx === activeStageIndex;
                      return (
                        <td
                          key={sIdx}
                          className={`h-11 rounded-lg text-center transition-all ${
                            isActive === 1
                              ? isHighlightedStage
                                ? 'bg-[var(--signal)] text-[var(--on-signal)] font-bold shadow-[0_0_12px_var(--signal)]'
                                : 'bg-[var(--data)]/80 text-[var(--bg)] font-medium'
                              : 'bg-[var(--bg-2)]/60 text-transparent border border-[var(--line)]/50'
                          }`}
                        >
                          {isActive === 1 ? '●' : '·'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* METHODS LIBRARY */}
        <div>
          <div className="mb-5">
            <span className="mono text-xs text-[var(--data-ink)] uppercase font-semibold">
              methods library
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)] mt-1">
              Analytical Techniques I Trust.
            </h3>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {methodsList.map((m) => {
              const isSelected = activeMethod === m.name;
              return (
                <button
                  key={m.name}
                  onClick={() => setActiveMethod(isSelected ? null : m.name)}
                  className={`px-4 py-2.5 rounded-xl border mono text-xs sm:text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--signal)] bg-[var(--signal-soft)] text-[var(--signal-ink)] font-bold scale-105'
                      : 'border-[var(--line)] bg-[var(--panel)] text-[var(--text)] hover:border-[var(--signal)]/50'
                  }`}
                >
                  {m.name}
                </button>
              );
            })}
          </div>

          {activeMethod && (
            <div className="mt-4 p-4 rounded-xl border border-[var(--signal)] bg-[var(--signal-soft)] mono text-xs text-[var(--text)] flex items-start gap-2.5 animate-fadeIn">
              <Info className="w-4 h-4 text-[var(--signal-ink)] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[var(--signal-ink)] font-bold">{activeMethod}: </strong>
                {methodsList.find((m) => m.name === activeMethod)?.desc}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TOOL DETAIL MODAL */}
      {selectedTool && (
        <div
          className="fixed inset-0 z-50 bg-[rgba(5,8,12,0.65)] backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedTool(null)}
        >
          <div
            className="w-full max-w-[540px] rounded-2xl border border-[var(--line-2)] bg-[var(--panel)] p-6 shadow-2xl animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
              <div>
                <span className="mono text-xs text-[var(--data-ink)] font-semibold uppercase">
                  {selectedTool.group}
                </span>
                <h3 className="text-2xl font-bold text-[var(--text)]">{selectedTool.name}</h3>
              </div>
              <button
                onClick={() => setSelectedTool(null)}
                className="text-[var(--muted)] hover:text-[var(--text)] mono text-xs px-2.5 py-1 rounded border border-[var(--line)]"
              >
                close
              </button>
            </div>

            <div className="py-4 space-y-4 text-sm text-[var(--text-2)]">
              <div>
                <span className="mono text-xs text-[var(--muted)] block mb-1">Production Experience:</span>
                <p className="leading-relaxed text-[var(--text)]">{selectedTool.experience}</p>
              </div>

              <div>
                <span className="mono text-xs text-[var(--muted)] block mb-1">Favorite Capability:</span>
                <p className="text-[var(--signal-ink)] font-medium leading-relaxed">
                  {selectedTool.favoriteFeature}
                </p>
              </div>

              <div>
                <span className="mono text-xs text-[var(--muted)] block mb-2">Used In Stages:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTool.use.map((active, idx) => {
                    if (active === 0) return null;
                    return (
                      <span
                        key={idx}
                        className="mono text-xs px-2.5 py-1 rounded bg-[var(--signal-soft)] text-[var(--signal-ink)] border border-[var(--signal)]/30 font-medium"
                      >
                        0{idx + 1} {stages[idx]?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--line)] flex justify-end">
              <button
                onClick={() => setSelectedTool(null)}
                className="px-4 py-2 rounded-xl bg-[var(--signal)] text-[var(--on-signal)] font-semibold text-xs mono cursor-pointer"
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
