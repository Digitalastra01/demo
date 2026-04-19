import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import './Hero.css';

const slides = [
  {
    id: 3,
    title: "Beauty Instruments",
    subtitle: "Flawless Execution",
    desc: "Professional-grade beauty and grooming tools engineered with medical precision for unparalleled performance.",
    image: "/beauty.png",
  },
  {
    id: 1,
    title: "Surgical Instruments",
    subtitle: "Precision Without Compromise",
    desc: "We complete almost all manufacturing processes within our state-of-the-art facilities, guaranteeing no compromise on the quality of our instruments.",
    image: "/surgical.png",
  },
  {
    id: 2,
    title: "Dental Instruments",
    subtitle: "Crafted for Perfection",
    desc: "Advanced machining and hand-finishing ensure every dental tool meets the highest global standards for precision and durability.",
    image: "/dental.png",
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
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
              
              <motion.p 
                className="slide-subtitle"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {slides[current].desc}
              </motion.p>
              
              <motion.div 
                className="hero-actions"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                {slides[current].title === "Beauty Instruments" ? (
                  <>
                    <motion.a 
                      href="/beauty-catalog.pdf" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0, 169, 157, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Catalog <ArrowRight size={18} />
                    </motion.a>
                    <motion.a 
                      href="/beauty-catalog.pdf" 
                      download
                      className="btn-outline"
                      whileHover={{ scale: 1.05, backgroundColor: 'var(--primary)', color: '#fff', borderColor: 'var(--primary)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Download PDF
                    </motion.a>
                  </>
                ) : (
                  <>
                    <motion.a 
                      href="#categories" 
                      className="btn-primary"
                      whileHover={{ scale: 1.05, boxShadow: '0 5px 15px rgba(0, 169, 157, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Catalog <ArrowRight size={18} />
                    </motion.a>
                    <motion.a 
                      href="#about" 
                      className="btn-outline"
                      whileHover={{ scale: 1.05, backgroundColor: 'var(--primary)', color: '#fff', borderColor: 'var(--primary)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                    </motion.a>
                  </>
                )}
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
