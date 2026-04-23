import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { beautyProductsData } from '../data/beautyProducts';
import ProductImageModal from '../components/ProductImageModal';
import { useCart } from '../context/CartContext';
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

const BeautyCategoryPage = () => {
  const { categoryId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Find the current category based on the ID
  const category = beautyProductsData.find(cat => 
    cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === categoryId
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!category) {
    return (
      <div className="page-container">
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
          <h2>Category not found</h2>
          <Link to="/products/beauty-instruments" className="btn-primary" style={{ marginTop: '2rem' }}>
            Back to All Instruments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="gallery-container">
        <div className="category-header-standalone">
          <Link to="/products/beauty-instruments" className="back-btn-minimal">
            &larr; Back to Beauty Instruments
          </Link>
          <h1 className="category-standalone-title">{category.title}</h1>
          <div className="category-title-underline"></div>
        </div>

        {category.items.length > 0 ? (
          <div className="gallery-grid">
            {category.items.map((item, idx) => (
              <BeautyProductCard 
                key={idx} 
                product={item} 
                onProductClick={(prod) => setSelectedProduct({ ...prod, category: 'beauty' })}
              />
            ))}
          </div>
        ) : (
          <div className="empty-category-msg">
            <p>No products currently available in this category. Please contact us for a detailed catalog.</p>
          </div>
        )}
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

export default BeautyCategoryPage;
