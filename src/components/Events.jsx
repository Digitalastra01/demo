import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import './Events.css';

const events = [
  {
    id: 1,
    title: "Medica Fair",
    date: "18-21 November 2026",
    location: "Düsseldorf, Germany",
    desc: "Leading International Trade Fair. Meet us at Dusseldorf, Germany to explore our premium instruments.",
    status: "Upcoming",
    color: "#0D9488"
  },
  {
    id: 2,
    title: "FIME Fair",
    date: "23-25 June 2026",
    location: "Miami Beach, FL",
    desc: "Miami Beach Convention Center. Showcasing our premium range of precision instruments in the United States.",
    status: "Upcoming",
    color: "#0284C7"
  }
];

const Events = () => {
  return (
    <section id="events" className="events section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h4 className="section-subtitle text-gradient">Connect With Us</h4>
          <h2 className="heading-md">EVENTS & EXHIBITIONS</h2>
          <p className="section-desc">Catch us at international trade shows and exhibitions to see our premium instruments firsthand.</p>
        </motion.div>

        <div className="events-list">
          {events.map((evt, i) => (
            <motion.div 
              key={evt.id}
              className="event-card glass"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02, x: 10, borderColor: evt.color, boxShadow: `0 10px 30px ${evt.color}15` }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="event-date">
                <Calendar size={28} style={{ color: evt.color, marginBottom: '1rem' }} />
                <span style={{ color: 'var(--text-main)' }}>{evt.date.split(' ')[0]}</span>
                <span className="month">{evt.date.split(' ')[1]} {evt.date.split(' ')[2]}</span>
              </div>
              
              <div className="event-content">
                <div className="event-meta">
                  <span className={`status badge-${evt.status.toLowerCase()}`} style={{ border: `1px solid ${evt.color}50`, color: evt.color, background: `${evt.color}10` }}>{evt.status}</span>
                  <div className="location">
                    <MapPin size={16} style={{ color: evt.color }} /> {evt.location}
                  </div>
                </div>
                <h3>{evt.title}</h3>
                <p>{evt.desc}</p>
                <a href="#" className="event-link" style={{ color: evt.color }}>
                  View Details <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
