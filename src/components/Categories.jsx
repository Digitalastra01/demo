import { motion } from 'framer-motion';
import { ArrowRight, Scissors, Stethoscope, Sparkles } from 'lucide-react';
import './Categories.css';

const categories = [
  {
    id: 'surgical',
    title: 'Surgical Instruments',
    desc: 'Scalpels, Scissors, Forceps, Retractors, and specialized diagnostics sets crafted for life-saving precision.',
    icon: <Scissors size={36} />,
    image: '/surgical.png',
    color: '#00F0FF',
    delay: 0.1
  },
  {
    id: 'dental',
    title: 'Dental Instruments',
    desc: 'Extracting forceps, Elevators, Orthodontic pliers ensuring perfect grip and performance.',
    icon: <Stethoscope size={36} />,
    image: '/dental.png',
    color: '#FF00E4',
    delay: 0.3
  },
  {
    id: 'beauty',
    title: 'Beauty Instruments',
    desc: 'Professional hair cutting scissors, tweezers, and premium grooming kits for an elite finish.',
    icon: <Sparkles size={36} />,
    image: '/beauty.png',
    color: '#7B2CBF',
    delay: 0.5
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
              whileHover={{ y: -15, scale: 1.03, boxShadow: `0 20px 40px ${cat.color}20`, borderColor: cat.color }}
              transition={{ 
                duration: 0.6, 
                delay: cat.delay,
                type: 'spring',
                stiffness: 100
              }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ borderTop: `2px solid ${cat.color}` }}
            >
              <div className="cat-img-wrapper">
                <img src={cat.image} alt={cat.title} className="cat-img" />
                <div className="cat-img-overlay" style={{ background: `linear-gradient(to top, var(--bg-card), transparent)` }}></div>
              </div>
              <motion.div 
                className="cat-icon"
                whileHover={{ rotate: 10, scale: 1.1 }}
                style={{ backgroundColor: `${cat.color}15`, color: cat.color, border: `1px solid ${cat.color}30` }}
              >
                {cat.icon}
              </motion.div>
              <h3 className="cat-title">{cat.title}</h3>
              <p className="cat-desc">{cat.desc}</p>
              
              <a href="#" className="cat-link" style={{ color: cat.color }}>
                View Catalog <ArrowRight size={18} />
              </a>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="section-header"
          style={{ marginTop: '8rem', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h4 className="section-subtitle text-gradient">Premium Quality</h4>
          <h2 className="heading-md">FEATURED PRODUCTS</h2>
          <p className="section-desc">Made from the highest-grade German stainless steel.</p>
        </motion.div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
          {["Ziegler (AMI-01-116)", "Ziegler (AMI-01-118)", "Ayre (AMI-01-122)", "ENT Set (AMI-01-156)", "McIntosh (AMI-01-160)"].map((product, i) => (
            <motion.div 
              key={product}
              className="glass"
              style={{ padding: '1rem 2rem', fontWeight: '600', borderRadius: '2rem', border: '1px solid var(--border-light)', cursor: 'pointer' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, borderColor: 'var(--primary)', boxShadow: '0 0 15px var(--primary-glow)' }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {product}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
