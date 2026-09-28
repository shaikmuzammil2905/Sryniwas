import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileActionBar from './components/MobileActionBar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import WhyUs from './pages/WhyUs';
import Contact from './pages/Contact';
import BookConsultation from './pages/BookConsultation';
import VastuPosters from './pages/VastuPosters';
import VastuPosterDetail from './pages/VastuPosterDetail';
import VastuPostersAdmin from './pages/VastuPostersAdmin';
import SplashScreen from './components/SplashScreen';
import { CartProvider } from './context/CartContext';
import './index.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <CartProvider>
        {loading && <SplashScreen finishLoading={() => setLoading(false)} />}

        <ScrollToTop />
        <div className="app-container">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/why-us" element={<WhyUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book-consultation" element={<BookConsultation />} />
              <Route path="/vastu-posters" element={<VastuPosters />} />
              <Route path="/vastu-posters/:slug" element={<VastuPosterDetail />} />
              <Route path="/admin/vastu-posters" element={<VastuPostersAdmin />} />
            </Routes>
          </main>
          <Footer />
          <MobileActionBar />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;