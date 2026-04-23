import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const categories = [
    { name: 'Beauty Instruments', path: '/products/beauty-instruments' },
    { name: 'Surgical Instruments', path: '/products/surgical-instruments' },
    { name: 'Dental Instruments', path: '/products/dental-instruments' }
  ];

  return (
    <div className="products-page">
      <div className="breadcrumb-area">
        <div className="container">
          <p className="breadcrumb-text">
            <Link to="/">Home</Link> / Products /
          </p>
        </div>
      </div>

      <div className="products-selection-container">
        <div className="container">
          <div className="product-category-buttons">
            {categories.map((cat, idx) => (
              <Link key={idx} to={cat.path} className="category-btn-black">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
