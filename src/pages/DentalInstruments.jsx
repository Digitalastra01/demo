import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductImageModal from '../components/ProductImageModal';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import './ProductGallery.css'; 
import '../components/BeautyShowcase.css'; 

// Only including categories that have existing images on the server
const categories = [
  "Extracting Forceps",
  "Extracting Forceps English Pattern",
  "Elevators",
  "Endodontic Condensers, Obturation Instruments, Excavators, Probes",
  "Amalgam Pluggers Condensers, Burnishers",
  "Wax Carvers, Carvers, Chisels",
  "Composite Placement, Plastic Filling Instruments",
  "Curettes, Gracey Curettes, Dental Products",
  "Wax Porcelain and Cement Instruments Wax & Modeling Instruments",
  "Spatulas, Cement Spatulas",
  "Files, Hoes, Knives, Wax & Plaster Knives",
  "Bone Curettes, Bone Files, Bone Chisels, Bone Mallets",
  "Crown Removers, Crown Instruments",
  "Implants & Measuring",
  "Amalgam Guns & Carriers, Retainers, Bands, Strip Holders, Napkin",
  "Rubber Dam Instruments, Rubber Dam Clamps",
  "Syringes, Tweezers, Sterilizing & Lab",
  "Retractors, Lip & Cheek Retractor, Hook, Depressor & Mouth Gags"
];

const DentalProductCard = ({ name, idBase, idx, onProductClick }) => {
  const { addToCart } = useCart();
  const code = `D-${idBase}-${100 + idx}`;
  const elementId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const imagePath = `/images/instruments/dental/${elementId}.png`;
  
  return (
    <div 
      id={elementId} 
      className="gallery-card" 
    >
      <div className="product-image-wrapper" onClick={() => onProductClick({ name, code, elementId, image: imagePath })}>
        <img 
          src={imagePath} 
          alt={name} 
          className="product-card-img"
        />
        <div className="product-card-overlay">
            <span className="view-label">View Category</span>
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-code">{code}</p>
        <button 
          className="btn-add-cart-simple" 
          onClick={(e) => {
            e.stopPropagation();
            addToCart({ name, code, elementId, image: imagePath });
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

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
      const shuffled = [...categories].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 4).map((cat, idx) => {
        const elementId = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return {
          name: cat,
          code: `D-10-${100 + idx}`,
          image: `/images/instruments/dental/${elementId}.png`,
          elementId
        };
      });
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
      const id = location.hash.replace('#', '');
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
            {categories.map((cat, idx) => {
              const hash = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return (
                <Link 
                  key={idx} 
                  to={`/products/dental-instruments/${hash}`}
                  className="quick-nav-card"
                >
                  <span className="quick-nav-name">{cat}</span>
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
            {featuredProducts.map((product, index) => (
              <motion.div 
                key={`${product.code}-${index}`}
                className="showcase-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => handleProductClick({ ...product, category: 'dental' })}
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
        category="dental"
      />
    </div>
  );
};

export default DentalInstruments;
