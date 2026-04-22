import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Search, ChevronDown, ChevronRight, Activity, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { dentalCategories, surgicalCategories, beautyCategories } from '../data/categories';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0) {
      if (searchResults.length > 0) {
        const hash = searchResults[0].name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        navigate(`/products/${searchResults[0].type}-instruments#${hash}`);
        setIsSearchOpen(false);
        setSearchQuery("");
      } else {
        alert("No instruments found matching your search. Please try another term.");
      }
    } else {
      setIsSearchOpen(!isSearchOpen);
    }
  };

  const handleEmailClick = (e) => {
    if (!window.confirm("Do you want to open your email client to contact sales@hnhmanufacturing.com?")) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const results = [];
      dentalCategories.forEach(c => {
        if (c.toLowerCase().includes(q)) results.push({ name: c, type: 'dental' });
      });
      surgicalCategories.forEach(c => {
        if (c.toLowerCase().includes(q)) results.push({ name: c, type: 'surgical' });
      });
      beautyCategories.forEach(cat => {
        if (cat.toLowerCase().includes(q)) results.push({ name: cat, type: 'beauty' });
      });
      setSearchResults(results.slice(0, 8)); // Top 8 results
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const [expandedBeautyCategory, setExpandedBeautyCategory] = useState(null);

  const toggleBeautyCategory = (categoryName) => {
    setExpandedBeautyCategory(expandedBeautyCategory === categoryName ? null : categoryName);
  };

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
          <Link to="/">
            <img src="/logo.png" alt="H&H Manufacturing LLC" className="company-logo-img" />
          </Link>
        </div>
        
        {/* Right Nav Area */}
        <div className="nav-area">
          {/* Top Bar Info */}
          <div className="top-info-bar">
            <div className="info-item">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sales@hnhmanufacturing.com" 
                target="_blank" 
                rel="noreferrer" 
                onClick={handleEmailClick}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}
              >
                <Mail size={16} style={{ pointerEvents: 'none' }} />
                <span>sales@hnhmanufacturing.com</span>
              </a>
            </div>
            <div className="info-item separator-left">
              <a href="https://wa.me/917189648265" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ fill: '#fff', stroke: 'none', pointerEvents: 'none' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>+ 91 718 964 8265</span>
              </a>
            </div>
            <div className="info-item separator-left language-selector-wrapper" style={{ overflow: 'hidden' }}>
              <div id="google_translate_element"></div>
            </div>
            <div className="search-container" style={{ display: 'none', position: 'relative', alignItems: 'center', marginLeft: '1rem' }}>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    type="text"
                    placeholder="Search instruments..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearchSubmit();
                    }}
                    autoFocus
                  />
                )}
              </AnimatePresence>
              <motion.button 
                className="search-btn-circle" 
                aria-label="Search"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSearchSubmit}
                style={{ marginLeft: isSearchOpen ? '0.5rem' : '0' }}
              >
                {isSearchOpen ? <X size={16} color="var(--primary-dark)" /> : <Search size={16} color="var(--primary-dark)" />}
              </motion.button>
              
              <AnimatePresence>
                {isSearchOpen && searchResults.length > 0 && (
                  <motion.div 
                    className="search-dropdown"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {searchResults.map((res, i) => {
                      const hash = res.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return (
                        <Link 
                          key={i} 
                          to={`/products/${res.type}-instruments#${hash}`} 
                          className="search-result-item"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                        >
                          <Search size={12} style={{ marginRight: '8px', opacity: 0.6 }} />
                          <span className="search-result-text">{res.name}</span>
                          <span className="search-result-type">{res.type}</span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.button 
              className="search-btn-circle" 
              aria-label="Cart"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              style={{ marginLeft: '0.5rem', position: 'relative' }}
            >
              <ShoppingCart size={18} color="var(--primary-dark)" />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </motion.button>
            <motion.button 
              className="mobile-toggle" 
              onClick={() => setIsOpen(!isOpen)} 
              aria-label="Toggle Navigation"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
            </motion.button>
          </div>

          {/* Bottom Nav Links */}
          <div className="bottom-nav-bar desktop-menu">
            <a href="/#about" className="nav-link">About Us</a>
            <div className={`dropdown-container dropdown-hover ${location.pathname.includes('/beauty-instruments') ? 'active-nav-item' : ''}`}>
              <span className="nav-link">Beauty Instruments <ChevronDown size={14} /></span>
              <div className="dropdown-menu">
                {beautyCategories.map((cat, idx) => (
                  <Link 
                    key={idx} 
                    to={`/products/beauty-instruments#${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} 
                    className="dropdown-item"
                    onClick={() => setIsOpen(false)}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
            <div className={`dropdown-container dropdown-hover ${location.pathname.includes('/dental-instruments') ? 'active-nav-item' : ''}`}>
              <Link to="/products/dental-instruments" className="nav-link">Dental Instruments <ChevronDown size={14} /></Link>
              <div className="dropdown-menu">
                {dentalCategories.map((cat, idx) => (
                  <Link key={idx} to="/products/dental-instruments" className="dropdown-item">{cat}</Link>
                ))}
              </div>
            </div>
            <div className={`dropdown-container dropdown-hover ${location.pathname.includes('/surgical-instruments') ? 'active-nav-item' : ''}`}>
              <Link to="/products/surgical-instruments" className="nav-link">Surgical Instruments <ChevronDown size={14} /></Link>
              <div className="dropdown-menu">
                {surgicalCategories.map((cat, idx) => (
                  <Link key={idx} to="/products/surgical-instruments" className="dropdown-item">{cat}</Link>
                ))}
              </div>
            </div>
            <a href="#contact" className="nav-link">Contact Us</a>
          </div>
        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-overflow-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="mobile-menu-content">
               <div className="mobile-menu-header">
                  <div className="mobile-logo-wrapper">
                    <img src="/logo.png" alt="Logo" className="mobile-logo-small" />
                  </div>
                  <button className="mobile-menu-close" onClick={() => setIsOpen(false)}>

                    <X size={28} />
                  </button>
               </div>

               <div className="mobile-nav-links">
                  <a href="/#about" className="mobile-link" onClick={() => setIsOpen(false)}>About Us</a>
                  
                  {/* Beauty Instruments Accordion */}
                  <div className="mobile-accordion">
                    <button 
                      className={`mobile-accordion-trigger ${expandedBeautyCategory ? 'active' : ''}`}
                      onClick={() => setExpandedBeautyCategory(expandedBeautyCategory ? null : 'all')}
                    >
                      Beauty Instruments <ChevronDown size={18} className={expandedBeautyCategory ? 'rotate-180' : ''} />
                    </button>
                    <AnimatePresence>
                      {expandedBeautyCategory && (
                        <motion.div 
                          className="mobile-accordion-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          {beautyCategories.map((cat, idx) => (
                            <Link 
                              key={idx} 
                              to={`/products/beauty-instruments#${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} 
                              className="mobile-submenu-link"
                              onClick={() => setIsOpen(false)}
                            >
                              {cat}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link to="/products/dental-instruments" className="mobile-link" onClick={() => setIsOpen(false)}>Dental Instruments</Link>
                  <Link to="/products/surgical-instruments" className="mobile-link" onClick={() => setIsOpen(false)}>Surgical Instruments</Link>
                  <a href="#contact" className="mobile-link" onClick={() => setIsOpen(false)}>Contact Us</a>
               </div>

               <div className="mobile-menu-footer">
                  <div className="mobile-contact-info">
                    <a href="mailto:sales@hnhmanufacturing.com" className="mobile-contact-item">
                      <Mail size={18} color="var(--primary-light)" /> sales@hnhmanufacturing.com
                    </a>
                    <a href="https://wa.me/917189648265" className="mobile-contact-item">
                      <Phone size={18} color="var(--primary-light)" /> + 91 718 964 8265
                    </a>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
};

export default Navbar;
