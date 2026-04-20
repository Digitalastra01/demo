import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductImageModal from '../components/ProductImageModal';
import { useCart } from '../context/CartContext';
import './DenseProductList.css'; 

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
  "Endodontic Forcepes, Tissue Forcepes, Haemostatic Forcepes, Towel Clamps",
  "Retractors, Lip & Cheek Retractor, Hook, Depressor & Mouth Gags",
  "Orthodontic Plier & Cuters, Rongeur",
  "Needle Holders, Scissors, Micro Surgery Set",
  "Impression Trays",
  "Articulators, Hollow Wares",
  "Scissors, Dissecting Forceps, Needle Holders, Wire Cutting Pliers With Tungsten Carbide Inserts"
];

const DentalListItem = ({ name, idBase, idx, onProductClick }) => {
  const { addToCart } = useCart();
  const code = `D-${idBase}-${100 + idx}`;
  const elementId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return (
    <div 
      id={elementId} 
      className="dense-list-item clickable" 
      onClick={() => onProductClick({ name, code, elementId })}
    >
      <div className="item-main-info">
        <div className="item-name">{name}</div>
        <div className="item-code">{code}</div>
      </div>
      <div className="item-actions">
        <button 
          className="action-btn" 
          aria-label="View instrument" 
          title="View Instrument"
          onClick={(e) => {
            e.stopPropagation();
            onProductClick({ name, code, elementId });
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
        <button 
          className="action-btn" 
          aria-label="Add to cart" 
          title="Add to Cart" 
          onClick={(e) => {
            e.stopPropagation();
            addToCart({ name, code, elementId });
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
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
      {/* Breadcrumb Header */}
      <div className="breadcrumb-header">
        <div className="container">
          <p>Home / Products / Dental Instruments</p>
        </div>
      </div>

      <div className="dense-container">
        <div className="dense-list-grid">
          {categories.map((item, idx) => (
            <DentalListItem 
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
        imagePath={selectedProduct ? `/images/instruments/dental/${selectedProduct.elementId}.png` : ''}
        productName={selectedProduct?.name}
        productCode={selectedProduct?.code}
        elementId={selectedProduct?.elementId}
        category="dental"
      />
    </div>
  );
};

export default DentalInstruments;
