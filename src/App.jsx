import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DentalInstruments from './pages/DentalInstruments';
import SurgicalInstruments from './pages/SurgicalInstruments';

import BeautyInstruments from './pages/BeautyInstruments';
import Products from './pages/Products';
import AboutPage from './pages/AboutPage';
import BeautyCategoryPage from './pages/BeautyCategoryPage';
import InstrumentCategoryPage from './pages/InstrumentCategoryPage';
import AllBeautyInstruments from './pages/AllBeautyInstruments';
import AllClinicalInstruments from './pages/AllClinicalInstruments';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div style={{ paddingTop: '90px' }}> {/* Add padding to prevent navbar overlap */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/dental-instruments" element={<DentalInstruments />} />
            <Route path="/products/dental-instruments/all" element={<AllClinicalInstruments type="dental" />} />
            <Route path="/products/dental-instruments/:categoryId" element={<InstrumentCategoryPage type="dental" />} />
            <Route path="/products/surgical-instruments" element={<SurgicalInstruments />} />
            <Route path="/products/surgical-instruments/all" element={<AllClinicalInstruments type="surgical" />} />
            <Route path="/products/surgical-instruments/:categoryId" element={<InstrumentCategoryPage type="surgical" />} />
            <Route path="/products/beauty-instruments" element={<BeautyInstruments />} />
            <Route path="/products/beauty-instruments/:categoryId" element={<BeautyCategoryPage />} />
            <Route path="/products/beauty-instruments/all" element={<AllBeautyInstruments />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </div>
        <CartDrawer />
      </Router>
    </CartProvider>
  );
}

export default App;
