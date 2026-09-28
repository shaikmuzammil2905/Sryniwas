import React, { useState } from 'react';
import { FORM_TYPES, FORM_LABELS, saveFormSubmission } from '../data/vastuPosters';
import './PosterRemedyForm.css';

// Reusable field components
const FormField = ({ label, id, required, children }) => (
  <div className="prf-field">
    <label htmlFor={id} className="prf-label">
      {label} {required && <span className="prf-required">*</span>}
    </label>
    {children}
  </div>
);

const TextInput = ({ id, type = 'text', placeholder, value, onChange, required }) => (
  <input
    id={id}
    type={type}
    className="prf-input"
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
    required={required}
    autoComplete="off"
  />
);

const SelectInput = ({ id, value, onChange, options, required }) => (
  <select
    id={id}
    className="prf-input prf-select"
    value={value}
    onChange={e => onChange(e.target.value)}
    required={required}
  >
    <option value="">Select...</option>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

const CheckboxGroup = ({ legend, options, selected, onChange }) => (
  <fieldset className="prf-checkbox-group">
    <legend className="prf-checkbox-legend">{legend}</legend>
    <div className="prf-checkbox-list">
      {options.map(opt => (
        <label key={opt.value} className="prf-checkbox-item">
          <input
            type="checkbox"
            value={opt.value}
            checked={selected.includes(opt.value)}
            onChange={e => {
              if (e.target.checked) {
                onChange([...selected, opt.value]);
              } else {
                onChange(selected.filter(v => v !== opt.value));
              }
            }}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

// ─── FORM: Mobile Number Numerology ─────────────────────────────────────────
const MobileNumerologyForm = ({ posterId, posterName, onSuccess }) => {
  const [form, setForm] = useState({
    firstName: '', middleName: '', lastName: '',
    mobileNumber: '', email: '', dob: '', birthPlace: '', gender: '',
    struggles: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      saveFormSubmission({ posterId, posterName, formType: FORM_TYPES.MOBILE_NUMEROLOGY, data: form });
      setSubmitting(false);
      onSuccess();
    }, 800);
  };

  return (
    <form className="prf-form" onSubmit={handleSubmit} noValidate>
      <div className="prf-form-grid">
        <FormField label="First Name" id="fn-first" required>
          <TextInput id="fn-first" placeholder="Enter first name" value={form.firstName} onChange={set('firstName')} required />
        </FormField>
        <FormField label="Middle Name" id="fn-mid">
          <TextInput id="fn-mid" placeholder="Enter middle name (optional)" value={form.middleName} onChange={set('middleName')} />
        </FormField>
        <FormField label="Last Name" id="fn-last" required>
          <TextInput id="fn-last" placeholder="Enter last name" value={form.lastName} onChange={set('lastName')} required />
        </FormField>
        <FormField label="Mobile Number" id="fn-mob" required>
          <TextInput id="fn-mob" type="tel" placeholder="10-digit mobile number" value={form.mobileNumber} onChange={set('mobileNumber')} required />
        </FormField>
        <FormField label="Email ID" id="fn-email" required>
          <TextInput id="fn-email" type="email" placeholder="Your email address" value={form.email} onChange={set('email')} required />
        </FormField>
        <FormField label="Date of Birth" id="fn-dob" required>
          <TextInput id="fn-dob" type="date" value={form.dob} onChange={set('dob')} required />
        </FormField>
        <FormField label="Birth Place" id="fn-bp" required>
          <TextInput id="fn-bp" placeholder="City / Town of birth" value={form.birthPlace} onChange={set('birthPlace')} required />
        </FormField>
        <FormField label="Gender" id="fn-gender" required>
          <SelectInput
            id="fn-gender"
            value={form.gender}
            onChange={set('gender')}
            required
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
        </FormField>
      </div>

      <CheckboxGroup
        legend="Area of Struggle"
        options={[
          { value: 'health', label: 'Health' },
          { value: 'relation', label: 'Relation' },
          { value: 'career', label: 'Career' },
          { value: 'money', label: 'Money' },
          { value: 'job', label: 'Job' },
        ]}
        selected={form.struggles}
        onChange={set('struggles')}
      />

      <button type="submit" className="prf-submit-btn" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Numerology Report Request'}
      </button>
    </form>
  );
};

// ─── FORM: Name Correction ───────────────────────────────────────────────────
const NameCorrectionForm = ({ posterId, posterName, onSuccess }) => {
  const [form, setForm] = useState({
    firstName: '', middleName: '', lastName: '',
    dob: '', gender: '', birthPlace: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      saveFormSubmission({ posterId, posterName, formType: FORM_TYPES.NAME_CORRECTION, data: form });
      setSubmitting(false);
      onSuccess();
    }, 800);
  };

  return (
    <form className="prf-form" onSubmit={handleSubmit} noValidate>
      <div className="prf-form-grid">
        <FormField label="First Name" id="nc-first" required>
          <TextInput id="nc-first" placeholder="Enter first name" value={form.firstName} onChange={set('firstName')} required />
        </FormField>
        <FormField label="Middle Name" id="nc-mid">
          <TextInput id="nc-mid" placeholder="Enter middle name (optional)" value={form.middleName} onChange={set('middleName')} />
        </FormField>
        <FormField label="Last Name" id="nc-last" required>
          <TextInput id="nc-last" placeholder="Enter last name" value={form.lastName} onChange={set('lastName')} required />
        </FormField>
        <FormField label="Date of Birth" id="nc-dob" required>
          <TextInput id="nc-dob" type="date" value={form.dob} onChange={set('dob')} required />
        </FormField>
        <FormField label="Gender" id="nc-gender" required>
          <SelectInput
            id="nc-gender"
            value={form.gender}
            onChange={set('gender')}
            required
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
        </FormField>
        <FormField label="Birth Place" id="nc-bp" required>
          <TextInput id="nc-bp" placeholder="City / Town of birth" value={form.birthPlace} onChange={set('birthPlace')} required />
        </FormField>
      </div>
      <button type="submit" className="prf-submit-btn" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Name Correction Request'}
      </button>
    </form>
  );
};

// ─── FORM: Yantra Software ───────────────────────────────────────────────────
const YantraSoftwareForm = ({ posterId, posterName, onSuccess }) => {
  const [form, setForm] = useState({ dob: '', gender: '', issues: [] });
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      saveFormSubmission({ posterId, posterName, formType: FORM_TYPES.YANTRA_SOFTWARE, data: form });
      setSubmitting(false);
      onSuccess();
    }, 800);
  };

  return (
    <form className="prf-form" onSubmit={handleSubmit} noValidate>
      <div className="prf-form-grid">
        <FormField label="Date of Birth" id="ys-dob" required>
          <TextInput id="ys-dob" type="date" value={form.dob} onChange={set('dob')} required />
        </FormField>
        <FormField label="Gender" id="ys-gender" required>
          <SelectInput
            id="ys-gender"
            value={form.gender}
            onChange={set('gender')}
            required
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
        </FormField>
      </div>

      <CheckboxGroup
        legend="Do you have any of these issues?"
        options={[
          { value: 'health', label: 'Health Issue' },
          { value: 'education', label: 'Education Issue' },
          { value: 'financial', label: 'Financial Issues' },
        ]}
        selected={form.issues}
        onChange={set('issues')}
      />

      <button type="submit" className="prf-submit-btn" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Yantra Software Request'}
      </button>
    </form>
  );
};

// ─── FORM: Numero Vastu ──────────────────────────────────────────────────────
const NumeroVastuForm = ({ posterId, posterName, onSuccess }) => {
  const [form, setForm] = useState({ name: '', dob: '', gender: '', areas: [] });
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      saveFormSubmission({ posterId, posterName, formType: FORM_TYPES.NUMERO_VASTU, data: form });
      setSubmitting(false);
      onSuccess();
    }, 800);
  };

  return (
    <form className="prf-form" onSubmit={handleSubmit} noValidate>
      <div className="prf-form-grid">
        <FormField label="Full Name" id="nv-name" required>
          <TextInput id="nv-name" placeholder="Enter your full name" value={form.name} onChange={set('name')} required />
        </FormField>
        <FormField label="Date of Birth" id="nv-dob" required>
          <TextInput id="nv-dob" type="date" value={form.dob} onChange={set('dob')} required />
        </FormField>
        <FormField label="Gender" id="nv-gender" required>
          <SelectInput
            id="nv-gender"
            value={form.gender}
            onChange={set('gender')}
            required
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
          />
        </FormField>
      </div>

      <CheckboxGroup
        legend="Select areas to energize"
        options={[
          { value: 'success', label: 'Success' },
          { value: 'health', label: 'Health' },
          { value: 'family', label: 'Family' },
          { value: 'personal-development', label: 'Personal Development' },
        ]}
        selected={form.areas}
        onChange={set('areas')}
      />

      <button type="submit" className="prf-submit-btn" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Numero Vastu Request'}
      </button>
    </form>
  );
};

// ─── SUCCESS MESSAGE ─────────────────────────────────────────────────────────
const FormSuccess = ({ formLabel }) => (
  <div className="prf-success">
    <div className="prf-success-icon">✓</div>
    <h4>Request Submitted!</h4>
    <p>Your <strong>{formLabel}</strong> request has been received. Our expert will contact you shortly.</p>
  </div>
);

// ─── Main PosterRemedyForm ────────────────────────────────────────────────────
const PosterRemedyForm = ({ poster }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!poster.formType || poster.formType === FORM_TYPES.NONE) return null;

  const formLabel = FORM_LABELS[poster.formType] || 'Remedy Form';

  return (
    <div className="prf-container">
      <div className="prf-header">
        <h3 className="prf-title">{formLabel}</h3>
        <p className="prf-subtitle">Fill in your details to receive a personalized report with this poster.</p>
      </div>

      {submitted ? (
        <FormSuccess formLabel={formLabel} />
      ) : (
        <>
          {poster.formType === FORM_TYPES.MOBILE_NUMEROLOGY && (
            <MobileNumerologyForm posterId={poster.id} posterName={poster.name} onSuccess={() => setSubmitted(true)} />
          )}
          {poster.formType === FORM_TYPES.NAME_CORRECTION && (
            <NameCorrectionForm posterId={poster.id} posterName={poster.name} onSuccess={() => setSubmitted(true)} />
          )}
          {poster.formType === FORM_TYPES.YANTRA_SOFTWARE && (
            <YantraSoftwareForm posterId={poster.id} posterName={poster.name} onSuccess={() => setSubmitted(true)} />
          )}
          {poster.formType === FORM_TYPES.NUMERO_VASTU && (
            <NumeroVastuForm posterId={poster.id} posterName={poster.name} onSuccess={() => setSubmitted(true)} />
          )}
        </>
      )}
    </div>
  );
};

export default PosterRemedyForm;
