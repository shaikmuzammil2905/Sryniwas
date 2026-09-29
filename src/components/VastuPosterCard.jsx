import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShoppingCart, Plus, Minus, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import './VastuPosterCard.css';

const VastuPosterCard = ({ poster, style }) => {
  const { addToCart } = useCart();
  const { lang, t } = useLanguage();
  const [quantity, setQuantity] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [adding, setAdding] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);

  const toggleBlur = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBlurred(!isBlurred);
  };

  const displayName = lang === 'te' && poster.nameTe ? poster.nameTe : poster.name;
  const displayLocation = lang === 'te' && poster.locationTe ? poster.locationTe : poster.location;
  const displayDescription = lang === 'te' && poster.descriptionTe ? poster.descriptionTe : poster.description;

  const handleDecrement = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity(prev => (prev < 5 ? prev + 1 : prev));
  };

  const handleAddToCart = () => {
    const qty = quantity < 1 ? 1 : quantity;
    setAdding(true);
    addToCart(poster, qty);
    setQuantity(0);
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <article className="vp-card" style={style} aria-label={`Vastu Poster: ${displayName}`}>
      {/* Image Section */}
      <div className="vp-card__image-wrap">
        <div 
          className="vp-card__img-blur-bg" 
          style={{ backgroundImage: `url(${poster.image})` }} 
          aria-hidden="true"
        />
        <div 
          className="vp-card__image-link" 
          tabIndex={0}
          onClick={toggleBlur}
          role="button"
          aria-label={isBlurred ? "Click to view clear image" : "Click to blur image"}
          style={{ cursor: 'pointer' }}
        >
          {!imgLoaded && !imgError && (
            <div className="vp-card__img-skeleton" aria-hidden="true" />
          )}
          {imgError ? (
            <div className="vp-card__img-fallback" aria-label="Image unavailable">
              <span>🖼️</span>
              <span>Image unavailable</span>
            </div>
          ) : (
            <img
              src={poster.image}
              alt={displayName}
              className={`vp-card__img ${imgLoaded ? 'vp-card__img--loaded' : ''}`}
              style={{ 
                filter: isBlurred 
                  ? 'blur(8px) drop-shadow(0 12px 24px rgba(0,0,0,0.5))' 
                  : 'blur(0px) drop-shadow(0 12px 24px rgba(0,0,0,0.5))',
                transition: 'filter 0.3s ease, opacity 0.4s ease, transform 0.4s ease'
              }}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgError(true); setImgLoaded(true); }}
            />
          )}
        </div>

        {/* View Details Button on Hover */}
        <Link to={`/vastu-posters/${poster.slug}`} className="vp-card__view-btn" tabIndex={0}>
          <Eye size={14} /> {t('viewDetails')}
        </Link>
      </div>

      {/* Card Body */}
      <div className="vp-card__body">
        <h3 className="vp-card__name">
          <Link to={`/vastu-posters/${poster.slug}`}>{displayName}</Link>
        </h3>

        <div className="vp-card__location">
          <MapPin size={13} />
          <span>{displayLocation}</span>
        </div>

        <p className="vp-card__description">{displayDescription}</p>

        <div className="vp-card__footer">
          {/* Price */}
          <div className="vp-card__price-row">
            <span className="vp-card__price">₹{poster.price.toLocaleString('en-IN')}</span>
          </div>

          {/* Actions Row */}
          <div className="vp-card__actions-row">
            {/* Quantity Selector */}
            <div className="vp-card__quantity-row">
              <button
                type="button"
                className="vp-qty-btn"
                onClick={handleDecrement}
                aria-label="Decrease quantity"
                disabled={quantity <= 0}
              >
                <Minus size={12} />
              </button>
              <span className="vp-qty-value">{quantity}</span>
              <button
                type="button"
                className="vp-qty-btn"
                onClick={handleIncrement}
                aria-label="Increase quantity"
                disabled={quantity >= 5}
              >
                <Plus size={12} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              className={`vp-card__cart-btn ${adding ? 'vp-card__cart-btn--added' : ''}`}
              onClick={handleAddToCart}
              aria-label={`Add ${displayName} to cart`}
            >
              <ShoppingCart size={15} />
              <span>{adding ? t('added') : t('add')}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default VastuPosterCard;
