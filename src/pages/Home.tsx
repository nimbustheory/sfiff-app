import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Calendar, MapPin, Ticket, ChevronRight, Play, Award, Sparkles, Film } from 'lucide-react';
import { tmdbApi, GENRES } from '../utils/tmdb';
import type { Movie } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const [featuredFilms, setFeaturedFilms] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);
  const [logoError, setLogoError] = useState(false);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trending, playing] = await Promise.all([
          tmdbApi.getTrending(),
          tmdbApi.getNowPlaying(),
        ]);
        setFeaturedFilms(trending.slice(0, 5));
        setNowPlaying(playing.slice(0, 8));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto-rotate hero
  useEffect(() => {
    if (featuredFilms.length === 0) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % featuredFilms.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredFilms.length]);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [loading]);

  const heroFilm = featuredFilms[heroIndex];

  const venues = [
    { name: 'Castro Theatre', location: 'Castro District', image: '/images/venues/venue-castro.jpg' },
    { name: 'Roxie Theater', location: 'Mission District', image: '/images/venues/venue-roxie.jpg' },
    { name: 'SFMOMA', location: 'SoMa', image: '/images/venues/venue-sfmoma.jpg' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="countdown-circle">
          <Film size={24} />
        </div>
        <p className="text-sf-slate text-sm">Loading the festival...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in relative">
      {/* Floating Logo - Fixed over hero */}
      {!logoError && (
        <div className="absolute top-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <img
            src="/SFIFF-logo.png"
            alt="SF International Film Festival"
            className="h-12 w-auto object-contain drop-shadow-2xl"
            onError={() => setLogoError(true)}
          />
        </div>
      )}

      {/* Subtle Fog Overlay */}
      <div className="fog-overlay opacity-30 pointer-events-none">
        <div className="fog-layer" />
        <div className="fog-layer" />
      </div>

      {/* ============================================
          CINEMATIC HERO SECTION
          ============================================ */}
      <section className="relative h-[420px] overflow-hidden film-strip spotlight vignette">
        {/* Sprocket Holes */}
        <div className="sprocket-holes left">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="sprocket-hole" />
          ))}
        </div>
        <div className="sprocket-holes right">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="sprocket-hole" />
          ))}
        </div>

        {/* Background Images with Crossfade */}
        {featuredFilms.map((film, index) => (
          <div
            key={film.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === heroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {film.backdrop_path && (
              <img
                src={tmdbApi.getImageUrl(film.backdrop_path, 'w1280')}
                alt={film.title}
                className="absolute inset-0 w-full h-full object-cover scale-105"
                style={{
                  animation: index === heroIndex ? 'subtle-zoom 8s ease-out forwards' : 'none',
                }}
              />
            )}
          </div>
        ))}

        {/* Gradient Overlays - stronger for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/95 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />

        {/* Film Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] z-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Hero Content - moved up */}
        <div className="absolute bottom-16 left-0 right-0 px-8 z-30">
          {heroFilm && (
            <div key={heroFilm.id} className="animate-fade-up">
              {/* Festival Badge */}
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-sf-gold/20 backdrop-blur-sm rounded-full border border-sf-gold/30">
                <Sparkles size={12} className="text-sf-gold" />
                <span className="text-sf-gold text-xs font-bold tracking-wider uppercase">68th Festival Selection</span>
              </div>

              {/* Title */}
              <h1 className="display-text text-4xl text-white mb-2 drop-shadow-lg max-w-sm leading-tight">
                {heroFilm.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-3 text-white/80 text-sm">
                {heroFilm.vote_average > 0 && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black/40 rounded-full">
                    <Star size={12} className="fill-sf-gold text-sf-gold" />
                    <span className="font-semibold text-white">{heroFilm.vote_average.toFixed(1)}</span>
                  </div>
                )}
                <span>{heroFilm.release_date?.slice(0, 4)}</span>
                {heroFilm.genre_ids?.[0] && (
                  <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs">
                    {GENRES[heroFilm.genre_ids[0]]}
                  </span>
                )}
              </div>

              {/* Synopsis */}
              <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-sm line-clamp-2">
                {heroFilm.overview}
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/schedule')}
                  className="group relative px-5 py-2.5 bg-sf-red text-white font-semibold rounded-lg overflow-hidden transition-all hover:shadow-glow"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Ticket size={16} />
                    Get Tickets
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-sf-coral to-sf-red opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button 
                  onClick={() => navigate('/films')}
                  className="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Play size={16} />
                  Trailer
                </button>
              </div>

            </div>
          )}
        </div>
      </section>

      {/* ============================================
          NOW SHOWING MARQUEE
          ============================================ */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)}
        className="reveal-on-scroll mx-3 -mt-6 relative z-40"
      >
        <div className="marquee-lights rounded-xl px-4 py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sf-gold font-bold text-sm tracking-wider uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-sf-coral rounded-full animate-pulse" />
              Now Showing
            </h2>
            <button 
              onClick={() => navigate('/films')}
              className="text-white/60 text-xs font-medium hover:text-white transition-colors flex items-center gap-1"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================
          NOW SCREENING CARDS - 3D TILT EFFECT
          ============================================ */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)}
        className="reveal-on-scroll px-3 pt-4 pb-2"
      >
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-2 stagger-children revealed">
          {nowPlaying.map((movie, index) => (
            <div 
              key={movie.id}
              onClick={() => navigate('/films')}
              className="flex-shrink-0 cursor-pointer card-3d w-[110px]"
            >
              <div className="card-3d-inner card-shine relative overflow-hidden rounded-xl bg-sf-charcoal aspect-[2/3]">
                <img
                  src={tmdbApi.getImageUrl(movie.poster_path, 'w342')}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Rating */}
                {movie.vote_average > 0 && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded-full text-[10px] font-semibold text-white z-10">
                    <Star size={8} className="fill-sf-gold text-sf-gold" />
                    {movie.vote_average.toFixed(1)}
                  </div>
                )}

                {/* Featured badge on first */}
                {index === 0 && (
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-sf-gold text-sf-charcoal text-[8px] font-bold tracking-wider rounded-full uppercase golden-shine z-10">
                    Pick
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
                  <h3 className="font-bold text-white text-[11px] line-clamp-2 leading-tight">
                    {movie.title}
                  </h3>
                  <p className="text-white/60 text-[9px] mt-0.5">
                    {movie.release_date?.slice(0, 4)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          FEATURED EVENT - TICKET STUB STYLE
          ============================================ */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)}
        className="reveal-on-scroll px-3 py-3"
      >
        <div 
          onClick={() => navigate('/events')}
          className="ticket-stub cursor-pointer group shadow-elevated hover:shadow-elevated-lg transition-all"
        >
          <div className="flex">
            {/* Left side - Event info */}
            <div className="flex-1 p-4 bg-gradient-to-br from-sf-red via-sf-red to-sf-coral rounded-l-xl">
              <div className="flex items-center gap-2 mb-2">
                <Award size={14} className="text-sf-gold" />
                <span className="text-white/80 text-xs uppercase tracking-wider font-semibold">Opening Night</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                68th Annual Gala
              </h3>
              <p className="text-white/70 text-sm mb-3">Red carpet premiere & after-party</p>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  April 18
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  Castro Theatre
                </span>
              </div>
            </div>
            
            {/* Right side - Admit one */}
            <div className="ticket-stub-dashed w-24 bg-white flex flex-col items-center justify-center p-3 rounded-r-xl">
              <span className="text-sf-red text-xs font-bold uppercase tracking-wider transform -rotate-90 whitespace-nowrap">
                Admit One
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          VENUES - FULL WIDTH SHOWCASE
          ============================================ */}
      <section 
        ref={(el) => (sectionsRef.current[3] = el)}
        className="reveal-on-scroll py-4"
      >
        <div className="flex items-center justify-between px-3 mb-3">
          <h2 className="display-text text-lg text-sf-navy">Festival Venues</h2>
          <button 
            onClick={() => navigate('/about')}
            className="text-sf-red text-sm font-semibold flex items-center gap-1"
          >
            View Map <ChevronRight size={16} />
          </button>
        </div>
        
        {/* Full-width horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar px-3 pb-2">
          {venues.map((venue, index) => (
            <div 
              key={venue.name}
              onClick={() => navigate('/about')}
              className="flex-shrink-0 w-[280px] relative rounded-2xl overflow-hidden cursor-pointer group shadow-elevated"
            >
              {/* Image */}
              <div className="relative h-[160px]">
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  index === 0 ? 'from-amber-800 to-amber-600' :
                  index === 1 ? 'from-rose-800 to-rose-600' :
                  'from-slate-700 to-slate-500'
                }`} />
                <img 
                  src={venue.image}
                  alt={venue.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Venue badge */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-white text-[10px] font-semibold uppercase tracking-wider">
                    {index === 0 ? 'Historic' : index === 1 ? 'Indie' : 'Modern'}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-bold text-white text-lg">{venue.name}</h3>
                <p className="text-white/70 text-sm">{venue.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          QUICK LINKS - ASYMMETRIC LAYOUT
          ============================================ */}
      <section 
        ref={(el) => (sectionsRef.current[4] = el)}
        className="reveal-on-scroll px-3 py-3 pb-6"
      >
        <div className="grid grid-cols-5 gap-2">
          {/* Large card */}
          <button
            onClick={() => navigate('/membership')}
            className="col-span-3 relative overflow-hidden bg-sf-navy text-white p-4 rounded-xl text-left group bokeh-bg"
          >
            <div className="relative z-10">
              <div className="w-10 h-10 bg-sf-gold/20 rounded-full flex items-center justify-center mb-3">
                <Sparkles size={20} className="text-sf-gold" />
              </div>
              <p className="font-bold text-lg">Become a Member</p>
              <p className="text-white/70 text-sm mt-1">Unlock exclusive benefits & rewards</p>
              <div className="mt-3 inline-flex items-center gap-1 text-sf-coral text-sm font-semibold group-hover:gap-2 transition-all">
                Join Now <ChevronRight size={16} />
              </div>
            </div>
          </button>
          
          {/* Stacked small cards */}
          <div className="col-span-2 flex flex-col gap-2">
            <button
              onClick={() => navigate('/festival')}
              className="flex-1 bg-sf-fog text-sf-navy p-3 rounded-xl text-left group hover:bg-sf-fog/70 transition-colors"
            >
              <p className="font-bold text-sm">68th Festival</p>
              <p className="text-sf-slate text-xs mt-0.5">April 18-28</p>
            </button>
            <button
              onClick={() => navigate('/schedule')}
              className="flex-1 bg-gradient-to-br from-sf-coral to-sf-red text-white p-3 rounded-xl text-left group"
            >
              <p className="font-bold text-sm">Tickets</p>
              <p className="text-white/80 text-xs mt-0.5">On sale now</p>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

