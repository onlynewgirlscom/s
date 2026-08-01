import React from 'react';

export const Icon = ({ name, className, ...props }) => {
  const icons = {
    home: (
      <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10l-9-9-9 9z" />
    ),
    process: (
      <path d="M4 4v16h16M4 20l6-6 4 4 8-8" />
    ),
    benefits: (
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    ),
    consent: (
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    collabs: (
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
    faq: (
      <path d="M8 10h8M8 14h6m-7-8h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2z" />
    ),
    apply: (
      <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    ),
    email: (
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
    close: (
      <path d="M6 18L18 6M6 6l12 12" />
    ),
    arrow: (
      <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    ),
    check: (
      <path d="M5 13l4 4L19 7" />
    ),
    spark: (
      <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z M8 22l1-4 4-1-4-1-1-4-1 4-4 1 4 1 1 4z" />
    ),
    ring: (
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
    ),
    nMark: (
      <path d="M8 20V4h8v3H11v4h4v3h-4v6H8z" />
    )
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {icons[name] || <circle cx="12" cy="12" r="10" />}
    </svg>
  );
};

export default Icon;