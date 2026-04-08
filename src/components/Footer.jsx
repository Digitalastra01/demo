import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import './Footer.css';

const FacebookIcon = () => (<svg xmlns="http://www.apache.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const InstagramIcon = () => (<svg xmlns="http://www.apache.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const LinkedinIcon = () => (<svg xmlns="http://www.apache.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-brand">
            <a href="#" className="footer-logo">H & H Manufacturing<span className="accent-dot">.</span></a>
            <p className="footer-desc">
              Setting international standards in precision instruments for dental, surgical, and beauty industries since our inception.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" target="_blank" rel="noreferrer"><FacebookIcon /></a>
              <a href="#" className="social-icon" target="_blank" rel="noreferrer"><InstagramIcon /></a>
              <a href="#" className="social-icon" target="_blank" rel="noreferrer"><LinkedinIcon /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-title">Quick Links</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#categories">Instruments</a></li>
              <li><a href="#">Certificates</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4 className="footer-title">Contact Us</h4>
            <ul>
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>[Temporary Address Line 1]<br />[Temporary Address Line 2]</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <span>[Temporary Phone Number]</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <span>WhatsApp: [Temporary WhatsApp]</span>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <a href="mailto:info@hhmanufacturing.com">info@hhmanufacturing.com</a>
              </li>
            </ul>
          </div>
          
          <div className="footer-newsletter">
            <h4 className="footer-title">Join Our Newsletter</h4>
            <p className="newsletter-desc">H & H Manufacturing was founded with a vision. A vision to set international standards of quality and customer service.</p>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Subscribed to the newsletter!"); }}>
              <div className="input-group">
                <input type="email" placeholder="Your email address" required />
                <motion.button 
                  type="submit" 
                  className="submit-btn" 
                  aria-label="Submit"
                  whileHover={{ scale: 1.1, backgroundColor: 'var(--primary-dark)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </form>
          </div>
          
          
        </div>
        
        <div className="footer-bottom">
          <p>Copyright @ 2026 H & H Manufacturing Corp All Rights Reserved. Designed & Developed By: Xperts</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
