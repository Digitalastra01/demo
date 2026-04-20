import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductImageModal.css';

const ProductImageModal = ({ isOpen, onClose, imagePath, productName, productCode, elementId, category }) => {
  const { addToCart } = useCart();
  const [isZoomed, setIsZoomed] = React.useState(false);

  // Reset zoom whenever modal opens/closes or image changes
  React.useEffect(() => {
    setIsZoomed(false);
  }, [isOpen, imagePath]);

  if (!isOpen) return null;

  const toggleZoom = (e) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="product-modal-overlay" onClick={onClose}>
        <motion.div 
          className="product-modal-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="product-modal-header">
            <div className="product-modal-title">
              <h3>{productName}</h3>
              <span className="product-modal-code">{productCode}</span>
            </div>
            <button className="product-modal-close" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          
          <div className="product-modal-body">
            <div className="product-image-container">
              <img 
                src={imagePath} 
                alt={productName} 
                className={`product-main-image ${isZoomed ? 'zoomed' : ''}`}
                onClick={toggleZoom}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x800?text=Image+Coming+Soon';
                }}
              />
              <div className="image-overlay-actions">
                <button 
                  className={`img-action-btn ${isZoomed ? 'active' : ''}`} 
                  title={isZoomed ? "Zoom Out" : "Zoom In"}
                  onClick={toggleZoom}
                >
                  <ZoomIn size={22} />
                </button>
                <a 
                  href={imagePath} 
                  download={`${productName}.png`} 
                  className="img-action-btn" 
                  title="Download"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download size={22} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="product-modal-footer">
            <p>Premium Medical Grade Stainless Steel</p>
            <div className="modal-footer-actions">
              <button 
                className="btn-add-cart-modal"
                onClick={() => {
                  addToCart({ name: productName, code: productCode, elementId, category });
                  onClose();
                }}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default ProductImageModal;
