import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductImageModal from '../components/ProductImageModal';
import { useCart } from '../context/CartContext';
import './ProductGallery.css'; 

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
      <div className="gallery-container" style={{ paddingTop: '50px' }}>
        <div className="gallery-grid">
          {categories.map((item, idx) => (
            <DentalProductCard 
              key={idx} 
              name={item} 
              idBase="10" 
              idx={idx} 
              onProductClick={(prod) => handleProductClick({ ...prod, category: 'dental' })}
            />
          ))}
        </div>
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
