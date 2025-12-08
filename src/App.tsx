import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import Navigation from './components/Navigation';
import ConsumerHeader from './components/ConsumerHeader';
import AdminNavigation from './components/AdminNavigation';
import ScrollToTop from './components/ScrollToTop';

// Consumer Pages
import Home from './pages/Home';
import Films from './pages/Films';
import Schedule from './pages/Schedule';
import Events from './pages/Events';
import Membership from './pages/Membership';
import Festival from './pages/Festival';
import Support from './pages/Support';
import About from './pages/About';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMovies from './pages/admin/AdminMovies';
import AdminShowtimes from './pages/admin/AdminShowtimes';
import AdminTickets from './pages/admin/AdminTickets';
import AdminEvents from './pages/admin/AdminEvents';
import AdminBroadcast from './pages/admin/AdminBroadcast';

function AppContent() {
  const { isAdmin } = useAdmin();

  // Admin Layout - Full Width Desktop
  if (isAdmin) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminNavigation />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/movies" element={<AdminMovies />} />
            <Route path="/admin/showtimes" element={<AdminShowtimes />} />
            <Route path="/admin/tickets" element={<AdminTickets />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/broadcast" element={<AdminBroadcast />} />
            <Route path="*" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Consumer Layout - Mobile (Max 390px) with properly constrained navigation
  return (
    <div className="min-h-screen bg-sf-mist flex justify-center">
      <div className="w-full max-w-[390px] relative">
        <ConsumerHeader />
        <div className="pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/events" element={<Events />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/festival" element={<Festival />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/*" element={<Home />} />
          </Routes>
        </div>
        {/* Navigation is now positioned within the mobile container */}
        <Navigation />
      </div>
    </div>
  );
}

function App() {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AdminProvider>
  );
}

export default App;
