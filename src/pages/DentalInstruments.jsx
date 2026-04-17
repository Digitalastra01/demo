import './DentalInstruments.css';

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

// Split the list manually to match the 3 column layout shown in the image exactly
const column1 = categories.slice(0, 1).concat(categories.slice(3, 4), categories.slice(6, 7), categories.slice(9, 10), categories.slice(12, 13), categories.slice(15, 16), categories.slice(18, 19), categories.slice(21, 22));

const column2 = categories.slice(1, 2).concat(categories.slice(4, 5), categories.slice(7, 8), categories.slice(10, 11), categories.slice(13, 14), categories.slice(16, 17), categories.slice(19, 20), categories.slice(22, 23));

const column3 = categories.slice(2, 3).concat(categories.slice(5, 6), categories.slice(8, 9), categories.slice(11, 12), categories.slice(14, 15), categories.slice(17, 18), categories.slice(20, 21), categories.slice(23, 24));

const ProductCard = ({ name, idBase, idx }) => {
  const code = `D-${idBase}-${100 + idx}`;
  return (
    <div className="product-card">
      <div className="image-container">
        <img src="/product_placeholder.png" alt={name} />
        <div className="action-buttons">
          <button className="icon-btn" aria-label="Add to cart" title="Add to Cart">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </button>
          <button className="icon-btn" aria-label="Quick view" title="Quick View">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
        </div>
      </div>
      <div className="info-container">
        <div className="product-name">{name}</div>
        <div className="product-code">{code}</div>
      </div>
    </div>
  );
};

const DentalInstruments = () => {
  return (
    <div className="dental-page-container">
      {/* Breadcrumb Header */}
      <div className="breadcrumb-header">
        <div className="container">
          <p>Home / Products / Dental Instruments</p>
        </div>
      </div>

      {/* Grid Content */}
      <div className="container">
        <div className="dental-grid-wrapper">
          
          <div className="instrument-column">
            {column1.map((item, idx) => (
              <ProductCard key={`col1-${idx}`} name={item} idBase="10" idx={idx} />
            ))}
          </div>
          
          <div className="instrument-column">
            {column2.map((item, idx) => (
              <ProductCard key={`col2-${idx}`} name={item} idBase="20" idx={idx} />
            ))}
          </div>

          <div className="instrument-column">
            {column3.map((item, idx) => (
              <ProductCard key={`col3-${idx}`} name={item} idBase="30" idx={idx} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DentalInstruments;
