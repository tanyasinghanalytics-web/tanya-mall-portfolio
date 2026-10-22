import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Layers,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  FileCheck,
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import { getAssetPath } from '../utils/assetPath';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, portfolio }) => {
  // Modes:
  // 'canvas' = Built-in high-DPI document frame rendering the authentic PDF pages
  // 'text' = Clean structured text view with copy/download options
  const [viewMode, setViewMode] = useState<'canvas' | 'text'>('canvas');
  // Page selection: 1 (Page 1), 2 (Page 2), or 'all' (continuous scroll)
  const [currentPage, setCurrentPage] = useState<'1' | '2' | 'all'>('1');
  const [zoom, setZoom] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  if (!isOpen) return null;

  const pdfUrl = getAssetPath(
    portfolio.resumePdfPath ||
      'assets/aistudio/Blue_and_White_Clean_Professional_A4_Resume_92029312.pdf'
  );

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
• Managed data for multiple concurrent survey and secondary-research projects, coordinating with research associates who collected raw data from secondary sources.
• Consolidated, cleaned, and analyzed incoming survey data in Excel, applying formulas and pivot tables to identify trends across projects.
• Converted analyzed data into interactive Power BI dashboards for each project, enabling decision-makers to review project-specific insights.

2. Live Database-to-Power BI Integration via API
• Connected the organization's database directly to Power BI using API integration, enabling real-time / live tracking of survey and research data.
• Set up automated data refresh from the database through the API, eliminating manual data uploads and keeping dashboards continuously up to date.
• Enabled decision-makers to monitor live project progress and survey metrics in Power BI without waiting for periodic manual reports.

CERTIFICATIONS
• Data Science Essentials with Python — Cisco Networking Academy (Jun 2026)
• Business Analytics with Excel — Microsoft (Jun 2026)
• SQL and Relational Database 101 — Cognitive Class (Issued Jun 2026, Expires Jun 2030)
  Credential ID: 15da1aa63ff84728a4a66423156effaa
• Foundations of Prompt Engineering — Amazon Web Services (AWS) (Jun 2026)

EDUCATION
• Graduation (B.Sc.) — Swami Vivekanand Subharti University (Open) — 70% — ZBC (Zoology, Botany, Chemistry) Specialization
• O Level — Grade B — Subjects: Python (A Grade), IoT (A Grade), IT Tools & Business Systems: Excel, Power BI, SQL (B Grade)
• 12th — S.D.I. College, Madhuban, Mau — 76.9% — PCB (Physics, Chemistry, Biology)
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
      // Fallback direct anchor download
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
  const handleFitWidth = () => setZoom(120);
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handlePrevPage = () => {
    if (currentPage === '2') setCurrentPage('1');
    else if (currentPage === 'all') setCurrentPage('1');
  };

  const handleNextPage = () => {
    if (currentPage === '1') setCurrentPage('2');
    else if (currentPage === 'all') setCurrentPage('2');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(5,8,12,0.88)] backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`w-full bg-[var(--panel)] border border-[var(--line-2)] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-scaleUp ${
          isFullscreen
            ? 'fixed inset-0 rounded-none max-w-none max-h-none h-full'
            : 'max-w-[1200px] h-[95vh] rounded-2xl sm:rounded-3xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================================================
            HEADER TOOLBAR
            ========================================================================= */}
        <div className="px-3 sm:px-6 py-3 border-b border-[var(--line)] bg-[var(--panel-2)] flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          {/* Title & Mode Switcher */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <div className="flex items-center gap-2 mono text-xs text-[var(--signal-ink)] font-bold">
              <FileCheck className="w-4 h-4 text-[var(--signal)]" />
              <span className="hidden sm:inline">ORIGINAL RÉSUMÉ · TANYA MALL</span>
              <span className="sm:hidden font-semibold">TANYA MALL CV</span>
            </div>

            {/* Frame View Modes */}
            <div className="flex items-center p-0.5 rounded-xl border border-[var(--line)] bg-[var(--bg-2)] mono text-xs">
              <button
                type="button"
                onClick={() => setViewMode('canvas')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                  viewMode === 'canvas'
                    ? 'bg-[var(--signal)] text-[var(--on-signal)] shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
                title="Interactive High-Resolution PDF Document Frame"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>PDF Frame</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('text')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer ${
                  viewMode === 'text'
                    ? 'bg-[var(--signal)] text-[var(--on-signal)] shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
                title="Structured Text Breakdown"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Text</span>
              </button>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Download PDF button */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-3 sm:px-4 py-1.5 rounded-xl bg-[var(--signal)] text-[var(--on-signal)] font-bold mono text-xs flex items-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
              title="Download original PDF file (Tanya_Mall_Data_Analyst_Resume.pdf)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Saving...' : 'Download PDF'}</span>
            </button>

            {/* Print */}
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-xl border border-[var(--line)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg-2)] transition-colors cursor-pointer"
              title="Print document"
              aria-label="Print document"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Copy Text */}
            <button
              type="button"
              onClick={handleCopy}
              className="hidden md:flex px-2.5 py-1.5 rounded-xl border border-[var(--line)] mono text-xs text-[var(--text)] hover:border-[var(--signal)] items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy résumé text to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[var(--ok)]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {/* Download TXT */}
            <button
              type="button"
              onClick={handleDownloadTxt}
              className="hidden lg:flex px-2.5 py-1.5 rounded-xl border border-[var(--line)] mono text-xs text-[var(--text)] hover:border-[var(--signal)] items-center gap-1 transition-colors cursor-pointer"
              title="Download plain text file"
            >
              <Download className="w-3.5 h-3.5 text-[var(--muted)]" />
              <span>.txt</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl border border-[var(--line)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg-2)] transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit full screen' : 'Full screen viewer'}
              aria-label={isFullscreen ? 'Exit full screen' : 'Full screen viewer'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Modal */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl border border-[var(--line)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg-2)] transition-colors cursor-pointer ml-1"
              aria-label="Close résumé viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            SECONDARY TOOLBAR (For PDF Document Frame)
            ========================================================================= */}
        {viewMode === 'canvas' && (
          <div className="px-3 sm:px-6 py-2 border-b border-[var(--line)] bg-[var(--bg-2)] flex flex-wrap items-center justify-between gap-2 mono text-xs text-[var(--text-2)] shrink-0">
            {/* Page Navigation */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={currentPage === '1'}
                className="p-1 rounded-lg border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--signal)] disabled:opacity-30 disabled:hover:border-[var(--line)] cursor-pointer"
                title="Previous page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1 px-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage('1')}
                  className={`px-2 py-0.5 rounded-md border text-xs font-semibold cursor-pointer transition-all ${
                    currentPage === '1'
                      ? 'border-[var(--signal)] bg-[var(--signal-soft)] text-[var(--signal-ink)]'
                      : 'border-[var(--line)] bg-[var(--panel)] text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  Page 1
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage('2')}
                  className={`px-2 py-0.5 rounded-md border text-xs font-semibold cursor-pointer transition-all ${
                    currentPage === '2'
                      ? 'border-[var(--signal)] bg-[var(--signal-soft)] text-[var(--signal-ink)]'
                      : 'border-[var(--line)] bg-[var(--panel)] text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  Page 2
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage('all')}
                  className={`hidden sm:inline-block px-2 py-0.5 rounded-md border text-xs font-semibold cursor-pointer transition-all ${
                    currentPage === 'all'
                      ? 'border-[var(--signal)] bg-[var(--signal-soft)] text-[var(--signal-ink)]'
                      : 'border-[var(--line)] bg-[var(--panel)] text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  All (Continuous)
                </button>
              </div>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage === '2'}
                className="p-1 rounded-lg border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--signal)] disabled:opacity-30 disabled:hover:border-[var(--line)] cursor-pointer"
                title="Next page"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-[var(--muted)] text-[11px] ml-1 hidden md:inline">
                ({currentPage === 'all' ? '2 of 2 pages' : `Page ${currentPage} of 2`})
              </span>
            </div>

            {/* Zoom, Fit & Rotate Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[var(--panel)] px-1.5 py-0.5 rounded-lg border border-[var(--line)]">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1 rounded hover:bg-[var(--bg-2)] cursor-pointer text-[var(--muted)] hover:text-[var(--text)]"
                  title="Zoom out (-20%)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleZoomReset}
                  className="px-1.5 py-0.5 text-[11px] font-bold text-[var(--text)] hover:text-[var(--signal-ink)] cursor-pointer"
                  title="Reset to 100%"
                >
                  {zoom}%
                </button>

                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1 rounded hover:bg-[var(--bg-2)] cursor-pointer text-[var(--muted)] hover:text-[var(--text)]"
                  title="Zoom in (+20%)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleFitWidth}
                className="hidden sm:inline-block px-2 py-1 rounded-lg border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--signal)] text-[11px] cursor-pointer"
                title="Fit page width"
              >
                Fit Width
              </button>

              <button
                type="button"
                onClick={handleRotate}
                className="flex items-center gap-1 px-2 py-1 rounded-lg border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--signal)] text-[11px] cursor-pointer"
                title="Rotate 90 degrees clockwise"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Rotate</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            MAIN CONTENT VIEWER BODY
            ========================================================================= */}
        <div className="flex-1 overflow-hidden relative bg-[#0b0e14] flex flex-col">
          {viewMode === 'canvas' && (
            /* -------------------------------------------------------------
               MODE 1: BUILT-IN HIGH-RESOLUTION PDF DOCUMENT FRAME
               Uses 300 DPI razor-sharp authentic rasterization of the original PDF
               Works reliably in ALL environments with zero browser sandbox blocks!
               ------------------------------------------------------------- */
            <div className="flex-1 w-full h-full overflow-auto p-4 sm:p-8 flex flex-col items-center gap-8 bg-[#0b0e14] relative select-text">
              <div
                style={{
                  width: `${Math.round(820 * (zoom / 100))}px`,
                  maxWidth: '100%',
                  transform: rotation ? `rotate(${rotation}deg)` : undefined,
                  transformOrigin: 'top center',
                  transition: 'width 0.15s ease-out',
                }}
                className="flex flex-col items-center gap-8 shrink-0 pb-20"
              >
                {/* PAGE 1 */}
                {(currentPage === '1' || currentPage === 'all') && (
                  <div className="w-full bg-white rounded shadow-2xl overflow-hidden border border-gray-300 relative group">
                    <div className="absolute top-2 right-3 z-10 mono text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-full select-none backdrop-blur-sm pointer-events-none">
                      PAGE 1 OF 2
                    </div>
                    <img
                      src={getAssetPath('assets/resume_page_1_hd.png')}
                      alt="Tanya Mall Data Analyst Résumé - Page 1"
                      className="w-full h-auto block"
                      loading="eager"
                    />
                  </div>
                )}

                {/* PAGE 2 */}
                {(currentPage === '2' || currentPage === 'all') && (
                  <div className="w-full bg-white rounded shadow-2xl overflow-hidden border border-gray-300 relative group">
                    <div className="absolute top-2 right-3 z-10 mono text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-full select-none backdrop-blur-sm pointer-events-none">
                      PAGE 2 OF 2
                    </div>
                    <img
                      src={getAssetPath('assets/resume_page_2_hd.png')}
                      alt="Tanya Mall Data Analyst Résumé - Page 2"
                      className="w-full h-auto block"
                      loading="eager"
                    />
                  </div>
                )}
              </div>

              {/* Bottom Floating Toolbar */}
              <div className="sticky bottom-4 z-30 px-4 sm:px-5 py-2.5 rounded-full border border-[var(--line-2)] bg-[var(--panel)]/95 backdrop-blur-md shadow-2xl flex items-center gap-3 mono text-xs text-[var(--text)]">
                <span className="text-[var(--muted)] hidden sm:inline">Showing:</span>
                <span className="font-bold text-[var(--signal-ink)]">
                  {currentPage === 'all' ? 'Pages 1 & 2' : `Page ${currentPage} of 2`}
                </span>
                <span className="text-[var(--faint)]">·</span>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="text-[var(--signal-ink)] hover:underline font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <span className="text-[var(--faint)]">·</span>
                <button
                  type="button"
                  onClick={() => setViewMode('text')}
                  className="text-[var(--data-ink)] hover:underline cursor-pointer"
                >
                  Text Mode
                </button>
              </div>
            </div>
          )}

          {viewMode === 'text' && (
            /* -------------------------------------------------------------
               MODE 3: STRUCTURED TEXT VIEW
               Full cleanly formatted breakdown with easy copy & section jump
               ------------------------------------------------------------- */
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 text-[var(--text)] font-sans max-w-[900px] mx-auto w-full">
              {/* Header */}
              <div className="border-b border-[var(--line)] pb-5 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text)]">
                    {portfolio.name}
                  </h1>
                  <span className="mono text-sm font-bold text-[var(--signal-ink)] uppercase">
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
                  <span>•</span>
                  <a
                    href={portfolio.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-[var(--signal-ink)] flex items-center gap-1"
                  >
                    <Linkedin className="w-3 h-3" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* About Me */}
              <div className="space-y-2">
                <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--data-ink)] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--signal-ink)]" />
                  <span>ABOUT ME</span>
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-2)]">
                  Detail-oriented Team Leader with over 3 years of progressive experience in survey research operations, data management, and business intelligence reporting. Proven track record of advancing from Research Analyst to Senior Research Analyst to Team Leader within the same organization by consistently maintaining accurate survey data records, building insightful dashboards in Power BI and Excel, and presenting actionable reports to senior decision-makers. Skilled in Advanced Excel, Power BI, SQL, Python, and Google Looker Studio, with recent certifications in data science, business analytics, and prompt engineering.
                </p>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--data-ink)]">
                  PROFESSIONAL EXPERIENCE
                </h2>

                <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--panel-2)]/60 font-semibold text-sm sm:text-base text-[var(--text)]">
                  Stagnate Research PVT. Ltd | Noida, India
                </div>

                {/* Role 1 */}
                <div className="space-y-1.5 pl-3 border-l-2 border-[var(--signal)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="font-bold text-sm text-[var(--signal-ink)]">Team Leader</h3>
                    <span className="mono text-xs text-[var(--signal-ink)] font-semibold">SEP 2026 – NOW</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[var(--text-2)] leading-relaxed">
                    <li>Lead a team of research associates, overseeing end-to-end survey data collection, validation, and record maintenance.</li>
                    <li>Design and manage interactive dashboards and reports in Power BI and Excel to visualize survey findings for stakeholders.</li>
                    <li>Present data-driven insights and recommendations directly to organizational decision-makers to support strategic planning.</li>
                    <li>Mentor and guide research associates and analysts to ensure data quality and reporting consistency.</li>
                  </ul>
                </div>

                {/* Role 2 */}
                <div className="space-y-1.5 pl-3 border-l-2 border-[var(--data)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="font-bold text-sm text-[var(--text)]">Senior Research Analyst</h3>
                    <span className="mono text-xs text-[var(--muted)] font-semibold">APR 2025 – AUG 2026</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[var(--text-2)] leading-relaxed">
                    <li>Maintained and audited large-scale survey data records collected by research associates, ensuring accuracy and completeness.</li>
                    <li>Built Power BI and Excel visualizations to track survey trends and key performance indicators.</li>
                    <li>Prepared and delivered regular reports and presentations to management for informed decision-making.</li>
                    <li>Supported process improvements in data collection and reporting workflows, contributing to promotion to Team Leader.</li>
                  </ul>
                </div>

                {/* Role 3 */}
                <div className="space-y-1.5 pl-3 border-l-2 border-[var(--line-2)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className="font-bold text-sm text-[var(--muted)]">Research Analyst</h3>
                    <span className="mono text-xs text-[var(--muted)] font-semibold">AUG 2023 – APR 2025</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[var(--text-2)] leading-relaxed">
                    <li>Maintained day-to-day data records of surveys conducted by research associates.</li>
                    <li>Analyzed and visualized survey data using Excel and Power BI to identify patterns and trends.</li>
                    <li>Assisted in preparing reports presented to decision-makers within the organization.</li>
                    <li>Ensured data integrity and consistency across multiple ongoing survey projects.</li>
                  </ul>
                </div>
              </div>

              {/* Core Skills */}
              <div className="space-y-2">
                <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--data-ink)]">
                  CORE SKILLS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text-2)]">
                  <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel-2)]/40">
                    • Advanced Excel (formulas, pivot tables, dashboards)
                  </div>
                  <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel-2)]/40">
                    • Power BI (data modeling, DAX, interactive dashboards)
                  </div>
                  <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel-2)]/40">
                    • Google Looker Studio (Google Data Studio)
                  </div>
                  <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel-2)]/40">
                    • SQL &amp; Relational Databases
                  </div>
                  <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel-2)]/40">
                    • Python for Data Analysis
                  </div>
                  <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel-2)]/40">
                    • Survey Data Management &amp; Reporting
                  </div>
                  <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel-2)]/40">
                    • Stakeholder Presentations &amp; Business Communication
                  </div>
                  <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--panel-2)]/40">
                    • Team Leadership &amp; Mentoring
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-2">
                <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--data-ink)]">
                  CERTIFICATIONS
                </h2>
                <div className="space-y-2 text-xs text-[var(--text-2)]">
                  <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--panel-2)]/50">
                    <b className="text-[var(--text)]">Data Science Essentials with Python</b> — Cisco Networking Academy (Jun 2026)
                  </div>
                  <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--panel-2)]/50">
                    <b className="text-[var(--text)]">Business Analytics with Excel</b> — Microsoft (Jun 2026)
                  </div>
                  <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--panel-2)]/50">
                    <b className="text-[var(--text)]">SQL and Relational Database 101</b> — Cognitive Class (Jun 2026 - Jun 2030)
                    <div className="mono text-[11px] text-[var(--signal-ink)] mt-0.5">
                      Credential ID: 15da1aa63ff84728a4a66423156effaa
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--panel-2)]/50">
                    <b className="text-[var(--text)]">Foundations of Prompt Engineering</b> — Amazon Web Services (AWS) (Jun 2026)
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-2 pb-6">
                <h2 className="mono text-xs font-bold uppercase tracking-wider text-[var(--data-ink)]">
                  EDUCATION
                </h2>
                <div className="space-y-2 text-xs text-[var(--text-2)]">
                  <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--panel-2)]/50">
                    <b className="text-[var(--text)]">Graduation (B.Sc.)</b> — Swami Vivekanand Subharti University (Open) — 70% — ZBC (Zoology, Botany, Chemistry)
                  </div>
                  <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--panel-2)]/50">
                    <b className="text-[var(--text)]">O Level — Grade B</b> — Subjects: Python (A Grade), IoT (A Grade), IT Tools &amp; Business Systems: Excel, Power BI, SQL (B Grade)
                  </div>
                  <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--panel-2)]/50">
                    <b className="text-[var(--text)]">12th</b> — S.D.I. College, Madhuban, Mau — 76.9% — PCB
                  </div>
                  <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--panel-2)]/50">
                    <b className="text-[var(--text)]">10th</b> — S.D.I. College, Madhuban, Mau — 89.5% — Science Stream
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
