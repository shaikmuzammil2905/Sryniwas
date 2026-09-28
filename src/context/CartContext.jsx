import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'vastuGuruCart';

const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCart);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    const qty = quantity < 1 ? 1 : quantity;
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        const updated = prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
        showToast(`"${product.name}" quantity updated in cart`);
        return updated;
      } else {
        showToast(`"${product.name}" added to cart`);
        return [...prev, {
          productId: product.id,
          productName: product.name,
          image: product.image,
          price: product.price,
          quantity: qty,
          location: product.location,
          productType: product.productType || 'VASTU_POSTER',
          slug: product.slug,
        }];
      }
    });
  }, [showToast]);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => {
      const item = prev.find(i => i.productId === productId);
      if (item) showToast(`"${item.productName}" removed from cart`);
      return prev.filter(item => item.productId !== productId);
    });
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toastMessage,
      toastVisible,
    }}>
      {children}
      {/* Global Cart Toast */}
      <div
        className={`cart-toast ${toastVisible ? 'cart-toast--visible' : ''}`}
        aria-live="polite"
        role="status"
      >
        <span className="cart-toast-check">✓</span>
        {toastMessage}
      </div>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export default CartContext;
