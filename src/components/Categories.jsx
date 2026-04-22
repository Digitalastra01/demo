import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, Stethoscope, Sparkles, FileText } from 'lucide-react';
import './Categories.css';

const categories = [
  {
    id: 'beauty',
    title: 'Beauty Instruments',
    desc: 'Professional hair cutting scissors, tweezers, and premium grooming kits for an elite finish.',
    icon: <Sparkles size={36} />,
    image: '/beauty.png',
    color: '#009688', // Refined Teal
    delay: 0.1,
    file: '/beauty-catalog.pdf',
    features: [
      'Cuticle Nippers',
      'Nail Nippers',
      'Pedicure Implements',
      'Manicure Scissors',
      'Eyelash Tweezers'
    ]
  },
  {
    id: 'surgical',
    title: 'Surgical Instruments',
    desc: 'Scalpels, Scissors, Forceps, Retractors, and specialized diagnostics sets crafted for life-saving precision.',
    icon: <Scissors size={36} />,
    image: '/surgical.png',
    color: '#009688', // Refined Teal
    delay: 0.3,
    file: '/surgical-catalog.pdf',
    features: [
      'Scalpels & Knives',
      'Surgical Scissors',
      'Forceps & Tweezers',
      'Needle Holders',
      'Retractors'
    ]
  },
  {
    id: 'dental',
    title: 'Dental Instruments',
    desc: 'Extracting forceps, Elevators, Orthodontic pliers ensuring perfect grip and performance.',
    icon: <Stethoscope size={36} />,
    image: '/dental.png',
    color: '#009688', // Refined Teal
    delay: 0.5,
    file: '/dental-catalog.pdf',
    features: [
      'Extracting Forceps',
      'Dental Elevators',
      'Scalers & Curettes',
      'Mouth Mirrors',
      'Orthodontic Pliers'
    ]
  }
];

const Categories = () => {
  return (
    <section id="categories" className="categories section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h4 className="section-subtitle text-gradient">Our Capabilities</h4>
          <h2 className="heading-md">EXPLORE OUR QUALITY</h2>
          <p className="section-desc">We offer a wide range of top tier instruments designed for performance, durability, and absolute precision under liquid smooth manufacturing workflows.</p>
        </motion.div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <motion.div 
              key={cat.id}
              className="category-card glass"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -10, scale: 1.02, boxShadow: '0 20px 40px rgba(15,23,42,0.08)' }}
              transition={{ 
                duration: 0.5, 
                delay: cat.delay
              }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ borderTop: `4px solid ${cat.color}` }}
            >
              <div className="cat-img-wrapper">
                <img src={cat.image} alt={cat.title} className="cat-img" />
                <div className="cat-img-overlay" style={{ background: `linear-gradient(to top, rgba(255,255,255,1), transparent)` }}></div>
              </div>
              <motion.div 
                className="cat-icon"
                whileHover={{ rotate: 10, scale: 1.1 }}
                style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
              >
                {cat.icon}
              </motion.div>
              <h3 className="cat-title">{cat.title}</h3>
              <p className="cat-desc">{cat.desc}</p>
              
              <div className="cat-content">
                <div className="cat-features-grid">
                  {cat.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <div className="feature-check" style={{ backgroundColor: cat.color }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      {cat.id === 'beauty' ? (
                        <Link 
                          to={`/products/beauty-instruments#${feature.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                          className="feature-text clickable-feature"
                        >
                          {feature}
                        </Link>
                      ) : (
                        <span className="feature-text">{feature}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="cat-actions-wrapper">
                  <div className="cat-actions">
                    <Link 
                      to={`/products/${cat.id}-instruments`} 
                      className="btn-view-more"
                      style={{ backgroundColor: cat.color }}
                      onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(0.9)'}
                      onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}
                    >
                      View More
                    </Link>
                    <a href="#contact" className="btn-contact-us">
                      Contact Us
                    </a>
                  </div>
                  {cat.file && (
                    <a 
                      href={cat.file} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-catalog-link"
                    >
                      <FileText size={16} />
                      <span>View Catalog</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Categories;
