import { Star, Heart } from 'lucide-react';
import type { Movie } from '../types';
import { tmdbApi, GENRES } from '../utils/tmdb';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  variant?: 'poster' | 'landscape' | 'featured';
  showHeart?: boolean;
}

export default function MovieCard({ movie, onClick, variant = 'poster', showHeart = true }: MovieCardProps) {
  const isPoster = variant === 'poster';
  const isFeatured = variant === 'featured';
  
  const imageUrl = isPoster 
    ? tmdbApi.getImageUrl(movie.poster_path, 'w342')
    : tmdbApi.getImageUrl(movie.backdrop_path, 'w780');
  
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA';
  const genre = movie.genre_ids?.[0] ? GENRES[movie.genre_ids[0]] : null;

  // For landscape variant in "Now Screening", we force a taller aspect ratio
  const aspectClass = isPoster 
    ? 'aspect-[2/3]' 
    : variant === 'landscape' 
      ? 'aspect-[4/5]'  // Taller aspect for landscape cards in Now Screening
      : 'aspect-video';

  return (
    <div 
      onClick={() => onClick?.(movie)}
      className={`card-film group cursor-pointer ${aspectClass} relative overflow-hidden rounded-xl bg-sf-charcoal`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-sf-navy to-sf-charcoal flex items-center justify-center">
          <span className="text-white/30 text-4xl">🎬</span>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Rating badge */}
      {movie.vote_average > 0 && (
        <div className="absolute top-2 left-2 badge-rating z-10">
          <Star size={10} className="fill-sf-gold text-sf-gold" />
          {movie.vote_average.toFixed(1)}
        </div>
      )}

      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute top-2 right-2 badge-featured z-10">
          EDITOR'S PICK
        </div>
      )}

      {/* Heart on hover */}
      {showHeart && (
        <button 
          className="absolute top-2 right-2 p-2 rounded-full bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={(e) => {
            e.stopPropagation();
            // Add to favorites logic
          }}
        >
          <Heart size={16} className="text-white hover:fill-sf-coral hover:text-sf-coral transition-colors" />
        </button>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
        <h3 className={`font-bold text-white line-clamp-2 ${isFeatured ? 'text-lg' : 'text-sm'}`}>
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-white/60 text-xs">{year}</span>
          {genre && (
            <>
              <span className="text-white/30">•</span>
              <span className="text-white/60 text-xs">{genre}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
