import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';

// Context Providers
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider } from './context/AuthContext';
import { QuotationProvider } from './context/QuotationContext';
import { LanguageProvider } from './context/LanguageContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppFloatingBtn from './components/common/WhatsAppFloatingBtn';
import ScrollToTop from './components/common/ScrollToTop';

// Analytics
import { trackPageView } from './services/analytics';

// Public Pages
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import RequestQuotePage from './pages/RequestQuotePage';
import CustomManufacturingPage from './pages/CustomManufacturingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductFormPage from './pages/admin/AdminProductFormPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';
import AdminEnquiryDetailPage from './pages/admin/AdminEnquiryDetailPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Public Layout Wrapper
const PublicLayout = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pb-16 sm:pb-0">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatingBtn />
    </div>
  );
};

function App() {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <AuthProvider>
          <QuotationProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                {/* Public Website Routes */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="categories" element={<CategoriesPage />} />
                  <Route path="categories/:slug" element={<CategoriesPage />} />
                  <Route path="products" element={<CategoriesPage />} />
                  <Route path="products/:slug" element={<ProductDetailPage />} />
                  <Route path="request-quote" element={<RequestQuotePage />} />
                  <Route path="custom-manufacturing" element={<CustomManufacturingPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>

                {/* Admin Portal Authentication */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Admin Management Portal Protected Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="dashboard" element={<AdminDashboardPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                  <Route path="products/new" element={<AdminProductFormPage />} />
                  <Route path="products/edit/:id" element={<AdminProductFormPage />} />
                  <Route path="categories" element={<AdminCategoriesPage />} />
                  <Route path="enquiries" element={<AdminEnquiriesPage />} />
                  <Route path="enquiries/:id" element={<AdminEnquiryDetailPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>
              </Routes>
            </Router>
          </QuotationProvider>
        </AuthProvider>
      </LanguageProvider>
    </SettingsProvider>
  );
}

export default App;
