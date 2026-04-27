import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductImageModal from '../components/ProductImageModal';
import { useCart } from '../context/CartContext';
import { dentalProductsData } from '../data/dentalProducts';
import { surgicalProductsData } from '../data/surgicalProducts';
import './ProductGallery.css';

const ClinicalProductCard = ({ product, onProductClick }) => {
  const { addToCart } = useCart();
  const { name, code, image } = product;
  const elementId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return (
    <div id={elementId} className="gallery-card">
      <div className="product-image-wrapper" onClick={() => onProductClick({ ...product, elementId })}>
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
            addToCart({ ...product, elementId });
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
  const productsData = type === 'dental' ? dentalProductsData : surgicalProductsData;
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

        {productsData.map((category, catIdx) => {
          const hash = category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

          return (
            <div key={catIdx} className="category-section" id={hash}>
              <h2 className="category-heading">{category.title}</h2>
              <div className="gallery-grid">
                {category.items.map((item, idx) => (
                  <ClinicalProductCard 
                    key={idx} 
                    product={{ ...item, category: type }} 
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

