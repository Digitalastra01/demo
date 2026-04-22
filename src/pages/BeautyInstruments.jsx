import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductImageModal from '../components/ProductImageModal';
import { useCart } from '../context/CartContext';
import { beautyProductsData } from '../data/beautyProducts';
import './ProductGallery.css'; 

const BeautyProductCard = ({ product, onProductClick }) => {
  const { addToCart } = useCart();
  const { name, code, image } = product;
  const elementId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return (
    <div 
      id={elementId} 
      className="gallery-card" 
    >
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

const BeautyInstruments = () => {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const scrollToHash = () => {
      if (location.hash) {
        const id = decodeURIComponent(location.hash.replace('#', ''));
        const element = document.getElementById(id);
        if (element) {
          const offset = 120; // sticky navbar offset
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
          window.scrollTo(0, 0);
      }
    };

    // Small timeout to ensure DOM is rendered
    const timeoutId = setTimeout(scrollToHash, 200);
    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.hash]);

  return (
    <div className="page-container">
      <div className="gallery-container" style={{ paddingTop: '40px' }}>
        {beautyProductsData.map((category, catIdx) => (
          <div key={catIdx} className="category-section" id={category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}>
            <h2 className="category-heading">{category.title}</h2>
            <div className="gallery-grid">
              {category.items.map((item, idx) => (
                <BeautyProductCard 
                  key={idx} 
                  product={item} 
                  onProductClick={(prod) => handleProductClick({ ...prod, category: 'beauty' })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <ProductImageModal 
        isOpen={!!selectedProduct} 
        onClose={handleCloseModal}
        imagePath={selectedProduct?.image || ''}
        productName={selectedProduct?.name}
        productCode={selectedProduct?.code}
        elementId={selectedProduct?.elementId}
        category="beauty"
      />
    </div>
  );
};

export default BeautyInstruments;
