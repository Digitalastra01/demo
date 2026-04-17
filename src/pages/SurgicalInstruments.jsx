import './DentalInstruments.css';

const column1 = [
  "Diagnostics, Anaesthesia and other Instruments",
  "Dissecting and Tissue Forceps",
  "Ligature, Hysterectomy and Compression Forceps Vaginal Clamps",
  "Wound Retractors",
  "Gall Bladder liver and Spleen Instruments",
  "Uterine Probes, Uterine Dressing, Polypus and Ovum Forceps",
  "Cardiovascular and Thoracic Surgery",
  "Mallets Chisels and Gouges",
  "Suction Instruments",
  "Needle holders with Tungsten Carbide Inserts"
];

const column2 = [
  "Scalpels, Knives and Scalpel Handles",
  "Sponge, Dressing and Tissue Grasping Forceps",
  "Needle Holders, Suture Instruments",
  "Self Retaining Retractors, Abdominal Retractors",
  "Genito Urinary Instruments and Trocars",
  "Biopsy Instruments and Curettes",
  "Bone Punches, Rongeurs",
  "Bone Holding Forceps, Bone Rongeurs, Bone Cutting Forceps",
  "Scissors with Tungsten Carbide Inserts",
  "Wire Cutting Plier With T.C. Inserts"
];

const column3 = [
  "Scissors",
  "Vessel Clips, Bulldog Clamps Haemostatic Forceps",
  "Probes, Pocket Instruments Sets",
  "Abdominal Surgery Intestinal and Rectal Instruments",
  "Vaginal Specula and Uterine Dilators",
  "Obstetrics and Tracheotomy",
  "Elevators, Bone Levers, Raspatories, Bone Files, Bone Curettes",
  "Plaster Instruments",
  "Dissecting Forceps with Tungsten Carbide Inserts"
];

const ProductCard = ({ name, idBase, idx }) => {
  const code = `S-${idBase}-${100 + idx}`;
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

const SurgicalInstruments = () => {
  return (
    <div className="dental-page-container">
      {/* Breadcrumb Header */}
      <div className="breadcrumb-header">
        <div className="container">
          <p>Home / Products / Surgical Instruments</p>
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

export default SurgicalInstruments;
