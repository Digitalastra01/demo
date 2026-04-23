import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { beautyProductsData } from '../data/beautyProducts';
import './BeautyShowcase.css';

const BeautyShowcase = () => {
  const [randomImages, setRandomImages] = useState([]);

  useEffect(() => {
    // Extract all products with images into a flat list
    const allProducts = beautyProductsData.flatMap(cat => cat.items);
    
    // Function to get 4 random products
    const getRandomImages = () => {
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 4);
    };

    // Initial random images
    setRandomImages(getRandomImages());

    // Optional: Refresh images every 8 seconds for a dynamic feel
    const interval = setInterval(() => {
      setRandomImages(getRandomImages());
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="beauty-showcase section">
      <div className="container">
        <div className="showcase-header-flex">
          <motion.div 
            className="showcase-header-text"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="featured-title">Featured Products</h2>
            <p className="featured-subtitle">
              Made from the highest-grade German stainless steel
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/products/beauty-instruments" className="view-all-btn-outline">
              VIEW ALL PRODUCTS <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="showcase-grid">
          {randomImages.map((product, index) => (
            <motion.div 
              key={`${product.code}-${index}`}
              className="showcase-item"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="showcase-img-container">
                <img src={product.image} alt={product.name} className="showcase-img" />
                <div className="showcase-overlay">
                  <span className="showcase-label">{product.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeautyShowcase;
