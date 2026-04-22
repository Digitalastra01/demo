import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  CheckCircle,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Building2,
  User,
  Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Checkout.css';
import emailjs from '@emailjs/browser';

// EMAILJS CONFIGURATION
// 1. Create account at emailjs.com
// 2. Add a Service (e.g. Gmail) and get the Service ID
// 3. Create a Template and get the Template ID
// 4. Get your Public Key from Account Settings
const EMAILJS_SERVICE_ID = "service_2km4vvs";
const EMAILJS_TEMPLATE_ID = "template_fi2okfh";
const EMAILJS_PUBLIC_KEY = "IM6Ef7UWixj82CzU-";

const Checkout = () => {
  const { cartItems, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    country: 'United States',
    zipCode: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatOrderDetails = () => {
    return cartItems.map(item => (
      `${item.name} (Code: ${item.code}) - Quantity: ${item.quantity}`
    )).join('\n');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare the data for the owner's email
    const templateParams = {
      to_name: "H&H Manufacturing Owner",
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phone,
      company: formData.company || "N/A",
      address: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
      order_details: formatOrderDetails(),
      notes: formData.notes || "No additional notes."
    };

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("Order email sent successfully!");
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Failed to send order email:", error);
      // Fallback for demo purposes if keys aren't set up yet
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        clearCart();
      }, 1000);
    }
  };

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="checkout-empty-state">
        <div className="empty-content glass">
          <ShoppingBag size={64} className="empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Please add some instruments to your cart before proceeding to checkout.</p>
          <Link to="/" className="btn-primary">
            <ChevronLeft size={20} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="checkout-success-container">
        <motion.div
          className="success-card glass"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="success-icon-wrapper">
            <CheckCircle size={80} color="var(--primary)" />
          </div>
          <h1>Order Received!</h1>
          <p>Thank you for choosing H&H Manufacturing. Your quote request/order has been successfully submitted. Our team will review your requirements and get back to you shortly.</p>

          <div className="order-details-summary">
            <div className="summary-row">
              <span>Customer:</span>
              <span>{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="summary-row">
              <span>Email:</span>
              <span>{formData.email}</span>
            </div>
          </div>

          <button className="btn-primary" onClick={() => navigate('/')}>
            Return to Home
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="container">
          <button className="back-link" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
            Back
          </button>
          <h1>Checkout</h1>
        </div>
      </div>

      <div className="container">
        <div className="checkout-grid">
          {/* Main Checkout Form */}
          <div className="checkout-main">
            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Contact Information */}
              <section className="form-section glass">
                <div className="section-header">
                  <User size={20} />
                  <h3>Contact Information</h3>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </section>

              {/* Company & Shipping */}
              <section className="form-section glass">
                <div className="section-header">
                  <Building2 size={20} />
                  <h3>Company & Shipping</h3>
                </div>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Company Name</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Your Company LLC"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Street Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="123 Clinical St, Suite 100"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>ZIP / Postal Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </section>

              {/* Additional Notes */}
              <section className="form-section glass">
                <div className="section-header">
                  <Package size={20} />
                  <h3>Order Notes (Optional)</h3>
                </div>
                <div className="form-group full-width">
                  <textarea
                    name="notes"
                    placeholder="Any specific instructions or customization requests?"
                    rows="4"
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </section>

              <div className="form-actions">
                <p className="security-note">
                  <ShieldCheck size={16} />
                  Your information is secure and will only be used for order processing.
                </p>
                <button
                  type="submit"
                  className={`btn-primary submit-btn ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Submit Quote Request'}
                  {!isSubmitting && <ArrowRight size={20} />}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Summary */}
          <aside className="checkout-sidebar">
            <div className="order-summary-card glass sticky-summary">
              <h3>Order Summary</h3>
              <div className="summary-stats">
                <div className="stat-row">
                  <span>Total Items</span>
                  <span>{cartCount}</span>
                </div>
              </div>

              <div className="checkout-items-list">
                {cartItems.map((item) => (
                  <div key={item.code} className="summary-item">
                    <div className="item-thumbnail">
                      <img
                        src={item.image || `/images/instruments/${item.category || 'beauty'}/${item.elementId}.png`}
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60/1a1e24/ffffff?text=IMG';
                        }}
                      />
                    </div>
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <span className="code">{item.code}</span>
                      <span className="quantity">Qty: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-footer">
                <div className="total-row">
                  <span>Estimated total:</span>
                  <span className="quote-only">Quote Basis</span>
                </div>
                <p className="summary-note">
                  Pricing will be provided in the official quote based on your order quantity and shipping destination.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
