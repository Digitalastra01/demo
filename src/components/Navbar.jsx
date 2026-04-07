import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Search, ChevronDown, Activity } from 'lucide-react';
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
      className={`navbar-wrapper ${scrolled ? 'scrolled-nav' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-container">
        
        {/* Left Logo Area */}
        <div className="logo-area">
          <a href="#">
            <div className="logo-icon-wrapper">
              <Activity size={32} color="var(--primary-dark)" />
            </div>
            <div className="logo-text">
              <span className="logo-title text-gradient">H & H Manufacturing</span>
              <span className="logo-subtitle">Manufacturing Corp.</span>
            </div>
          </a>
        </div>
        
        {/* Right Nav Area */}
        <div className="nav-area">
          {/* Top Bar Info */}
          <div className="top-info-bar">
            <div className="info-item">
              <Mail size={16} />
              <a href="mailto:info@hhmanufacturing.com">info@hhmanufacturing.com</a>
            </div>
            <div className="info-item">
              <Phone size={16} />
              <span>[Temporary WhatsApp]</span>
            </div>
            <div className="info-item dropdown-container language-selector">
              <span>Select Language</span>
              <ChevronDown size={14} />
            </div>
            <button className="search-btn-circle" aria-label="Search">
              <Search size={16} color="var(--primary-dark)" />
            </button>
            <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation">
              {isOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
            </button>
          </div>

          {/* Bottom Nav Links */}
          <div className="bottom-nav-bar desktop-menu">
            <a href="#about" className="nav-link">About Us</a>
            <a href="#categories" className="nav-link">Beauty Instruments</a>
            <div className="dropdown-container">
              <a href="#categories" className="nav-link">Dental Instruments <ChevronDown size={14} /></a>
            </div>
            <div className="dropdown-container">
              <a href="#categories" className="nav-link">Surgical Instruments <ChevronDown size={14} /></a>
            </div>
            <a href="#certificates" className="nav-link">Certificates</a>
            <a href="#contact" className="nav-link">Contact Us</a>
          </div>
        </div>

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
               <a href="#categories" onClick={() => setIsOpen(false)}>Beauty Instruments</a>
               <a href="#categories" onClick={() => setIsOpen(false)}>Dental Instruments</a>
               <a href="#categories" onClick={() => setIsOpen(false)}>Surgical Instruments</a>
               <a href="#certificates" onClick={() => setIsOpen(false)}>Certificates</a>
               <a href="#contact" onClick={() => setIsOpen(false)}>Contact Us</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
