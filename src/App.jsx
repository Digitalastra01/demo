import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DentalInstruments from './pages/DentalInstruments';
import SurgicalInstruments from './pages/SurgicalInstruments';

import BeautyInstruments from './pages/BeautyInstruments';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={{ paddingTop: '90px' }}> {/* Add padding to prevent navbar overlap */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/dental-instruments" element={<DentalInstruments />} />
            <Route path="/products/surgical-instruments" element={<SurgicalInstruments />} />
            <Route path="/products/beauty-instruments" element={<BeautyInstruments />} />
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
