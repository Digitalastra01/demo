import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductImageModal from '../components/ProductImageModal';
import { useCart } from '../context/CartContext';
import { beautyProductsData } from '../data/beautyProducts';
import './ProductGallery.css';

const BeautyProductCard = ({ product, onProductClick }) => {
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

const AllBeautyInstruments = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <div className="gallery-container">
        <div className="category-header-standalone">
          <Link to="/products/beauty-instruments" className="back-btn-minimal">
            &larr; Back to Beauty Dashboard
          </Link>
          <h1 className="category-standalone-title">Full Beauty Collection</h1>
          <p className="category-standalone-subtitle">Explore our complete range of professional beauty instruments.</p>
          <div className="category-title-underline"></div>
        </div>

        {beautyProductsData.map((category, catIdx) => (
          <div key={catIdx} className="category-section" id={category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}>
            <h2 className="category-heading">{category.title}</h2>
            <div className="gallery-grid">
              {category.items.map((item, idx) => (
                <BeautyProductCard 
                  key={idx} 
                  product={item} 
                  onProductClick={(prod) => setSelectedProduct({ ...prod, category: 'beauty' })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <ProductImageModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        imagePath={selectedProduct?.image || ''}
        productName={selectedProduct?.name}
        productCode={selectedProduct?.code}
        elementId={selectedProduct?.elementId}
        category="beauty"
      />
    </div>
  );
};

export default AllBeautyInstruments;
