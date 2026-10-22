import React, { useState } from 'react';
import { Mail, Linkedin, Github, FileText, CheckCircle2, Play, RefreshCw, Send, ArrowRight, Phone } from 'lucide-react';
import { PortfolioData, InquiryRecord } from '../types/portfolio';

interface ContactSectionProps {
  portfolio: PortfolioData;
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ portfolio, onOpenResume }) => {
  const [intent, setIntent] = useState('hire');
  const [role, setRole] = useState('Senior Data Analyst');
  const [timeline, setTimeline] = useState('ASAP');
  const [who, setWho] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isRunning, setIsRunning] = useState(false);
  const [queryResult, setQueryResult] = useState<InquiryRecord | null>(null);
  const [inquiryHistory, setInquiryHistory] = useState<InquiryRecord[]>([]);

  // Escaping for SQL string
  const escSql = (s: string) => s.replace(/'/g, "''");

  const generatedSql = `INSERT INTO next_steps (who, email, intent, role, timeline)
VALUES ('${escSql(who.trim() || 'you')}', '${escSql(email.trim() || 'you@company.com')}',
        '${escSql(intent)}', '${escSql(role)}', '${escSql(timeline)}');
-- ${escSql((message.trim() || 'the question your data is hiding goes here').slice(0, 90))}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!who.trim() || !email.trim()) return;

    setIsRunning(true);
    setTimeout(() => {
      const record: InquiryRecord = {
        id: `inq-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        who: who.trim(),
        email: email.trim(),
        intent,
        role,
        timeline,
        message: message.trim(),
        status: 'queued_for_reply',
      };

      setQueryResult(record);
      setInquiryHistory((prev) => [record, ...prev]);
      setIsRunning(false);
    }, 850);
  };

  const handleReset = () => {
    setQueryResult(null);
    setWho('');
    setEmail('');
    setMessage('');
  };

  const mailtoSubject = encodeURIComponent(`Portfolio Inquiry: ${intent.toUpperCase()} for ${role}`);
  const mailtoBody = encodeURIComponent(
    `Hi ${portfolio.name},\n\nI was reviewing your Data Analyst portfolio and would like to connect.\n\n` +
      `Intent: ${intent}\nRole: ${role}\nTimeline: ${timeline}\n\n` +
      `Details:\n${message || 'We have a business question regarding our data infrastructure.'}\n\n` +
      `Best regards,\n${who || 'A Visitor'} (${email || ''})`
  );

  return (
    <section className="py-14 sm:py-20 scroll-mt-20" id="contact">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="mono text-xs sm:text-[13px] tracking-wider text-[var(--data-ink)] uppercase flex items-center gap-2">
            <span className="font-bold text-[var(--signal-ink)]">05 · #contact</span>
            <span>·</span>
            <span>INSERT INTO next_steps VALUES (you);</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text)]">
            Let&apos;s write the next query{' '}
            <span className="text-[var(--signal-ink)]">together.</span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-[var(--text-2)] max-w-[760px]">
            Pick your parameters and watch the SQL statement build itself in real time. Hit run, and it dispatches directly to my inbox with a guaranteed response within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SQL Form Column */}
          <div className="lg:col-span-8 rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-8 shadow-xl">
            {!queryResult ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Builder Selects */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="flex flex-col gap-1.5 mono text-xs text-[var(--muted)]">
                    <span>intent</span>
                    <select
                      value={intent}
                      onChange={(e) => setIntent(e.target.value)}
                      className="h-12 px-3.5 rounded-xl border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--text)] font-sans text-sm focus:border-[var(--signal)] outline-none"
                    >
                      <option value="hire">hire (full-time role)</option>
                      <option value="collaborate">collaborate on project</option>
                      <option value="freelance">contract / audit</option>
                      <option value="say hello">say hello</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5 mono text-xs text-[var(--muted)]">
                    <span>role</span>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="h-12 px-3.5 rounded-xl border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--text)] font-sans text-sm focus:border-[var(--signal)] outline-none"
                    >
                      <option value="Senior Data Analyst">Senior Data Analyst</option>
                      <option value="BI / Analytics Engineer">BI / Analytics Engineer</option>
                      <option value="Product Analytics Lead">Product Analytics Lead</option>
                      <option value="Data Consultant">Data Consultant</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5 mono text-xs text-[var(--muted)]">
                    <span>timeline</span>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="h-12 px-3.5 rounded-xl border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--text)] font-sans text-sm focus:border-[var(--signal)] outline-none"
                    >
                      <option value="ASAP">ASAP (Immediate)</option>
                      <option value="this quarter">this quarter</option>
                      <option value="exploring">just exploring options</option>
                    </select>
                  </label>
                </div>

                {/* Text fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5 mono text-xs text-[var(--muted)]">
                    <span>who (name) *</span>
                    <input
                      type="text"
                      required
                      value={who}
                      onChange={(e) => setWho(e.target.value)}
                      placeholder="Your name or company"
                      className="h-12 px-4 rounded-xl border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--text)] font-sans text-sm focus:border-[var(--signal)] outline-none placeholder-[var(--muted)]/50"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 mono text-xs text-[var(--muted)]">
                    <span>email *</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="h-12 px-4 rounded-xl border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--text)] font-sans text-sm focus:border-[var(--signal)] outline-none placeholder-[var(--muted)]/50"
                    />
                  </label>
                </div>

                {/* Big message textarea */}
                <label className="flex flex-col gap-1.5 mono text-xs text-[var(--muted)]">
                  <span>the_question_your_data_is_hiding</span>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Why did repeat orders drop last quarter? How can we migrate 20 spreadsheets to a unified Power BI model?"
                    className="p-4 rounded-xl border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--text)] font-sans text-sm focus:border-[var(--signal)] outline-none placeholder-[var(--muted)]/50 resize-y"
                  />
                </label>

                {/* Real-time Generated SQL Statement Preview */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between mono text-xs text-[var(--muted)]">
                    <span>live query preview</span>
                    <span className="text-[var(--signal-ink)]">auto-generated</span>
                  </div>
                  <pre className="mono text-xs sm:text-[13px] leading-relaxed p-4 rounded-xl border border-[var(--line)] bg-[var(--bg-2)] text-[var(--text)] overflow-x-auto whitespace-pre">
                    <span className="text-[var(--data-ink)] font-bold">INSERT INTO</span> next_steps (who, email, intent, role, timeline){'\n'}
                    <span className="text-[var(--data-ink)] font-bold">VALUES</span> (<span className="text-[var(--signal-ink)]">&apos;{who.trim() || 'you'}&apos;</span>, <span className="text-[var(--signal-ink)]">&apos;{email.trim() || 'you@company.com'}&apos;</span>,{'\n'}
                            <span className="text-[var(--signal-ink)]">&apos;{intent}&apos;</span>, <span className="text-[var(--signal-ink)]">&apos;{role}&apos;</span>, <span className="text-[var(--signal-ink)]">&apos;{timeline}&apos;</span>);{'\n'}
                    <span className="text-[var(--muted)]">-- {escSql((message.trim() || 'the question your data is hiding goes here').slice(0, 80))}</span>
                  </pre>
                </div>

                {/* Submit button & execution bar */}
                {isRunning ? (
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-[var(--line)] overflow-hidden">
                      <div className="h-full bg-[var(--signal)] w-full animate-pulse" />
                    </div>
                    <span className="mono text-xs text-[var(--signal-ink)] font-bold">
                      EXECUTING INSERT QUERY ON REPLICATED DATABASE...
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="px-7 h-12 rounded-full bg-[var(--signal)] text-[var(--on-signal)] font-bold mono text-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer shadow-lg"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Run query ▸</span>
                    </button>

                    <a
                      href={`mailto:${portfolio.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                      className="px-5 h-12 rounded-full border border-[var(--line-2)] text-[var(--text)] hover:border-[var(--signal)] font-medium mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-[var(--signal-ink)]" />
                      <span>Open in Mail Client</span>
                    </a>
                  </div>
                )}
              </form>
            ) : (
              /* Success / Result State */
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-2 mono text-sm text-[var(--ok)] font-bold">
                  <CheckCircle2 className="w-5 h-5 text-[var(--ok)]" />
                  <span>✓ Query OK · 1 row affected (0.01 sec)</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--bg-2)]">
                  <table className="w-full text-left mono text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[var(--line)] text-[var(--muted)]">
                        <th className="py-2.5 px-4 font-medium">who</th>
                        <th className="py-2.5 px-4 font-medium">email</th>
                        <th className="py-2.5 px-4 font-medium">intent</th>
                        <th className="py-2.5 px-4 font-medium">status</th>
                        <th className="py-2.5 px-4 font-medium">reply_eta</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4 font-bold text-[var(--signal-ink)]">
                          {queryResult.who}
                        </td>
                        <td className="py-3 px-4 text-[var(--text-2)]">{queryResult.email}</td>
                        <td className="py-3 px-4 text-[var(--data-ink)]">{queryResult.intent}</td>
                        <td className="py-3 px-4 text-[var(--ok)] font-medium">
                          queued for reply
                        </td>
                        <td className="py-3 px-4 text-[var(--text)]">within 24 hours</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-xl border border-[var(--signal)]/30 bg-[var(--signal-soft)] mono text-xs text-[var(--text)] leading-relaxed">
                  <strong className="text-[var(--signal-ink)] font-bold">Notice: </strong>
                  Your query has been staged in the communication buffer. You can also trigger an immediate dispatch by emailing me at{' '}
                  <a
                    href={`mailto:${portfolio.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                    className="text-[var(--signal-ink)] underline font-bold"
                  >
                    {portfolio.email}
                  </a>
                  .
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 h-11 rounded-full border border-[var(--line-2)] bg-[var(--panel)] text-[var(--text)] hover:border-[var(--signal)] mono text-xs flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Run another query</span>
                  </button>

                  <a
                    href={`mailto:${portfolio.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                    className="px-6 h-11 rounded-full bg-[var(--signal)] text-[var(--on-signal)] font-bold mono text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send via Email app</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Direct Connect Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="mono text-xs text-[var(--data-ink)] uppercase font-semibold">
              or connect directly
            </span>

            {/* Email card */}
            <a
              href={`mailto:${portfolio.email}`}
              className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--signal)] hover:-translate-y-1 transition-all flex items-center gap-4 text-inherit no-underline shadow-md group"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--signal-soft)] text-[var(--signal-ink)] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col truncate">
                <small className="mono text-[10px] text-[var(--muted)] uppercase font-bold tracking-wider">
                  EMAIL DIRECT
                </small>
                <span className="text-sm font-semibold text-[var(--text)] truncate group-hover:text-[var(--signal-ink)] transition-colors">
                  {portfolio.email}
                </span>
              </div>
            </a>

            {/* Phone card */}
            {portfolio.phone && (
              <a
                href={`tel:${portfolio.phone}`}
                className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--signal)] hover:-translate-y-1 transition-all flex items-center gap-4 text-inherit no-underline shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--signal-soft)] text-[var(--signal-ink)] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col truncate">
                  <small className="mono text-[10px] text-[var(--muted)] uppercase font-bold tracking-wider">
                    PHONE / WHATSAPP
                  </small>
                  <span className="text-sm font-semibold text-[var(--text)] truncate group-hover:text-[var(--signal-ink)] transition-colors">
                    {portfolio.phone}
                  </span>
                </div>
              </a>
            )}

            {/* LinkedIn card */}
            <a
              href={portfolio.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)] hover:border-[var(--signal)] hover:-translate-y-1 transition-all flex items-center gap-4 text-inherit no-underline shadow-md group"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--data-soft)] text-[var(--data-ink)] flex items-center justify-center shrink-0">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <small className="mono text-[10px] text-[var(--muted)] uppercase font-bold tracking-wider">
                  LINKEDIN
                </small>
                <span className="text-sm font-semibold text-[var(--text)] group-hover:text-[var(--signal-ink)] transition-colors">
                  Connect professionally
                </span>
              </div>
            </a>

            {/* Résumé card */}
            <div
              onClick={onOpenResume}
              className="p-4 rounded-2xl border-2 border-[var(--signal)] bg-[var(--signal-soft)] hover:-translate-y-1 transition-all flex items-center justify-between gap-4 cursor-pointer shadow-lg group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--signal)] text-[var(--on-signal)] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <small className="mono text-[10px] text-[var(--signal-ink)] uppercase font-bold tracking-wider">
                    THE APPENDIX
                  </small>
                  <span className="text-sm font-bold text-[var(--text)] group-hover:underline">
                    View &amp; Download Résumé (PDF)
                  </span>
                </div>
              </div>
              <a
                href={portfolio.resumePdfPath || "/assets/aistudio/Blue_and_White_Clean_Professional_A4_Resume_92029312.pdf"}
                download="Tanya_Mall_Resume.pdf"
                onClick={(e) => e.stopPropagation()}
                className="mono text-xs px-2.5 py-1 rounded bg-[var(--signal)] text-[var(--on-signal)] font-bold shrink-0 hover:opacity-90"
                title="Direct PDF Download"
              >
                PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
