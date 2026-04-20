import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductImageModal from '../components/ProductImageModal';
import { useCart } from '../context/CartContext';
import './DenseProductList.css'; 

const categoriesData = [
  {
    title: "Manicure",
    id: "manicure",
    items: [
      "Nail Clippers (Straight / Curved)",
      "Cuticle Nippers",
      "Cuticle Pushers",
      "Nail Scissors",
      "Nail Files (Metal / Glass / Emery Board)",
      "Nail Buffers",
      "Nail Cleaners",
      "Cuticle Knives",
      "Nail Lifter / Ingrown Nail Tools"
    ]
  },
  {
    title: "Pedicure",
    id: "pedicure",
    items: [
      "Heavy Duty Nail Clippers",
      "Corn Cutters",
      "Callus Removers",
      "Foot Files / Rasps",
      "Heel Scrapers",
      "Ingrown Nail Tools",
      "Pedicure Knives / Blades"
    ]
  },
  {
    title: "Eyelash & Eyebrow",
    id: "eyelash-eyebrow",
    items: [
      "Eyebrow Tweezers (Slant / Pointed / Flat)",
      "Eyelash Curlers",
      "Eyebrow Scissors",
      "Lash Applicators",
      "Brow Razors",
      "Eyebrow Trimmers"
    ]
  },
  {
    title: "Hair Removal",
    id: "hair-removal",
    items: [
      "Facial Razors",
      "Dermaplaning Tools",
      "Waxing Spatulas (Metal)",
      "Epilators (Manual tools)",
      "Threading Tools (Spring type)"
    ]
  },
  {
    title: "Skin Care",
    id: "skin-care",
    items: [
      "Blackhead Removers / Comedone Extractors",
      "Acne Needles",
      "Facial Rollers (Metal/Stone handle tools)",
      "Skin Scrapers",
      "Pimple Extractors",
      "Derma Rollers"
    ]
  }
];

const BeautyListItem = ({ name, idBase, idx, onProductClick }) => {
  const { addToCart } = useCart();
  const code = `B-${idBase}-${100 + idx}`;
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
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const offset = 120; // Accounting for sticky navbar
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
          <p>Home / Products / Beauty Instruments</p>
        </div>
      </div>

      <div className="dense-container">
        <div className="dense-list-grid">
          {categoriesData.map((cat, catIdx) => (
            cat.items.map((item, idx) => (
              <BeautyListItem 
                key={`${catIdx}-${idx}`} 
                name={item} 
                idBase={`${catIdx + 1}0`} 
                idx={idx} 
                onProductClick={handleProductClick}
              />
            ))
          ))}
        </div>
      </div>

      <ProductImageModal 
        isOpen={!!selectedProduct} 
        onClose={handleCloseModal}
        imagePath={selectedProduct ? `/images/instruments/beauty/${selectedProduct.elementId}.png` : ''}
        productName={selectedProduct?.name}
        productCode={selectedProduct?.code}
        elementId={selectedProduct?.elementId}
      />
    </div>
  );
};

export default BeautyInstruments;
