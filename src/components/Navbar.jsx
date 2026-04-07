import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'glass-nav' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container nav-content">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
        >
          <a href="#">Afzal Saeed<span className="accent-dot">.</span></a>
        </motion.div>
        
        <div className="desktop-menu">
          <motion.a whileHover={{ y: -2, color: 'var(--primary)' }} href="#about" className="nav-link">About Us</motion.a>
          <motion.a whileHover={{ y: -2, color: 'var(--primary)' }} href="#categories" className="nav-link">Instruments</motion.a>
          <motion.a whileHover={{ y: -2, color: 'var(--primary)' }} href="#certificates" className="nav-link">Certificates</motion.a>
          <motion.a whileHover={{ y: -2, color: 'var(--primary)' }} href="#contact" className="nav-link">Contact</motion.a>
        </div>

        <div className="nav-actions desktop-menu">
          <motion.a 
            href="https://wa.me/+923008611706" 
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone size={18} />
            Let's Talk
          </motion.a>
        </div>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-inner">
              <a href="#about" onClick={() => setIsOpen(false)}>About Us</a>
              <a href="#categories" onClick={() => setIsOpen(false)}>Instruments</a>
              <a href="#certificates" onClick={() => setIsOpen(false)}>Certificates</a>
              <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
              <a href="https://wa.me/+923008611706" className="btn-primary" style={{marginTop: '1rem', width: '100%', justifyContent: 'center'}}>
                <Phone size={18} /> Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
