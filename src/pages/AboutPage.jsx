import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, TrendingUp, Users, Settings, Briefcase } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  const machineryList = [
    "Auto Lathes (Browns & Sharp England)", "Lathe Machines", "Milling Machines",
    "Milling Machine No. 2 (Shipley England)", "Box Cutting Milling Machine (female set)",
    "Drill Machine 3-in-1", "Heavy Duty Herbert’s Shaper (England)",
    "Came Press (60, 40, 10 Tons)", "Spark Erosion Machine", "Surface Grinder",
    "Milling Machine No.1", "Single-use Drill Machine", "Tapping Machine",
    "Barrel Honing Machine", "Turret Lathe Automatic (Poland)",
    "Sheet Guillotine", "Sand Blast Machine", "Electronic Annealing Furnace",
    "Ultrasonic Cleaning Machines (Branson America)", "Hardness Tester",
    "CNC Wire Cut Machines", "CNC Universal Milling Machine QDM500",
    "Argon Welding Machine"
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            OUR LEGACY OF PRECISION
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            H&H Manufacturing Corporation: Pioneers in Surgical, Dental, and Beauty Instruments.
          </motion.p>
        </div>
      </section>

      {/* History Section */}
      <section className="about-history section">
        <div className="container">
          <div className="history-grid">
            <motion.div
              className="history-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">A Century of Excellence</h2>
              <p>
                H&H Manufacturing Corporation is a Manufacturer/Exporter and global distributor of surgical, dental, and orthopedic instruments and their allied branches and hospital supplies.
              </p>
              <p>
                Mr. Waqas started an enterprise which is known to be the pioneer in the manufacturing of surgical instruments before Pakistan came into being. Later, his son joined as a partner and founded the establishment as H&H Manufacturing Corporation.
              </p>
            </motion.div>
            <motion.div
              className="history-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src="/Building.png" alt="H&H Manufacturing Plant" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Today & Tomorrow */}
      <section className="about-vision section bg-light">
        <div className="container">
          <div className="vision-grid">
            <motion.div
              className="vision-card glass"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Award className="vision-icon" size={40} />
              <h3>TODAY</h3>
              <p>
                The company enjoys a worldwide reputation and maintains a global clientele including <strong>UNICEF</strong>, <strong>U.S. AID</strong>, <strong>Siemens</strong>, and <strong>Tomen Corporation</strong>. We have expanded our product line to include high-end manicure, pedicure, and precision beauty instruments.
              </p>
            </motion.div>

            <motion.div
              className="vision-card glass"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, delay: 0.2 }}
            >
              <TrendingUp className="vision-icon" size={40} />
              <h3>TOMORROW</h3>
              <p>
                Representing the third generation, we bring modern enthusiasm and technological integration to our ancestral business. We are <strong>ISO 9001:2008</strong> certified and continuously advancing our manufacturing standards.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manpower & Machinery */}
      <section className="about-stats section">
        <div className="container">
          <div className="stats-machinery-grid">
            <div className="manpower-area">
              <h2 className="section-title">Our Workforce</h2>
              <div className="manpower-stats">
                <div className="stat-item">
                  <span className="stat-num">35</span>
                  <span className="stat-label">Management</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">185</span>
                  <span className="stat-label">Skilled Manpower</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">30</span>
                  <span className="stat-label">Semiskilled</span>
                </div>
                <div className="stat-total stat-item">
                  <span className="stat-num">250+</span>
                  <span className="stat-label">Total Professionals</span>
                </div>
              </div>
            </div>

            <div className="machinery-area">
              <h2 className="section-title">Machinery & Infrastructure</h2>
              <div className="machinery-tags">
                {machineryList.map((machine, i) => (
                  <span key={i} className="machine-tag">{machine}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Products */}
      <section className="about-products section bg-dark text-white">
        <div className="container">
          <h2 className="section-title light text-center">Core Manufacturing Lines</h2>
          <div className="products-list-grid">
            {[
              "Beauty Care & Manicure", "Surgical (Single Use & Reusable)",
              "Orthopedic & Gynecology", "Microsurgery Instruments",
              "Specialized Forceps & Retractors", "Dental Instruments",
              "Veterinary Instruments"
            ].map((prod, i) => (
              <motion.div
                key={i}
                className="product-line-item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="dot"></div>
                {prod}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
