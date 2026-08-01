import React, { useState, useEffect, useRef } from 'react';

const ApplicationForm = ({ submitted }) => {
  const [formData, setFormData] = useState({
    applicantType: '',
    name: '',
    age: '',
    email: '',
    phone: '',
    contactMethod: 'Email',
    city: '',
    state: '',
    socialLinks: '',
    careerStage: '',
    priorExperience: '',
    travelAvailability: '',
    collaborationPreference: '',
    careerGoals: '',
    boundaries: '',
    physicalDescription: '',
    attachment: null,
    confirmAge: false,
    confirmAccuracy: false,
    confirmNoGuarantee: false,
    confirmConsent: false,
    confirmContact: false,
    confirmLegal: false,
    confirmPhoto: false
  });

  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState('');
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const formRef = useRef(null);
  const successRef = useRef(null);

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
    'DC'
  ];

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.focus();
    }
  }, [submitted]);

  useEffect(() => {
    if (window.location.hash === '#apply') {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          setFileError('File exceeds 10 MB maximum size.');
          e.target.value = '';
          setFormData(prev => ({ ...prev, attachment: null }));
          return;
        }
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
          setFileError('Please upload a JPEG, PNG, or WebP image.');
          e.target.value = '';
          setFormData(prev => ({ ...prev, attachment: null }));
          return;
        }
        setFileError('');
        setFormData(prev => ({ ...prev, attachment: file }));
      }
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const validateField = (name, value) => {
    const requiredFields = [
      'applicantType', 'name', 'age', 'email', 'city', 'state',
      'careerStage', 'careerGoals'
    ];

    if (requiredFields.includes(name) && !value) {
      return `${name === 'careerGoals' ? 'Career goals' : name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    }

    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address.';
    }

    if (name === 'age' && value && parseInt(value) < 18) {
      return 'You must be at least 18 years old.';
    }

    if (name === 'age' && value && parseInt(value) > 120) {
      return 'Please enter a valid age.';
    }

    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'applicantType', 'name', 'age', 'email', 'city', 'state',
      'careerStage', 'careerGoals'
    ];

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (!formData.confirmAge) newErrors.confirmAge = 'You must confirm you are at least 18 years old.';
    if (!formData.confirmAccuracy) newErrors.confirmAccuracy = 'You must confirm your information is accurate.';
    if (!formData.confirmNoGuarantee) newErrors.confirmNoGuarantee = 'You must acknowledge that no guarantees are made.';
    if (!formData.confirmConsent) newErrors.confirmConsent = 'You must acknowledge the consent terms.';
    if (!formData.confirmContact) newErrors.confirmContact = 'You must agree to be contacted.';
    if (!formData.confirmLegal) newErrors.confirmLegal = 'You must confirm you are legally able to enter an agreement.';
    if (!formData.confirmPhoto) newErrors.confirmPhoto = 'You must confirm the photo policy.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (validateForm()) {
      e.target.submit();
    } else {
      const firstError = document.querySelector('[aria-invalid="true"]');
      if (firstError) {
        firstError.focus();
      }
    }
  };

  const renderField = (name, label, type = 'text', options = null, required = true) => {
    const hasError = errors[name] && (touched[name] || submitAttempted);
    const id = `field-${name}`;

    if (type === 'select') {
      return (
        <div className={`form-group ${hasError ? 'has-error' : ''}`}>
          <label htmlFor={id}>{label} {required && <span aria-hidden="true">*</span>}</label>
          <select
            id={id}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            required={required}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${id}-error` : undefined}
          >
            <option value="">Select...</option>
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {hasError && <div id={`${id}-error`} className="error-message" role="alert">{errors[name]}</div>}
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <div className={`form-group ${hasError ? 'has-error' : ''}`}>
          <label htmlFor={id}>{label} {required && <span aria-hidden="true">*</span>}</label>
          <textarea
            id={id}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            required={required}
            rows={4}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${id}-error` : undefined}
          />
          {hasError && <div id={`${id}-error`} className="error-message" role="alert">{errors[name]}</div>}
        </div>
      );
    }

    if (type === 'checkbox') {
      return (
        <div className={`form-group checkbox-group ${hasError ? 'has-error' : ''}`}>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name={name}
              checked={formData[name]}
              onChange={handleChange}
              required={required}
              aria-invalid={hasError ? 'true' : 'false'}
              aria-describedby={hasError ? `${id}-error` : undefined}
            />
            <span>{label} {required && <span aria-hidden="true">*</span>}</span>
          </label>
          {hasError && <div id={`${id}-error`} className="error-message" role="alert">{errors[name]}</div>}
        </div>
      );
    }

    if (type === 'file') {
      return (
        <div className={`form-group ${fileError || hasError ? 'has-error' : ''}`}>
          <label htmlFor={id}>{label}</label>
          <input
            id={id}
            type="file"
            name={name}
            accept="image/jpeg,image/png,image/webp"
            onChange={handleChange}
            aria-describedby={fileError || hasError ? `${id}-error` : undefined}
          />
          {(fileError || hasError) && <div id={`${id}-error`} className="error-message" role="alert">{fileError || errors[name]}</div>}
          <div className="helper-text">Optional. Clothed and non-explicit only. Do not upload identification, nude images, or sexually explicit media. Max 10 MB.</div>
        </div>
      );
    }

    return (
      <div className={`form-group ${hasError ? 'has-error' : ''}`}>
        <label htmlFor={id}>{label} {required && <span aria-hidden="true">*</span>}</label>
        <input
          id={id}
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          required={required}
          min={type === 'number' ? 18 : undefined}
          max={type === 'number' ? 120 : undefined}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${id}-error` : undefined}
          autoComplete={name === 'email' ? 'email' : name === 'name' ? 'name' : undefined}
        />
        {hasError && <div id={`${id}-error`} className="error-message" role="alert">{errors[name]}</div>}
      </div>
    );
  };

  return (
    <section id="apply" className="application-section" aria-labelledby="application-heading">
      <div className="container">
        <h2 id="application-heading">Tell us what you want to build.</h2>
        <p className="application-intro">
          Applying begins a conversation. It is not consent to perform, record, publish, or distribute content.
        </p>

        {submitted && (
          <div className="success-message" ref={successRef} tabIndex={-1} role="status" aria-live="polite">
            <svg viewBox="0 0 24 24" className="success-icon" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <span>Application sent. Check your email for any follow-up from OnlyNewGirls.com.</span>
          </div>
        )}

        <form
          ref={formRef}
          action="https://formsubmit.co/onlynewgirls@gmail.com"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          noValidate
        >
          <input type="hidden" name="_subject" value="New OnlyNewGirls.com Application" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="https://onlynewgirls.com/?submitted=true#apply" />
          
          <div className="honeypot" aria-hidden="true">
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
          </div>

          <fieldset>
            <legend className="visually-hidden">Application Information</legend>

            <div className="form-row">
              <div className="form-col">
                {renderField('applicantType', 'Applicant Type', 'select', [
                  'New or aspiring adult creator',
                  'Existing creator seeking production support',
                  'Established creator seeking a collaboration',
                  'Returning performer',
                  'Other creator-related inquiry'
                ])}
              </div>
              <div className="form-col">
                {renderField('name', 'Legal or preferred name')}
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                {renderField('age', 'Age', 'number')}
              </div>
              <div className="form-col">
                {renderField('email', 'Email', 'email')}
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                {renderField('phone', 'Phone', 'tel', null, false)}
              </div>
              <div className="form-col">
                {renderField('contactMethod', 'Preferred contact method', 'select', [
                  'Email',
                  'Text message',
                  'Phone call'
                ])}
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                {renderField('city', 'City')}
              </div>
              <div className="form-col">
                {renderField('state', 'State', 'select', states)}
              </div>
            </div>

            <div className="form-row">
              <div className="form-col full">
                {renderField('socialLinks', 'Social or creator-profile links', 'textarea', null, false)}
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                {renderField('careerStage', 'Career stage', 'select', [
                  'Exploring the industry',
                  'Brand new',
                  'Have created some content',
                  'Established creator',
                  'Returning after a break'
                ])}
              </div>
              <div className="form-col">
                {renderField('priorExperience', 'Prior adult-content experience', 'select', [
                  'None',
                  'Limited',
                  'Some experience',
                  'Experienced',
                  'Prefer to discuss privately'
                ], false)}
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                {renderField('travelAvailability', 'Travel availability', 'select', [
                  'Local only',
                  'Can travel within my state',
                  'Can travel regionally',
                  'Can travel nationally',
                  'Unsure or depends on the project'
                ], false)}
              </div>
              <div className="form-col">
                {renderField('collaborationPreference', 'Collaboration preference', 'select', [
                  'Not applying for a collaboration',
                  'No preference',
                  'Fit male collaborator',
                  'Dad-bod male collaborator',
                  'Open to discussing options'
                ], false)}
              </div>
            </div>

            <div className="form-row">
              <div className="form-col full">
                {renderField('careerGoals', 'Where are you in your creator career, and what are you looking for?', 'textarea')}
              </div>
            </div>

            <div className="form-row">
              <div className="form-col full">
                <div className={`form-group ${errors.boundaries && (touched.boundaries || submitAttempted) ? 'has-error' : ''}`}>
                  <label htmlFor="field-boundaries">What types of content, support, or collaboration are you interested in—and what should we know about your boundaries?</label>
                  <textarea
                    id="field-boundaries"
                    name="boundaries"
                    value={formData.boundaries}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                  />
                  <div className="helper-text">Detailed sexual preferences do not need to be submitted through the public form.</div>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col full">
                <div className={`form-group ${errors.physicalDescription && (touched.physicalDescription || submitAttempted) ? 'has-error' : ''}`}>
                  <label htmlFor="field-physicalDescription">Optional physical description or measurements</label>
                  <textarea
                    id="field-physicalDescription"
                    name="physicalDescription"
                    value={formData.physicalDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={3}
                    placeholder="Share only what you are comfortable sharing, such as height, general build, clothing size, weight, or cup size. This information is optional."
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-col full">
                {renderField('attachment', 'Optional recent photo', 'file', null, false)}
              </div>
            </div>
          </fieldset>

          <fieldset className="checkbox-fieldset">
            <legend>Confirmations</legend>
            {renderField('confirmAge', 'I confirm that I am at least 18 years old.', 'checkbox')}
            {renderField('confirmAccuracy', 'I confirm that the information I submitted is accurate to the best of my knowledge.', 'checkbox')}
            {renderField('confirmNoGuarantee', 'I understand that submitting this application does not guarantee selection, employment, contractor work, collaboration, content production, publication, platform growth, or earnings.', 'checkbox')}
            {renderField('confirmConsent', 'I understand that no content may be created or distributed without separate project-specific written agreements and informed consent.', 'checkbox')}
            {renderField('confirmContact', 'I agree that OnlyNewGirls.com may contact me about this application.', 'checkbox')}
            {renderField('confirmLegal', 'I confirm that I am legally able to enter an agreement in the United States.', 'checkbox')}
            {renderField('confirmPhoto', 'I understand that any uploaded photo must be clothed and non-explicit and that I must own it or have permission to submit it.', 'checkbox')}
          </fieldset>

          <div className="form-actions">
            <button type="submit" className="submit-button">Submit Application</button>
          </div>

          <div className="form-note">
            Your application is sent through FormSubmit to onlynewgirls@gmail.com. Do not submit government identification, nude images, explicit media, Social Security numbers, banking information, or other highly sensitive records.
          </div>

          <div className="form-fallback">
            Having trouble with the form?{' '}
            <a href="mailto:onlynewgirls@gmail.com?subject=OnlyNewGirls.com%20Application%20Question">
              Email us directly
            </a>
            .
          </div>
        </form>
      </div>
    </section>
  );
};

export default ApplicationForm;