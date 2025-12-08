import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import type { Venue } from '../types';

// MapBox public token
mapboxgl.accessToken = 'pk.eyJ1IjoibmltYnVzdGhlb3J5IiwiYSI6ImNtaWxkMTd2djFuZ3EzZHB4OWx3MmpoOGoifQ.ZTR7eI7r19f2ozCTqzWk4w';

interface VenueMapProps {
  venues: Venue[];
  selectedVenue?: string;
  onVenueSelect?: (venue: Venue) => void;
  height?: string;
}

export default function VenueMap({ venues, selectedVenue, onVenueSelect, height = '200px' }: VenueMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map centered on San Francisco
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-122.4194, 37.7749], // San Francisco
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on unmount
    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for venues
    venues.forEach(venue => {
      if (venue.lat && venue.lng) {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'venue-marker';
        el.style.cssText = `
          width: 32px;
          height: 32px;
          background: ${selectedVenue === venue.id ? '#C4463A' : '#1E3A5F'};
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          transition: all 0.2s ease;
        `;
        el.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;

        // Create marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([venue.lng, venue.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25, closeButton: false })
              .setHTML(`
                <div style="padding: 8px; font-family: 'Source Sans 3', sans-serif;">
                  <strong style="color: #1E3A5F; font-size: 14px;">${venue.name}</strong>
                  <p style="color: #64748B; font-size: 12px; margin: 4px 0 0;">${venue.address}</p>
                </div>
              `)
          )
          .addTo(map.current!);

        // Add click handler
        el.addEventListener('click', () => {
          onVenueSelect?.(venue);
        });

        markers.current.push(marker);
      }
    });

    // Fit bounds to show all markers
    if (venues.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      venues.forEach(venue => {
        if (venue.lat && venue.lng) {
          bounds.extend([venue.lng, venue.lat]);
        }
      });
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 14 });
    }
  }, [venues, selectedVenue, onVenueSelect]);

  return (
    <div 
      ref={mapContainer} 
      className="rounded-xl overflow-hidden"
      style={{ height }}
    />
  );
}
