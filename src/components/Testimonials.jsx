import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    text: "Great quality! I Highly Recommended H&H Manufacturing LLC Beauty Instruments. I Purchased Many Years Manicure Instruments — These Kits Has Been Awesome.",
    author: "Nabeel Ahmed",
    role: "⭐⭐⭐⭐⭐",
    color: "#009688",
    initial: "N"
  },
  {
    id: 2,
    text: "The precision of their surgical instruments is unparalleled. We have reduced instrument fatigue during long procedures significantly thanks to their ergonomic designs.",
    author: "Dr. Sarah Jenkins",
    role: "⭐⭐⭐⭐⭐",
    color: "#0284C7",
    initial: "S"
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
          <span className="section-subtitle">What They Say</span>
          <h2 className="heading-md">TRUSTED BY PROFESSIONALS</h2>
          <p className="section-desc">Don't just take our word for it. Hear from leading professionals across the globe who rely on our tools daily.</p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((test, i) => (
            <motion.div 
              key={test.id}
              className="testimonial-card"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ '--card-accent': test.color }}
            >
              <Quote className="quote-icon" size={48} />
              <p className="test-text">"{test.text}"</p>
              <div className="test-author">
                <div 
                  className="author-avatar" 
                  style={{ background: `linear-gradient(135deg, ${test.color}, ${test.color}99)` }}
                >
                  {test.initial}
                </div>
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
