import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Film, Calendar, User, MoreHorizontal, X, PartyPopper, Star, HelpCircle, Info } from 'lucide-react';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  const mainNavItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/films', icon: Film, label: 'Films' },
    { path: '/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/events', icon: PartyPopper, label: 'Events' },
  ];

  const moreNavItems = [
    { path: '/membership', icon: User, label: 'Membership', desc: 'Benefits & rewards' },
    { path: '/festival', icon: Star, label: 'Festival', desc: '68th Annual SFIFF' },
    { path: '/support', icon: HelpCircle, label: 'Support', desc: 'FAQ & contact' },
    { path: '/about', icon: Info, label: 'About', desc: 'Our story' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isMoreActive = moreNavItems.some(item => location.pathname === item.path);

  return (
    <>
      {/* Bottom Navigation — pinned inside the phone frame (never scrolls) */}
      <nav className="absolute bottom-0 left-0 right-0 h-[60px] glass border-t border-white/20 z-50">
        <div className="flex items-center justify-around h-full py-2 px-1">
          {mainNavItems.map(({ path, icon: Icon, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 ${
                isActive(path) 
                  ? 'bg-sf-red/10 text-sf-red' 
                  : 'text-sf-slate hover:text-sf-navy'
              }`}
            >
              <Icon size={20} strokeWidth={isActive(path) ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
          <button
            onClick={() => setShowMore(true)}
            className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 ${
              isMoreActive || showMore
                ? 'bg-sf-red/10 text-sf-red' 
                : 'text-sf-slate hover:text-sf-navy'
            }`}
          >
            <MoreHorizontal size={20} strokeWidth={isMoreActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* More Menu Slide-up */}
      {showMore && (
        <div className="absolute inset-0 z-[60] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowMore(false)}
          />
          <div className="relative w-full bg-white rounded-t-3xl shadow-elevated-lg animate-slide-up">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-sf-slate/30 rounded-full" />
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowMore(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-sf-fog"
              aria-label="Close menu"
            >
              <X size={20} className="text-sf-slate" />
            </button>

            {/* Menu Items */}
            <div className="px-4 pb-8 pt-2 grid grid-cols-2 gap-3">
              {moreNavItems.map(({ path, icon: Icon, label, desc }) => (
                <button
                  key={path}
                  onClick={() => {
                    navigate(path);
                    setShowMore(false);
                  }}
                  className={`flex flex-col items-start p-4 rounded-2xl transition-all duration-200 ${
                    isActive(path)
                      ? 'bg-sf-red text-white'
                      : 'bg-sf-fog hover:bg-sf-fog/70'
                  }`}
                >
                  <Icon size={24} className={isActive(path) ? 'text-white' : 'text-sf-red'} />
                  <span className={`font-semibold mt-2 ${isActive(path) ? 'text-white' : 'text-sf-navy'}`}>
                    {label}
                  </span>
                  <span className={`text-xs mt-0.5 ${isActive(path) ? 'text-white/70' : 'text-sf-slate'}`}>
                    {desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
