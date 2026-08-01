import React, { useEffect, useRef } from 'react';

const AgeGate = ({ onConfirm }) => {
  const dialogRef = useRef(null);
  const headingRef = useRef(null);
  const enterRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
      headingRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
      }
    };

    dialog?.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      dialog?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem('ong-age-confirmed', 'true');
    document.body.style.overflow = '';
    onConfirm();
  };

  const handleLeave = () => {
    window.location.replace('https://www.google.com/');
  };

  return (
    <dialog
      ref={dialogRef}
      className="age-gate-dialog"
      aria-modal="true"
      aria-labelledby="age-gate-heading"
    >
      <div className="age-gate-content">
        <div className="age-gate-brand">
          <svg viewBox="0 0 48 48" className="age-gate-logo" aria-hidden="true">
            <circle cx="24" cy="24" r="20" fill="#16B8A6" opacity="0.15" />
            <circle cx="24" cy="24" r="14" fill="#16B8A6" opacity="0.3" />
            <path d="M18 34V14h8v3h-5v5h3v3h-3v9h-3z" fill="#0D1726" />
            <circle cx="16" cy="16" r="2" fill="#FF6B7A" />
          </svg>
          <span className="age-gate-brand-text">OnlyNewGirls.com</span>
        </div>

        <h2 id="age-gate-heading" ref={headingRef} tabIndex={-1} className="age-gate-heading">
          Adults Only
        </h2>

        <p className="age-gate-description">
          OnlyNewGirls.com discusses career and collaboration opportunities that may involve explicit adult content. You must be at least 18 years old to enter.
        </p>

        <p className="age-gate-note">
          Selecting 'Enter' confirms only that you are at least 18. Formal identity and age verification is required separately before any production.
        </p>

        <div className="age-gate-actions">
          <button
            ref={enterRef}
            className="age-gate-button primary"
            onClick={handleEnter}
            type="button"
          >
            I am 18 or older — Enter
          </button>
          <button
            className="age-gate-button secondary"
            onClick={handleLeave}
            type="button"
          >
            I am under 18 — Leave
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AgeGate;