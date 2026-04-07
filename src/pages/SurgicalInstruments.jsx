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

export default SurgicalInstruments;
