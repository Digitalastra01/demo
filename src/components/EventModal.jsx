import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, X, Clock, Info, Upload } from 'lucide-react';
import './EventModal.css';

const EventModal = ({ event, onClose, onUpload }) => {
  const fileInputRef = useRef(null);

  if (!event) return null;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(event.id, file);
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div 
          className="modal-container glass"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>

          <div className="modal-layout">
            {/* Left Side: High-Impact Hero Poster */}
            <div className="modal-poster-side">
              <img src={event.banner} alt={event.title} className="modal-poster-img" />
              <div className="poster-overlay" style={{ background: `linear-gradient(to top, ${event.color}90, transparent)` }}></div>
              <div className="poster-content">
                <span className="poster-badge" style={{ background: `${event.color}30`, borderColor: `${event.color}50` }}>
                  {event.status}
                </span>
                <h2 className="poster-title">{event.title}</h2>
                <div className="poster-actions">
                  <button className="btn-glass" onClick={handleUploadClick}>
                    <Upload size={16} /> Update Poster
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Information & Details */}
            <div className="modal-details-side">
              <div className="details-scroll-area">
                <div className="details-header">
                  <h4 className="details-subtitle" style={{ color: event.color }}>Event Information</h4>
                  <p className="details-desc">Everything you need to know about the upcoming exhibition.</p>
                </div>

                <div className="details-info-grid">
                  <div className="detail-tile">
                    <div className="tile-icon" style={{ background: `${event.color}15`, color: event.color }}>
                      <Calendar size={20} />
                    </div>
                    <div className="tile-text">
                      <small>Date</small>
                      <p>{event.date}</p>
                    </div>
                  </div>

                  <div className="detail-tile">
                    <div className="tile-icon" style={{ background: `${event.color}15`, color: event.color }}>
                      <MapPin size={20} />
                    </div>
                    <div className="tile-text">
                      <small>Location</small>
                      <p>{event.location}</p>
                    </div>
                  </div>

                  <div className="detail-tile">
                    <div className="tile-icon" style={{ background: `${event.color}15`, color: event.color }}>
                      <Clock size={20} />
                    </div>
                    <div className="tile-text">
                      <small>Schedule</small>
                      <p>{event.schedule}</p>
                    </div>
                  </div>

                  <div className="detail-tile">
                    <div className="tile-icon" style={{ background: `${event.color}15`, color: event.color }}>
                      <Info size={20} />
                    </div>
                    <div className="tile-text">
                      <small>Booth Info</small>
                      <p>{event.booth}</p>
                    </div>
                  </div>
                </div>

                <div className="details-description">
                  <h4 style={{ color: event.color }}>About the event</h4>
                  <p>{event.fullDesc}</p>
                </div>
              </div>

              <div className="modal-footer-sticky">
                <button className="btn-close-main" onClick={onClose} style={{ background: event.color }}>
                  Acknowledged
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default EventModal;
