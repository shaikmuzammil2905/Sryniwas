import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  RotateCcw, 
  MessageCircle, 
  PhoneCall, 
  ArrowLeft,
  Plus,
  Minus,
  Share2,
  PackageCheck,
  Compass
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts, productsData } from '../data/products';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('benefits');
  const [copiedLink, setCopiedLink] = useState(false);
  const [imgError, setImgError] = useState(false);

  const product = getProductBySlug(id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      document.title = `${product.name} | The Vastu Guru`;
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="page-wrapper product-not-found-page">
        <div className="container text-center">
          <div className="not-found-card animate-fade-up">
            <h2>Product Not Found</h2>
            <p>The sacred product you are looking for might have been moved or is currently unavailable.</p>
            <Link to="/products" className="btn btn-primary">
              <ArrowLeft size={16} /> Back to Products Catalog
            </Link>
          </div>

          <div className="featured-alternative-section">
            <h3>Popular Sacred Talismans</h3>
            <div className="products-grid">
              {productsData.slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const totalPrice = product.price * quantity;
  const relatedProducts = getRelatedProducts(product.id, product.category, 4);

  const whatsappOrderMessage = encodeURIComponent(
    `Hello The Vastu Guru,\n\nI would like to order:\nProduct: ${product.name}\nQuantity: ${quantity}\nPrice per unit: ₹${product.price}\nTotal Price: ₹${totalPrice}\n\nPlease let me know the available payment options and delivery timeframe.`
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="page-wrapper product-detail-page">
      {/* Breadcrumbs */}
      <div className="product-breadcrumb-wrap">
        <div className="container">
          <nav className="product-breadcrumbs">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/products">Products</Link>
            <ChevronRight size={14} />
            <span className="breadcrumb-category">{product.categoryName}</span>
            <ChevronRight size={14} />
            <span className="current-breadcrumb">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Showcase */}
      <div className="container product-showcase-container">
        <div className="product-showcase-grid">
          {/* Left Column: Image View */}
          <div className="product-gallery-pane animate-fade-up">
            <div className="product-main-image-card">
              <img 
                src={imgError ? '/image copy 2.png' : product.image} 
                alt={product.name} 
                className="product-detail-img"
                onError={() => setImgError(true)}
              />

              <div className="product-detail-badges">
                {discountPercent > 0 && (
                  <span className="detail-badge-discount">{discountPercent}% OFF</span>
                )}
                <span className="detail-badge-energized">
                  <Sparkles size={12} /> Vedic Energized
                </span>
              </div>
            </div>

            {/* Quick Guarantees Under Image */}
            <div className="product-quick-guarantees">
              <div className="guarantee-chip">
                <ShieldCheck size={16} /> 100% Certified Natural
              </div>
              <div className="guarantee-chip">
                <PackageCheck size={16} /> Free Sacred Packaging
              </div>
              <div className="guarantee-chip">
                <Truck size={16} /> Express Pan-India Delivery
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Purchase */}
          <div className="product-info-pane animate-fade-up">
            <div className="product-header-row">
              <span className="product-category-tag">{product.categoryName}</span>
              <button 
                type="button" 
                className="btn-share-product" 
                onClick={handleShare}
                title="Share Product"
              >
                <Share2 size={16} />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="product-detail-title">{product.name}</h1>
            
            {product.tagline && (
              <p className="product-detail-tagline">{product.tagline}</p>
            )}

            {/* Rating and Reviews */}
            <div className="product-detail-rating-row">
              <div className="star-rating-box">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="star-icon filled" />
                  ))}
                </div>
                <span className="rating-num">{product.rating}</span>
              </div>
              <span className="divider">•</span>
              <span className="verified-orders">{product.reviewsCount} Verified Devotee Reviews</span>
              <span className="divider">•</span>
              <span className="stock-status-pill in-stock">
                <span className="pulse-dot"></span> In Stock (Ready to Dispatch)
              </span>
            </div>

            {/* Pricing Box */}
            <div className="product-pricing-box">
              <div className="pricing-main-row">
                <span className="detail-current-price">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className="detail-original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
                {discountPercent > 0 && (
                  <span className="detail-savings-text">
                    You Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({discountPercent}% OFF)
                  </span>
                )}
              </div>
              <p className="pricing-subtext">Inclusive of all Vedic energization rituals, puja sanctification, and taxes.</p>
            </div>

            {/* Core Description */}
            <p className="product-main-description">{product.description}</p>

            {/* Key Benefits Highlight Box */}
            <div className="key-benefits-highlight">
              <h3>Energetic & Astrological Benefits:</h3>
              <div className="benefits-list-grid">
                {product.benefits.map((benefit, idx) => (
                  <div key={idx} className="benefit-pill">
                    <CheckCircle2 size={16} className="benefit-icon" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Purchase CTAs */}
            <div className="purchase-controls-box">
              <div className="quantity-row">
                <label>Quantity:</label>
                <div className="quantity-counter">
                  <button 
                    type="button" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    type="button" 
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="unit-indicator">({product.unit || '1 pcs'})</span>
              </div>

              <div className="cta-buttons-stack">
                <a
                  href={`https://wa.me/919912531255?text=${whatsappOrderMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp btn-large-buy"
                >
                  <MessageCircle size={20} />
                  <span>Order on WhatsApp (₹{totalPrice.toLocaleString('en-IN')})</span>
                </a>

                <div className="secondary-action-row">
                  <a href="tel:9912531255" className="btn btn-outline btn-call-expert">
                    <PhoneCall size={18} /> Consult Astrologer Before Buying
                  </a>
                </div>
              </div>
            </div>

            {/* Vedic Authenticity Guarantee Box */}
            <div className="vedic-guarantee-card">
              <div className="guarantee-header">
                <Sparkles size={18} className="sparkle-icon" />
                <h4>The Vastu Guru Sanctification Promise</h4>
              </div>
              <p>
                Unlike mass-market machine products, each talisman is individually cleansed with holy Ganga Jal, infused with Vedic planetary beeja mantras by our certified Astrologers, and dispatched with authentic purity.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div className="product-details-tabs-section">
          <div className="tabs-header-bar">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'benefits' ? 'active' : ''}`}
              onClick={() => setActiveTab('benefits')}
            >
              Key Features & Benefits
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Specifications & Materials
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'ritual' ? 'active' : ''}`}
              onClick={() => setActiveTab('ritual')}
            >
              Energization & Wearing Method
            </button>
          </div>

          <div className="tab-content-panel">
            {activeTab === 'benefits' && (
              <div className="tab-pane animate-fade-in">
                <h3>Transformative Benefits of {product.name}</h3>
                <ul className="full-benefits-list">
                  {product.benefits.map((b, i) => (
                    <li key={i}>
                      <CheckCircle2 size={18} className="benefit-check" />
                      <div>
                        <strong>{b}</strong>
                        <p>Enhances resonance with planetary frequencies to remove subtle obstacles.</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {product.features && (
                  <div className="features-subgrid">
                    <h4>Product Highlights:</h4>
                    <ul>
                      {product.features.map((f, i) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="tab-pane animate-fade-in">
                <h3>Technical & Astrological Specifications</h3>
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <th>Product Name</th>
                      <td>{product.name}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td>{product.categoryName}</td>
                    </tr>
                    <tr>
                      <th>Material / Beads</th>
                      <td>{product.details?.material || '100% Natural Certified Gemstone Beads'}</td>
                    </tr>
                    <tr>
                      <th>Suitable For</th>
                      <td>{product.details?.suitableFor || 'All Zodiac & Astrological Signs'}</td>
                    </tr>
                    <tr>
                      <th>Bead Size</th>
                      <td>8 mm Natural Spherical Beads</td>
                    </tr>
                    <tr>
                      <th>Fit Type</th>
                      <td>Expandable Premium Elastic Stretchable Cord (Universal Fit)</td>
                    </tr>
                    <tr>
                      <th>Certification</th>
                      <td>Certified Natural Authentic Stones</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'ritual' && (
              <div className="tab-pane animate-fade-in">
                <h3>Sacred Consecration & Wearing Guidelines</h3>
                <div className="guidance-grid">
                  <div className="guidance-card">
                    <h4>
                      <Sparkles size={18} /> Vedic Energization Process
                    </h4>
                    <p>{product.details?.energization || 'Consecrated with Vedic planetary mantras, Ganga Jal cleansing, and dhoop purification before dispatch.'}</p>
                  </div>

                  <div className="guidance-card">
                    <h4>
                      <Compass size={18} /> Best Day & How to Wear
                    </h4>
                    <p>{product.details?.wearOn || 'Wash gently with pure water or milk in morning, pray to your Ishta Devata, and wear on your active wrist.'}</p>
                  </div>
                </div>

                <div className="maintenance-note">
                  <strong>Care Tip:</strong> To maintain energetic potency, avoid exposing the gemstone bracelet to harsh chemical cleaners or perfumes. Clean with a soft damp cloth once a month.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <div className="section-header-row">
              <div>
                <h2 className="section-title">Related Sacred Items</h2>
                <p className="section-subtitle">Complementary products to amplify your spiritual harmony.</p>
              </div>
              <Link to="/products" className="btn btn-outline">
                View All Products <ChevronRight size={16} />
              </Link>
            </div>

            <div className="products-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Back Button */}
        <div className="back-navigation-bar">
          <button type="button" onClick={() => navigate('/products')} className="btn btn-outline">
            <ArrowLeft size={16} /> Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
