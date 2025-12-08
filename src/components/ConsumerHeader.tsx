import { useState } from 'react';
import { Bell, Settings, X, User, CreditCard, LogOut, Moon, Volume2, MapPin, ChevronRight, Check, Shield } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

export default function ConsumerHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { setIsAdmin } = useAdmin();

  const notifications = [
    { id: '1', title: 'Opening Night Tickets', message: 'Get your tickets for the 68th Annual Gala before they sell out!', time: '2h ago', type: 'promo', read: false },
    { id: '2', title: 'New Film Added', message: '"The Last Sunset" has been added to the festival lineup.', time: '5h ago', type: 'info', read: false },
    { id: '3', title: 'Screening Reminder', message: 'Your screening of "Bay Dreams" starts in 2 hours.', time: '1d ago', type: 'reminder', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/20">
        <div className="flex items-center justify-between px-3 py-2">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <img 
              src="/SFIFF-logo.png" 
              alt="SFIFF Logo" 
              className="h-10 w-auto object-contain"
              onError={(e) => {
                // Fallback if logo not found
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden text-sf-red font-bold text-xl">SF</div>
            <div className="flex flex-col leading-none">
              <span className="text-sf-navy font-bold text-xs tracking-wide">SAN FRANCISCO</span>
              <span className="text-sf-slate text-[10px] tracking-wide">International Film Festival</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsAdmin(true)}
              className="p-2 rounded-full hover:bg-sf-fog transition-colors"
              title="Admin Mode"
            >
              <Shield size={20} className="text-sf-navy" />
            </button>
            <button
              onClick={() => setShowNotifications(true)}
              className="relative p-2 rounded-full hover:bg-sf-fog transition-colors"
            >
              <Bell size={20} className="text-sf-navy" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-sf-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full hover:bg-sf-fog transition-colors"
            >
              <Settings size={20} className="text-sf-navy" />
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowNotifications(false)}
          />
          <div className="relative w-full max-w-[358px] bg-white rounded-2xl shadow-elevated-lg animate-fade-up overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-sf-fog">
              <h2 className="font-bold text-sf-navy">Notifications</h2>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 rounded-full hover:bg-sf-fog"
              >
                <X size={20} className="text-sf-slate" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 border-b border-sf-fog last:border-0 ${!notif.read ? 'bg-sf-red/5' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${!notif.read ? 'bg-sf-red' : 'bg-sf-slate/30'}`} />
                    <div className="flex-1">
                      <p className="font-semibold text-sf-navy text-sm">{notif.title}</p>
                      <p className="text-sf-slate text-xs mt-1">{notif.message}</p>
                      <p className="text-sf-slate/60 text-xs mt-2">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-sf-fog">
              <button className="w-full text-center text-sf-red text-sm font-semibold">
                Mark all as read
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          />
          <div className="relative w-full max-w-[390px] bg-white rounded-t-3xl shadow-elevated-lg animate-slide-up max-h-[85vh] overflow-y-auto">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-sf-slate/30 rounded-full" />
            </div>

            {/* Profile Section */}
            <div className="px-4 pb-4 border-b border-sf-fog">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sf-red to-sf-coral flex items-center justify-center">
                  <User size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sf-navy text-lg">Film Enthusiast</h3>
                  <p className="text-sf-slate text-sm">Premium Member</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sf-gold text-xs">★</span>
                    <span className="text-sf-slate text-xs">2,450 points</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Sections */}
            <div className="p-4 space-y-4">
              {/* Account */}
              <div>
                <h4 className="text-sf-slate text-xs font-semibold uppercase tracking-wider mb-2">Account</h4>
                <div className="bg-sf-fog/50 rounded-xl overflow-hidden">
                  <SettingsItem icon={User} label="Edit Profile" />
                  <SettingsItem icon={CreditCard} label="Payment Methods" />
                  <SettingsItem icon={MapPin} label="Saved Venues" />
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h4 className="text-sf-slate text-xs font-semibold uppercase tracking-wider mb-2">Preferences</h4>
                <div className="bg-sf-fog/50 rounded-xl overflow-hidden">
                  <SettingsToggle icon={Moon} label="Dark Mode" />
                  <SettingsToggle icon={Bell} label="Push Notifications" defaultOn />
                  <SettingsToggle icon={Volume2} label="Sound Effects" defaultOn />
                </div>
              </div>

              {/* Membership */}
              <div>
                <h4 className="text-sf-slate text-xs font-semibold uppercase tracking-wider mb-2">Membership</h4>
                <div className="bg-gradient-to-r from-sf-red to-sf-coral rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-xs">Current Plan</p>
                      <p className="font-bold text-lg">Premium</p>
                    </div>
                    <button className="px-3 py-1.5 bg-white/20 rounded-lg text-sm font-semibold">
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>

              {/* Admin Toggle */}
              <div>
                <h4 className="text-sf-slate text-xs font-semibold uppercase tracking-wider mb-2">Developer</h4>
                <div className="bg-sf-fog/50 rounded-xl overflow-hidden">
                  <button
                    onClick={() => {
                      setIsAdmin(true);
                      setShowSettings(false);
                    }}
                    className="w-full flex items-center justify-between p-3 hover:bg-sf-fog transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Settings size={18} className="text-sf-slate" />
                      <span className="text-sf-navy text-sm">Switch to Admin</span>
                    </div>
                    <ChevronRight size={18} className="text-sf-slate" />
                  </button>
                </div>
              </div>

              {/* Logout */}
              <button className="w-full flex items-center justify-center gap-2 p-3 text-sf-red font-semibold">
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SettingsItem({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button className="w-full flex items-center justify-between p-3 border-b border-white/50 last:border-0 hover:bg-sf-fog transition-colors">
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-sf-slate" />
        <span className="text-sf-navy text-sm">{label}</span>
      </div>
      <ChevronRight size={18} className="text-sf-slate" />
    </button>
  );
}

function SettingsToggle({ icon: Icon, label, defaultOn = false }: { icon: React.ElementType; label: string; defaultOn?: boolean }) {
  const [isOn, setIsOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className="w-full flex items-center justify-between p-3 border-b border-white/50 last:border-0 hover:bg-sf-fog transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-sf-slate" />
        <span className="text-sf-navy text-sm">{label}</span>
      </div>
      <div className={`w-10 h-6 rounded-full p-1 transition-colors ${isOn ? 'bg-sf-red' : 'bg-sf-slate/30'}`}>
        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isOn ? 'translate-x-4' : ''} flex items-center justify-center`}>
          {isOn && <Check size={10} className="text-sf-red" />}
        </div>
      </div>
    </button>
  );
}
