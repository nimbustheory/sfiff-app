import { useState, useEffect, useRef } from 'react';
import { Crown, Star, Ticket, Gift, Calendar, Users, Sparkles, Check, CreditCard, Film, Award } from 'lucide-react';

const BENEFITS = [
  { icon: Ticket, title: 'Priority Tickets', desc: 'Early access to all screenings' },
  { icon: Star, title: 'Exclusive Events', desc: 'Members-only premieres' },
  { icon: Gift, title: 'Discounts', desc: '20% off concessions' },
  { icon: Calendar, title: 'Free Screenings', desc: 'Monthly member screenings' },
  { icon: Users, title: 'Guest Passes', desc: 'Bring friends for free' },
  { icon: Sparkles, title: 'Rewards', desc: 'Earn points on every visit' },
];

const TIERS = [
  {
    id: 'supporter',
    name: 'Supporter',
    price: 75,
    color: 'from-slate-600 to-slate-800',
    accent: '#64748B',
    benefits: ['2 free tickets/year', '10% off concessions', 'Member newsletter', 'Early ticket access'],
    popular: false,
  },
  {
    id: 'patron',
    name: 'Patron',
    price: 150,
    color: 'from-sf-red to-sf-coral',
    accent: '#C4463A',
    benefits: ['6 free tickets/year', '20% off concessions', 'Priority seating', '2 guest passes', 'VIP event invites'],
    popular: true,
  },
  {
    id: 'benefactor',
    name: 'Benefactor',
    price: 500,
    color: 'from-sf-gold to-amber-600',
    accent: '#D4AF37',
    benefits: ['Unlimited tickets', '30% off everything', 'Reserved seating', 'Unlimited guests', 'All VIP events', 'Private screenings'],
    popular: false,
  },
];

export default function Membership() {
  const [selectedTier, setSelectedTier] = useState('patron');
  const [cardFlipped, setCardFlipped] = useState(false);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Scroll reveal
  useEffect(() => {
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

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const selectedTierData = TIERS.find(t => t.id === selectedTier);

  return (
    <div className="animate-fade-in">
      {/* Cinematic Hero with Film Strip */}
      <div className="relative overflow-hidden film-strip">
        {/* Sprocket Holes */}
        <div className="sprocket-holes left">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="sprocket-hole" />
          ))}
        </div>
        <div className="sprocket-holes right">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="sprocket-hole" />
          ))}
        </div>

        <div className="relative bg-gradient-to-br from-sf-navy via-sf-charcoal to-sf-navy py-10 px-4">
          {/* Bokeh background */}
          <div className="absolute inset-0 bokeh-bg opacity-30" />
          
          {/* Content */}
          <div className="relative text-center text-white">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-sf-gold/20 rounded-full animate-pulse" />
              <div className="absolute inset-2 bg-sf-gold/30 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Crown size={36} className="text-sf-gold drop-shadow-lg" />
              </div>
            </div>
            <h1 className="display-text text-3xl mb-2">SF Film Society</h1>
            <p className="text-white/70 text-sm max-w-xs mx-auto">
              Join our community of film lovers and unlock a world of exclusive benefits
            </p>
            
            {/* Animated marquee */}
            <div className="mt-6 overflow-hidden">
              <div className="marquee-scroll-inner text-sf-gold/60 text-xs tracking-widest uppercase whitespace-nowrap">
                ★ Members Only ★ Exclusive Access ★ Priority Seating ★ VIP Events ★ Free Screenings ★ Members Only ★ Exclusive Access ★ Priority Seating ★ VIP Events ★ Free Screenings ★
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Grid - Staggered Reveal */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)}
        className="reveal-on-scroll px-3 py-5 bg-gradient-to-b from-sf-mist to-white"
      >
        <h2 className="display-text text-lg text-sf-navy mb-4 text-center">Member Benefits</h2>
        <div className="grid grid-cols-3 gap-2 stagger-children revealed">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div 
              key={title}
              className="bg-white p-3 rounded-xl text-center shadow-elevated hover:shadow-elevated-lg transition-all card-3d group"
            >
              <div className="card-3d-inner">
                <div className="w-11 h-11 bg-gradient-to-br from-sf-red/10 to-sf-coral/10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Icon size={20} className="text-sf-red" />
                </div>
                <p className="font-semibold text-sf-navy text-xs">{title}</p>
                <p className="text-sf-slate text-[10px] mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Tiers - Ticket Style */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)}
        className="reveal-on-scroll px-3 py-4"
      >
        <h2 className="display-text text-lg text-sf-navy mb-4 text-center">Choose Your Tier</h2>
        
        <div className="space-y-3">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
                selectedTier === tier.id 
                  ? 'ring-2 ring-offset-2 shadow-elevated-lg scale-[1.02]' 
                  : 'shadow-elevated hover:shadow-elevated-lg'
              }`}
              style={{ 
                
                transitionDelay: "0ms"
              }}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute top-0 right-0 z-10">
                  <div className="bg-sf-gold text-sf-charcoal text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                    <Award size={12} />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Ticket stub design */}
              <div className="flex">
                {/* Main section */}
                <div className={`flex-1 p-4 bg-gradient-to-r ${tier.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{tier.name}</h3>
                      <p className="text-white/70 text-xs mt-0.5">{tier.benefits.length} benefits included</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">${tier.price}</p>
                      <p className="text-white/70 text-xs">/year</p>
                    </div>
                  </div>

                  {/* Benefits preview */}
                  <div className="mt-3 grid grid-cols-2 gap-1">
                    {tier.benefits.slice(0, 4).map((benefit) => (
                      <div key={benefit} className="flex items-center gap-1.5 text-xs text-white/80">
                        <Check size={10} className="text-white flex-shrink-0" />
                        <span className="line-clamp-1">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stub section */}
                <div className="w-16 bg-white border-l-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-2">
                  <Film size={20} className="text-sf-slate mb-1" />
                  <span className="text-[8px] text-sf-slate uppercase tracking-wider font-bold text-center">
                    {tier.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Member Card Preview */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)}
        className="reveal-on-scroll px-3 py-5 bg-sf-fog"
      >
        <h2 className="display-text text-lg text-sf-navy mb-2 text-center">Your Member Card</h2>
        <p className="text-sf-slate text-xs text-center mb-4">Tap to flip</p>
        
        <div 
          className="flip-card mx-auto w-full max-w-[300px] h-[180px]"
          onClick={() => setCardFlipped(!cardFlipped)}
        >
          <div className={`flip-card-inner ${cardFlipped ? 'flipped' : ''}`}>
            {/* Front */}
            <div className={`flip-card-front bg-gradient-to-br ${selectedTierData?.color || 'from-sf-red to-sf-coral'} p-5 text-white shadow-elevated-lg`}>
              {/* Shine effect */}
              <div className="absolute inset-0 golden-shine rounded-xl" />
              
              {/* Pattern */}
              <div className="absolute inset-0 opacity-10 rounded-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 border border-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border border-white rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown size={20} className="text-sf-gold" />
                    <span className="font-bold">SFIFF</span>
                  </div>
                  <span className="text-xs uppercase tracking-wider opacity-70">
                    {selectedTierData?.name}
                  </span>
                </div>

                {/* Member Info */}
                <div>
                  <p className="text-xl font-bold">Film Enthusiast</p>
                  <p className="text-white/70 text-xs">Member since 2024</p>
                </div>

                {/* Card Number */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm tracking-widest">•••• •••• •••• 1234</span>
                  <CreditCard size={24} className="opacity-50" />
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="flip-card-back bg-sf-charcoal p-5 text-white shadow-elevated-lg">
              <div className="h-8 bg-sf-navy -mx-5 -mt-5 mb-4" />
              
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-[10px] text-white/50 uppercase tracking-wider">Member ID</p>
                  <p className="font-mono text-sm">SF-2024-00001234</p>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-1 bg-white/10 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-white/50">Points</p>
                    <p className="font-bold text-sf-gold">2,450</p>
                  </div>
                  <div className="flex-1 bg-white/10 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-white/50">Status</p>
                    <p className="font-bold text-green-400">Active</p>
                  </div>
                </div>
                
                {/* QR placeholder */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-white rounded-lg p-1">
                    <div className="w-full h-full bg-[url('data:image/svg+xml,...')] bg-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial with Cinematic Quote */}
      <section 
        ref={(el) => (sectionsRef.current[3] = el)}
        className="reveal-on-scroll px-3 py-4"
      >
        <div className="relative bg-white rounded-2xl p-5 shadow-elevated overflow-hidden">
          {/* Large decorative quote */}
          <div className="absolute -top-4 -left-2 text-8xl text-sf-red/10 font-serif leading-none">"</div>
          
          <div className="relative z-10">
            <p className="text-sf-navy text-sm italic leading-relaxed pl-4 border-l-2 border-sf-red">
              Being a patron member has completely transformed my festival experience. 
              The priority access and VIP events are incredible — I've met directors whose 
              work changed my life.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sf-coral to-sf-red flex items-center justify-center text-white font-bold">
                SC
              </div>
              <div>
                <p className="font-semibold text-sf-navy">Sarah Chen</p>
                <p className="text-sf-slate text-xs flex items-center gap-1">
                  <Crown size={10} className="text-sf-gold" />
                  Patron Member, 3 years
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-3 pb-8 pt-2">
        <button className="w-full py-4 bg-gradient-to-r from-sf-red to-sf-coral text-white font-bold rounded-xl text-lg shadow-glow hover:shadow-elevated-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden group">
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles size={20} />
            Join as {selectedTierData?.name} — ${selectedTierData?.price}/year
          </span>
          {/* Shine sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>
        <p className="text-center text-sf-slate text-xs mt-3">
          Cancel anytime • 30-day money-back guarantee
        </p>
      </section>

      {/* Flip card styles */}
      <style>{`
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 16px;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
