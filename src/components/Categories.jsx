import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import './Categories.css';

const Categories = () => {
  // Categories data for reference
  const categories = [
    { id: 'beauty', title: 'Beauty Instruments', color: '#009688', file: '/beauty-catalog.pdf' },
    { id: 'surgical', title: 'Surgical Instruments', color: '#009688', file: '/surgical-catalog.pdf' },
    { id: 'dental', title: 'Dental Instruments', color: '#009688', file: '/dental-catalog.pdf' }
  ];

  return (
    <section id="categories" className="categories section">
      <div className="container">
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="section-subtitle">Excellence in Beauty</span>
          <h2 className="heading-md">EXPLORE OUR QUALITY PRODUCTS</h2>
          <p className="section-desc max-w-2xl mx-auto">
            Discover our premium range of professional instruments, designed for durability and absolute precision across all categories.
          </p>
        </motion.div>

        <div className="catalog-download-grid">
          {categories.map((cat) => (
            <a 
              key={cat.id}
              href={cat.file} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="catalog-card-simple"
              download
            >
              <div className="catalog-icon-bg" style={{ color: cat.color }}>
                <FileText size={20} />
              </div>
              <div className="catalog-info">
                <h4>{cat.title}</h4>
                <span>Download PDF Catalog</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
