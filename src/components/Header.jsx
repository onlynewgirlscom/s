import React from 'react';
import Icon from './Icon';

const Header = ({ isMobile }) => {
  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Process', id: 'process' },
    { name: 'Benefits', id: 'benefits' },
    { name: 'Consent', id: 'consent' },
    { name: 'Collabs', id: 'collabs' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Apply', id: 'apply' }
  ];

  const mobileItems = [
    { name: 'Home', id: 'home', icon: 'home' },
    { name: 'Process', id: 'process', icon: 'process' },
    { name: 'Collabs', id: 'collabs', icon: 'collabs' },
    { name: 'Apply', id: 'apply', icon: 'apply' }
  ];

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      history.pushState(null, '', `#${id}`);
    }
  };

  if (isMobile) {
    return (
      <nav className="mobile-nav" aria-label="Main navigation">
        {mobileItems.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className="mobile-nav-link"
          >
            <Icon name={item.icon} className="mobile-nav-icon" />
            <span className="mobile-nav-label">{item.name}</span>
          </a>
        ))}
      </nav>
    );
  }

  return (
    <header className="header" role="banner">
      <div className="header-brand">
        <a href="#home" onClick={(e) => handleClick(e, 'home')} className="header-logo-link">
          <svg viewBox="0 0 48 48" className="header-logo" aria-hidden="true">
            <circle cx="24" cy="24" r="20" fill="#16B8A6" opacity="0.1" />
            <circle cx="24" cy="24" r="14" fill="#16B8A6" opacity="0.2" />
            <path d="M18 34V14h8v3h-5v5h3v3h-3v9h-3z" fill="#0D1726" />
            <circle cx="16" cy="16" r="2" fill="#FF6B7A" />
          </svg>
          <span className="header-brand-name">OnlyNewGirls.com</span>
          <span className="header-age-badge">18+</span>
        </a>
      </div>

      <nav className="header-nav" aria-label="Main navigation">
        <ul className="nav-list">
          {navItems.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="nav-link"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;