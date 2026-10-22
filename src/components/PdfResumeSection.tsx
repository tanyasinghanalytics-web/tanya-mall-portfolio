import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Copy,
  Check,
  Eye,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  FileCheck,
  Briefcase,
  GraduationCap,
  Award,
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import { getAssetPath } from '../utils/assetPath';

interface PdfResumeSectionProps {
  portfolio: PortfolioData;
  onOpenResumeModal: () => void;
}

export const PdfResumeSection: React.FC<PdfResumeSectionProps> = ({
  portfolio,
  onOpenResumeModal,
}) => {
  const [viewMode, setViewMode] = useState<'canvas' | 'text'>('canvas');
  const [currentPage, setCurrentPage] = useState<'1' | '2' | 'all'>('1');
  const [zoom, setZoom] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const pdfUrl = getAssetPath(
    portfolio.resumePdfPath ||
      'assets/aistudio/Blue_and_White_Clean_Professional_A4_Resume_92029312.pdf'
  );
  const page1HdUrl = getAssetPath('assets/resume_page_1_hd.png');
  const page2HdUrl = getAssetPath('assets/resume_page_2_hd.png');

  const plainTextResume = `TANYA MALL — DATA ANALYST & TEAM LEADER
Phone: ${portfolio.phone || '+91 9305024371'} | Location: ${portfolio.city}
Email: ${portfolio.email} | LinkedIn: ${portfolio.linkedin}

ABOUT ME
Detail-oriented Team Leader with over 3 years of progressive experience in survey research operations, data management, and business intelligence reporting. Proven track record of advancing from Research Analyst to Senior Research Analyst to Team Leader within the same organization by consistently maintaining accurate survey data records, building insightful dashboards in Power BI and Excel, and presenting actionable reports to senior decision-makers. Skilled in Advanced Excel, Power BI, SQL, Python, and Google Looker Studio, with recent certifications in data science, business analytics, and prompt engineering.

PROFESSIONAL EXPERIENCE
Stagnate Research PVT. Ltd | Noida

Team Leader (SEP 2026 - NOW)
• Lead a team of research associates, overseeing end-to-end survey data collection, validation, and record maintenance.
• Design and manage interactive dashboards and reports in Power BI and Excel to visualize survey findings for stakeholders.
• Present data-driven insights and recommendations directly to organizational decision-makers to support strategic planning.
• Mentor and guide research associates and analysts to ensure data quality and reporting consistency.

Senior Research Analyst (APR 2025 - AUG 2026)
• Maintained and audited large-scale survey data records collected by research associates, ensuring accuracy and completeness.
• Built Power BI and Excel visualizations to track survey trends and key performance indicators.
• Prepared and delivered regular reports and presentations to management for informed decision-making.
• Supported process improvements in data collection and reporting workflows, contributing to promotion to Team Leader.

Research Analyst (AUG 2023 - APR 2025)
• Maintained day-to-day data records of surveys conducted by research associates.
• Analyzed and visualized survey data using Excel and Power BI to identify patterns and trends.
• Assisted in preparing reports presented to decision-makers within the organization.
• Ensured data integrity and consistency across multiple ongoing survey projects.

CORE SKILLS
• Advanced Excel (formulas, pivot tables, dashboards)
• Power BI (data modeling, DAX, interactive dashboards)
• Google Looker Studio (Google Data Studio)
• SQL & Relational Databases
• Python for Data Analysis
• Survey Data Management & Reporting
• Stakeholder Presentations & Business Communication
• Team Leadership & Mentoring

KEY PROJECTS
1. Multi-Project Survey Research & Reporting
• Managed data for multiple concurrent survey and secondary-research projects, coordinating with research associates.
• Consolidated, cleaned, and analyzed incoming survey data in Excel using formulas and pivot tables.
• Converted analyzed data into interactive Power BI dashboards for each project.

2. Live Database-to-Power BI Integration via API
• Connected database directly to Power BI using API integration for real-time survey tracking.
• Set up automated data refresh from the database through the API, eliminating manual data uploads.

CERTIFICATIONS
• Data Science Essentials with Python — Cisco Networking Academy (Jun 2026)
• Business Analytics with Excel — Microsoft (Jun 2026)
• SQL and Relational Database 101 — Cognitive Class (Issued Jun 2026, Expires Jun 2030)
  Credential ID: 15da1aa63ff84728a4a66423156effaa
• Foundations of Prompt Engineering — Amazon Web Services (AWS) (Jun 2026)

EDUCATION
• Graduation (B.Sc.) — Swami Vivekanand Subharti University (Open) — 70% — ZBC
• O Level — Grade B — Subjects: Python (A Grade), IoT (A Grade), IT Tools (B Grade)
• 12th — S.D.I. College, Madhuban, Mau — 76.9% — PCB
• 10th — S.D.I. College, Madhuban, Mau — 89.5% — Science Stream`;

  const handleCopy = () => {
    navigator.clipboard.writeText(plainTextResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error('Fetch failed');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Tanya_Mall_Data_Analyst_Resume.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', 'Tanya_Mall_Data_Analyst_Resume.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([plainTextResume], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Tanya_Mall_Data_Analyst_Resume.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 20, 50));
  const handleZoomReset = () => setZoom(100);
  const handleFitWidth = () => setZoom(115);
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  return (
    <section
      id="resume-section"
      className="scroll-mt-20 border-b border-[var(--line)] py-14 bg-[var(--panel)] relative"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="mono text-xs sm:text-[13px] tracking-wider text-[var(--data-ink)] uppercase flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[var(--signal)]" />
              <span>03 · pdf_resume · SELECT * FROM resume_doc;</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
              Authentic PDF Résumé &amp; Document Preview
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-2)] max-w-[700px] leading-relaxed">
              Inspect, read, or download Tanya Mall&apos;s complete 2-page Data Analyst &amp; Team Leader résumé.
            </p>
          </div>

          {/* Quick Action Group */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="h-10 px-4 rounded-xl bg-[var(--signal)] text-[var(--on-signal)] font-bold mono text-xs flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Downloading...' : 'Download Official PDF'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenResumeModal}
              className="h-10 px-3.5 rounded-xl border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--text)] hover:border-[var(--signal)] hover:text-[var(--signal-ink)] mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Open full screen modal viewer"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline font-semibold">Full Screen</span>
            </button>
          </div>
        </div>

        {/* Main Document Frame Container */}
        <div className="rounded-2xl border border-[var(--line-2)] bg-[var(--bg-2)] shadow-2xl overflow-hidden flex flex-col">
          {/* Document Frame Control Bar */}
          <div className="px-4 py-3 bg-[var(--panel-2)] border-b border-[var(--line)] flex flex-wrap items-center justify-between gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 rounded-xl border border-[var(--line)] bg-[var(--panel)] mono text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('canvas')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                    viewMode === 'canvas'
                      ? 'bg-[var(--signal)] text-[var(--on-signal)] shadow-sm'
                      : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>PDF Preview</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('text')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                    viewMode === 'text'
                      ? 'bg-[var(--signal)] text-[var(--on-signal)] shadow-sm'
                      : 'text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Structured Text</span>
                </button>
              </div>

              {viewMode === 'canvas' && (
                <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-xl border border-[var(--line)] bg-[var(--panel)] mono text-xs text-[var(--muted)]">
                  <FileCheck className="w-3.5 h-3.5 text-[var(--ok)]" />
                  <span>2 Pages · 300 DPI HD</span>
                </div>
              )}
            </div>

            {/* Controls for Canvas Mode */}
            {viewMode === 'canvas' && (
              <div className="flex flex-wrap items-center gap-2 mono text-xs">
                {/* Page Selectors */}
                <div className="flex items-center gap-1 bg-[var(--panel)] p-1 rounded-xl border border-[var(--line)]">
                  <button
                    type="button"
                    onClick={() => setCurrentPage('1')}
                    className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
                      currentPage === '1'
                        ? 'bg-[var(--signal-soft)] text-[var(--signal-ink)] border border-[var(--signal)]/30'
                        : 'text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    Page 1
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('2')}
                    className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
                      currentPage === '2'
                        ? 'bg-[var(--signal-soft)] text-[var(--signal-ink)] border border-[var(--signal)]/30'
                        : 'text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    Page 2
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('all')}
                    className={`hidden md:inline-block px-2.5 py-1 rounded-lg font-semibold cursor-pointer transition-all ${
                      currentPage === 'all'
                        ? 'bg-[var(--signal-soft)] text-[var(--signal-ink)] border border-[var(--signal)]/30'
                        : 'text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    Both Pages
                  </button>
                </div>

                {/* Zoom & Fit */}
                <div className="flex items-center gap-1 bg-[var(--panel)] px-2 py-1 rounded-xl border border-[var(--line)]">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    className="p-1 rounded hover:bg-[var(--bg-2)] cursor-pointer text-[var(--muted)] hover:text-[var(--text)]"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomReset}
                    className="px-1 font-bold text-[var(--text)] hover:text-[var(--signal-ink)]"
                  >
                    {zoom}%
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    className="p-1 rounded hover:bg-[var(--bg-2)] cursor-pointer text-[var(--muted)] hover:text-[var(--text)]"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Print & Copy */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="p-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
                  title="Print document"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl border border-[var(--line)] bg-[var(--panel)] text-[var(--text)] hover:border-[var(--signal)] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy text"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[var(--ok)]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Document View Body */}
          <div className="p-4 sm:p-8 bg-[#0b0e14] min-h-[500px] max-h-[750px] overflow-y-auto flex flex-col items-center relative">
            {viewMode === 'canvas' ? (
              <div
                style={{
                  width: `${Math.round(760 * (zoom / 100))}px`,
                  maxWidth: '100%',
                  transform: rotation ? `rotate(${rotation}deg)` : undefined,
                  transformOrigin: 'top center',
                  transition: 'width 0.15s ease-out',
                }}
                className="flex flex-col items-center gap-8 shrink-0 pb-12 select-text"
              >
                {/* PAGE 1 */}
                {(currentPage === '1' || currentPage === 'all') && (
                  <div className="w-full bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-300 relative group">
                    <div className="absolute top-3 right-4 z-10 mono text-[11px] bg-black/70 text-white px-2.5 py-0.5 rounded-full select-none backdrop-blur-sm">
                      PAGE 1 OF 2
                    </div>
                    <img
                      src={page1HdUrl}
                      alt="Tanya Mall Data Analyst Résumé - Page 1"
                      className="w-full h-auto block"
                      loading="eager"
                      onError={(e) => {
                        // Fallback if image fails
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* PAGE 2 */}
                {(currentPage === '2' || currentPage === 'all') && (
                  <div className="w-full bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-300 relative group">
                    <div className="absolute top-3 right-4 z-10 mono text-[11px] bg-black/70 text-white px-2.5 py-0.5 rounded-full select-none backdrop-blur-sm">
                      PAGE 2 OF 2
                    </div>
                    <img
                      src={page2HdUrl}
                      alt="Tanya Mall Data Analyst Résumé - Page 2"
                      className="w-full h-auto block"
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              /* TEXT MODE */
              <div className="w-full max-w-[850px] text-[var(--text)] space-y-6 font-sans text-left">
                {/* Header */}
                <div className="border-b border-[var(--line)] pb-5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h3 className="text-2xl font-extrabold tracking-tight text-[var(--text)]">
                      {portfolio.name}
                    </h3>
                    <span className="mono text-xs font-bold text-[var(--signal-ink)] uppercase">
                      {portfolio.role}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mono text-xs text-[var(--muted)] pt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[var(--signal-ink)]" />
                      <span>{portfolio.phone || '+91 9305024371'}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{portfolio.city}</span>
                    </span>
                    <span>•</span>
                    <a href={`mailto:${portfolio.email}`} className="text-[var(--data-ink)] underline flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      <span>{portfolio.email}</span>
                    </a>
                  </div>
                </div>

                {/* About */}
                <div className="space-y-2">
                  <h4 className="mono text-xs font-bold uppercase tracking-wider text-[var(--data-ink)] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--signal-ink)]" />
                    <span>ABOUT ME</span>
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-2)]">
                    Detail-oriented Team Leader with over 3 years of progressive experience in survey research operations, data management, and business intelligence reporting. Proven track record of advancing from Research Analyst to Senior Research Analyst to Team Leader within the same organization by consistently maintaining accurate survey data records, building insightful dashboards in Power BI and Excel, and presenting actionable reports to senior decision-makers.
                  </p>
                </div>

                {/* Experience */}
                <div className="space-y-3">
                  <h4 className="mono text-xs font-bold uppercase tracking-wider text-[var(--data-ink)] flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[var(--signal-ink)]" />
                    <span>PROFESSIONAL EXPERIENCE</span>
                  </h4>

                  <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--panel-2)]/60 font-semibold text-xs sm:text-sm text-[var(--text)]">
                    Stagnate Research PVT. Ltd | Noida, India
                  </div>

                  {/* Roles */}
                  <div className="space-y-2 pl-3 border-l-2 border-[var(--signal)] text-xs text-[var(--text-2)]">
                    <div className="font-bold text-[var(--signal-ink)]">Team Leader (SEP 2026 – PRESENT)</div>
                    <p className="leading-relaxed">Leading research associates in end-to-end survey data collection, validation, and maintenance. Designing Power BI &amp; Excel dashboards for executive decision-makers.</p>
                  </div>

                  <div className="space-y-2 pl-3 border-l-2 border-[var(--data)] text-xs text-[var(--text-2)]">
                    <div className="font-bold text-[var(--text)]">Senior Research Analyst (APR 2025 – AUG 2026)</div>
                    <p className="leading-relaxed">Audited large-scale survey data records. Built Power BI &amp; Excel visualizations tracking trends and KPIs.</p>
                  </div>

                  <div className="space-y-2 pl-3 border-l-2 border-[var(--line-2)] text-xs text-[var(--text-2)]">
                    <div className="font-bold text-[var(--muted)]">Research Analyst (AUG 2023 – APR 2025)</div>
                    <p className="leading-relaxed">Maintained daily survey records. Analyzed and visualized data in Excel and Power BI.</p>
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-2">
                  <h4 className="mono text-xs font-bold uppercase tracking-wider text-[var(--data-ink)] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[var(--signal-ink)]" />
                    <span>KEY CERTIFICATIONS</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text-2)]">
                    <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel-2)]/40">
                      <b>SQL &amp; Relational Database 101</b> — Cognitive Class (ID: 15da1aa63ff84728a4a66423156effaa)
                    </div>
                    <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel-2)]/40">
                      <b>Data Science Essentials with Python</b> — Cisco Networking Academy
                    </div>
                    <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel-2)]/40">
                      <b>Business Analytics with Excel</b> — Microsoft
                    </div>
                    <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel-2)]/40">
                      <b>Foundations of Prompt Engineering</b> — AWS
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-4 flex items-center gap-3 border-t border-[var(--line)]">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] text-xs mono text-[var(--text)] hover:border-[var(--signal)] flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[var(--ok)]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Full Text'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadTxt}
                    className="px-3 py-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] text-xs mono text-[var(--text)] hover:border-[var(--signal)] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .txt</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
