import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, FileText } from 'lucide-react';
import './Hero.css';

const slides = [
  {
    id: 3,
    title: "Beauty Instruments",
    subtitle: "Flawless Execution",
    desc: "H&H Manufacturing LLC was established in 1972 to fill the requirement of the time. Now we have achieved unparaller success which is no doubted dedicated to its hardworking employees, marketing and management expertise.",
    desc2: "To achieve the unique combination of skills and instruments of the finest Quality H&H has devised. H&H is producing & supplying the latest and most comprehensive range of manicure instruments.",
    image: "/beauty.png",
    catalogFile: "/beauty-catalog.pdf",
    features: [
      'Nail & Cuticle scissors',
      'Cuticle nippers',
      'Nail nippers',
      'Tweezers',
      'Instruments for professional application'
    ]
  },
  {
    id: 1,
    title: "Surgical Instruments",
    subtitle: "Precision Without Compromise",
    desc: "H&H Manufacturing LLC was established in 1972 to fill the requirement of the time. Now we have achieved unparaller success which is no doubted dedicated to its hardworking employees, marketing and management expertise.",
    desc2: "To achieve the unique combination of skills and instruments of the finest Quality H&H has devised. H&H is producing & supplying the latest and most comprehensive range of surgical instruments.",
    image: "/surgical.png",
    catalogFile: "/surgical-catalog.pdf",
    features: [
      'Scalpels & Knives',
      'Surgical Scissors',
      'Forceps & Tweezers',
      'Needle Holders',
      'Retractors'
    ]
  },
  {
    id: 2,
    title: "Dental Instruments",
    subtitle: "Crafted for Perfection",
    desc: "H&H Manufacturing LLC was established in 1972 to fill the requirement of the time. Now we have achieved unparaller success which is no doubted dedicated to its hardworking employees, marketing and management expertise.",
    desc2: "To achieve the unique combination of skills and instruments of the finest Quality H&H has devised. H&H is producing & supplying the latest and most comprehensive range of dental instruments.",
    image: "/dental.png",
    catalogFile: "/dental-catalog.pdf",
    features: [
      'Extracting Forceps',
      'Dental Elevators',
      'Scalers & Curettes',
      'Mouth Mirrors',
      'Orthodontic Pliers'
    ]
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000); // Slightly slower for reading
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="hero-slider">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={current}
          className="slide"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="slide-bg">
            <img src={slides[current].image} alt={slides[current].title} />
            <div className="slide-overlay"></div>
          </div>
          
          <div className="container slide-content">
            <motion.div 
              className="slide-text"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              <motion.h3 
                className="slide-toptext text-gradient" 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {slides[current].subtitle}
              </motion.h3>
              
              <motion.h1 
                className="slide-title"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {slides[current].title}
              </motion.h1>
              
              <div className="slide-desc-container">
                <motion.p 
                  className="slide-subtitle"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  {slides[current].desc}
                </motion.p>
                {slides[current].desc2 && (
                  <motion.p 
                    className="slide-subtitle second-desc"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  >
                    {slides[current].desc2}
                  </motion.p>
                )}
              </div>
              
              {slides[current].features && (
                <motion.div 
                  className="hero-features-grid"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                >
                  {slides[current].features.map((feature, idx) => (
                    <div key={idx} className="hero-feature-item">
                      <div className="hero-feature-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <a 
                        href={`/products/${slides[current].title.toLowerCase().replace(/ /g, '-')}#${feature.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                        className="hero-feature-link"
                      >
                        {feature}
                      </a>
                    </div>
                  ))}
                </motion.div>
              )}
              
              <motion.div 
                className="hero-actions"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {slides[current].catalogFile && (
                  <motion.a 
                    href={slides[current].catalogFile} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-catalog-link"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    <FileText size={16} />
                    <span>Download PDF Catalog</span>
                  </motion.a>
                )}

                <div className="hero-btn-group">
                  <motion.a 
                    href={`/products/${slides[current].title.toLowerCase().replace(' ', '-')}`} 
                    className="btn-hero-teal"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View More
                  </motion.a>
                  <motion.a 
                    href="#contact" 
                    className="btn-hero-grey"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Us
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="slider-controls">
        <motion.button 
          className="slider-btn prev-btn glass" 
          onClick={prevSlide}
          whileHover={{ scale: 1.1, backgroundColor: 'var(--primary)', color: '#000' }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={28} />
        </motion.button>
        <motion.button 
          className="slider-btn next-btn glass" 
          onClick={nextSlide}
          whileHover={{ scale: 1.1, backgroundColor: 'var(--primary)', color: '#000' }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={28} />
        </motion.button>
      </div>
      
      <div className="slider-dots">
        {slides.map((_, i) => (
          <motion.button 
            key={i} 
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            whileHover={{ scale: 1.3 }}
            animate={{ 
              width: i === current ? "30px" : "12px",
              backgroundColor: i === current ? "var(--primary)" : "rgba(255, 255, 255, 0.3)"
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
