import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isOpen ? 'cart-backdrop--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`} aria-label="Shopping Cart">
        <div className="cart-drawer__header">
          <div className="cart-drawer__title">
            <ShoppingBag size={20} />
            <span>Your Cart</span>
            {cartItems.length > 0 && (
              <span className="cart-drawer__count-badge">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
            )}
          </div>
          <button
            type="button"
            className="cart-drawer__close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            <div className="cart-drawer__empty">
              <ShoppingBag size={52} className="cart-drawer__empty-icon" />
              <p>Your cart is empty</p>
              <span>Add Vastu Posters to get started</span>
            </div>
          ) : (
            <ul className="cart-drawer__list">
              {cartItems.map(item => (
                <li key={item.productId} className="cart-drawer__item">
                  <div className="cart-item__image-wrap">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="cart-item__image"
                      onError={e => { e.target.src = '/image copy 2.png'; }}
                    />
                  </div>
                  <div className="cart-item__info">
                    <h4 className="cart-item__name">{item.productName}</h4>
                    {item.location && (
                      <p className="cart-item__location">📍 {item.location}</p>
                    )}
                    <div className="cart-item__price-row">
                      <span className="cart-item__price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      <span className="cart-item__unit-price">(₹{item.price} each)</span>
                    </div>
                    <div className="cart-item__controls">
                      <div className="cart-item__qty">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="cart-qty-value">{item.quantity}</span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() => removeFromCart(item.productId)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total-row">
              <span>Total</span>
              <span className="cart-drawer__total-amount">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <a
              href={`https://wa.me/919912531255?text=${encodeURIComponent(
                `Hello The Vastu Guru,\n\nI would like to order the following Vastu Posters:\n\n` +
                cartItems.map(i => `• ${i.productName} × ${i.quantity} = ₹${(i.price * i.quantity).toLocaleString('en-IN')}`).join('\n') +
                `\n\nTotal: ₹${cartTotal.toLocaleString('en-IN')}\n\nPlease guide me with payment and delivery.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp cart-checkout-btn"
            >
              Order via WhatsApp
            </a>
            <p className="cart-drawer__footer-note">
              Secure order via WhatsApp • COD & Online Payment Available
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
