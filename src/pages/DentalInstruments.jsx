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
              <div key={`col1-${idx}`} className="instrument-card">
                {item}
              </div>
            ))}
          </div>
          
          <div className="instrument-column">
            {column2.map((item, idx) => (
              <div key={`col2-${idx}`} className="instrument-card">
                {item}
              </div>
            ))}
          </div>

          <div className="instrument-column">
            {column3.map((item, idx) => (
              <div key={`col3-${idx}`} className="instrument-card">
                {item}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DentalInstruments;
