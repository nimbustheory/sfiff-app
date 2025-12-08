import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Ticket, Star, Film, Mic, Music, GraduationCap } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Screenings': Film,
  'Q&A': Mic,
  'Panels': Users,
  'Parties': Music,
  'Workshops': GraduationCap,
};

export default function Events() {
  const { events } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Screenings', 'Q&A', 'Panels', 'Parties', 'Workshops'];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(e => e.category === selectedCategory);

  // Featured event is the first one
  const featuredEvent = events[0];
  const otherEvents = selectedCategory === 'all' 
    ? events.slice(1) 
    : filteredEvents.filter(e => e.id !== featuredEvent?.id);

  return (
    <div className="animate-fade-in">
      {/* Featured Event Hero */}
      {featuredEvent && selectedCategory === 'all' && (
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${featuredEvent.image}`} />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Star size={14} className="fill-sf-gold text-sf-gold" />
              <span className="text-xs font-semibold uppercase tracking-wider">Featured Event</span>
            </div>
            <h2 className="display-text text-xl">{featuredEvent.title}</h2>
            <div className="flex items-center gap-3 mt-2 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {featuredEvent.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {featuredEvent.venue}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Category Pills */}
      <div className="px-3 py-3 border-b border-sf-fog">
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => {
            const Icon = cat !== 'all' ? CATEGORY_ICONS[cat] : null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-sf-red text-white'
                    : 'bg-sf-fog text-sf-navy hover:bg-sf-fog/70'
                }`}
              >
                {Icon && <Icon size={14} />}
                <span>{cat === 'all' ? 'All Events' : cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Grid - Tighter spacing */}
      <div className="p-3 space-y-2">
        {otherEvents.length === 0 && selectedCategory !== 'all' ? (
          <div className="text-center py-12">
            <p className="text-sf-slate">No events in this category</p>
          </div>
        ) : (
          otherEvents.map((event, index) => {
            const CategoryIcon = CATEGORY_ICONS[event.category] || Film;
            return (
              <div
                key={event.id}
                className="bg-white rounded-xl overflow-hidden shadow-elevated"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Event Image Header */}
                <div className={`relative h-24 bg-gradient-to-br ${event.image}`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold flex items-center gap-1">
                      <CategoryIcon size={12} />
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span className="px-2 py-1 bg-sf-gold text-sf-charcoal rounded-full text-xs font-bold">
                      {event.price}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-3">
                  <h3 className="font-bold text-sf-navy text-sm line-clamp-2">{event.title}</h3>
                  <p className="text-sf-slate text-xs mt-1 line-clamp-2">{event.description}</p>

                  {/* Event Meta */}
                  <div className="flex items-center gap-3 mt-2 text-xs text-sf-slate">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {event.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-xs text-sf-slate">
                    <MapPin size={12} />
                    <span>{event.venue}</span>
                  </div>

                  {/* Attendees & CTA */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-sf-fog">
                    <div className="flex items-center gap-2">
                      {/* Avatar stack */}
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div 
                            key={i}
                            className="w-6 h-6 rounded-full bg-gradient-to-br from-sf-coral to-sf-red border-2 border-white"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-sf-slate">
                        {event.attendees || 0}+ attending
                      </span>
                    </div>
                    <button className="px-3 py-1.5 bg-sf-red text-white text-xs font-semibold rounded-lg hover:bg-sf-coral transition-colors flex items-center gap-1">
                      <Ticket size={12} />
                      RSVP
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
