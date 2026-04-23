import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText } from 'lucide-react';
import './MainHero.css';

const MainHero = () => {
  const categories = [
    {
      id: 'beauty',
      title: 'BEAUTY',
      subtitle: 'INSTRUMENTS',
      image: '/beauty-main.png',
      link: '/products/beauty-instruments',
      catalog: '/beauty-catalog.pdf'
    },
    {
      id: 'surgical',
      title: 'SURGICAL',
      subtitle: 'INSTRUMENTS',
      image: '/surgical-main.png',
      link: '/products/surgical-instruments',
      catalog: '/surgical-catalog.pdf'
    },
    {
      id: 'dental',
      title: 'DENTAL',
      subtitle: 'INSTRUMENTS',
      image: '/dental-main.png',
      link: '/products/dental-instruments',
      catalog: '/dental-catalog.pdf'
    }
  ];

  return (
    <div className="main-hero-container">
      <div className="top-categories-grid">
        {categories.map((cat) => (
          <Link to={cat.link} key={cat.id} className="top-cat-card">
            <div className="top-cat-img-wrapper">
              <img src={cat.image} alt={cat.title} className="top-cat-img" />
            </div>
            <div className="top-cat-info">
              <h2 className="top-cat-title">{cat.title}</h2>
              <p className="top-cat-subtitle">{cat.subtitle}</p>
              
              <div className="top-cat-actions">
                <div className="top-cat-btn-primary">
                  View More
                </div>
                {cat.catalog && (
                  <a 
                    href={cat.catalog} 
                    className="top-cat-btn-outline" 
                    download
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FileText size={15} />
                    <span>Download Catalog</span>
                  </a>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default MainHero;
