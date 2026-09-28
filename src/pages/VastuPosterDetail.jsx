import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin, ChevronRight, ArrowLeft, ShoppingCart,
  Plus, Minus, Share2, PhoneCall, MessageCircle, ShoppingBag
} from 'lucide-react';
import { getVastuPosterBySlug, getActiveVastuPosters, FORM_LABELS } from '../data/vastuPosters';
import { useCart } from '../context/CartContext';
import PosterRemedyForm from '../components/PosterRemedyForm';
import VastuPosterCard from '../components/VastuPosterCard';
import './VastuPosterDetail.css';

const VastuPosterDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartCount } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [CartDrawer, setCartDrawer] = useState(null);

  const poster = getVastuPosterBySlug(slug);
  const allPosters = getActiveVastuPosters().filter(p => p.id !== poster?.id).slice(0, 4);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (poster) {
      document.title = `${poster.name} — Vastu Poster | The Vastu Guru`;
    }
    import('../components/CartDrawer').then(m => setCartDrawer(() => m.default));
  }, [slug, poster]);

  if (!poster || !poster.isActive) {
    return (
      <div className="page-wrapper vpd-not-found">
        <div className="container text-center">
          <div className="vpd-not-found__card animate-fade-up">
            <span className="vpd-not-found__emoji">🖼️</span>
            <h2>Poster Not Found</h2>
            <p>The Vastu poster you're looking for is unavailable or may have been removed.</p>
            <Link to="/vastu-posters" className="btn btn-primary">
              <ArrowLeft size={16} /> Back to Vastu Posters
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(poster, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: poster.name, text: poster.description, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    }
  };

  return (
    <div className="page-wrapper vpd-page">
      {/* Breadcrumbs */}
      <div className="vpd-breadcrumb-bar">
        <div className="container">
          <nav className="vpd-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/vastu-posters">Vastu Posters</Link>
            <ChevronRight size={14} />
            <span aria-current="page">{poster.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Showcase */}
      <div className="container vpd-showcase">
        <div className="vpd-showcase__grid">
          {/* Left: Image */}
          <div className="vpd-gallery animate-fade-up">
            <div className="vpd-main-image-wrap">
              {!imgLoaded && !imgError && (
                <div className="vpd-img-skeleton" aria-hidden="true" />
              )}
              {imgError ? (
                <div className="vpd-img-fallback">
                  <span>🖼️</span>
                  <span>Image unavailable</span>
                </div>
              ) : (
                <img
                  src={poster.image}
                  alt={poster.name}
                  className={`vpd-main-img ${imgLoaded ? 'vpd-main-img--loaded' : ''}`}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => { setImgError(true); setImgLoaded(true); }}
                />
              )}
            </div>

            <div className="vpd-quick-chips">
              <span className="vpd-chip">✨ Vastu Energized</span>
              <span className="vpd-chip">🚀 Pan-India Delivery</span>
              <span className="vpd-chip">🛡️ Expert Guidance Included</span>
            </div>
          </div>

          {/* Right: Info */}
          <div className="vpd-info-pane animate-fade-up">
            <div className="vpd-info-top-row">
              <span className="vpd-type-badge">Vastu Poster</span>
              <button
                type="button"
                className="vpd-share-btn"
                onClick={handleShare}
                title="Share"
              >
                <Share2 size={15} />
                <span>{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="vpd-title">{poster.name}</h1>

            <div className="vpd-location-badge">
              <MapPin size={15} />
              <span><strong>Placement:</strong> {poster.location}</span>
            </div>

            <p className="vpd-description">{poster.description}</p>

            {/* Price */}
            <div className="vpd-price-box">
              <span className="vpd-price">₹{poster.price.toLocaleString('en-IN')}</span>
              <span className="vpd-price-label">per poster</span>
            </div>

            {/* Quantity Selector */}
            <div className="vpd-qty-section">
              <label className="vpd-qty-label">Quantity:</label>
              <div className="vpd-qty-controls">
                <button
                  type="button"
                  className="vpd-qty-btn"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="vpd-qty-value">{quantity}</span>
                <button
                  type="button"
                  className="vpd-qty-btn"
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="vpd-total-price">
                Total: ₹{(poster.price * quantity).toLocaleString('en-IN')}
              </span>
            </div>

            {/* Actions */}
            <div className="vpd-actions">
              <button
                type="button"
                className="btn vpd-add-cart-btn"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <a
                href={`https://wa.me/919912531255?text=${encodeURIComponent(
                  `Hello The Vastu Guru,\n\nI would like to order:\nPoster: ${poster.name}\nQuantity: ${quantity}\nTotal: ₹${poster.price * quantity}\n\nPlease guide me on payment and delivery.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} />
                Order on WhatsApp
              </a>
            </div>

            <a href="tel:9912531255" className="vpd-call-link">
              <PhoneCall size={14} /> Call for Expert Vastu Guidance: 9912531255
            </a>

            {/* Form type badge */}
            {poster.formType && poster.formType !== 'none' && (
              <div className="vpd-form-badge">
                📋 Includes: <strong>{FORM_LABELS[poster.formType]}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Placement Info Card */}
        <div className="vpd-placement-card animate-fade-in">
          <div className="vpd-placement-card__icon">📍</div>
          <div>
            <h3>Vastu Placement Guide</h3>
            <p>
              Place this poster in: <strong>{poster.location}</strong>.
              For best results, keep the poster at eye level, in a clean, well-lit area.
              Avoid placing near dustbins or toilets.
            </p>
          </div>
        </div>

        {/* Dynamic Form Section */}
        <PosterRemedyForm poster={poster} />

        {/* Cart View button if cart has items */}
        {cartCount > 0 && (
          <div className="vpd-cart-reminder">
            <ShoppingBag size={16} />
            <span>You have {cartCount} item{cartCount > 1 ? 's' : ''} in your cart.</span>
            <button type="button" className="vpd-view-cart-btn" onClick={() => setCartOpen(true)}>
              View Cart
            </button>
          </div>
        )}

        {/* Related Posters */}
        {allPosters.length > 0 && (
          <section className="vpd-related-section">
            <div className="vpd-related-header">
              <h2 className="vp-section-title">More Vastu Posters</h2>
              <Link to="/vastu-posters" className="btn btn-outline">
                View All <ChevronRight size={15} />
              </Link>
            </div>
            <div className="vp-grid">
              {allPosters.map(p => (
                <VastuPosterCard key={p.id} poster={p} />
              ))}
            </div>
          </section>
        )}

        {/* Back Navigation */}
        <div className="vpd-back-bar">
          <button type="button" onClick={() => navigate('/vastu-posters')} className="btn btn-outline">
            <ArrowLeft size={16} /> Back to All Vastu Posters
          </button>
        </div>
      </div>

      {/* Cart Drawer */}
      {CartDrawer && (
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      )}
    </div>
  );
};

export default VastuPosterDetail;
