import React, { useState, useEffect } from 'react';
import AgeGate from './components/AgeGate';
import Header from './components/Header';
import Footer from './components/Footer';
import ApplicationForm from './components/ApplicationForm';
import {
  PrivacyModal,
  TermsModal,
  PerformerRemovalModal,
  DMCAModal,
  AgeConsentModal
} from './components/Modals';
import Icon from './components/Icon';
import './styles.css';

function App() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const confirmed = sessionStorage.getItem('ong-age-confirmed') === 'true';
    if (confirmed) {
      setAgeConfirmed(true);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('submitted') === 'true') {
      setSubmitted(true);
      history.replaceState(null, '', '/#apply');
    }
  }, []);

  const handleAgeConfirm = () => {
    setAgeConfirmed(true);
    const heading = document.querySelector('h1');
    if (heading) {
      heading.focus();
    }
  };

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  if (!ageConfirmed) {
    return (
      <>
        <div id="home" className="page-content" inert="true" aria-hidden="true">
          <Header isMobile={isMobile} />
          <main className="main-content">
            <section className="hero-section">
              {/* Content remains in DOM but inert */}
            </section>
          </main>
        </div>
        <AgeGate onConfirm={handleAgeConfirm} />
      </>
    );
  }

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      
      <Header isMobile={isMobile} />
      
      <main id="main" className="main-content" role="main">
        <section id="home" className="hero-section" aria-labelledby="hero-heading">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-content">
                <p className="hero-eyebrow">ADULT CREATOR CAREER &amp; COLLABORATION SERVICES · 18+ ONLY</p>
                <h1 id="hero-heading">Start your adult creator career with a plan—not a guess.</h1>
                <p className="hero-description">
                  OnlyNewGirls.com is not a site for browsing porn. It is a career, production, and collaboration service for adult women who want to create explicit content on their own terms.
                </p>
                <div className="hero-trust-chips">
                  <span className="trust-chip">18+ applicants only</span>
                  <span className="trust-chip">No application fee</span>
                  <span className="trust-chip">Written project terms</span>
                  <span className="trust-chip">Performer-defined boundaries</span>
                </div>
                <div className="hero-actions">
                  <a href="#apply" className="button primary">Start an Application</a>
                  <a href="#collabs" className="button secondary">Explore Collaborations</a>
                </div>
              </div>
              <div className="hero-dashboard" aria-hidden="true">
                <div className="dashboard-card">
                  <div className="dashboard-header">
                    <div className="dashboard-profile">
                      <div className="dashboard-avatar">
                        <svg viewBox="0 0 40 40" className="avatar-svg">
                          <circle cx="20" cy="20" r="18" fill="#16B8A6" opacity="0.2" />
                          <path d="M16 28V12h7v3h-4v5h3v3h-3v5h-3z" fill="#0D1726" />
                        </svg>
                      </div>
                      <div className="dashboard-name">
                        <span className="dashboard-title">Creator Dashboard</span>
                        <span className="dashboard-status">Portfolio in progress</span>
                      </div>
                    </div>
                    <div className="dashboard-badge">18+</div>
                  </div>
                  <div className="dashboard-stats">
                    <div className="stat-item">
                      <Icon name="check" className="stat-icon" />
                      <span className="stat-label">Boundaries set</span>
                    </div>
                    <div className="stat-item">
                      <Icon name="spark" className="stat-icon" />
                      <span className="stat-label">Brand direction</span>
                    </div>
                    <div className="stat-item">
                      <Icon name="ring" className="stat-icon" />
                      <span className="stat-label">Production ready</span>
                    </div>
                  </div>
                  <div className="dashboard-progress">
                    <div className="progress-item">
                      <span className="progress-label">Profile setup</span>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: '100%' }} /></div>
                    </div>
                    <div className="progress-item">
                      <span className="progress-label">Content plan</span>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: '60%' }} /></div>
                    </div>
                    <div className="progress-item">
                      <span className="progress-label">Production</span>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: '25%' }} /></div>
                    </div>
                  </div>
                  <div className="dashboard-messages">
                    <div className="message-bubble">Ready to discuss your goals</div>
                    <div className="message-bubble">Boundaries document ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="clarity" className="clarity-section" aria-labelledby="clarity-heading">
          <div className="container">
            <h2 id="clarity-heading" className="visually-hidden">Content Clarity</h2>
            <div className="clarity-card">
              <p className="clarity-title">Clear from the beginning</p>
              <p className="clarity-text">
                The opportunities discussed here are not limited to softcore content. Projects may involve fully explicit adult content. Nothing is assumed, no act is automatically required, and every project must remain within the performer's stated preferences and written boundaries.
              </p>
              <p className="clarity-note">
                Applying starts a conversation. It is not consent to perform, film, publish, or distribute anything.
              </p>
            </div>
          </div>
        </section>

        <section id="process" className="process-section" aria-labelledby="process-heading">
          <div className="container">
            <h2 id="process-heading">How It Works</h2>
            <div className="process-grid">
              <div className="process-step">
                <span className="step-number">1</span>
                <h3>Private inquiry</h3>
                <p>Tell us where you are in your creator career, what you are considering, and what you want help building.</p>
              </div>
              <div className="process-step">
                <span className="step-number">2</span>
                <h3>Goals and audience</h3>
                <p>Discuss your preferred platforms, target audience, brand direction, experience level, and the type of content you do or do not want to create.</p>
              </div>
              <div className="process-step">
                <span className="step-number">3</span>
                <h3>Boundaries first</h3>
                <p>Establish a detailed do-and-don't list, communication preferences, safety expectations, and non-negotiable limits.</p>
              </div>
              <div className="process-step">
                <span className="step-number">4</span>
                <h3>Written project terms</h3>
                <p>Before any production, document scope, acts, compensation or revenue sharing, ownership, licensing, distribution, editing, delivery, and removal terms.</p>
              </div>
              <div className="process-step">
                <span className="step-number">5</span>
                <h3>Production</h3>
                <p>Create planned content in a professional environment with the ability to pause or stop before or during production.</p>
              </div>
              <div className="process-step">
                <span className="step-number">6</span>
                <h3>Delivery and next steps</h3>
                <p>Receive the materials and rights specifically included in the written agreement, along with practical guidance for using the content in your creator business.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="benefits-section" aria-labelledby="benefits-heading">
          <div className="container">
            <h2 id="benefits-heading">What Performers Receive</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <Icon name="check" className="benefit-icon" />
                <h3>Extensive pre-production communication</h3>
              </div>
              <div className="benefit-card">
                <Icon name="check" className="benefit-icon" />
                <h3>Audience and brand-positioning guidance</h3>
              </div>
              <div className="benefit-card">
                <Icon name="check" className="benefit-icon" />
                <h3>A written do-and-don't list</h3>
              </div>
              <div className="benefit-card">
                <Icon name="check" className="benefit-icon" />
                <h3>Project-specific written agreements</h3>
              </div>
              <div className="benefit-card">
                <Icon name="check" className="benefit-icon" />
                <h3>Clearly negotiated revenue sharing or compensation</h3>
              </div>
              <div className="benefit-card">
                <Icon name="check" className="benefit-icon" />
                <h3>Professional content-production planning</h3>
              </div>
              <div className="benefit-card">
                <Icon name="check" className="benefit-icon" />
                <h3>Commercial-use options for selected material</h3>
              </div>
              <div className="benefit-card">
                <Icon name="check" className="benefit-icon" />
                <h3>Clear discussion of ownership and distribution</h3>
              </div>
              <div className="benefit-card">
                <Icon name="check" className="benefit-icon" />
                <h3>Practical advice for building creator channels</h3>
              </div>
              <div className="benefit-card">
                <Icon name="check" className="benefit-icon" />
                <h3>Professional treatment regardless of experience level</h3>
              </div>
            </div>
            <div className="benefits-qualification">
              <p>There is no fee to apply or participate. Individual project terms vary. Selection, production, publication, platform approval, audience growth, and earnings are not guaranteed.</p>
              <p className="benefits-negotiation">Negotiations may include any or all of the following: selected finished clips, copies of finished content, rights to post selected content on your own channels, raw footage, editing approvals, attribution, distribution rights, exclusivity limits, commercial-use licenses, and revenue sharing. Nothing is automatically included unless it appears in the written project agreement.</p>
            </div>
          </div>
        </section>

        <section id="consent" className="consent-section" aria-labelledby="consent-heading">
          <div className="container">
            <h2 id="consent-heading">Consent is a process, not a checkbox.</h2>
            <div className="consent-grid">
              <ul className="consent-list">
                <li>Consent to participate, consent to each act, and consent to distribute specific content are separate decisions.</li>
                <li>No act is assumed.</li>
                <li>No surprise acts.</li>
                <li>No pressure to expand boundaries.</li>
                <li>A performer may pause or stop before or during production.</li>
                <li>Everyone must be sober and personally able to consent.</li>
                <li>Valid government-issued identification is required before production.</li>
                <li>Do not submit identification through the application form.</li>
                <li>Written project agreements are required before production.</li>
                <li>Publication, licensing, and post-production use must match the written agreement and applicable law.</li>
                <li>No manager, partner, recruiter, or third party can consent for the performer.</li>
                <li>Questions about consent trigger an immediate review of affected content.</li>
              </ul>
            </div>
            <div className="consent-actions">
              <button onClick={() => openModal('performerRemoval')} className="button primary">
                Request Performer Content Removal
              </button>
              <button onClick={() => openModal('ageConsent')} className="button secondary">
                Age &amp; Consent Standards
              </button>
            </div>
          </div>
        </section>

        <section id="new-performers" className="new-performers-section" aria-labelledby="new-performers-heading">
          <div className="container">
            <h2 id="new-performers-heading">You do not need an existing audience to start professionally.</h2>
            <div className="new-performers-content">
              <ul>
                <li>New performers are welcome.</li>
                <li>Prior adult-content experience is not required.</li>
                <li>The service helps applicants think through brand direction, target audience, platform strategy, boundaries, and production goals.</li>
                <li>No adult woman should assume she is disqualified because of body size, shape, adult age, or inexperience.</li>
                <li>There is no upper age limit other than the requirement that every applicant be at least 18.</li>
                <li>All applicants are evaluated based on project fit, availability, legal eligibility, mutual comfort, and mutual consent.</li>
                <li>Referral-based growth makes respectful treatment and a positive experience commercially important to the company.</li>
              </ul>
              <p className="new-performers-note">Adult women of all body types, sizes, adult ages, and experience levels may apply. You must be at least 18 years old and located in the United States.</p>
            </div>
          </div>
        </section>

        <section id="collabs" className="collabs-section" aria-labelledby="collabs-heading">
          <div className="container">
            <h2 id="collabs-heading">Already creating? Build the collaboration you actually need.</h2>
            <p className="collabs-description">
              Adult female creators can request an adult male content collaborator for lawful, documented creator productions. Fit and dad-bod collaborator options may be available. Experience levels vary and must be disclosed before an agreement is made. Professional conduct is required from every participant.
            </p>
            <div className="collabs-details">
              <p>Each collaboration is negotiated individually, including:</p>
              <ul>
                <li>Planned content</li>
                <li>Boundaries</li>
                <li>Acts</li>
                <li>Compensation</li>
                <li>Revenue sharing</li>
                <li>Ownership</li>
                <li>Licensing</li>
                <li>Distribution</li>
                <li>Editing</li>
                <li>Attribution</li>
                <li>Content delivery</li>
                <li>Raw-footage availability</li>
                <li>Exclusivity</li>
                <li>Platform requirements</li>
                <li>Testing or project-specific safety expectations</li>
                <li>Travel and location</li>
                <li>Removal terms</li>
              </ul>
            </div>
            <div className="collabs-limitation">
              <p>OnlyNewGirls.com does not offer escorting, dates, private sexual services, off-camera sexual activity, or private access to talent.</p>
            </div>
            <div className="collabs-actions">
              <a href="#apply" className="button primary" onClick={() => {
                const select = document.querySelector('#field-applicantType');
                if (select) {
                  select.value = 'Established creator seeking a collaboration';
                  select.dispatchEvent(new Event('change'));
                }
              }}>
                Request a Collaboration
              </a>
              <a href="#apply" className="button secondary">Start an Application</a>
            </div>
          </div>
        </section>

        <section id="service-area" className="service-area-section" aria-labelledby="service-area-heading">
          <div className="container">
            <h2 id="service-area-heading">Service Area</h2>
            <p className="service-area-text">Currently operating primarily in North Carolina and South Carolina, with limited availability in Georgia and Virginia. Applicants from anywhere in the United States may apply.</p>
          </div>
        </section>

        <section id="faq" className="faq-section" aria-labelledby="faq-heading">
          <div className="container">
            <h2 id="faq-heading">Frequently Asked Questions</h2>
            <div className="faq-accordion">
              <details className="faq-item">
                <summary className="faq-question">Is OnlyNewGirls.com a porn site?</summary>
                <div className="faq-answer">It is not a site for browsing pornography; it is an adult creator career, production, audition, and collaboration service.</div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">Is the content explicit?</summary>
                <div className="faq-answer">Opportunities may involve fully explicit adult content rather than only softcore material, but no act is assumed and all boundaries must be established beforehand.</div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">Is the service really free for performers?</summary>
                <div className="faq-answer">There is no fee to apply or participate. Revenue sharing, compensation, expenses, ownership, licenses, distribution, and delivery terms vary and must be agreed in writing. Do not guarantee earnings.</div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">Do I need prior experience?</summary>
                <div className="faq-answer">No. New and established adult creators may apply.</div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">Is there an age, size, or body-type preference?</summary>
                <div className="faq-answer">All applicants must be 18 or older, there is no upper age limit, and adult women are not automatically excluded because of size, body type, adult age, or experience level.</div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">Do I have to upload a photo?</summary>
                <div className="faq-answer">No. The photo is optional. If submitted, it must be clothed, non-explicit, owned by the applicant or submitted with permission, and no larger than 10 MB.</div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">Will I be asked to upload my ID?</summary>
                <div className="faq-answer">Not through the public application. Valid identification is required through a separate process before production.</div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">Can established creators request a male collaborator?</summary>
                <div className="faq-answer">Yes. Fit or dad-bod options may be available. Experience and availability vary, and all terms are negotiated before production.</div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">Can I change my mind?</summary>
                <div className="faq-answer">A performer may pause or stop before or during production. Post-production publication, distribution, and removal are governed by written consent, the project agreement, and applicable law. See the Performer Content Removal process.</div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">Where do you currently operate?</summary>
                <div className="faq-answer">North Carolina and South Carolina primarily, with occasional Georgia and Virginia availability; U.S. applicants may apply.</div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">Are earnings guaranteed?</summary>
                <div className="faq-answer">No.</div>
              </details>
              <details className="faq-item">
                <summary className="faq-question">Is OnlyNewGirls.com affiliated with OnlyFans?</summary>
                <div className="faq-answer">No. OnlyNewGirls.com is an independent business and is not affiliated with, endorsed by, sponsored by, or operated by OnlyFans or any other subscription platform.</div>
              </details>
            </div>
          </div>
        </section>

        <ApplicationForm submitted={submitted} />
      </main>

      <Footer openModal={openModal} />

      <PrivacyModal isOpen={activeModal === 'privacy'} onClose={closeModal} />
      <TermsModal isOpen={activeModal === 'terms'} onClose={closeModal} />
      <PerformerRemovalModal isOpen={activeModal === 'performerRemoval'} onClose={closeModal} />
      <DMCAModal isOpen={activeModal === 'dmca'} onClose={closeModal} />
      <AgeConsentModal isOpen={activeModal === 'ageConsent'} onClose={closeModal} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {"@type": "Question", "name": "Is OnlyNewGirls.com a porn site?", "acceptedAnswer": {"@type": "Answer", "text": "It is not a site for browsing pornography; it is an adult creator career, production, audition, and collaboration service."}},
            {"@type": "Question", "name": "Is the content explicit?", "acceptedAnswer": {"@type": "Answer", "text": "Opportunities may involve fully explicit adult content rather than only softcore material, but no act is assumed and all boundaries must be established beforehand."}},
            {"@type": "Question", "name": "Is the service really free for performers?", "acceptedAnswer": {"@type": "Answer", "text": "There is no fee to apply or participate. Revenue sharing, compensation, expenses, ownership, licenses, distribution, and delivery terms vary and must be agreed in writing. Do not guarantee earnings."}},
            {"@type": "Question", "name": "Do I need prior experience?", "acceptedAnswer": {"@type": "Answer", "text": "No. New and established adult creators may apply."}},
            {"@type": "Question", "name": "Is there an age, size, or body-type preference?", "acceptedAnswer": {"@type": "Answer", "text": "All applicants must be 18 or older, there is no upper age limit, and adult women are not automatically excluded because of size, body type, adult age, or experience level."}},
            {"@type": "Question", "name": "Do I have to upload a photo?", "acceptedAnswer": {"@type": "Answer", "text": "No. The photo is optional. If submitted, it must be clothed, non-explicit, owned by the applicant or submitted with permission, and no larger than 10 MB."}},
            {"@type": "Question", "name": "Will I be asked to upload my ID?", "acceptedAnswer": {"@type": "Answer", "text": "Not through the public application. Valid identification is required through a separate process before production."}},
            {"@type": "Question", "name": "Can established creators request a male collaborator?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Fit or dad-bod options may be available. Experience and availability vary, and all terms are negotiated before production."}},
            {"@type": "Question", "name": "Can I change my mind?", "acceptedAnswer": {"@type": "Answer", "text": "A performer may pause or stop before or during production. Post-production publication, distribution, and removal are governed by written consent, the project agreement, and applicable law. See the Performer Content Removal process."}},
            {"@type": "Question", "name": "Where do you currently operate?", "acceptedAnswer": {"@type": "Answer", "text": "North Carolina and South Carolina primarily, with occasional Georgia and Virginia availability; U.S. applicants may apply."}},
            {"@type": "Question", "name": "Are earnings guaranteed?", "acceptedAnswer": {"@type": "Answer", "text": "No."}},
            {"@type": "Question", "name": "Is OnlyNewGirls.com affiliated with OnlyFans?", "acceptedAnswer": {"@type": "Answer", "text": "No. OnlyNewGirls.com is an independent business and is not affiliated with, endorsed by, sponsored by, or operated by OnlyFans or any other subscription platform."}}
          ]
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "OnlyNewGirls.com",
          "url": "https://onlynewgirls.com/",
          "email": "onlynewgirls@gmail.com",
          "description": "Adult creator career, production and collaboration services",
          "founder": {"@type": "Person", "name": "OnlyNewGirls.com"}
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "OnlyNewGirls.com",
          "url": "https://onlynewgirls.com/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://onlynewgirls.com/#apply",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Adult Creator Career and Collaboration Services",
          "provider": {"@type": "Organization", "name": "OnlyNewGirls.com"},
          "areaServed": [
            {"@type": "State", "name": "North Carolina"},
            {"@type": "State", "name": "South Carolina"},
            {"@type": "State", "name": "Georgia"},
            {"@type": "State", "name": "Virginia"}
          ],
          "serviceType": "Creator Career Services",
          "audience": {"@type": "Audience", "name": "Adult creators 18+"}
        })}
      </script>
    </>
  );
}

export default App;
