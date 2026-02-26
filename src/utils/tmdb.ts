import type { Movie, MovieDetails } from '../types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
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

async function fetchTmdb<T>(url: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`TMDB API error: ${response.status} ${response.statusText}`);
      return fallback;
    }
    return await response.json();
  } catch (error) {
    console.error('TMDB fetch error:', error);
    return fallback;
  }
}

export const tmdbApi = {
  getImageUrl: (path: string | null, size: string = 'w500'): string => {
    if (!path) return '';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },

  getNowPlaying: async (): Promise<Movie[]> => {
    const data = await fetchTmdb<{ results?: Movie[] }>(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
      { results: [] }
    );
    return data.results || [];
  },

  getPopular: async (): Promise<Movie[]> => {
    const data = await fetchTmdb<{ results?: Movie[] }>(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      { results: [] }
    );
    return data.results || [];
  },

  getTopRated: async (): Promise<Movie[]> => {
    const data = await fetchTmdb<{ results?: Movie[] }>(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
      { results: [] }
    );
    return data.results || [];
  },

  getUpcoming: async (): Promise<Movie[]> => {
    const data = await fetchTmdb<{ results?: Movie[] }>(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
      { results: [] }
    );
    return data.results || [];
  },

  getTrending: async (): Promise<Movie[]> => {
    const data = await fetchTmdb<{ results?: Movie[] }>(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
      { results: [] }
    );
    return data.results || [];
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    const data = await fetchTmdb<{ results?: Movie[] }>(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`,
      { results: [] }
    );
    return data.results || [];
  },

  getMovieDetails: async (id: number): Promise<MovieDetails | null> => {
    return fetchTmdb<MovieDetails | null>(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos,similar`,
      null
    );
  },

  getMoviesByGenre: async (genreId: number): Promise<Movie[]> => {
    const data = await fetchTmdb<{ results?: Movie[] }>(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&sort_by=popularity.desc&page=1`,
      { results: [] }
    );
    return data.results || [];
  },
};

export default tmdbApi;
