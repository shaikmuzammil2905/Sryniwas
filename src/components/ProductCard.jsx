import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageCircle, ArrowRight, CheckCircle2, Eye } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onQuickView }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const whatsappMessage = encodeURIComponent(
    `Hello The Vastu Guru, I am interested in purchasing "${product.name}" (Price: ₹${product.price}). Please provide more details on how to order.`
  );

  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <Link to={`/products/${product.slug}`} className="product-card-image-link">
          {!imgLoaded && !imgError && (
            <div className="product-image-skeleton"></div>
          )}
          <img
            src={imgError ? '/image copy 2.png' : product.image}
            alt={product.name}
            className={`product-card-img ${imgLoaded ? 'loaded' : ''} ${product.name.toLowerCase().includes('bracelet') ? 'is-bracelet' : ''}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        </Link>

        {/* Badges */}
        <div className="product-card-badges">
          {discountPercent > 0 && (
            <span className="badge-discount">{discountPercent}% OFF</span>
          )}
          <span className="badge-energized">Energized</span>
        </div>

        {/* Quick View Button */}
        {onQuickView && (
          <button 
            type="button" 
            className="product-quick-view-btn"
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            title="Quick View"
          >
            <Eye size={16} /> Quick View
          </button>
        )}
      </div>

      <div className="product-card-body">
        <div className="product-card-category-row">
          <span className="product-category-tag">{product.categoryName}</span>
          <div className="product-rating">
            <Star size={13} className="star-icon filled" />
            <span>{product.rating}</span>
            <span className="reviews-count">({product.reviewsCount})</span>
          </div>
        </div>

        <h3 className="product-card-title">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        {product.tagline && (
          <p className="product-card-tagline">{product.tagline}</p>
        )}

        <div className="product-card-benefits-preview">
          {product.benefits && product.benefits.slice(0, 2).map((b, i) => (
            <div key={i} className="benefit-item-preview">
              <CheckCircle2 size={13} className="benefit-check" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        <div className="product-card-footer">
          <div className="product-card-pricing">
            <div className="price-row">
              <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            <span className="unit-label">per {product.unit || '1 pcs'}</span>
          </div>

          <div className="product-card-actions">
            <a
              href={`https://wa.me/919912531255?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="btn-card-whatsapp"
              title="Order on WhatsApp"
            >
              <MessageCircle size={16} /> Order
            </a>
            <Link to={`/products/${product.slug}`} className="btn-card-details" title="View Details">
              Details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
