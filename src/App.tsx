import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import Navigation from './components/Navigation';
import ConsumerHeader from './components/ConsumerHeader';
import AdminNavigation from './components/AdminNavigation';
import ScrollToTop from './components/ScrollToTop';
import DesktopWrapper from './components/DesktopWrapper';

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
import AdminVenues from './pages/admin/AdminVenues';
import AdminMembers from './pages/admin/AdminMembers';
import AdminSettings from './pages/admin/AdminSettings';

function AppContent() {
  const { isAdmin } = useAdmin();

  // Admin Layout — takes over the full browser window (not inside phone frame)
  if (isAdmin) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminNavigation />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/movies" element={<AdminMovies />} />
            <Route path="/admin/showtimes" element={<AdminShowtimes />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/venues" element={<AdminVenues />} />
            <Route path="/admin/tickets" element={<AdminTickets />} />
            <Route path="/admin/members" element={<AdminMembers />} />
            <Route path="/admin/broadcast" element={<AdminBroadcast />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="*" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Consumer Layout — rendered inside the DemoWrapper phone frame
  return (
    <DesktopWrapper>
      <div className="phone-scroll bg-sf-mist">
        <ConsumerHeader />
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
      <Navigation />
    </DesktopWrapper>
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
