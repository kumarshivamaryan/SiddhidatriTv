import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import EnquiryModal from './components/EnquiryModal';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/admin/AdminDashboard';
import { 
  fetchServices, 
  fetchCompanyInfo, 
  fetchFounders, 
  fetchTestimonials,
  defaultServicesData 
} from './services/api';

function App() {
  const [services, setServices] = useState(defaultServicesData);
  const [companyInfo, setCompanyInfo] = useState(null);
  
  // Enquiry Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openQuoteModal = (serviceTitle = '') => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  useEffect(() => {
    Promise.all([
      fetchServices(),
      fetchCompanyInfo(),
    ]).then(([sData, cData]) => {
      if (sData && sData.length > 0) setServices(sData);
      if (cData) setCompanyInfo(cData);
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#07070B] text-gray-100 flex flex-col selection:bg-[#BA0F18] selection:text-white">
        
        {/* Navigation */}
        <Navbar services={services} onOpenQuote={() => openQuoteModal()} />
        
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  services={services}
                  companyInfo={companyInfo}
                  onOpenQuote={openQuoteModal}
                />
              }
            />
            <Route path="/services/:slug" element={<ServiceDetail onOpenQuote={openQuoteModal} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact services={services} />} />
            
            {/* Admin Management Suite */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Global Floating Interactive Controls */}
        <WhatsAppButton />
        <EnquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          preselectedService={selectedService}
          services={services}
        />

        <Footer services={services} />
      </div>
    </Router>
  );
}

export default App;