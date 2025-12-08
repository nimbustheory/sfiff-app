import { Calendar, MapPin, Ticket, Star, Film, Award, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Festival() {
  const navigate = useNavigate();

  const passes = [
    { 
      name: '10-Pack', 
      price: 140, 
      desc: 'Any 10 regular screenings', 
      savings: 'Save $20',
      color: 'from-slate-600 to-slate-800'
    },
    { 
      name: 'Full Festival', 
      price: 450, 
      desc: 'Unlimited regular screenings', 
      savings: 'Best Value',
      color: 'from-sf-red to-sf-coral'
    },
    { 
      name: 'VIP Pass', 
      price: 1200, 
      desc: 'All screenings + VIP events', 
      savings: 'All Access',
      color: 'from-sf-gold to-amber-600'
    },
  ];

  const highlights = [
    { icon: Film, stat: '200+', label: 'Films' },
    { icon: Award, stat: '50+', label: 'Premieres' },
    { icon: MapPin, stat: '6', label: 'Venues' },
    { icon: Calendar, stat: '11', label: 'Days' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative h-56 bg-gradient-to-br from-sf-navy via-sf-charcoal to-sf-navy overflow-hidden">
        {/* Decorative film strip */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-full h-8 bg-white" 
              style={{ top: `${i * 24}px` }}
            />
          ))}
        </div>
        
        <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4">
          <div className="flex items-center gap-2 mb-2">
            <Star size={16} className="fill-sf-gold text-sf-gold" />
            <span className="text-sf-gold text-xs font-semibold uppercase tracking-wider">68th Annual</span>
            <Star size={16} className="fill-sf-gold text-sf-gold" />
          </div>
          <h1 className="display-text text-3xl">San Francisco</h1>
          <h2 className="display-text text-xl text-sf-coral mt-1">International Film Festival</h2>
          <p className="text-white/70 text-sm mt-3">April 18 - 28, 2025</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-3 py-4 -mt-6 relative z-10">
        <div className="bg-white rounded-xl shadow-elevated p-3 grid grid-cols-4 gap-2">
          {highlights.map(({ icon: Icon, stat, label }) => (
            <div key={label} className="text-center">
              <Icon size={20} className="mx-auto text-sf-red mb-1" />
              <p className="font-bold text-sf-navy text-lg">{stat}</p>
              <p className="text-sf-slate text-[10px]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="px-3 py-3">
        <h2 className="display-text text-lg text-sf-navy mb-2">About the Festival</h2>
        <p className="text-sf-slate text-sm leading-relaxed">
          The San Francisco International Film Festival is the longest-running film festival in the Americas. 
          For 68 years, we've been showcasing groundbreaking cinema from around the world, celebrating 
          diverse voices, and fostering a community of passionate film lovers.
        </p>
      </div>

      {/* Festival Passes */}
      <div className="px-3 py-3">
        <div className="flex items-center justify-between mb-3">
          <h2 className="display-text text-lg text-sf-navy">Festival Passes</h2>
          <span className="text-sf-coral text-xs font-semibold">On Sale Now</span>
        </div>
        
        <div className="space-y-2">
          {passes.map((pass) => (
            <div 
              key={pass.name}
              className="bg-white rounded-xl overflow-hidden shadow-elevated"
            >
              <div className={`bg-gradient-to-r ${pass.color} p-3 text-white flex items-center justify-between`}>
                <div>
                  <h3 className="font-bold">{pass.name}</h3>
                  <p className="text-white/70 text-xs">{pass.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">${pass.price}</p>
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">{pass.savings}</span>
                </div>
              </div>
              <div className="p-3">
                <button className="w-full py-2 bg-sf-fog text-sf-navy font-semibold rounded-lg text-sm hover:bg-sf-fog/70 transition-colors flex items-center justify-center gap-2">
                  <Ticket size={16} />
                  Purchase Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-3 py-3 pb-6">
        <h2 className="display-text text-lg text-sf-navy mb-3">Explore</h2>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate('/films')}
            className="bg-white p-3 rounded-xl shadow-elevated text-left group"
          >
            <Film size={24} className="text-sf-red mb-2" />
            <p className="font-semibold text-sf-navy text-sm">Browse Films</p>
            <p className="text-sf-slate text-xs mt-0.5">View the full lineup</p>
          </button>
          <button
            onClick={() => navigate('/schedule')}
            className="bg-white p-3 rounded-xl shadow-elevated text-left group"
          >
            <Calendar size={24} className="text-sf-red mb-2" />
            <p className="font-semibold text-sf-navy text-sm">Schedule</p>
            <p className="text-sf-slate text-xs mt-0.5">Plan your festival</p>
          </button>
          <button
            onClick={() => navigate('/events')}
            className="bg-white p-3 rounded-xl shadow-elevated text-left group"
          >
            <Award size={24} className="text-sf-red mb-2" />
            <p className="font-semibold text-sf-navy text-sm">Special Events</p>
            <p className="text-sf-slate text-xs mt-0.5">Galas & parties</p>
          </button>
          <button
            onClick={() => navigate('/about')}
            className="bg-white p-3 rounded-xl shadow-elevated text-left group"
          >
            <MapPin size={24} className="text-sf-red mb-2" />
            <p className="font-semibold text-sf-navy text-sm">Venues</p>
            <p className="text-sf-slate text-xs mt-0.5">Find locations</p>
          </button>
        </div>
      </div>
    </div>
  );
}
