import React from 'react';
import Icon from './Icon';

const Footer = ({ openModal }) => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg viewBox="0 0 40 40" className="footer-logo-svg" aria-hidden="true">
                <circle cx="20" cy="20" r="16" fill="#16B8A6" opacity="0.15" />
                <path d="M14 30V10h7v3h-4v5h3v3h-3v9h-3z" fill="#0D1726" />
              </svg>
              <span className="footer-brand-name">OnlyNewGirls.com</span>
            </div>
            <p className="footer-description">Adult creator career and collaboration services</p>
            <p className="footer-age">18+ only</p>
            <p className="footer-location">North Carolina and South Carolina primary service area</p>
            <p className="footer-email">
              <Icon name="email" className="footer-email-icon" aria-hidden="true" />
              <a href="mailto:onlynewgirls@gmail.com">onlynewgirls@gmail.com</a>
            </p>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Quick Links</h3>
            <ul>
              <li><a href="#apply">Apply</a></li>
              <li><a href="mailto:onlynewgirls@gmail.com?subject=Submitting%20resume">Submit a Résumé</a></li>
              <li><button onClick={() => openModal('performerRemoval')} className="footer-link-button">Performer Content Removal</button></li>
              <li><button onClick={() => openModal('dmca')} className="footer-link-button">Copyright / DMCA Notice</button></li>
              <li><button onClick={() => openModal('privacy')} className="footer-link-button">Privacy Notice</button></li>
              <li><button onClick={() => openModal('terms')} className="footer-link-button">Website Terms</button></li>
              <li><a href="mailto:onlynewgirls@gmail.com">Email</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-disclaimer">
          <p>OnlyNewGirls.com is an independent business and is not affiliated with, endorsed by, sponsored by, or operated by OnlyFans or any other subscription platform.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;