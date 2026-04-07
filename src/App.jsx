import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DentalInstruments from './pages/DentalInstruments';
import SurgicalInstruments from './pages/SurgicalInstruments';

function App() {
  return (
    <Router>
      <div style={{ paddingTop: '90px' }}> {/* Add padding to prevent navbar overlap */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/dental-instruments" element={<DentalInstruments />} />
          <Route path="/products/surgical-instruments" element={<SurgicalInstruments />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
