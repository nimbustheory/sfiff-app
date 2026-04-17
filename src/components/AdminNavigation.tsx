import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Film,
  Calendar,
  PartyPopper,
  MapPin,
  Ticket,
  Users,
  Send,
  Settings,
  LogOut,
  ArrowLeftToLine,
} from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

export default function AdminNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAdmin } = useAdmin();

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/movies', icon: Film, label: 'Films' },
    { path: '/admin/showtimes', icon: Calendar, label: 'Schedule' },
    { path: '/admin/events', icon: PartyPopper, label: 'Events' },
    { path: '/admin/venues', icon: MapPin, label: 'Venues' },
    { path: '/admin/tickets', icon: Ticket, label: 'Tickets' },
    { path: '/admin/members', icon: Users, label: 'Members' },
    { path: '/admin/broadcast', icon: Send, label: 'Broadcast' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className="flex flex-col min-h-screen"
      style={{
        width: 240,
        flexShrink: 0,
        background: '#10101A',
        borderRight: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#C4463A' }}>
            <Film size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[15px] leading-tight">SFIFF Admin</h1>
            <p className="text-white/50 text-[11px] tracking-wide">Management Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              isActive(path)
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={18} />
            <span className="font-medium text-[14px]">{label}</span>
          </button>
        ))}
      </nav>

      {/* Exit Admin */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <button
          onClick={() => {
            setIsAdmin(false);
            navigate('/');
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
          style={{ background: '#C4463A' }}
        >
          <ArrowLeftToLine size={18} />
          <span className="font-semibold text-[14px]">Exit Admin</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200">
          <LogOut size={18} />
          <span className="font-medium text-[14px]">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
