import React, { useState } from 'react';
import { X, SlidersHorizontal, RotateCcw, Check, UserCheck } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
  onSave: (updated: Partial<PortfolioData>) => void;
  onReset: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  onSave,
  onReset,
}) => {
  const [name, setName] = useState(portfolio.name);
  const [initials, setInitials] = useState(portfolio.initials);
  const [role, setRole] = useState(portfolio.role);
  const [city, setCity] = useState(portfolio.city);
  const [email, setEmail] = useState(portfolio.email);
  const [status, setStatus] = useState(portfolio.status);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    const parts = val.trim().split(' ');
    if (parts.length >= 2) {
      setInitials((parts[0][0] + parts[parts.length - 1][0]).toUpperCase());
    } else if (parts[0]) {
      setInitials(parts[0].slice(0, 2).toUpperCase());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || portfolio.name,
      initials: initials.trim() || 'TM',
      role: role.trim() || portfolio.role,
      city: city.trim() || portfolio.city,
      email: email.trim() || portfolio.email,
      status: status.trim() || portfolio.status,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[rgba(5,8,12,0.7)] backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[560px] rounded-3xl border border-[var(--line-2)] bg-[var(--panel)] shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[var(--line)] bg-[var(--panel-2)] flex items-center justify-between">
          <div className="flex items-center gap-2 mono text-xs text-[var(--signal-ink)] font-semibold">
            <SlidersHorizontal className="w-4 h-4" />
            <span>PORTFOLIO CONFIGURATOR · LIVE CUSTOMIZER</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl border border-[var(--line)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-[var(--muted)] mono">
            Want to test this portfolio with your own name, contact details, or location? Update below and watch the whole site sync immediately.
          </p>

          <div className="grid grid-cols-3 gap-3">
            <label className="col-span-2 flex flex-col gap-1 mono text-xs text-[var(--muted)]">
              <span>Analyst Full Name</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="h-11 px-3.5 rounded-xl border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--text)] font-sans text-sm focus:border-[var(--signal)] outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 mono text-xs text-[var(--muted)]">
              <span>Initials</span>
              <input
                type="text"
                maxLength={3}
                required
                value={initials}
                onChange={(e) => setInitials(e.target.value.toUpperCase())}
                className="h-11 px-3.5 rounded-xl border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--text)] font-sans text-sm focus:border-[var(--signal)] outline-none uppercase text-center font-bold"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 mono text-xs text-[var(--muted)]">
            <span>Primary Professional Role</span>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-11 px-3.5 rounded-xl border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--text)] font-sans text-sm focus:border-[var(--signal)] outline-none"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 mono text-xs text-[var(--muted)]">
              <span>City / Location</span>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-11 px-3.5 rounded-xl border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--text)] font-sans text-sm focus:border-[var(--signal)] outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 mono text-xs text-[var(--muted)]">
              <span>Direct Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 px-3.5 rounded-xl border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--text)] font-sans text-sm focus:border-[var(--signal)] outline-none"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 mono text-xs text-[var(--muted)]">
            <span>Hiring Status Badge</span>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 px-3.5 rounded-xl border border-[var(--line-2)] bg-[var(--bg-2)] text-[var(--text)] font-sans text-sm focus:border-[var(--signal)] outline-none"
            />
          </label>

          <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl border border-[var(--line-2)] text-xs mono text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--signal)] flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[var(--line)] text-xs mono text-[var(--muted)] hover:text-[var(--text)] cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[var(--signal)] text-[var(--on-signal)] font-bold text-xs mono flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
