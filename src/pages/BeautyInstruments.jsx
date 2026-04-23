import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductImageModal from '../components/ProductImageModal';
import { useCart } from '../context/CartContext';
import { beautyProductsData } from '../data/beautyProducts';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import './ProductGallery.css'; 
import '../components/BeautyShowcase.css'; 

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

  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    // Extract 4 random products for the showcase
    const allProducts = beautyProductsData.flatMap(cat => cat.items);
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 4));

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
      <div className="gallery-container">
        {/* Quick Navigation Section */}
        <div className="quick-nav-section">
          <h2 className="quick-nav-title">Select a Category</h2>
          <div className="quick-nav-grid">
            {beautyProductsData.map((category, idx) => {
              const hash = category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return (
                <Link 
                  key={idx} 
                  to={`/products/beauty-instruments/${hash}`}
                  className="quick-nav-card"
                >
                  <span className="quick-nav-name">{category.title}</span>
                  <div className="quick-nav-indicator"></div>
                </Link>
              );
            })}
          </div>
        </div>

        <div style={{ paddingTop: '10px' }}>
          {/* Detailed sections removed per user request - hub is now navigation-only */}
        </div>

        {/* Featured Products Section */}
        <section className="beauty-featured-showcase" style={{ marginTop: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '2rem' }}>
          <div className="showcase-header-flex">
            <div className="showcase-header-text">
              <h2 className="featured-title">Featured Beauty Products</h2>
              <p className="featured-subtitle">
                Made from the highest-grade German stainless steel
              </p>
            </div>
            <div>
              <Link to="/products/beauty-instruments/all" className="view-all-btn-outline">
                VIEW ALL PRODUCTS <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          <div className="showcase-grid">
            {randomProducts.map((product, index) => (
              <motion.div 
                key={`${product.code}-${index}`}
                className="showcase-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => handleProductClick({ ...product, category: 'beauty' })}
                style={{ cursor: 'pointer' }}
              >
                <div className="showcase-img-container">
                  <img src={product.image} alt={product.name} className="showcase-img" />
                  <div className="showcase-overlay">
                    <span className="showcase-label">{product.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
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
