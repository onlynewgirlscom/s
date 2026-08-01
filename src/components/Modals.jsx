import React, { useEffect, useRef } from 'react';
import Icon from './Icon';

const Modal = ({ isOpen, onClose, title, children }) => {
  const dialogRef = useRef(null);
  const headingRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const dialog = dialogRef.current;
      if (dialog) {
        dialog.showModal();
        headingRef.current?.focus();
        document.body.style.overflow = 'hidden';
      }

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      dialog?.addEventListener('keydown', handleKeyDown);

      return () => {
        dialog?.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      const dialog = dialogRef.current;
      if (dialog) {
        dialog.close();
        document.body.style.overflow = '';
      }
    }
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal-dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      onCancel={onClose}
    >
      <div className="modal-content" role="document">
        <header className="modal-header">
          <h2 id="modal-heading" ref={headingRef} tabIndex={-1}>{title}</h2>
          <button
            ref={closeRef}
            onClick={onClose}
            className="modal-close"
            aria-label="Close dialog"
          >
            <Icon name="close" />
          </button>
        </header>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </dialog>
  );
};

export const PrivacyModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Privacy Notice">
    <p><strong>Last updated:</strong> August 1, 2026</p>
    
    <h3>Information Collection</h3>
    <p>The site collects information voluntarily submitted through the application form. This may include name, age, email, phone, city, state, social links, career information, optional measurements, optional photo, travel availability, and application responses.</p>
    
    <h3>Use of Information</h3>
    <p>The information is used to evaluate inquiries, communicate about potential opportunities, maintain business records, resolve disputes, prevent abuse, and meet legal obligations.</p>
    
    <h3>Third-Party Processing</h3>
    <p>Form submissions are transmitted through <a href="https://formsubmit.co/privacy" target="_blank" rel="noopener noreferrer">FormSubmit</a> and delivered by email. FormSubmit is an independent third-party service. Applicants should review FormSubmit's privacy terms before submission.</p>
    
    <h3>Data Sharing</h3>
    <p>OnlyNewGirls.com does not sell application information. Information may be shared with service providers necessary to operate the application process, professional advisers, or authorities when legally required.</p>
    
    <h3>Data Retention</h3>
    <p>Application information is retained only as long as reasonably necessary for evaluation, communication, recordkeeping, dispute handling, safety, and legal compliance.</p>
    
    <h3>Your Rights</h3>
    <p>Applicants may request access, correction, or deletion by emailing <a href="mailto:onlynewgirls@gmail.com">onlynewgirls@gmail.com</a>, subject to legal and recordkeeping obligations.</p>
    
    <h3>Important Restrictions</h3>
    <ul>
      <li>Government identification must not be sent through the public form.</li>
      <li>The optional photo must not contain explicit material.</li>
    </ul>
    
    <h3>Technical Privacy</h3>
    <p>The site uses sessionStorage only to remember the visitor's age-gate choice during the current browser session. The site contains no advertising pixels, behavioral analytics, tracking cookies, or third-party fonts at launch.</p>
    
    <h3>Security Note</h3>
    <p>Internet transmission cannot be guaranteed to be perfectly secure.</p>
  </Modal>
);

export const TermsModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Website Terms">
    <p><strong>Age Restriction</strong></p>
    <p>Site intended only for adults 18 or older.</p>
    
    <p><strong>Purpose</strong></p>
    <p>Informational and application purposes. No offer of employment. No guarantee of selection, work, production, publication, compensation, revenue, earnings, or platform growth.</p>
    
    <p><strong>Creator Guidance Disclaimer</strong></p>
    <p>Creator guidance is not legal, tax, medical, financial, or investment advice.</p>
    
    <p><strong>Content Restrictions</strong></p>
    <ul>
      <li>No unlawful content may be submitted.</li>
      <li>No explicit media may be uploaded.</li>
      <li>Applicant must own or have permission to submit uploaded material.</li>
      <li>No impersonation.</li>
      <li>No third party may apply or consent for another performer.</li>
    </ul>
    
    <p><strong>Services Offered</strong></p>
    <p>No escorting, private dates, prostitution, off-camera sexual services, or access to talent is offered.</p>
    
    <p><strong>Project Requirements</strong></p>
    <p>Actual projects require separate written agreements. Website terms do not replace a production agreement, release, consent form, contractor agreement, or performer agreement.</p>
    
    <p><strong>Discretion</strong></p>
    <p>OnlyNewGirls.com may decline an inquiry for project fit, availability, safety, legal, logistical, or business reasons.</p>
    
    <p><strong>Governing Law</strong></p>
    <p>North Carolina law governs the website terms to the extent legally permitted.</p>
    
    <p><strong>Contact</strong></p>
    <p><a href="mailto:onlynewgirls@gmail.com">onlynewgirls@gmail.com</a></p>
    
    <p><strong>Affiliation</strong></p>
    <p>The site is independent and not affiliated with OnlyFans or another subscription platform.</p>
  </Modal>
);

export const PerformerRemovalModal = ({ isOpen, onClose }) => {
  const mailtoBody = encodeURIComponent(
    'Legal or stage name:\n' +
    'Preferred contact information:\n' +
    'URL or description of the content:\n' +
    'I am the person depicted or am legally authorized to act for that person:\n' +
    'Requested action:\n' +
    'Additional information:'
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Performer Content Removal Requests">
      <p>If you appear in content published or distributed by OnlyNewGirls.com and want it removed, email <a href="mailto:onlynewgirls@gmail.com">onlynewgirls@gmail.com</a> with the subject line "Performer Content Removal Request."</p>
      
      <p>Include your legal or stage name, a reliable way to contact you, the exact URL or URLs involved or a clear description of the content, and a statement confirming that you are the person depicted or are legally authorized to act for that person.</p>
      
      <p>Do not attach explicit media or government identification unless OnlyNewGirls.com later requests information through a secure verification process.</p>
      
      <p>OnlyNewGirls.com will temporarily disable affected content whenever a legitimate question concerning performer consent arises. Content published or distributed by OnlyNewGirls.com will be removed within 72 hours after receiving a performer removal request. OnlyNewGirls.com will also take reasonable steps within systems it controls to prevent the removed content, or an altered version of it, from being republished.</p>
      
      <div className="modal-actions">
        <a
          href={`mailto:onlynewgirls@gmail.com?subject=Performer%20Content%20Removal%20Request&body=${mailtoBody}`}
          className="modal-button primary"
        >
          Email Removal Request
        </a>
      </div>
    </Modal>
  );
};

export const DMCAModal = ({ isOpen, onClose }) => {
  const mailtoBody = encodeURIComponent(
    'Full legal name:\n' +
    'Company or organization, if applicable:\n' +
    'Email address:\n' +
    'Phone number:\n' +
    'Identification of the copyrighted work:\n' +
    'Exact URL or location of the disputed material:\n' +
    'Good-faith statement:\n' +
    'Statement that the information is accurate and that I am the copyright owner or authorized to act for the owner, under penalty of perjury:\n' +
    'Electronic signature:'
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Copyright / DMCA Notice">
      <p>Copyright owners or authorized agents may email a copyright complaint.</p>
      
      <p>Knowingly material misrepresentations in a DMCA claim may carry legal consequences.</p>
      
      <p>Copyright claims and performer-consent removal requests are separate processes. A performer requesting removal of content depicting that performer should use the Performer Content Removal process.</p>
      
      <div className="modal-actions">
        <a
          href={`mailto:onlynewgirls@gmail.com?subject=DMCA%20Claim%20or%20Content%20Removal%20Request&body=${mailtoBody}`}
          className="modal-button primary"
        >
          Email DMCA Claim
        </a>
      </div>
    </Modal>
  );
};

export const AgeConsentModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Age & Consent Standards">
    <p>OnlyNewGirls.com requires adult identity and age verification before production and requires project-specific written documentation of boundaries, participation, distribution, compensation, and usage rights.</p>
    
    <p>Do not send government identification through the public application form.</p>
    
    <p>Qualifying productions must be handled under applicable federal and state identity, recordkeeping, consent, and disclosure requirements.</p>
  </Modal>
);