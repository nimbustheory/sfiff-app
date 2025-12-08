import { useState, useEffect, useRef } from 'react';
import { Search, X, Star, Play, Clock, Calendar, Heart, ChevronDown, Sparkles, Film } from 'lucide-react';
import { tmdbApi, GENRES } from '../utils/tmdb';
import type { Movie, MovieDetails } from '../types';

type Category = 'now_playing' | 'popular' | 'top_rated' | 'upcoming' | 'trending';

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'now_playing', label: 'Now Playing' },
  { key: 'popular', label: 'Popular' },
  { key: 'top_rated', label: 'Top Rated' },
  { key: 'upcoming', label: 'Coming Soon' },
  { key: 'trending', label: 'Trending' },
];

export default function Films() {
  const [category, setCategory] = useState<Category>('now_playing');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [showGenreFilter, setShowGenreFilter] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const genres = Object.entries(GENRES).map(([id, name]) => ({ id: Number(id), name }));

  useEffect(() => {
    fetchMovies();
  }, [category]);

  // Scroll reveal for grid items
  useEffect(() => {
    if (!gridRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = gridRef.current.querySelectorAll('.reveal-scale');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [movies, searchResults]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      let data: Movie[] = [];
      switch (category) {
        case 'now_playing':
          data = await tmdbApi.getNowPlaying();
          break;
        case 'popular':
          data = await tmdbApi.getPopular();
          break;
        case 'top_rated':
          data = await tmdbApi.getTopRated();
          break;
        case 'upcoming':
          data = await tmdbApi.getUpcoming();
          break;
        case 'trending':
          data = await tmdbApi.getTrending();
          break;
      }
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = await tmdbApi.searchMovies(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleMovieClick = async (movie: Movie) => {
    const details = await tmdbApi.getMovieDetails(movie.id);
    setSelectedMovie(details);
  };

  const filteredMovies = selectedGenre 
    ? movies.filter(m => m.genre_ids?.includes(selectedGenre))
    : movies;

  const displayMovies = searchQuery.length > 2 ? searchResults : filteredMovies;

  return (
    <div className="animate-fade-in min-h-screen">
      {/* Cinematic Search Header */}
      <div className="relative bg-sf-navy overflow-hidden">
        {/* Bokeh background */}
        <div className="absolute inset-0 bokeh-bg opacity-50" />
        
        <div className="relative px-3 py-5">
          {/* Search input */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              type="text"
              placeholder="Search films..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-sf-coral focus:bg-white/15 transition-all text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Categories - Scrollable pills */}
          <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar pb-1">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => { setCategory(key); setSelectedGenre(null); }}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all overflow-hidden flex-shrink-0 ${
                  category === key
                    ? 'text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {category === key && (
                  <div className="absolute inset-0 bg-gradient-to-r from-sf-red to-sf-coral" />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Genre Filter */}
      <div className="px-3 py-2 border-b border-sf-fog bg-white sticky top-0 z-30">
        <button
          onClick={() => setShowGenreFilter(!showGenreFilter)}
          className="flex items-center gap-2 text-sm text-sf-navy font-medium"
        >
          <Film size={14} />
          <span>{selectedGenre ? GENRES[selectedGenre] : 'All Genres'}</span>
          <ChevronDown size={16} className={`transition-transform ${showGenreFilter ? 'rotate-180' : ''}`} />
        </button>
        
        {showGenreFilter && (
          <div className="flex flex-wrap gap-1.5 mt-3 pb-1 animate-fade-in">
            <button
              onClick={() => { setSelectedGenre(null); setShowGenreFilter(false); }}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                !selectedGenre ? 'bg-sf-red text-white' : 'bg-sf-fog text-sf-navy hover:bg-sf-fog/70'
              }`}
            >
              All
            </button>
            {genres.slice(0, 12).map(({ id, name }) => (
              <button
                key={id}
                onClick={() => { setSelectedGenre(id); setShowGenreFilter(false); }}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedGenre === id ? 'bg-sf-red text-white' : 'bg-sf-fog text-sf-navy hover:bg-sf-fog/70'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Movies Grid - Enhanced 3D Cards */}
      <div className="p-3 bg-gradient-to-b from-sf-mist to-white min-h-[50vh]" ref={gridRef}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="countdown-circle">
              <Film size={24} />
            </div>
            <p className="text-sf-slate text-sm">Loading films...</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {displayMovies.map((movie, index) => (
              <MovieCard3D 
                key={movie.id} 
                movie={movie} 
                index={index}
                onClick={() => handleMovieClick(movie)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Movie Detail Modal - Cinematic Style */}
      {selectedMovie && (
        <MovieDetailModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
}

// Enhanced 3D Movie Card
function MovieCard3D({ movie, index, onClick }: { movie: Movie; index: number; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="reveal-scale cursor-pointer"
      style={{ 
        transitionProperty: 'transform, opacity',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-out',
        transitionDelay: `${index * 30}ms`,
      }}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-sf-charcoal shadow-elevated">
        {movie.poster_path ? (
          <img
            src={tmdbApi.getImageUrl(movie.poster_path, 'w342')}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-sf-navy to-sf-charcoal flex items-center justify-center">
            <Film size={32} className="text-white/20" />
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        
        {/* Shine effect on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: 'translateX(-100%) rotate(25deg)',
            animation: isHovered ? 'shine-sweep 0.6s ease forwards' : 'none',
          }}
        />
        
        {/* Rating badge */}
        {movie.vote_average > 0 && (
          <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm rounded-full text-[10px] font-bold text-white z-10">
            <Star size={8} className="fill-sf-gold text-sf-gold" />
            {movie.vote_average.toFixed(1)}
          </div>
        )}
        
        {/* Heart on hover */}
        <button 
          className={`absolute top-1.5 right-1.5 p-1.5 rounded-full bg-black/50 backdrop-blur-sm transition-all z-10 ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart size={12} className="text-white hover:fill-sf-coral hover:text-sf-coral transition-colors" />
        </button>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
          <h3 className="font-semibold text-white text-[11px] line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          <p className="text-white/50 text-[9px] mt-0.5">
            {movie.release_date?.slice(0, 4)}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shine-sweep {
          to { transform: translateX(200%) rotate(25deg); }
        }
      `}</style>
    </div>
  );
}

// Cinematic Movie Detail Modal
function MovieDetailModal({ movie, onClose }: { movie: MovieDetails; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[390px] bg-sf-charcoal rounded-t-3xl shadow-elevated-lg animate-slide-up max-h-[85vh] flex flex-col">
        {/* Fixed backdrop header */}
        <div className="relative h-48 flex-shrink-0 vignette rounded-t-3xl overflow-hidden">
          {movie.backdrop_path && (
            <img
              src={tmdbApi.getImageUrl(movie.backdrop_path, 'w780')}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-sf-charcoal via-sf-charcoal/50 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Play trailer button */}
          {movie.videos?.results?.[0] && (
            <a
              href={`https://www.youtube.com/watch?v=${movie.videos.results[0].key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-sf-red/90 backdrop-blur-sm flex items-center justify-center text-white hover:bg-sf-coral transition-colors group"
            >
              <Play size={28} className="ml-1 group-hover:scale-110 transition-transform" />
            </a>
          )}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-4 pb-6 -mt-12 relative z-10">
            <div className="flex gap-3">
              {/* Poster */}
              <div className="w-24 flex-shrink-0">
                <div className="relative rounded-xl overflow-hidden shadow-elevated-lg border-2 border-sf-charcoal">
                  <img
                    src={tmdbApi.getImageUrl(movie.poster_path, 'w342')}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 pt-2">
                <h2 className="display-text text-xl text-white leading-tight">{movie.title}</h2>
                
                {movie.tagline && (
                  <p className="text-sf-coral text-xs italic mt-1">"{movie.tagline}"</p>
                )}
                
                <div className="flex items-center gap-3 mt-2 text-sm text-white/70">
                  {movie.vote_average > 0 && (
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-sf-gold text-sf-gold" />
                      <span className="font-semibold text-white">{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                  {movie.runtime && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{movie.runtime}m</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{movie.release_date?.slice(0, 4)}</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {movie.genres?.slice(0, 3).map(genre => (
                    <span key={genre.id} className="px-2 py-0.5 bg-white/10 text-white/80 text-[10px] font-medium rounded-full">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="mt-4">
              <h3 className="text-white/50 text-xs uppercase tracking-wider mb-2">Synopsis</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Cast */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <div className="mt-4">
                <h3 className="text-white/50 text-xs uppercase tracking-wider mb-2">Cast</h3>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                  {movie.credits.cast.slice(0, 6).map(person => (
                    <div key={person.id} className="flex-shrink-0 text-center w-14">
                      <div className="w-12 h-12 mx-auto rounded-full overflow-hidden bg-white/10 ring-2 ring-white/20">
                        {person.profile_path ? (
                          <img
                            src={tmdbApi.getImageUrl(person.profile_path, 'w185')}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/30">
                            👤
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] font-medium text-white mt-1.5 line-clamp-1">{person.name}</p>
                      <p className="text-[9px] text-white/50 line-clamp-1">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <button className="w-full mt-5 py-3 bg-gradient-to-r from-sf-red to-sf-coral text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-glow transition-shadow">
              <Sparkles size={18} />
              Get Festival Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
