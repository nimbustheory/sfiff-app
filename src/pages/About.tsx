import { useEffect, useRef, useState } from 'react';
import { Film, MapPin, Users, Mail } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

// MapBox GL JS
declare global {
  interface Window {
    mapboxgl: any;
  }
}

export default function About() {
  const { venues } = useAdmin();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);

  useEffect(() => {
    // Load MapBox script if not already loaded
    if (!window.mapboxgl) {
      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js';
      script.onload = () => {
        initMap();
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const initMap = () => {
    if (!mapContainer.current || !window.mapboxgl) return;

    window.mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    map.current = new window.mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-122.4194, 37.7749],
      zoom: 12,
    });

    map.current.addControl(new window.mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      
      addMarkers();
    });
  };

  const addMarkers = () => {
    if (!map.current || !window.mapboxgl) return;

    venues.forEach(venue => {
      if (venue.lat && venue.lng) {
        const el = document.createElement('div');
        el.className = 'venue-marker';
        el.style.cssText = `
          width: 32px;
          height: 32px;
          background: #C4463A;
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        el.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>`;

        const popup = new window.mapboxgl.Popup({ offset: 25, closeButton: false })
          .setHTML(`
            <div style="padding: 8px; font-family: 'Source Sans 3', sans-serif;">
              <strong style="color: #1E3A5F; font-size: 14px;">${venue.name}</strong>
              <p style="color: #64748B; font-size: 12px; margin: 4px 0 0;">${venue.address}</p>
            </div>
          `);

        new window.mapboxgl.Marker(el)
          .setLngLat([venue.lng, venue.lat])
          .setPopup(popup)
          .addTo(map.current);

        el.addEventListener('click', () => {
          setSelectedVenue(venue.id);
        });
      }
    });
  };

  const leadership = [
    { name: 'Anne Lai', role: 'Executive Director' },
    { name: 'Jessie Fairbanks', role: 'Director of Programming' },
    { name: 'Rachel Rosen', role: 'Director of Programming' },
    { name: 'Keith Arnold', role: 'Director of Operations' },
  ];

  const milestones = [
    { year: '1957', event: 'Festival founded' },
    { year: '1969', event: 'First Golden Gate Awards' },
    { year: '1988', event: 'Moved to Castro Theatre' },
    { year: '2025', event: '68th Annual Festival' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative h-48 bg-gradient-to-br from-sf-navy to-sf-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,...')] bg-repeat" />
        </div>
        <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
          <Film size={36} className="mb-2 text-sf-coral" />
          <h1 className="display-text text-2xl">Our Story</h1>
          <p className="text-white/70 text-sm mt-1">68 years of world cinema in San Francisco</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-3 py-4 -mt-6 relative z-10">
        <div className="bg-white rounded-xl shadow-elevated p-3 grid grid-cols-4 gap-2">
          <div className="text-center">
            <p className="font-bold text-sf-navy text-lg">1957</p>
            <p className="text-sf-slate text-[10px]">Founded</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-sf-navy text-lg">68</p>
            <p className="text-sf-slate text-[10px]">Years</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-sf-navy text-lg">5K+</p>
            <p className="text-sf-slate text-[10px]">Films</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-sf-navy text-lg">1M+</p>
            <p className="text-sf-slate text-[10px]">Attendees</p>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="px-3 py-3">
        <h2 className="display-text text-lg text-sf-navy mb-2">History</h2>
        <p className="text-sf-slate text-sm leading-relaxed mb-3">
          Founded in 1957, the San Francisco International Film Festival is the longest-running 
          film festival in the Americas. We've been at the forefront of discovering new talent, 
          championing diverse voices, and bringing the best of world cinema to Bay Area audiences.
        </p>
        
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {milestones.map((m) => (
            <div key={m.year} className="flex-shrink-0 bg-sf-fog rounded-xl p-3 w-28">
              <p className="font-bold text-sf-red text-lg">{m.year}</p>
              <p className="text-sf-slate text-xs">{m.event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Venue Map */}
      <div className="px-3 py-3">
        <h2 className="display-text text-lg text-sf-navy mb-3">Festival Venues</h2>
        
        {/* Map */}
        <div 
          ref={mapContainer}
          className="w-full h-48 rounded-xl overflow-hidden bg-sf-fog mb-3"
        />

        {/* Venue List */}
        <div className="space-y-3">
          {venues.map((venue) => (
            <div
              key={venue.id}
              onClick={() => {
                setSelectedVenue(venue.id);
                if (map.current && venue.lat && venue.lng) {
                  map.current.flyTo({ center: [venue.lng, venue.lat], zoom: 15 });
                }
              }}
              className={`bg-white rounded-2xl overflow-hidden shadow-elevated cursor-pointer transition-all hover:shadow-elevated-lg ${
                selectedVenue === venue.id ? 'ring-2 ring-sf-red' : ''
              }`}
            >
              <div className="flex">
                {/* Image */}
                <div className="w-28 h-24 flex-shrink-0 relative overflow-hidden bg-sf-fog">
                  {venue.image ? (
                    <img 
                      src={venue.image} 
                      alt={venue.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 flex items-center justify-center ${venue.image ? 'hidden' : ''}`}>
                    <MapPin size={24} className="text-sf-red/30" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 p-3 flex flex-col justify-center">
                  <h3 className="font-bold text-sf-navy text-base">{venue.name}</h3>
                  <p className="text-sf-slate text-xs mt-0.5">{venue.address}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-sf-slate bg-sf-fog px-2 py-0.5 rounded-full">
                      {venue.screens} screen{venue.screens > 1 ? 's' : ''}
                    </span>
                    <span className="text-xs text-sf-slate bg-sf-fog px-2 py-0.5 rounded-full">
                      {venue.capacity} seats
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership */}
      <div className="px-3 py-3">
        <h2 className="display-text text-lg text-sf-navy mb-3">Leadership</h2>
        <div className="grid grid-cols-2 gap-2">
          {leadership.map((person) => (
            <div key={person.name} className="bg-white rounded-xl p-3 shadow-elevated text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-sf-navy to-sf-red rounded-full mx-auto mb-2 flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <p className="font-semibold text-sf-navy text-sm">{person.name}</p>
              <p className="text-sf-slate text-xs">{person.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="px-3 py-4 pb-6">
        <div className="bg-gradient-to-br from-sf-red to-sf-coral rounded-xl p-4 text-white text-center">
          <Mail size={28} className="mx-auto mb-2" />
          <h3 className="display-text text-lg mb-1">Get in Touch</h3>
          <p className="text-white/80 text-sm mb-3">
            Have questions? We'd love to hear from you.
          </p>
          <a 
            href="mailto:info@sffilm.org"
            className="inline-block px-6 py-2 bg-white text-sf-red font-semibold rounded-lg hover:bg-white/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
