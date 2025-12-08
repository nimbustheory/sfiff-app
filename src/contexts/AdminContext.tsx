import { createContext, useContext, useState, ReactNode } from 'react';
import type { Movie, Showtime, Event, TicketType, PromoCode, Venue } from '../types';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  // Movies
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  updateMovie: (id: number, movie: Partial<Movie>) => void;
  deleteMovie: (id: number) => void;
  // Showtimes
  showtimes: Showtime[];
  addShowtime: (showtime: Showtime) => void;
  updateShowtime: (id: string, showtime: Partial<Showtime>) => void;
  deleteShowtime: (id: string) => void;
  // Events
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  // Ticket Types
  ticketTypes: TicketType[];
  addTicketType: (ticketType: TicketType) => void;
  updateTicketType: (id: string, ticketType: Partial<TicketType>) => void;
  deleteTicketType: (id: string) => void;
  // Promo Codes
  promoCodes: PromoCode[];
  addPromoCode: (promoCode: PromoCode) => void;
  updatePromoCode: (id: string, promoCode: Partial<PromoCode>) => void;
  deletePromoCode: (id: string) => void;
  // Venues
  venues: Venue[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Default SF venues with coordinates for MapBox
const defaultVenues: Venue[] = [
  { 
    id: '1', 
    name: 'Castro Theatre', 
    address: '429 Castro St, San Francisco', 
    screens: 1, 
    capacity: 1400,
    image: '/images/venues/venue-castro.jpg',
    lat: 37.7621,
    lng: -122.4350
  },
  { 
    id: '2', 
    name: 'Roxie Theater', 
    address: '3117 16th St, San Francisco', 
    screens: 2, 
    capacity: 300,
    image: '/images/venues/venue-roxie.jpg',
    lat: 37.7649,
    lng: -122.4205
  },
  { 
    id: '3', 
    name: 'SFMOMA', 
    address: '151 Third St, San Francisco', 
    screens: 1, 
    capacity: 250,
    image: '/images/venues/venue-sfmoma.jpg',
    lat: 37.7857,
    lng: -122.4011
  },
  { 
    id: '4', 
    name: 'Palace of Fine Arts', 
    address: '3301 Lyon St, San Francisco', 
    screens: 1, 
    capacity: 1000,
    image: '/images/venues/venue-palace.jpg',
    lat: 37.8028,
    lng: -122.4483
  },
  { 
    id: '5', 
    name: 'Yerba Buena Center', 
    address: '701 Mission St, San Francisco', 
    screens: 2, 
    capacity: 400,
    image: '/images/venues/venue-yerba-buena.jpg',
    lat: 37.7856,
    lng: -122.4024
  },
  { 
    id: '6', 
    name: 'Dolby Cinema', 
    address: '1275 Market St, San Francisco', 
    screens: 1, 
    capacity: 200,
    image: '/images/venues/venue-dolby.jpg',
    lat: 37.7772,
    lng: -122.4146
  },
];

// Default ticket types
const defaultTicketTypes: TicketType[] = [
  {
    id: '1',
    name: 'General Admission',
    price: 16,
    description: 'Standard festival screening ticket',
    benefits: ['Reserved seating', 'Festival program'],
  },
  {
    id: '2',
    name: 'Premium',
    price: 25,
    description: 'Enhanced festival experience',
    benefits: ['Priority seating', 'Festival program', 'Complimentary popcorn'],
  },
  {
    id: '3',
    name: 'VIP',
    price: 50,
    description: 'Ultimate festival experience',
    benefits: ['Front-row seating', 'Festival program', 'Full concessions', 'Meet & greet access'],
  },
];

// Default events
const defaultEvents: Event[] = [
  {
    id: '1',
    title: '2025 Festival Opening Night Gala',
    description: 'Join us for the world premiere screening with red carpet arrivals, filmmaker introductions, and an after-party at SFMOMA.',
    category: 'Screenings',
    date: 'April 18, 2025',
    time: '6:00 PM',
    venue: 'Castro Theatre',
    price: '$75',
    image: 'from-sf-red to-rose-700',
    attendees: 245,
    maxAttendees: 500,
  },
  {
    id: '2',
    title: 'Documentary Filmmaker Panel',
    description: 'Leading documentary filmmakers discuss their craft, from concept to completion.',
    category: 'Panels',
    date: 'April 19, 2025',
    time: '2:00 PM',
    venue: 'Roxie Theater',
    price: '$25',
    image: 'from-sf-navy to-blue-800',
    attendees: 89,
    maxAttendees: 150,
  },
  {
    id: '3',
    title: 'Director Q&A: Award Winners',
    description: 'An intimate conversation with award-winning directors.',
    category: 'Q&A',
    date: 'April 20, 2025',
    time: '4:00 PM',
    venue: 'SFMOMA',
    price: '$30',
    image: 'from-slate-600 to-slate-800',
    attendees: 120,
    maxAttendees: 200,
  },
  {
    id: '4',
    title: 'Filmmakers Night Out',
    description: 'Network with fellow film enthusiasts and industry professionals.',
    category: 'Parties',
    date: 'April 21, 2025',
    time: '8:00 PM',
    venue: 'Public Works SF',
    price: '$45',
    image: 'from-purple-600 to-purple-800',
    attendees: 180,
    maxAttendees: 300,
  },
  {
    id: '5',
    title: 'Screenwriting Workshop',
    description: 'Learn the fundamentals of screenwriting from industry professionals.',
    category: 'Workshops',
    date: 'April 22, 2025',
    time: '10:00 AM',
    venue: 'Yerba Buena Center',
    price: '$60',
    image: 'from-amber-600 to-orange-700',
    attendees: 45,
    maxAttendees: 50,
  },
];

// Default promo codes
const defaultPromoCodes: PromoCode[] = [
  {
    id: '1',
    code: 'SFFILM25',
    discount: 25,
    type: 'percentage',
    validUntil: '2025-04-30',
    usageLimit: 500,
    usageCount: 127,
  },
  {
    id: '2',
    code: 'MEMBER10',
    discount: 10,
    type: 'fixed',
    validUntil: '2025-12-31',
    usageLimit: 1000,
    usageCount: 342,
  },
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>(defaultTicketTypes);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(defaultPromoCodes);

  // Movie CRUD
  const addMovie = (movie: Movie) => {
    setMovies(prev => [...prev, movie]);
  };

  const updateMovie = (id: number, updates: Partial<Movie>) => {
    setMovies(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const deleteMovie = (id: number) => {
    setMovies(prev => prev.filter(m => m.id !== id));
    // Also delete associated showtimes
    setShowtimes(prev => prev.filter(s => s.movieId !== id));
  };

  // Showtime CRUD
  const addShowtime = (showtime: Showtime) => {
    setShowtimes(prev => [...prev, showtime]);
  };

  const updateShowtime = (id: string, updates: Partial<Showtime>) => {
    setShowtimes(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteShowtime = (id: string) => {
    setShowtimes(prev => prev.filter(s => s.id !== id));
  };

  // Event CRUD
  const addEvent = (event: Event) => {
    setEvents(prev => [...prev, event]);
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Ticket Type CRUD
  const addTicketType = (ticketType: TicketType) => {
    setTicketTypes(prev => [...prev, ticketType]);
  };

  const updateTicketType = (id: string, updates: Partial<TicketType>) => {
    setTicketTypes(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTicketType = (id: string) => {
    setTicketTypes(prev => prev.filter(t => t.id !== id));
  };

  // Promo Code CRUD
  const addPromoCode = (promoCode: PromoCode) => {
    setPromoCodes(prev => [...prev, promoCode]);
  };

  const updatePromoCode = (id: string, updates: Partial<PromoCode>) => {
    setPromoCodes(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePromoCode = (id: string) => {
    setPromoCodes(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        movies,
        addMovie,
        updateMovie,
        deleteMovie,
        showtimes,
        addShowtime,
        updateShowtime,
        deleteShowtime,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        ticketTypes,
        addTicketType,
        updateTicketType,
        deleteTicketType,
        promoCodes,
        addPromoCode,
        updatePromoCode,
        deletePromoCode,
        venues: defaultVenues,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
