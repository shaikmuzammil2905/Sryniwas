import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShoppingCart, Plus, Minus, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './VastuPosterCard.css';

const VastuPosterCard = ({ poster, style }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleDecrement = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = () => {
    const qty = quantity < 1 ? 1 : quantity;
    setAdding(true);
    addToCart(poster, qty);
    setQuantity(0);
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <article className="vp-card" style={style} aria-label={`Vastu Poster: ${poster.name}`}>
      {/* Image Section */}
      <div className="vp-card__image-wrap">
        <Link to={`/vastu-posters/${poster.slug}`} className="vp-card__image-link" tabIndex={-1}>
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
              alt={poster.name}
              className={`vp-card__img ${imgLoaded ? 'vp-card__img--loaded' : ''}`}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgError(true); setImgLoaded(true); }}
            />
          )}
        </Link>

        {/* View Details Button on Hover */}
        <Link to={`/vastu-posters/${poster.slug}`} className="vp-card__view-btn" tabIndex={0}>
          <Eye size={14} /> View Details
        </Link>
      </div>

      {/* Card Body */}
      <div className="vp-card__body">
        <h3 className="vp-card__name">
          <Link to={`/vastu-posters/${poster.slug}`}>{poster.name}</Link>
        </h3>

        <div className="vp-card__location">
          <MapPin size={13} />
          <span>{poster.location}</span>
        </div>

        <p className="vp-card__description">{poster.description}</p>

        {/* Price */}
        <div className="vp-card__price-row">
          <span className="vp-card__price">₹{poster.price.toLocaleString('en-IN')}</span>
          <span className="vp-card__price-unit">per poster</span>
        </div>

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
          >
            <Plus size={12} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          className={`vp-card__cart-btn ${adding ? 'vp-card__cart-btn--added' : ''}`}
          onClick={handleAddToCart}
          aria-label={`Add ${poster.name} to cart`}
        >
          <ShoppingCart size={15} />
          <span>{adding ? 'Added!' : 'Add to Cart'}</span>
        </button>
      </div>
    </article>
  );
};

export default VastuPosterCard;
