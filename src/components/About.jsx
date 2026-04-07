import { motion } from 'framer-motion';
import { Award, ShieldCheck, Globe } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="glow-effect" style={{ top: '10%', left: '-10%' }}></div>
      <div className="glow-effect" style={{ bottom: '10%', right: '-10%', background: 'var(--secondary)' }}></div>
      
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="glass about-image-card">
              <img src="/about-bg.png" alt="Medical Precision Engineering" className="about-bg-img" />
              <div className="about-image-overlay"></div>
              <motion.div 
                className="about-stats"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="stat glass">
                  <h2 className="text-gradient">10k+</h2>
                  <p>Global Clients</p>
                </div>
                <div className="stat glass">
                  <h2 className="text-gradient">50+</h2>
                  <p>Years Experience</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h4 
              className="section-subtitle text-gradient"
              whileHover={{ scale: 1.05, originX: 0 }}
            >
              Since 1970
            </motion.h4>
            <h2 className="heading-md">ENGINEERING PRECISION. <br/>ELEVATING STANDARDS.</h2>
            <p className="about-description">
              Our legacy in manufacturing Surgical, Dental, and Beauty Instruments is defined by systematic, uncompromising precision. Embracing rapid technological advancement, our deeper commitment lies in crafting tools where quality remains our steadfast watchword. 
            </p>
            
            <div className="features">
              {[
                { icon: <Award size={24} />, title: 'Premium Quality', desc: 'Crafted with state-of-the-art tech.' },
                { icon: <ShieldCheck size={24} />, title: 'Certified Standards', desc: 'Rigorous international medical safety.' },
                { icon: <Globe size={24} />, title: 'Global Delivery', desc: 'Serving professionals worldwide.' }
              ].map((feat, index) => (
                <motion.div 
                  className="feature-item glass"
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, borderColor: 'var(--primary)' }}
                >
                  <div className="feature-icon">{feat.icon}</div>
                  <div>
                    <h4>{feat.title}</h4>
                    <p>{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
