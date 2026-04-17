import { ReactNode } from 'react';
import {
  Film,
  Calendar,
  PartyPopper,
  Star,
  UserCircle,
  Bell,
  MapPin,
  Shield,
  Sparkles,
  Link as LinkIcon,
  Heart,
} from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

interface DesktopWrapperProps {
  children: ReactNode;
}

const ACCENT = '#D4AF37';
const ACCENT_DARK = '#C4463A';
const BG_OUTER = '#08080E';
const BG_PANEL = '#10101A';
const BG_CARD = '#18182A';
const BORDER = 'rgba(255, 255, 255, 0.08)';
const TEXT_PRIMARY = '#F5F5F7';
const TEXT_SECONDARY = 'rgba(255, 255, 255, 0.62)';
const TEXT_MUTED = 'rgba(255, 255, 255, 0.38)';

const features = [
  { icon: Film, label: 'Film Catalog', description: 'Official selections, trailers and detailed film profiles' },
  { icon: Calendar, label: 'Schedule & Showtimes', description: 'Complete programming across the 11-day festival' },
  { icon: PartyPopper, label: 'Event Listings', description: 'Panels, parties, Q&As and opening-night galas' },
  { icon: Star, label: 'Festival Guide', description: 'Venue info, passes and award categories' },
  { icon: UserCircle, label: 'Membership', description: 'SFFILM member tiers and exclusive benefits' },
  { icon: Bell, label: 'Smart Notifications', description: 'Reminders for screenings and personalized alerts' },
  { icon: MapPin, label: 'Interactive Venue Map', description: 'Navigate Castro, Roxie, SFMOMA and partner theaters' },
  { icon: Shield, label: 'Admin Dashboard', description: 'CRM, scheduling, analytics and broadcast tools' },
];

type SalesCard = {
  icon: typeof Shield;
  title: string;
  description: string;
  showAdminButton?: boolean;
};

const salesCards: SalesCard[] = [
  {
    icon: Shield,
    title: 'Admin Dashboard',
    description:
      'Manage films, showtimes, events, ticketing and member communications from a single operations portal — purpose-built for the way SFIFF runs an 11-day festival.',
    showAdminButton: true,
  },
  {
    icon: Sparkles,
    title: 'Built for SFIFF',
    description:
      'Tailored to the San Francisco International Film Festival — the longest-running festival in the Americas. Surfaces Castro Theatre opening-night galas, Roxie indie premieres, SFMOMA screenings, Palace of Fine Arts features and every venue SFFILM curates each spring.',
  },
  {
    icon: LinkIcon,
    title: 'Seamless Integration',
    description:
      'Connects with SFFILM.org, existing ticketing and membership systems. Audiences move from the festival website into the app without losing passes, saved films or their place in the schedule.',
  },
  {
    icon: Heart,
    title: 'Audience Engagement',
    description:
      'Personalized schedules, push notifications for lineup drops and member-only perks keep cinephiles engaged long before the festival lights come up at the Castro.',
  },
];

export default function DesktopWrapper({ children }: DesktopWrapperProps) {
  const { setIsAdmin } = useAdmin();

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: BG_OUTER,
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
        color: TEXT_PRIMARY,
        position: 'relative',
        overflowY: 'auto',
      }}
    >
      {/* LEFT SIDEBAR */}
      <aside
        className="film-sidebar"
        style={{
          width: 320,
          flexShrink: 0,
          background: BG_PANEL,
          borderRight: `1px solid ${BORDER}`,
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 10,
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div style={{ padding: '20px 24px 0' }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: ACCENT,
              background: `${ACCENT}18`,
              padding: '5px 10px',
              borderRadius: 4,
            }}
          >
            Prototype Demo
          </span>
        </div>

        <div style={{ padding: '22px 24px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${ACCENT_DARK}, #8a2e25)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 700,
                color: '#fff',
                boxShadow: `0 4px 14px ${ACCENT_DARK}40`,
              }}
            >
              S
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 19,
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  color: TEXT_PRIMARY,
                }}
              >
                SFIFF
              </div>
              <div style={{ fontSize: 11, color: TEXT_SECONDARY, marginTop: 2 }}>
                San Francisco International Film Festival
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 24px', flex: 1 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: TEXT_MUTED,
              marginBottom: 12,
            }}
          >
            App Features
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    padding: '9px 10px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.03)',
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      background: `${ACCENT}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    <Icon size={14} color={ACCENT} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY }}>{f.label}</div>
                    <div
                      style={{
                        fontSize: 11,
                        color: TEXT_MUTED,
                        marginTop: 2,
                        lineHeight: 1.35,
                      }}
                    >
                      {f.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            padding: '18px 24px 22px',
            borderTop: `1px solid ${BORDER}`,
            marginTop: 20,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: TEXT_MUTED,
              textAlign: 'center',
            }}
          >
            Built by <span style={{ color: ACCENT }}>MUSEWORKS</span> — MUSEWORKS.ORG
          </div>
        </div>
      </aside>

      {/* CENTER: PHONE FRAME */}
      <main
        className="film-main"
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: 32,
          paddingBottom: 32,
          marginLeft: 320,
          marginRight: 340,
        }}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: 414,
              background: '#18181F',
              borderRadius: 44,
              padding: '12px 12px',
              boxShadow:
                '0 0 0 1px #2a2a34, 0 25px 60px rgba(0, 0, 0, 0.55), 0 0 120px rgba(212, 175, 55, 0.06)',
            }}
          >
            <div
              style={{
                width: 120,
                height: 6,
                background: '#2a2a34',
                borderRadius: 3,
                margin: '0 auto 8px',
              }}
            />
            <div
              style={{
                width: 390,
                height: 720,
                borderRadius: 40,
                overflow: 'hidden',
                background: '#F5F7FA',
                position: 'relative',
              }}
            >
              {children}
            </div>
            <div
              style={{
                width: 134,
                height: 5,
                background: '#3a3a44',
                borderRadius: 3,
                margin: '8px auto 4px',
              }}
            />
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside
        className="film-sidebar"
        style={{
          width: 340,
          flexShrink: 0,
          background: BG_PANEL,
          borderLeft: `1px solid ${BORDER}`,
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          overflowY: 'auto',
          padding: '24px 20px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {salesCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                style={{
                  background: BG_CARD,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 14,
                  padding: '18px 16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: `${ACCENT}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} color={ACCENT} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 18,
                      fontWeight: 600,
                      color: TEXT_PRIMARY,
                      margin: 0,
                    }}
                  >
                    {card.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontSize: 12.5,
                    color: TEXT_SECONDARY,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {card.description}
                </p>
                {card.showAdminButton && (
                  <button
                    onClick={() => setIsAdmin(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      width: '100%',
                      padding: '11px 0',
                      marginTop: 14,
                      borderRadius: 8,
                      border: 'none',
                      background: ACCENT_DARK,
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: 'pointer',
                      letterSpacing: '0.02em',
                    }}
                  >
                    <Shield size={16} /> Open Admin
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      <style>{`
        .film-sidebar::-webkit-scrollbar { display: none; }
        @media (max-width: 1100px) {
          .film-sidebar { display: none !important; }
          .film-main { margin-left: 0 !important; margin-right: 0 !important; }
        }
      `}</style>
    </div>
  );
}
