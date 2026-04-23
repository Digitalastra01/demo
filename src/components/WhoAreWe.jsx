import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './WhoAreWe.css';

const WhoAreWe = () => {
  return (
    <section className="who-are-we section">
      <div className="container">
        <div className="who-are-we-grid">
          <motion.div 
            className="waw-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="waw-title">WHO ARE WE?</h2>
            <p className="waw-desc">
              Our experience in manufacturing of Manicure,Surgical, Dental Instruments, systematically,uncompromisingly and precisely.A second outcome is quality with the greater pace of technological advancement, and our deeper commitment to it.Quality is our watchword.
            </p>
            <Link to="/about-us" className="waw-btn">READ MORE</Link>
            <div className="waw-divider"></div>
          </motion.div>
            
          <motion.div 
            className="waw-image-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <img src="/Building.png" alt="Manufacturing Plant" className="waw-img" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
