import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  CheckCircle, 
  PhoneCall, 
  MessageCircle, 
  X,
  ArrowRight,
  Star,
  RefreshCw
} from 'lucide-react';
import { productsData, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Sacred Vastu & Astrology Products | The Vastu Guru";
  }, []);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default recommended
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (catId) => {
    setIsLoading(true);
    setSelectedCategory(catId);
    setTimeout(() => setIsLoading(false), 200);
  };

  return (
    <div className="page-wrapper products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <div className="products-hero-content animate-fade-up">
            <span className="products-badge">
              <Sparkles size={16} /> Authentic • Vedic Energized • Handcrafted
            </span>
            <h1 className="products-hero-title">
              Sacred Vastu & Astrological Products
            </h1>
            <p className="products-hero-subtitle">
              Authentic gemstones, zodiac bracelets, healing talismans, and sacred malas energized through traditional Vedic rituals to harmonize your energy, protect your aura, and attract abundance.
            </p>

            {/* Trust Highlights */}
            <div className="hero-trust-bar">
              <div className="trust-item">
                <ShieldCheck size={18} className="trust-icon" />
                <span>100% Certified Natural Gemstones</span>
              </div>
              <div className="trust-item">
                <Sparkles size={18} className="trust-icon" />
                <span>Vedic Rituals & Prana Pratishtha</span>
              </div>
              <div className="trust-item">
                <Truck size={18} className="trust-icon" />
                <span>Express Delivery Across India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Store Section */}
      <section className="products-main-section">
        <div className="container">
          {/* Controls Bar: Category Tabs, Search, Sort */}
          <div className="products-controls-bar">
            {/* Category Pills */}
            <div className="category-tabs-scroll">
              <div className="category-tabs">
                {categories.map((cat) => {
                  const count = cat.id === 'all' 
                    ? productsData.length 
                    : productsData.filter(p => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`category-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => handleCategoryChange(cat.id)}
                    >
                      {cat.name}
                      <span className="tab-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search and Sort Filter Row */}
            <div className="filter-search-row">
              <div className="search-input-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search bracelets, malas, pyrite, crystals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="clear-search-btn" 
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="sort-wrapper">
                <SlidersHorizontal size={16} className="sort-icon" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="recommended">Sort by: Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name-asc">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Summary */}
          <div className="active-filters-info">
            <span className="results-count">
              Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
              {selectedCategory !== 'all' && ` in "${categories.find(c => c.id === selectedCategory)?.name}"`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>

            {(selectedCategory !== 'all' || searchQuery !== '') && (
              <button
                type="button"
                className="reset-filters-btn"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                <RefreshCw size={13} /> Reset Filters
              </button>
            )}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="products-grid skeleton-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="product-card-skeleton">
                  <div className="skeleton-img"></div>
                  <div className="skeleton-text line-title"></div>
                  <div className="skeleton-text line-desc"></div>
                  <div className="skeleton-text line-price"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid animate-fade-in">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="products-empty-state">
              <div className="empty-icon-wrap">
                <Search size={48} />
              </div>
              <h3>No products found</h3>
              <p>We couldn't find any products matching your search criteria.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose The Vastu Guru Products Banner */}
      <section className="products-features-section">
        <div className="container">
          <div className="features-header text-center">
            <h2 className="section-title">Why Choose Our Energized Products?</h2>
            <p className="section-subtitle">
              Every item is carefully sanctified through sacred Vedic rituals before dispatch.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon-circle">
                <ShieldCheck size={28} />
              </div>
              <h3>100% Genuine & Certified</h3>
              <p>Authentic natural gemstones, rudrakshas, and ebony wood selected for pure elemental energy.</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle">
                <Sparkles size={28} />
              </div>
              <h3>Pre-Energized & Blessed</h3>
              <p>Consecrated through Vedic Beej Mantras, Ganga Jal cleansing, and planetary alignment rituals.</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle">
                <Truck size={28} />
              </div>
              <h3>Safe Pan-India Shipping</h3>
              <p>Dispatched with protective packaging and complete guidance on wearing and maintenance.</p>
            </div>

            <div className="feature-box">
              <div className="feature-icon-circle">
                <PhoneCall size={28} />
              </div>
              <h3>Expert Astrological Advice</h3>
              <p>Unsure which bracelet suits your birth chart? Call our Vedic specialists for personalized guidance.</p>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="custom-guidance-banner">
            <div className="banner-text">
              <h3>Need Help Selecting the Right Gemstone or Zodiac Bracelet?</h3>
              <p>Talk directly with our Vastu & Astrology consultants to find the ideal product for your horoscope.</p>
            </div>
            <div className="banner-actions">
              <a href="tel:9912531255" className="btn btn-primary">
                <PhoneCall size={18} /> Call 9912531255
              </a>
              <a 
                href="https://wa.me/919912531255?text=Hello%20The%20Vastu%20Guru%2C%20I%20need%20guidance%20on%20choosing%20the%20right%20energized%20product%20for%20my%20chart."
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} /> WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="quickview-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="quickview-modal animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="quickview-close-btn"
              onClick={() => setQuickViewProduct(null)}
            >
              <X size={22} />
            </button>

            <div className="quickview-grid">
              <div className="quickview-image-pane">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
              </div>

              <div className="quickview-info-pane">
                <span className="product-category-tag">{quickViewProduct.categoryName}</span>
                <h2 className="quickview-title">{quickViewProduct.name}</h2>
                <div className="product-rating" style={{ marginBottom: '12px' }}>
                  <Star size={14} className="star-icon filled" />
                  <span>{quickViewProduct.rating}</span>
                  <span className="reviews-count">({quickViewProduct.reviewsCount} customer reviews)</span>
                </div>

                <div className="price-row" style={{ marginBottom: '16px' }}>
                  <span className="current-price" style={{ fontSize: '24px' }}>
                    ₹{quickViewProduct.price.toLocaleString('en-IN')}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="original-price" style={{ fontSize: '16px' }}>
                      ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="badge-discount">
                    {Math.round(((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100)}% OFF
                  </span>
                </div>

                <p className="quickview-desc">{quickViewProduct.description}</p>

                <div className="quickview-benefits">
                  <h4>Key Benefits:</h4>
                  <ul>
                    {quickViewProduct.benefits.map((b, i) => (
                      <li key={i}>
                        <CheckCircle size={14} className="benefit-check" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="quickview-actions">
                  <a
                    href={`https://wa.me/919912531255?text=${encodeURIComponent(
                      `Hello The Vastu Guru, I would like to order "${quickViewProduct.name}" (Price: ₹${quickViewProduct.price}). Please guide me with delivery and payment.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-whatsapp"
                  >
                    <MessageCircle size={18} /> Buy on WhatsApp
                  </a>
                  <Link
                    to={`/products/${quickViewProduct.slug}`}
                    className="btn btn-outline"
                    onClick={() => setQuickViewProduct(null)}
                  >
                    Full Details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
