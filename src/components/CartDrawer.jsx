import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, cartCount } = useCart();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleRequestQuote = () => {
    const itemDetails = cartItems
      .map(item => `${item.name} (${item.code}) x ${item.quantity}`)
      .join('\n');
    const message = `Hello, I would like to request a quote for the following instruments:\n\n${itemDetails}\n\nThank you!`;
    
    // For now, just logging. In a real app, this could open a modal or redirect.
    console.log('Requesting Quote with:', message);
    alert('Quote Request initiated! Check console for details.');
    // Optional: open mailto or contact form
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Drawer */}
          <motion.div 
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-header">
              <div className="cart-title">
                <ShoppingBag size={24} />
                <h2>Your Cart <span className="item-count">({cartCount})</span></h2>
              </div>
              <button className="close-cart" onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-content">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={48} />
                  <p>Your cart is empty</p>
                  <button className="btn-continue" onClick={() => setIsCartOpen(false)}>Continue Shopping</button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cartItems.map((item) => (
                    <div key={item.code} className="cart-item">
                      <div className="cart-item-img">
                        <img 
                          src={item.image || `/images/instruments/${item.category || 'beauty'}/${item.elementId}.png`} 
                          alt={item.name} 
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80/1a1e24/ffffff?text=IMG';
                          }} 
                        />
                      </div>
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <span className="code">{item.code}</span>
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.code, item.quantity - 1)}><Minus size={14} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.code, item.quantity + 1)}><Plus size={14} /></button>
                        </div>
                      </div>
                      <button className="remove-item" onClick={() => removeFromCart(item.code)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary">
                  <span>Total Items:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="cart-actions">
                  <button className="btn-clear" onClick={clearCart}>Clear All</button>
                  <button className="btn-checkout" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
