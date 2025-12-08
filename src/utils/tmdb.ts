import type { Movie, MovieDetails } from '../types';

const API_KEY = '2dca580c2a14b55200e784d157207b4d';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const GENRES: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export const tmdbApi = {
  getImageUrl: (path: string | null, size: string = 'w500'): string => {
    if (!path) return '';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },

  getNowPlaying: async (): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching now playing:', error);
      return [];
    }
  },

  getPopular: async (): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching popular:', error);
      return [];
    }
  },

  getTopRated: async (): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching top rated:', error);
      return [];
    }
  },

  getUpcoming: async (): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching upcoming:', error);
      return [];
    }
  },

  getTrending: async (): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching trending:', error);
      return [];
    }
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  },

  getMovieDetails: async (id: number): Promise<MovieDetails | null> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos,similar`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  },

  getMoviesByGenre: async (genreId: number): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&sort_by=popularity.desc&page=1`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      return [];
    }
  },
};

export default tmdbApi;
