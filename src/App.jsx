import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPages from './pages/AboutPages';
import ServicesPages from './pages/ServicesPages';
import UpdatesPages from './pages/UpdatesPages';
import ContactPages from './pages/ContactPages';
import SengaWayPage from './pages/SengaWayPage';

// Admin CMS Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AdminVacancies from './pages/admin/AdminVacancies';
import AdminLeads from './pages/admin/AdminLeads';
import AdminRoles from './pages/admin/AdminRoles';
import AdminPartners from './pages/admin/AdminPartners';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

function PublicLayout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0B132B]">
      <Navbar />
      <main id="main-content" key={`${location.pathname}${location.search}`} className="flex-1 page-transition">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  React.useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, search, hash]);

  return null;
}

export default function App() {
  return (
    <CMSProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/about/*" element={<PublicLayout><AboutPages /></PublicLayout>} />
          <Route path="/services/*" element={<PublicLayout><ServicesPages /></PublicLayout>} />
          <Route path="/updates/*" element={<PublicLayout><UpdatesPages /></PublicLayout>} />
          <Route path="/contact/*" element={<PublicLayout><ContactPages /></PublicLayout>} />
          <Route path="/quote" element={<PublicLayout><ContactPages forceSubpath="quote" /></PublicLayout>} />
          <Route path="/senga-way" element={<PublicLayout><SengaWayPage /></PublicLayout>} />

          {/* Admin Staff CMS Portal Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="vacancies" element={<AdminVacancies />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="roles" element={<AdminRoles />} />
            <Route path="partners" element={<AdminPartners />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </CMSProvider>
  );
}
