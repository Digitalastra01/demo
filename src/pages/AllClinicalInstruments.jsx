import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductImageModal from '../components/ProductImageModal';
import { useCart } from '../context/CartContext';
import { surgicalCategories, dentalCategories } from '../data/categories';
import './ProductGallery.css';

const ClinicalProductCard = ({ product, onProductClick }) => {
  const { addToCart } = useCart();
  const { name, code, image, elementId } = product;
  
  return (
    <div id={elementId} className="gallery-card">
      <div className="product-image-wrapper" onClick={() => onProductClick({ ...product })}>
        <img src={image} alt={name} className="product-card-img" />
        <div className="product-card-overlay">
            <span className="view-label">View Details</span>
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-code">{code}</p>
        <button 
          className="btn-add-cart-simple" 
          onClick={(e) => {
            e.stopPropagation();
            addToCart({ ...product });
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const AllClinicalInstruments = ({ type }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const categories = type === 'dental' ? dentalCategories : surgicalCategories;
  const title = type === 'dental' ? 'Full Dental Collection' : 'Full Surgical Collection';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  return (
    <div className="page-container">
      <div className="gallery-container">
        <div className="category-header-standalone">
          <Link to={`/products/${type}-instruments`} className="back-btn-minimal">
            &larr; Back to {type.charAt(0).toUpperCase() + type.slice(1)} Dashboard
          </Link>
          <h1 className="category-standalone-title">{title}</h1>
          <p className="category-standalone-subtitle">Explore our complete range of professional clinical instruments.</p>
          <div className="category-title-underline"></div>
        </div>

        {categories.map((cat, catIdx) => {
          const hash = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          // Placeholder items for each category
          const items = Array.from({ length: 4 }).map((_, idx) => ({
            name: `${cat} Item ${idx + 1}`,
            code: `${type === 'dental' ? 'D' : 'S'}-10-${100 + idx}`,
            image: `/images/instruments/${type}/${hash}.png`,
            elementId: `${hash}-${idx}`,
            category: type
          }));

          return (
            <div key={catIdx} className="category-section" id={hash}>
              <h2 className="category-heading">{cat}</h2>
              <div className="gallery-grid">
                {items.map((item, idx) => (
                  <ClinicalProductCard 
                    key={idx} 
                    product={item} 
                    onProductClick={(prod) => setSelectedProduct(prod)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ProductImageModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        imagePath={selectedProduct?.image || ''}
        productName={selectedProduct?.name}
        productCode={selectedProduct?.code}
        elementId={selectedProduct?.elementId}
        category={type}
      />
    </div>
  );
};

export default AllClinicalInstruments;
