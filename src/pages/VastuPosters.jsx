import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, ShieldCheck, Truck, PhoneCall, MessageCircle, ShoppingBag, Globe, Filter } from 'lucide-react';
import { getActiveVastuPosters } from '../data/vastuPosters';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import VastuPosterCard from '../components/VastuPosterCard';
import './VastuPosters.css';

const SKELETON_COUNT = 6;

const filterCategories = [
  { id: 'all', key: 'filterAll' },
  { id: 'vastu', key: 'filterVastu' },
  { id: 'numerology', key: 'filterNumerology' },
  { id: 'relationships', key: 'filterRelationships' },
  { id: 'career', key: 'filterCareer' },
  { id: 'education', key: 'filterEducation' },
  { id: 'finance', key: 'filterFinance' },
  { id: 'health', key: 'filterHealth' },
  { id: 'property', key: 'filterProperty' },
  { id: 'business', key: 'filterBusiness' },
];

const getCategoriesForPoster = (poster) => {
  const cats = ['vastu'];
  const name = poster.name.toLowerCase();
  
  if (name.includes('health') || name.includes('santhanam')) cats.push('health');
  if (name.includes('marriage') || name.includes('wife') || name.includes('family') || name.includes('relation')) cats.push('relationships');
  if (name.includes('job')) cats.push('career');
  if (name.includes('education') || name.includes('creativity')) cats.push('education');
  if (name.includes('loan') || name.includes('horses') || name.includes('money')) cats.push('finance');
  if (name.includes('property') || name.includes('house') || name.includes('car')) cats.push('property');
  if (name.includes('business')) cats.push('business');
  if (name.includes('angel') || name.includes('numero')) cats.push('numerology');
  
  return cats;
};

const VastuPosters = () => {
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartCount, cartItems } = useCart();
  const { lang, changeLanguage, t } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [activePosterId, setActivePosterId] = useState(null);

  // Lazy import CartDrawer to avoid circular issues
  const [CartDrawer, setCartDrawer] = useState(null);

  useEffect(() => {
    document.title = 'Vastu Posters & Remedies | The Vastu Guru';
    
    // Simulate async load (would be API in production)
    const timer = setTimeout(() => {
      setPosters(getActiveVastuPosters());
      setLoading(false);
    }, 400);

    // Import CartDrawer dynamically
    import('../components/CartDrawer').then(m => setCartDrawer(() => m.default));

    return () => clearTimeout(timer);
  }, []);

  const filteredPosters = useMemo(() => {
    if (activeFilter === 'all') return posters;
    return posters.filter(p => getCategoriesForPoster(p).includes(activeFilter));
  }, [posters, activeFilter]);

  return (
    <div className="page-wrapper vp-page">
      {/* Hero Section */}
      <section className="vp-hero">
        <div className="container">
          <div className="vp-hero__content animate-fade-up">
            <span className="vp-hero__badge">
              <Sparkles size={15} /> {t('vastuPosters')}
            </span>
            <h1 className="vp-hero__title">Sacred {t('vastuPosters')}</h1>
            <p className="vp-hero__subtitle">
              Energized remedy posters rooted in Vastu Shastra — designed to harmonize your home,
              attract blessings, and remove energy blockages from every corner of your life.
            </p>

            {/* Trust Bar */}
            <div className="vp-hero__trust-bar">
              <div className="vp-trust-item">
                <ShieldCheck size={17} />
                <span>Authentic Vastu Remedies</span>
              </div>
              <div className="vp-trust-item">
                <Sparkles size={17} />
                <span>Vedic Energized Artwork</span>
              </div>
              <div className="vp-trust-item">
                <Truck size={17} />
                <span>Pan-India Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Indicator Strip */}
      {cartCount > 0 && (
        <div className="vp-cart-strip">
          <div className="container vp-cart-strip__inner">
            <div className="vp-cart-strip__info">
              <ShoppingBag size={18} />
              <span>{cartCount} poster{cartCount > 1 ? 's' : ''} in your cart — ₹{cartItems.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString('en-IN')}</span>
            </div>
            <button
              type="button"
              className="vp-cart-strip__btn"
              onClick={() => setCartOpen(true)}
            >
              View Cart
            </button>
          </div>
        </div>
      )}

      {/* Control Bar (Language & Filters) */}
      <div className="vp-controls">
        <div className="container vp-controls-container">
          <div className="vp-filter-group">
            <div className="vp-filter-mobile-toggle" onClick={() => setFilterMenuOpen(!filterMenuOpen)}>
              <Filter size={16} /> {t('filter')}: {t(filterCategories.find(c => c.id === activeFilter).key)}
            </div>
            <div className={`vp-filter-buttons ${filterMenuOpen ? 'open' : ''}`}>
              {filterCategories.map(cat => (
                <button
                  key={cat.id}
                  className={`vp-filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                  onClick={() => { setActiveFilter(cat.id); setFilterMenuOpen(false); }}
                >
                  {t(cat.key)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="vp-language-switch">
            <Globe size={16} />
            <button className={`vp-lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => changeLanguage('en')}>English</button>
            <span className="vp-lang-sep">|</span>
            <button className={`vp-lang-btn ${lang === 'te' ? 'active' : ''}`} onClick={() => changeLanguage('te')}>తెలుగు</button>
          </div>
        </div>
      </div>

      {/* Posters Grid Section */}
      <section className="vp-products-section">
        <div className="container">

          {loading ? (
            /* Skeleton Loading */
            <div className="vp-grid">
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <div key={i} className="vp-skeleton-card" aria-hidden="true">
                  <div className="vp-skeleton__img" />
                  <div className="vp-skeleton__body">
                    <div className="vp-skeleton__line vp-skeleton__line--title" />
                    <div className="vp-skeleton__line vp-skeleton__line--location" />
                    <div className="vp-skeleton__line vp-skeleton__line--desc" />
                    <div className="vp-skeleton__line vp-skeleton__line--price" />
                    <div className="vp-skeleton__line vp-skeleton__line--btn" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosters.length === 0 ? (
            <div className="vp-empty-state">
              <span className="vp-empty-icon">🖼️</span>
              <h3>{t('noPosters')}</h3>
            </div>
          ) : (
            <div className="vp-grid">
              {filteredPosters.map((poster, idx) => (
                <VastuPosterCard
                  key={poster.id}
                  poster={poster}
                  style={{ animationDelay: `${idx * 0.06}s` }}
                  isActive={activePosterId === poster.id}
                  onToggle={() => setActivePosterId(activePosterId === poster.id ? null : poster.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="vp-benefits-section">
        <div className="container">
          <div className="vp-benefits-header text-center">
            <h2 className="vp-section-title">Why Vastu Posters Work</h2>
            <p className="vp-section-subtitle">
              Each poster is designed with sacred geometry, Vastu principles, and positive energy to create harmony in your space.
            </p>
          </div>

          <div className="vp-benefits-grid">
            <div className="vp-benefit-box">
              <div className="vp-benefit-icon">🏠</div>
              <h3>Vastu-Aligned Placement</h3>
              <p>Each poster comes with precise placement instructions for maximum Vastu benefit in your home or office.</p>
            </div>
            <div className="vp-benefit-box">
              <div className="vp-benefit-icon">✨</div>
              <h3>Sacred Artwork</h3>
              <p>Crafted with intention using traditional motifs and sacred geometry for positive energy flow.</p>
            </div>
            <div className="vp-benefit-box">
              <div className="vp-benefit-icon">🎯</div>
              <h3>Targeted Remedies</h3>
              <p>Every poster addresses a specific life area — health, wealth, marriage, education, career, and more.</p>
            </div>
            <div className="vp-benefit-box">
              <div className="vp-benefit-icon">📱</div>
              <h3>Expert Guidance</h3>
              <p>Our Vastu experts are available to guide you on the correct placement and activation of your poster.</p>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="vp-cta-banner">
            <div className="vp-cta-text">
              <h3>Need Help Choosing the Right Poster?</h3>
              <p>Speak directly with our Vastu & Numerology consultants for personalized recommendations.</p>
            </div>
            <div className="vp-cta-actions">
              <a href="tel:9912531255" className="btn btn-primary">
                <PhoneCall size={17} /> Call 9912531255
              </a>
              <a
                href="https://wa.me/919912531255?text=Hello%20The%20Vastu%20Guru%2C%20I%20need%20help%20choosing%20the%20right%20Vastu%20Poster%20for%20my%20home."
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={17} /> WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      {CartDrawer && (
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      )}

      {/* Floating Cart Button (mobile) */}
      {cartCount > 0 && (
        <button
          type="button"
          className="vp-floating-cart"
          onClick={() => setCartOpen(true)}
          aria-label={`Open cart — ${cartCount} items`}
        >
          <ShoppingBag size={20} />
          <span className="vp-floating-cart__badge">{cartCount}</span>
        </button>
      )}
    </div>
  );
};

export default VastuPosters;
