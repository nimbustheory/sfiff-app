import { useState, useEffect, useRef, useMemo } from 'react';
import { MapPin, Clock, Ticket, ChevronRight, Check, QrCode, Calendar, Star, Sparkles, Film } from 'lucide-react';
import { tmdbApi } from '../utils/tmdb';
import type { Movie } from '../types';

interface ShowtimeSlot {
  id: string;
  time: string;
  price: number;
  available: number;
}

interface ScheduleItem {
  movie: Movie;
  venue: string;
  screen: string;
  showtimes: ShowtimeSlot[];
}

const VENUES = [
  { id: 'all', name: 'All Venues', icon: '🎬' },
  { id: 'castro', name: 'Castro', icon: '🏛️' },
  { id: 'roxie', name: 'Roxie', icon: '🎭' },
  { id: 'sfmoma', name: 'SFMOMA', icon: '🎨' },
  { id: 'palace', name: 'Palace', icon: '🏰' },
];

type PurchaseStep = 'browse' | 'select' | 'tickets' | 'payment' | 'confirm';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedVenue, setSelectedVenue] = useState('all');
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const scheduleRef = useRef<HTMLDivElement>(null);
  
  // Purchase flow state
  const [purchaseStep, setPurchaseStep] = useState<PurchaseStep>('browse');
  const [selectedShowtime, setSelectedShowtime] = useState<{ item: ScheduleItem; slot: ShowtimeSlot } | null>(null);
  const [ticketCount, setTicketCount] = useState(2);
  const [ticketType, setTicketType] = useState<'general' | 'premium' | 'vip'>('general');

  // Generate stable confirmation code once per purchase
  const confirmationCode = useMemo(
    () => `SF-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
    [purchaseStep === 'confirm'] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Generate dates for next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      full: date.toISOString().split('T')[0],
      isToday: i === 0,
    };
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const movies = await tmdbApi.getNowPlaying();
        const venueNames = ['Castro Theatre', 'Roxie Theater', 'SFMOMA', 'Palace of Fine Arts', 'Yerba Buena Center'];
        const scheduleItems: ScheduleItem[] = movies.slice(0, 8).map((movie, index) => ({
          movie,
          venue: venueNames[index % 5],
          screen: `Screen ${(index % 3) + 1}`,
          showtimes: [
            { id: `${movie.id}-1`, time: '2:00 PM', price: 16, available: 45 },
            { id: `${movie.id}-2`, time: '5:30 PM', price: 18, available: 23 },
            { id: `${movie.id}-3`, time: '8:00 PM', price: 18, available: 67 },
          ],
        }));
        setSchedule(scheduleItems);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [selectedDate]);

  // Scroll reveal
  useEffect(() => {
    if (!scheduleRef.current) return;

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

    const items = scheduleRef.current.querySelectorAll('.reveal-on-scroll');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [schedule]);

  const filteredSchedule = selectedVenue === 'all' 
    ? schedule 
    : schedule.filter(item => item.venue.toLowerCase().includes(selectedVenue));

  const ticketPrices = {
    general: 16,
    premium: 25,
    vip: 50,
  };

  const handleSelectShowtime = (item: ScheduleItem, slot: ShowtimeSlot) => {
    setSelectedShowtime({ item, slot });
    setPurchaseStep('select');
  };

  const renderPurchaseFlow = () => {
    if (!selectedShowtime) return null;

    const { item, slot } = selectedShowtime;
    const total = ticketPrices[ticketType] * ticketCount;

    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => { setPurchaseStep('browse'); setSelectedShowtime(null); }}
        />
        <div className="relative w-full max-w-[390px] bg-sf-charcoal rounded-t-3xl shadow-elevated-lg animate-slide-up max-h-[85vh] overflow-y-auto">
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-white/30 rounded-full" />
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 px-4 py-3">
            {['select', 'tickets', 'payment', 'confirm'].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  purchaseStep === step 
                    ? 'bg-sf-coral text-white scale-110' 
                    : ['select', 'tickets', 'payment', 'confirm'].indexOf(purchaseStep) > i 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white/10 text-white/50'
                }`}>
                  {['select', 'tickets', 'payment', 'confirm'].indexOf(purchaseStep) > i ? <Check size={14} /> : i + 1}
                </div>
                {i < 3 && <div className={`w-8 h-0.5 mx-1 transition-colors ${
                  ['select', 'tickets', 'payment', 'confirm'].indexOf(purchaseStep) > i 
                    ? 'bg-green-500' 
                    : 'bg-white/10'
                }`} />}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="px-4 pb-8 text-white">
            {purchaseStep === 'select' && (
              <div className="animate-fade-in">
                <h3 className="display-text text-2xl text-center mb-5">Confirm Selection</h3>
                
                {/* Ticket Stub Style Card */}
                <div className="ticket-stub bg-white rounded-2xl overflow-hidden">
                  <div className="flex">
                    <div className="flex-1 p-4">
                      <div className="flex gap-3">
                        <img
                          src={tmdbApi.getImageUrl(item.movie.poster_path, 'w154')}
                          alt={item.movie.title}
                          className="w-16 h-24 object-cover rounded-lg shadow-md"
                        />
                        <div className="flex-1 text-sf-navy">
                          <h4 className="font-bold text-base leading-tight">{item.movie.title}</h4>
                          <p className="text-sf-slate text-xs mt-1">{item.venue}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-sf-slate">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {dates[selectedDate].month} {dates[selectedDate].date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              {slot.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ticket-stub-dashed w-20 flex flex-col items-center justify-center bg-sf-fog border-l-2 border-dashed border-sf-slate/20">
                      <span className="text-sf-red font-bold text-xl">${slot.price}</span>
                      <span className="text-sf-slate text-[10px]">per ticket</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setPurchaseStep('tickets')}
                  className="w-full mt-5 py-3 bg-gradient-to-r from-sf-red to-sf-coral text-white font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  Continue
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {purchaseStep === 'tickets' && (
              <div className="animate-fade-in">
                <h3 className="display-text text-2xl text-center mb-5">Select Tickets</h3>
                
                {/* Ticket Types */}
                <div className="space-y-2">
                  {(['general', 'premium', 'vip'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setTicketType(type)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        ticketType === type 
                          ? 'border-sf-coral bg-sf-coral/10' 
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold capitalize text-lg">{type}</p>
                          <p className="text-xs text-white/60 mt-0.5">
                            {type === 'general' && 'Standard seating'}
                            {type === 'premium' && 'Priority seating + popcorn'}
                            {type === 'vip' && 'Best seats + full concessions'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-sf-gold">${ticketPrices[type]}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between mt-5 p-4 bg-white/5 rounded-xl">
                  <span className="font-medium">Quantity</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      className="w-10 h-10 rounded-full bg-white/10 font-bold text-xl hover:bg-white/20 transition-colors"
                    >
                      −
                    </button>
                    <span className="font-bold text-2xl w-8 text-center">{ticketCount}</span>
                    <button
                      onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                      className="w-10 h-10 rounded-full bg-white/10 font-bold text-xl hover:bg-white/20 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between mt-4 p-4 bg-sf-gold/20 rounded-xl border border-sf-gold/30">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-3xl text-sf-gold">${total}</span>
                </div>

                <button
                  onClick={() => setPurchaseStep('payment')}
                  className="w-full mt-5 py-3 bg-gradient-to-r from-sf-red to-sf-coral text-white font-semibold rounded-xl"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {purchaseStep === 'payment' && (
              <div className="animate-fade-in">
                <h3 className="display-text text-2xl text-center mb-5">Payment</h3>
                
                {/* Payment Methods */}
                <div className="space-y-2">
                  {[
                    { name: 'Apple Pay', icon: '🍎' },
                    { name: 'Credit Card', icon: '💳' },
                    { name: 'PayPal', icon: '🅿️' },
                  ].map((method) => (
                    <button
                      key={method.name}
                      className="w-full p-4 rounded-xl border-2 border-white/10 hover:border-sf-coral transition-all flex items-center gap-4"
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <span className="font-medium">{method.name}</span>
                    </button>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-5 p-4 bg-white/5 rounded-xl space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">{ticketCount}x {ticketType} ticket</span>
                    <span>${ticketPrices[ticketType] * ticketCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Service fee</span>
                    <span>$2.50</span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-sf-gold">${total + 2.5}</span>
                  </div>
                </div>

                <button
                  onClick={() => setPurchaseStep('confirm')}
                  className="w-full mt-5 py-3 bg-gradient-to-r from-sf-red to-sf-coral text-white font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  <Sparkles size={18} />
                  Complete Purchase
                </button>
              </div>
            )}

            {purchaseStep === 'confirm' && (
              <div className="animate-fade-in text-center py-4">
                {/* Success animation */}
                <div className="relative w-20 h-20 mx-auto mb-5">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                  <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center">
                    <Check size={40} className="text-white" />
                  </div>
                </div>
                
                <h3 className="display-text text-2xl mb-2">You're All Set!</h3>
                <p className="text-white/60 text-sm mb-6">Your tickets have been sent to your email</p>

                {/* Golden Ticket */}
                <div className="relative mx-auto w-full max-w-[280px] golden-shine">
                  <div className="bg-gradient-to-br from-sf-gold via-amber-500 to-sf-gold rounded-2xl p-5 text-sf-charcoal shadow-elevated-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Film size={18} />
                        <span className="font-bold text-sm">SFIFF 2025</span>
                      </div>
                      <span className="text-xs opacity-70">ADMIT {ticketCount}</span>
                    </div>
                    
                    <p className="font-bold text-lg leading-tight">{item.movie.title}</p>
                    <p className="text-sm opacity-70 mt-1">{item.venue}</p>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span>{dates[selectedDate].month} {dates[selectedDate].date}</span>
                      <span>{slot.time}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-sf-charcoal/20">
                      <span className="text-xs opacity-70">Confirmation</span>
                      <span className="font-mono text-sm">{confirmationCode}</span>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="mt-5 inline-block p-3 bg-white rounded-xl">
                  <QrCode size={80} className="text-sf-charcoal" />
                </div>

                <button
                  onClick={() => { setPurchaseStep('browse'); setSelectedShowtime(null); }}
                  className="w-full mt-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Date Selector - Cinematic Header */}
      <div className="relative bg-sf-navy overflow-hidden">
        <div className="absolute inset-0 bokeh-bg opacity-30" />
        
        <div className="relative px-3 py-4">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {dates.map((d, i) => (
              <button
                key={d.full}
                onClick={() => setSelectedDate(i)}
                className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl transition-all relative overflow-hidden ${
                  selectedDate === i
                    ? 'text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {selectedDate === i && (
                  <div className="absolute inset-0 bg-gradient-to-br from-sf-red to-sf-coral" />
                )}
                <span className="relative z-10 text-[10px] font-medium uppercase">{d.day}</span>
                <span className="relative z-10 text-2xl font-bold">{d.date}</span>
                <span className="relative z-10 text-[10px]">{d.month}</span>
                {d.isToday && (
                  <span className="relative z-10 text-[8px] mt-1 px-1.5 py-0.5 bg-white/20 rounded-full">Today</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Venue Filter */}
      <div className="px-3 py-2 border-b border-sf-fog sticky top-0 z-30 bg-white">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {VENUES.map((venue) => (
            <button
              key={venue.id}
              onClick={() => setSelectedVenue(venue.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedVenue === venue.id
                  ? 'bg-sf-red text-white'
                  : 'bg-sf-fog text-sf-navy hover:bg-sf-fog/70'
              }`}
            >
              <span>{venue.icon}</span>
              <span>{venue.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Schedule List - Enhanced Cards */}
      <div ref={scheduleRef} className="p-3 space-y-3 bg-gradient-to-b from-sf-mist to-white min-h-[50vh]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="countdown-circle">
              <Ticket size={24} />
            </div>
            <p className="text-sf-slate text-sm">Loading schedule...</p>
          </div>
        ) : filteredSchedule.length === 0 ? (
          <div className="text-center py-16">
            <Film size={48} className="mx-auto text-sf-slate/30 mb-4" />
            <p className="text-sf-slate">No screenings at this venue</p>
          </div>
        ) : (
          filteredSchedule.map((item, index) => (
            <div
              key={item.movie.id}
              className="reveal-on-scroll bg-white rounded-2xl overflow-hidden shadow-elevated hover:shadow-elevated-lg transition-all card-3d"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="card-3d-inner">
                <div className="flex p-3 gap-3">
                  {/* Poster with shine effect */}
                  <div className="relative w-20 h-28 rounded-xl overflow-hidden flex-shrink-0 card-shine">
                    <img
                      src={tmdbApi.getImageUrl(item.movie.poster_path, 'w154')}
                      alt={item.movie.title}
                      className="w-full h-full object-cover"
                    />
                    {item.movie.vote_average > 0 && (
                      <div className="absolute top-1 left-1 flex items-center gap-0.5 px-1 py-0.5 bg-black/70 rounded text-[9px] font-bold text-white">
                        <Star size={8} className="fill-sf-gold text-sf-gold" />
                        {item.movie.vote_average.toFixed(1)}
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sf-navy text-sm line-clamp-2 leading-tight">{item.movie.title}</h3>
                    <div className="flex items-center gap-1 mt-1.5 text-sf-slate text-xs">
                      <MapPin size={12} />
                      <span className="truncate">{item.venue}</span>
                    </div>
                    
                    {/* Showtimes as ticket-style buttons */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.showtimes.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => handleSelectShowtime(item, slot)}
                          className="group relative px-3 py-2 bg-sf-fog hover:bg-sf-red rounded-lg transition-all overflow-hidden"
                        >
                          <span className="relative z-10 text-xs font-semibold text-sf-navy group-hover:text-white transition-colors">
                            {slot.time}
                          </span>
                          <span className="relative z-10 block text-[10px] text-sf-slate group-hover:text-white/70 transition-colors">
                            ${slot.price}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Purchase Flow Modal */}
      {purchaseStep !== 'browse' && renderPurchaseFlow()}
    </div>
  );
}
