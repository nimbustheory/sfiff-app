import { ReactNode } from 'react';
import { Shield } from 'lucide-react';

interface DesktopWrapperProps {
  children: ReactNode;
}

const features = [
  { title: 'Film Catalog', desc: 'Browse official selections with TMDB data' },
  { title: 'Schedule & Showtimes', desc: 'Full festival programming' },
  { title: 'Event Listings', desc: 'Parties, panels & special events' },
  { title: 'Festival Guide', desc: 'Venues, passes & award categories' },
  { title: 'Membership', desc: 'SF Film Society tiers & benefits' },
  { title: 'Smart Notifications', desc: 'Alerts & personalized updates' },
  { title: 'Interactive Venue Map', desc: 'Mapbox-powered navigation' },
  { title: 'Admin Dashboard', desc: 'Full CRM, analytics & broadcast tools' },
];

export default function DesktopWrapper({ children }: DesktopWrapperProps) {
  return (
    <div className="desktop-wrapper">
      {/* Dark background with film grain texture */}
      <div className="desktop-wrapper-bg">
        <div className="absolute inset-0 film-grain opacity-[0.03]" />
      </div>

      {/* Left Panel */}
      <aside className="desktop-panel desktop-panel-left">
        <div className="flex flex-col h-full justify-center max-w-xs">
          <p className="text-sf-gold text-xs font-medium tracking-[0.3em] mb-3">
            PROTOTYPE DEMO
          </p>

          <h1 className="font-display text-4xl font-bold text-white mb-1">
            SFIFF
          </h1>
          <p className="text-white/60 text-sm mb-6">
            Film Festival App
          </p>

          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <span className="mt-[7px] w-2 h-2 rounded-full bg-sf-gold flex-shrink-0" />
                <div>
                  <span className="text-white font-semibold text-sm">{f.title}</span>
                  <p className="text-white/40 text-xs mt-0.5">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <div className="w-12 h-px bg-white/20 mb-6" />
            <p className="text-white/30 text-xs tracking-[0.25em] font-medium">
              BUILT BY NIMBUS LABS
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile App Frame */}
      <div className="desktop-app-frame">
        {children}
      </div>

      {/* Right Panel */}
      <aside className="desktop-panel desktop-panel-right">
        <div className="flex flex-col items-start pt-4 max-w-xs">
          <div className="p-3 rounded-xl bg-sf-gold/20 text-sf-gold mb-4">
            <Shield size={24} />
          </div>

          <h3 className="text-white font-semibold text-sm leading-relaxed mb-2">
            Click the shield icon to toggle to the admin side of the app
          </h3>
          <p className="text-white/50 text-xs leading-relaxed">
            Manage films, events, tickets, showtimes & analytics
          </p>
        </div>
      </aside>
    </div>
  );
}
