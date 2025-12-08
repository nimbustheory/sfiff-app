export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path: string | null }[];
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  videos?: {
    results: Video[];
  };
  similar?: {
    results: Movie[];
  };
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface Showtime {
  id: string;
  movieId: number;
  movie?: Movie;
  venue: string;
  screen: string;
  date: string;
  time: string;
  price: number;
  capacity: number;
  sold: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  image: string;
  attendees?: number;
  maxAttendees?: number;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
}

export interface PromoCode {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  validUntil: string;
  usageLimit: number;
  usageCount: number;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  screens: number;
  capacity: number;
  image?: string;
  lat?: number;
  lng?: number;
}

export interface MembershipTier {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'promo' | 'reminder' | 'alert';
  timestamp: string;
  read: boolean;
}

export interface AdminStats {
  totalTicketsSold: number;
  totalRevenue: number;
  activeMembers: number;
  upcomingShowtimes: number;
}
