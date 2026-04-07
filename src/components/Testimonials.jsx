import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    text: "Great quality! I Highly Recommended Afzal Saeed Beauty Instruments. I Purchased Many Years Manicure Instruments These Kits Has Been Awesome.",
    author: "Nabeel Ahmed",
    role: "⭐⭐⭐⭐⭐",
    color: "var(--primary)"
  },
  {
    id: 2,
    text: "The precision of their surgical instruments is unparalleled. We have reduced instrument fatigue during long procedures significantly thanks to their ergonomic designs.",
    author: "Dr. Sarah Jenkins",
    role: "⭐⭐⭐⭐⭐",
    color: "var(--accent)"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h4 className="section-subtitle text-gradient">What They Say</h4>
          <h2 className="heading-md">TRUSTED BY PROFESSIONALS</h2>
          <p className="section-desc">Don't just take our word for it. Hear from leading professionals across the globe who rely on our tools daily.</p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((test, i) => (
            <motion.div 
              key={test.id}
              className="testimonial-card glass"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,240,255,0.1)' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ borderLeft: `3px solid ${test.color}` }}
            >
              <Quote className="quote-icon" style={{ color: test.color }} size={40} />
              <p className="test-text">"{test.text}"</p>
              <div className="test-author">
                <div className="author-info">
                  <h4 style={{ color: test.color }}>{test.author}</h4>
                  <span>{test.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
