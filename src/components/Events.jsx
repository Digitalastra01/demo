import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import EventModal from './EventModal';
import './Events.css';

const initialEvents = [
  {
    id: 1,
    title: "Medica Fair",
    date: "18-21 November 2026",
    location: "Düsseldorf, Germany",
    desc: "Leading International Trade Fair. Meet us at Dusseldorf, Germany to explore our premium instruments.",
    fullDesc: "Medica is the world's largest event for the medical sector. For more than 40 years it has been firmly established on every expert's calendar. Join us as we showcase our latest innovations in surgical and dental instrumentation.",
    schedule: "09:00 AM - 06:00 PM Daily",
    booth: "Hall 12, Booth B42",
    status: "Upcoming",
    color: "#0D9488",
    banner: "/events/medica_banner.png"
  },
  {
    id: 2,
    title: "FIME Fair",
    date: "23-25 June 2026",
    location: "Miami Beach, FL",
    desc: "Miami Beach Convention Center. Showcasing our premium range of precision instruments in the United States.",
    fullDesc: "FIME is the Americas' leading medical trade fair and exhibition, gathering thousands of medical device and equipment manufacturers and suppliers, dealers, distributors and other healthcare professionals from across the United States, Central, South America and the Caribbean.",
    schedule: "10:00 AM - 05:00 PM Daily",
    booth: "Booth #H-52",
    status: "Upcoming",
    color: "#0284C7",
    banner: "/events/fime_banner.png"
  }
];

const Events = () => {
  const [eventsList, setEventsList] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const fileInputRef = useRef(null);

  // Load persistent banners from localStorage on mount
  useEffect(() => {
    const savedBanners = localStorage.getItem('hnh_event_banners');
    if (savedBanners) {
      const bannerMap = JSON.parse(savedBanners);
      setEventsList(prev => prev.map(evt => ({
        ...evt,
        banner: bannerMap[evt.id] || evt.banner
      })));
    }
  }, []);

  const handleUpload = (id, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newBanner = e.target.result;
      
      // Update state
      setEventsList(prev => prev.map(evt => 
        evt.id === id ? { ...evt, banner: newBanner } : evt
      ));
      
      if (selectedEvent && selectedEvent.id === id) {
        setSelectedEvent(prev => ({ ...prev, banner: newBanner }));
      }

      // Update localStorage
      const savedBanners = localStorage.getItem('hnh_event_banners');
      const bannerMap = savedBanners ? JSON.parse(savedBanners) : {};
      bannerMap[id] = newBanner;
      localStorage.setItem('hnh_event_banners', JSON.stringify(bannerMap));

      alert("Poster updated and saved successfully!");
    };
    reader.readAsDataURL(file);
  };

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
          {eventsList.map((evt, i) => (
            <motion.div 
              key={evt.id}
              className="event-card glass"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.01, borderColor: evt.color, boxShadow: `0 10px 40px ${evt.color}20` }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="event-card-banner">
                <img src={evt.banner} alt={evt.title} />
                <div className="card-banner-overlay" style={{ background: `linear-gradient(to right, ${evt.color}20, transparent)` }}></div>
              </div>

              <div className="event-date">
                <Calendar size={28} style={{ color: evt.color, marginBottom: '0.5rem' }} />
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
                <button 
                  onClick={() => setSelectedEvent(evt)}
                  className="event-link-btn" 
                  style={{ color: evt.color }}
                >
                  View Details <ExternalLink size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
        onUpload={handleUpload}
      />
    </section>
  );
};

export default Events;
