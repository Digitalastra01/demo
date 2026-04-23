import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dentalCategories, surgicalCategories } from '../data/categories';
import ProductImageModal from '../components/ProductImageModal';
import { useCart } from '../context/CartContext';
import './ProductGallery.css';

const ProductCard = ({ product, onProductClick, type }) => {
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

const InstrumentCategoryPage = ({ type }) => {
  const { categoryId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const categoryList = type === 'dental' ? dentalCategories : surgicalCategories;
  const categoryName = categoryList.find(cat => 
    cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === categoryId
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!categoryName) {
    return (
      <div className="page-container">
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h2>Category not found</h2>
          <Link to={`/products/${type}-instruments`} className="btn-primary" style={{ marginTop: '2rem' }}>
            Back to Instruments
          </Link>
        </div>
      </div>
    );
  }

  // Generate placeholder items for display (since we don't have a full JSON DB for surgical/dental yet)
  const items = Array.from({ length: 12 }).map((_, idx) => {
    const elementId = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const prefix = type === 'dental' ? 'D' : 'S';
    return {
      name: `${categoryName} Item ${idx + 1}`,
      code: `${prefix}-10-${100 + idx}`,
      image: `/images/instruments/${type}/${elementId}.png`,
      elementId: `${elementId}-${idx}`,
      category: type
    };
  });

  return (
    <div className="page-container">
      <div className="gallery-container">
        <div className="category-header-standalone">
          <Link to={`/products/${type}-instruments`} className="back-btn-minimal">
            &larr; Back to {type.charAt(0).toUpperCase() + type.slice(1)} Instruments
          </Link>
          <h1 className="category-standalone-title">{categoryName}</h1>
          <div className="category-title-underline"></div>
        </div>

        <div className="gallery-grid">
          {items.map((item, idx) => (
            <ProductCard 
              key={idx} 
              product={item} 
              type={type}
              onProductClick={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>
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

export default InstrumentCategoryPage;
