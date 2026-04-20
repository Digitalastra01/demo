import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductImageModal from '../components/ProductImageModal';
import { useCart } from '../context/CartContext';
import './DenseProductList.css'; 

const categories = [
  "Diagnostics, Anaesthesia and other Instruments",
  "Scalpels, Knives and Scalpel Handles",
  "Scissors",
  "Dissecting and Tissue Forceps",
  "Sponge, Dressing and Tissue Grasping Forceps",
  "Vessel Clips, Bulldog Clamps Haemostatic Forceps",
  "Ligature, Hysterectomy and Compression Forceps Vaginal Clamps",
  "Needle Holders, Suture Instruments",
  "Probes, Pocket Instruments Sets",
  "Wound Retractors",
  "Self Retaining Retractors, Abdominal Retractors",
  "Abdominal Surgery Intestinal and Rectal Instruments",
  "Gall Bladder liver and Spleen Instruments",
  "Genito Urinary Instruments and Trocars",
  "Vaginal Specula and Uterine Dilators",
  "Uterine Probes, Uterine Dressing, Polypus and Ovum Forceps",
  "Biopsy Instruments and Curettes",
  "Obstetrics and Tracheotomy",
  "Cardiovascular and Thoracic Surgery",
  "Bone Punches, Rongeurs",
  "Elevators, Bone Levers, Raspatories, Bone Files, Bone Curettes",
  "Mallets Chisels and Gouges",
  "Bone Holding Forceps, Bone Rongeurs, Bone Cutting Forceps",
  "Plaster Instruments",
  "Suction Instruments",
  "Scissors with Tungsten Carbide Inserts",
  "Dissecting Forceps with Tungsten Carbide Inserts",
  "Needle holders with Tungsten Carbide Inserts"
];

const SurgicalListItem = ({ name, idBase, idx, onProductClick }) => {
  const { addToCart } = useCart();
  const code = `S-${idBase}-${100 + idx}`;
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

const SurgicalInstruments = () => {
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
          <p>Home / Products / Surgical Instruments</p>
        </div>
      </div>

      <div className="dense-container">
        <div className="dense-list-grid">
          {categories.map((item, idx) => (
            <SurgicalListItem 
              key={idx} 
              name={item} 
              idBase="10" 
              idx={idx} 
              onProductClick={handleProductClick}
            />
          ))}
        </div>
      </div>

      <ProductImageModal 
        isOpen={!!selectedProduct} 
        onClose={handleCloseModal}
        imagePath={selectedProduct ? `/images/instruments/surgical/${selectedProduct.elementId}.png` : ''}
        productName={selectedProduct?.name}
        productCode={selectedProduct?.code}
        elementId={selectedProduct?.elementId}
      />
    </div>
  );
};

export default SurgicalInstruments;
