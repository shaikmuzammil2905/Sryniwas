import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Plus, Edit2, Trash2, Eye, EyeOff,
  GripVertical, Save, X, Upload, RotateCcw,
  ChevronUp, ChevronDown, Users
} from 'lucide-react';
import {
  getVastuPosters,
  saveVastuPoster,
  deleteVastuPoster,
  resetVastuPostersToDefaults,
  generatePosterId,
  FORM_TYPES,
  FORM_LABELS,
  getFormSubmissions,
} from '../data/vastuPosters';
import './VastuPostersAdmin.css';

const ADMIN_PASSWORD = 'vastuadmin123'; // Simple local admin password

// ─── Form Modal ───────────────────────────────────────────────────────────────
const PosterFormModal = ({ poster, onSave, onClose }) => {
  const isNew = !poster?.id;
  const [form, setForm] = useState({
    id: poster?.id || generatePosterId(),
    slug: poster?.slug || '',
    name: poster?.name || '',
    location: poster?.location || '',
    description: poster?.description || '',
    price: poster?.price || 199,
    image: poster?.image || '',
    formType: poster?.formType || FORM_TYPES.NONE,
    displayOrder: poster?.displayOrder || 99,
    isActive: poster?.isActive !== undefined ? poster.isActive : true,
    productType: 'VASTU_POSTER',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(poster?.image || '');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key) => (val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const autoSlug = (name) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (val) => {
    set('name')(val);
    if (isNew) {
      set('slug')(autoSlug(val));
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setImagePreview(dataUrl);
      set('image')(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    set('image')('');
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.slug.trim()) e.slug = 'Slug is required';
    if (!form.location.trim()) e.location = 'Location is required';
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.price || form.price <= 0) e.price = 'Valid price is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      onSave(form);
      setSaving(false);
    }, 300);
  };

  return (
    <div className="vpa-modal-overlay" onClick={onClose}>
      <div className="vpa-modal" onClick={e => e.stopPropagation()}>
        <div className="vpa-modal__header">
          <h2>{isNew ? 'Add New Poster' : 'Edit Poster'}</h2>
          <button type="button" className="vpa-modal__close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="vpa-modal__body">
          {/* Image Section */}
          <div className="vpa-field vpa-field--full">
            <label className="vpa-label">Poster Image</label>
            <p className="vpa-help">Upload the poster image for this product. Accepts JPG, PNG.</p>

            <div className="vpa-image-zone">
              {imagePreview ? (
                <div className="vpa-image-preview">
                  <img src={imagePreview} alt="Poster preview" className="vpa-preview-img" />
                  <div className="vpa-image-actions">
                    <label className="vpa-img-action-btn vpa-img-action-btn--replace">
                      <Upload size={13} /> Replace Image
                      <input type="file" accept="image/*" onChange={handleImageFileChange} hidden />
                    </label>
                    <button type="button" className="vpa-img-action-btn vpa-img-action-btn--remove" onClick={removeImage}>
                      <X size={13} /> Remove Image
                    </button>
                  </div>
                </div>
              ) : (
                <label className="vpa-image-upload-zone">
                  <Upload size={24} />
                  <span>Upload New Image</span>
                  <span className="vpa-upload-hint">JPG, PNG — max 10MB</span>
                  <input type="file" accept="image/*" onChange={handleImageFileChange} hidden />
                </label>
              )}
            </div>

            {/* Also allow URL input */}
            <div className="vpa-url-input-row">
              <input
                type="text"
                className="vpa-input"
                placeholder="Or paste image URL: /images/vastu-posters/my-poster.png"
                value={imageFile ? '' : form.image}
                onChange={e => { set('image')(e.target.value); setImagePreview(e.target.value); setImageFile(null); }}
              />
            </div>
          </div>

          <div className="vpa-form-grid">
            {/* Name */}
            <div className="vpa-field">
              <label className="vpa-label">Poster Name <span className="vpa-req">*</span></label>
              <input
                type="text"
                className={`vpa-input ${errors.name ? 'vpa-input--error' : ''}`}
                value={form.name}
                onChange={e => handleNameChange(e.target.value)}
                placeholder="e.g. Angel Numbers"
              />
              {errors.name && <span className="vpa-error">{errors.name}</span>}
            </div>

            {/* Slug */}
            <div className="vpa-field">
              <label className="vpa-label">URL Slug <span className="vpa-req">*</span></label>
              <input
                type="text"
                className={`vpa-input ${errors.slug ? 'vpa-input--error' : ''}`}
                value={form.slug}
                onChange={e => set('slug')(autoSlug(e.target.value))}
                placeholder="e.g. angel-numbers"
              />
              <span className="vpa-help">URL: /vastu-posters/{form.slug || 'slug'}</span>
              {errors.slug && <span className="vpa-error">{errors.slug}</span>}
            </div>

            {/* Price */}
            <div className="vpa-field">
              <label className="vpa-label">Price (₹) <span className="vpa-req">*</span></label>
              <input
                type="number"
                className={`vpa-input ${errors.price ? 'vpa-input--error' : ''}`}
                value={form.price}
                onChange={e => set('price')(Number(e.target.value))}
                min="1"
                placeholder="199"
              />
              {errors.price && <span className="vpa-error">{errors.price}</span>}
            </div>

            {/* Display Order */}
            <div className="vpa-field">
              <label className="vpa-label">Display Order</label>
              <input
                type="number"
                className="vpa-input"
                value={form.displayOrder}
                onChange={e => set('displayOrder')(Number(e.target.value))}
                min="1"
                placeholder="1"
              />
            </div>

            {/* Location */}
            <div className="vpa-field vpa-field--full">
              <label className="vpa-label">Vastu Placement Location <span className="vpa-req">*</span></label>
              <input
                type="text"
                className={`vpa-input ${errors.location ? 'vpa-input--error' : ''}`}
                value={form.location}
                onChange={e => set('location')(e.target.value)}
                placeholder="e.g. North Center, Bedroom or Hall"
              />
              {errors.location && <span className="vpa-error">{errors.location}</span>}
            </div>

            {/* Description */}
            <div className="vpa-field vpa-field--full">
              <label className="vpa-label">Description <span className="vpa-req">*</span></label>
              <textarea
                className={`vpa-input vpa-textarea ${errors.description ? 'vpa-input--error' : ''}`}
                value={form.description}
                onChange={e => set('description')(e.target.value)}
                rows={3}
                placeholder="Short description for the poster..."
              />
              {errors.description && <span className="vpa-error">{errors.description}</span>}
            </div>

            {/* Form Type */}
            <div className="vpa-field">
              <label className="vpa-label">Associated Remedy Form</label>
              <select
                className="vpa-input vpa-select"
                value={form.formType}
                onChange={e => set('formType')(e.target.value)}
              >
                {Object.entries(FORM_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>

            {/* Active Status */}
            <div className="vpa-field">
              <label className="vpa-label">Status</label>
              <select
                className="vpa-input vpa-select"
                value={form.isActive ? 'active' : 'inactive'}
                onChange={e => set('isActive')(e.target.value === 'active')}
              >
                <option value="active">Active (Visible on site)</option>
                <option value="inactive">Inactive (Hidden from site)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="vpa-modal__footer">
          <button type="button" className="vpa-btn vpa-btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="vpa-btn vpa-btn--primary" onClick={handleSave} disabled={saving}>
            <Save size={15} />
            {saving ? 'Saving...' : (isNew ? 'Add Poster' : 'Save Changes')}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Delete Confirm ───────────────────────────────────────────────────────────
const DeleteConfirm = ({ poster, onConfirm, onCancel }) => (
  <div className="vpa-modal-overlay" onClick={onCancel}>
    <div className="vpa-confirm-modal" onClick={e => e.stopPropagation()}>
      <div className="vpa-confirm-icon">🗑️</div>
      <h3>Delete Poster?</h3>
      <p>Are you sure you want to delete <strong>"{poster.name}"</strong>? This cannot be undone.</p>
      <div className="vpa-confirm-actions">
        <button type="button" className="vpa-btn vpa-btn--ghost" onClick={onCancel}>Cancel</button>
        <button type="button" className="vpa-btn vpa-btn--danger" onClick={() => onConfirm(poster.id)}>Delete</button>
      </div>
    </div>
  </div>
);

// ─── Submissions View ─────────────────────────────────────────────────────────
const SubmissionsView = ({ onClose }) => {
  const submissions = getFormSubmissions();
  return (
    <div className="vpa-modal-overlay" onClick={onClose}>
      <div className="vpa-modal vpa-modal--wide" onClick={e => e.stopPropagation()}>
        <div className="vpa-modal__header">
          <h2>Form Submissions ({submissions.length})</h2>
          <button type="button" className="vpa-modal__close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="vpa-modal__body">
          {submissions.length === 0 ? (
            <p className="vpa-empty-msg">No form submissions yet.</p>
          ) : (
            <div className="vpa-submissions-list">
              {submissions.map(sub => (
                <div key={sub.id} className="vpa-submission-item">
                  <div className="vpa-sub-header">
                    <span className="vpa-sub-poster">{sub.posterName}</span>
                    <span className="vpa-sub-type">{FORM_LABELS[sub.formType] || sub.formType}</span>
                    <span className="vpa-sub-date">{new Date(sub.createdAt).toLocaleString('en-IN')}</span>
                  </div>
                  <pre className="vpa-sub-data">{JSON.stringify(sub.data, null, 2)}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
const VastuPostersAdmin = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('vpAdminAuthed') === 'true');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [posters, setPosters] = useState([]);
  const [editModal, setEditModal] = useState(null); // null | poster object | 'new'
  const [deleteModal, setDeleteModal] = useState(null);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  useEffect(() => {
    if (authed) {
      setPosters(getVastuPosters().sort((a, b) => a.displayOrder - b.displayOrder));
    }
  }, [authed]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('vpAdminAuthed', 'true');
      setAuthed(true);
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  const handleSavePoster = (poster) => {
    const updated = saveVastuPoster(poster);
    setPosters(updated.sort((a, b) => a.displayOrder - b.displayOrder));
    setEditModal(null);
  };

  const handleDelete = (id) => {
    const updated = deleteVastuPoster(id);
    setPosters(updated.sort((a, b) => a.displayOrder - b.displayOrder));
    setDeleteModal(null);
  };

  const handleToggleActive = (poster) => {
    const updated = saveVastuPoster({ ...poster, isActive: !poster.isActive });
    setPosters(updated.sort((a, b) => a.displayOrder - b.displayOrder));
  };

  const handleMoveOrder = (posterId, direction) => {
    const idx = posters.findIndex(p => p.id === posterId);
    if ((direction === -1 && idx === 0) || (direction === 1 && idx === posters.length - 1)) return;
    const newPosters = [...posters];
    const swapIdx = idx + direction;
    const tempOrder = newPosters[idx].displayOrder;
    newPosters[idx] = { ...newPosters[idx], displayOrder: newPosters[swapIdx].displayOrder };
    newPosters[swapIdx] = { ...newPosters[swapIdx], displayOrder: tempOrder };
    newPosters.sort((a, b) => a.displayOrder - b.displayOrder);
    newPosters.forEach(p => saveVastuPoster(p));
    setPosters(newPosters);
  };

  const handleReset = () => {
    const defaults = resetVastuPostersToDefaults();
    setPosters(defaults.sort((a, b) => a.displayOrder - b.displayOrder));
    setResetConfirm(false);
  };

  // Login Screen
  if (!authed) {
    return (
      <div className="page-wrapper vpa-login-page">
        <div className="vpa-login-card animate-fade-up">
          <div className="vpa-login-logo">🗃️</div>
          <h2>Admin — Vastu Posters</h2>
          <p>Enter the admin password to manage Vastu Posters.</p>
          <form onSubmit={handleLogin} className="vpa-login-form">
            <input
              type="password"
              className="vpa-input"
              placeholder="Admin Password"
              value={password}
              onChange={e => { setPassword(e.target.value); setAuthError(''); }}
              autoFocus
            />
            {authError && <span className="vpa-error">{authError}</span>}
            <button type="submit" className="vpa-btn vpa-btn--primary" style={{ width: '100%' }}>
              Login
            </button>
          </form>
          <Link to="/vastu-posters" className="vpa-back-link">
            <ArrowLeft size={14} /> Back to Vastu Posters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper vpa-page">
      {/* Header */}
      <div className="vpa-page-header">
        <div className="container vpa-page-header__inner">
          <div className="vpa-page-header__left">
            <Link to="/vastu-posters" className="vpa-back-link">
              <ArrowLeft size={16} /> Back to Site
            </Link>
            <div>
              <h1 className="vpa-page-title">Vastu Posters Admin</h1>
              <p className="vpa-page-subtitle">{posters.length} posters • {posters.filter(p => p.isActive).length} active</p>
            </div>
          </div>
          <div className="vpa-page-header__right">
            <button
              type="button"
              className="vpa-btn vpa-btn--ghost"
              onClick={() => setShowSubmissions(true)}
            >
              <Users size={15} /> Form Submissions
            </button>
            <button
              type="button"
              className="vpa-btn vpa-btn--ghost"
              onClick={() => setResetConfirm(true)}
            >
              <RotateCcw size={15} /> Reset to Defaults
            </button>
            <button
              type="button"
              className="vpa-btn vpa-btn--primary"
              onClick={() => setEditModal({ isNew: true })}
            >
              <Plus size={15} /> Add Poster
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container vpa-table-wrap">
        <div className="vpa-table-scroll">
          <table className="vpa-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Location</th>
                <th>Form</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posters.map((poster, idx) => (
                <tr key={poster.id} className={!poster.isActive ? 'vpa-row--inactive' : ''}>
                  <td className="vpa-td--order">
                    <div className="vpa-order-controls">
                      <button
                        type="button"
                        className="vpa-order-btn"
                        onClick={() => handleMoveOrder(poster.id, -1)}
                        disabled={idx === 0}
                        title="Move up"
                      >
                        <ChevronUp size={14} />
                      </button>
                      <span>{poster.displayOrder}</span>
                      <button
                        type="button"
                        className="vpa-order-btn"
                        onClick={() => handleMoveOrder(poster.id, 1)}
                        disabled={idx === posters.length - 1}
                        title="Move down"
                      >
                        <ChevronDown size={14} />
                      </button>
                    </div>
                  </td>

                  <td className="vpa-td--image">
                    {poster.image ? (
                      <img
                        src={poster.image}
                        alt={poster.name}
                        className="vpa-thumb"
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="vpa-thumb-placeholder">🖼️</div>
                    )}
                  </td>

                  <td className="vpa-td--name">
                    <div className="vpa-name-cell">
                      <strong>{poster.name}</strong>
                      <span className="vpa-slug-hint">/vastu-posters/{poster.slug}</span>
                    </div>
                  </td>

                  <td className="vpa-td--price">
                    <strong>₹{poster.price.toLocaleString('en-IN')}</strong>
                  </td>

                  <td className="vpa-td--location">
                    <span className="vpa-location-text">{poster.location}</span>
                  </td>

                  <td className="vpa-td--form">
                    <span className={`vpa-form-badge ${poster.formType === 'none' ? 'vpa-form-badge--none' : ''}`}>
                      {FORM_LABELS[poster.formType] || 'None'}
                    </span>
                  </td>

                  <td className="vpa-td--status">
                    <button
                      type="button"
                      className={`vpa-status-badge ${poster.isActive ? 'vpa-status-badge--active' : 'vpa-status-badge--inactive'}`}
                      onClick={() => handleToggleActive(poster)}
                      title={poster.isActive ? 'Click to deactivate' : 'Click to activate'}
                    >
                      {poster.isActive ? <Eye size={13} /> : <EyeOff size={13} />}
                      {poster.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>

                  <td className="vpa-td--actions">
                    <div className="vpa-action-btns">
                      <a
                        href={`/vastu-posters/${poster.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="vpa-action-btn vpa-action-btn--view"
                        title="View on site"
                      >
                        <Eye size={14} />
                      </a>
                      <button
                        type="button"
                        className="vpa-action-btn vpa-action-btn--edit"
                        onClick={() => setEditModal(poster)}
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        className="vpa-action-btn vpa-action-btn--delete"
                        onClick={() => setDeleteModal(poster)}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {editModal && (
        <PosterFormModal
          poster={editModal.isNew ? null : editModal}
          onSave={handleSavePoster}
          onClose={() => setEditModal(null)}
        />
      )}

      {/* Delete Confirm */}
      {deleteModal && (
        <DeleteConfirm
          poster={deleteModal}
          onConfirm={handleDelete}
          onCancel={() => setDeleteModal(null)}
        />
      )}

      {/* Submissions */}
      {showSubmissions && <SubmissionsView onClose={() => setShowSubmissions(false)} />}

      {/* Reset Confirm */}
      {resetConfirm && (
        <div className="vpa-modal-overlay" onClick={() => setResetConfirm(false)}>
          <div className="vpa-confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="vpa-confirm-icon">⚠️</div>
            <h3>Reset All Posters?</h3>
            <p>This will reset all 19 Vastu Posters to their original default values. All your edits will be lost.</p>
            <div className="vpa-confirm-actions">
              <button type="button" className="vpa-btn vpa-btn--ghost" onClick={() => setResetConfirm(false)}>Cancel</button>
              <button type="button" className="vpa-btn vpa-btn--danger" onClick={handleReset}>
                <RotateCcw size={13} /> Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VastuPostersAdmin;
