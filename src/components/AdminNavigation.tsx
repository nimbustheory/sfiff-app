import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Film, 
  Calendar, 
  Ticket, 
  PartyPopper, 
  Send,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

export default function AdminNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAdmin } = useAdmin();

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/movies', icon: Film, label: 'Movies' },
    { path: '/admin/showtimes', icon: Calendar, label: 'Showtimes' },
    { path: '/admin/tickets', icon: Ticket, label: 'Tickets' },
    { path: '/admin/events', icon: PartyPopper, label: 'Events' },
    { path: '/admin/broadcast', icon: Send, label: 'Broadcast' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-sf-navy min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sf-red flex items-center justify-center">
            <Film size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold">SFIFF Admin</h1>
            <p className="text-white/50 text-xs">Management Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive(path)
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {/* Switch to Consumer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => {
            setIsAdmin(false);
            navigate('/');
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <ChevronLeft size={20} />
          <span className="font-medium">Back to App</span>
        </button>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sf-coral hover:bg-white/5 transition-all duration-200 mt-1"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
