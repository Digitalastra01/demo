import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductImageModal from '../components/ProductImageModal';
import { useCart } from '../context/CartContext';
import { dentalProductsData } from '../data/dentalProducts';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import './ProductGallery.css'; 
import '../components/BeautyShowcase.css'; 

const DentalInstruments = () => {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Function to get 4 random dental products
    const getRandomDental = () => {
      const allProducts = dentalProductsData.flatMap(cat => cat.items);
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 4);
    };

    setFeaturedProducts(getRandomDental());

    // Refresh images every 8 seconds for a dynamic feel
    const interval = setInterval(() => {
      setFeaturedProducts(getRandomDental());
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.replace('#', ''));
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const offset = 120; // sticky navbar offset
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 150);
      }
    }
  }, [location.hash]);

  return (
    <div className="page-container">
      <div className="gallery-container">
        {/* Quick Navigation Section */}
        <div className="quick-nav-section">
          <h2 className="quick-nav-title">Select a Category</h2>
          <div className="quick-nav-grid">
            {dentalProductsData.map((category, idx) => {
              const hash = category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return (
                <Link 
                  key={idx} 
                  to={`/products/dental-instruments/${hash}`}
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
        <section className="featured-showcase-clinical" style={{ marginTop: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '2rem' }}>
          <div className="showcase-header-flex">
            <div className="showcase-header-text">
              <h2 className="featured-title">Featured Dental Products</h2>
              <p className="featured-subtitle">
                Advanced dental solutions for modern practices
              </p>
            </div>
            <div>
              <Link to="/products/dental-instruments/all" className="view-all-btn-outline">
                VIEW ALL PRODUCTS <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          <div className="showcase-grid">
            {featuredProducts.map((product, index) => {
              const elementId = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return (
                <motion.div 
                  key={`${product.code}-${index}`}
                  className="showcase-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => handleProductClick({ ...product, category: 'dental', elementId })}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="showcase-img-container">
                    <img src={product.image} alt={product.name} className="showcase-img" />
                    <div className="showcase-overlay">
                      <span className="showcase-label">{product.name}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
        category="dental"
      />
    </div>
  );
};

export default DentalInstruments;

