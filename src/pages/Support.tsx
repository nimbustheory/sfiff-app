import { useState } from 'react';
import { HelpCircle, MessageCircle, Mail, Phone, ChevronDown, ChevronUp, Heart, ExternalLink } from 'lucide-react';

const FAQS = [
  {
    question: 'How do I purchase tickets?',
    answer: 'You can purchase tickets through our app by navigating to the Schedule page, selecting your preferred screening, and following the checkout process. You can also buy tickets at the venue box office.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'Tickets may be refunded up to 24 hours before the screening. After that, exchanges may be available subject to availability. Contact our support team for assistance.',
  },
  {
    question: 'How do I become a member?',
    answer: 'Visit the Membership page in our app to view available tiers and benefits. You can sign up online and your member card will be available immediately in the app.',
  },
  {
    question: 'Are the venues accessible?',
    answer: 'Yes, all our festival venues are wheelchair accessible. Please contact us in advance if you need specific accommodations and we\'ll be happy to assist.',
  },
  {
    question: 'Can I bring food and drinks?',
    answer: 'Outside food and beverages are not permitted. All venues have concession stands with a variety of options, including vegetarian and vegan choices.',
  },
  {
    question: 'How early should I arrive?',
    answer: 'We recommend arriving 15-20 minutes before showtime for general admission, and 30 minutes for premieres and special events to ensure seating.',
  },
];

export default function Support() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-sf-navy to-sf-charcoal px-4 py-8 text-center text-white">
        <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <HelpCircle size={28} className="text-white" />
        </div>
        <h1 className="display-text text-2xl mb-1">How can we help?</h1>
        <p className="text-white/70 text-sm">Find answers or get in touch</p>
      </div>

      {/* Contact Options */}
      <div className="px-3 py-4 -mt-4 relative z-10">
        <div className="grid grid-cols-3 gap-2">
          <a
            href="mailto:info@sffilm.org"
            className="bg-white rounded-xl p-3 shadow-elevated text-center"
          >
            <Mail size={20} className="mx-auto text-sf-red mb-1" />
            <p className="font-semibold text-sf-navy text-xs">Email</p>
            <p className="text-sf-slate text-[10px]">info@sffilm.org</p>
          </a>
          <a
            href="tel:+14155611600"
            className="bg-white rounded-xl p-3 shadow-elevated text-center"
          >
            <Phone size={20} className="mx-auto text-sf-red mb-1" />
            <p className="font-semibold text-sf-navy text-xs">Call</p>
            <p className="text-sf-slate text-[10px]">(415) 561-1600</p>
          </a>
          <button className="bg-white rounded-xl p-3 shadow-elevated text-center">
            <MessageCircle size={20} className="mx-auto text-sf-red mb-1" />
            <p className="font-semibold text-sf-navy text-xs">Chat</p>
            <p className="text-sf-slate text-[10px]">Live support</p>
          </button>
        </div>
      </div>

      {/* FAQs */}
      <div className="px-3 py-3">
        <h2 className="display-text text-lg text-sf-navy mb-3">Frequently Asked Questions</h2>
        
        <div className="space-y-2">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-elevated overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-3 text-left"
              >
                <span className="font-semibold text-sf-navy text-sm pr-4">{faq.question}</span>
                {expandedFaq === index ? (
                  <ChevronUp size={18} className="text-sf-slate flex-shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-sf-slate flex-shrink-0" />
                )}
              </button>
              {expandedFaq === index && (
                <div className="px-3 pb-3 pt-0">
                  <p className="text-sf-slate text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Donate Section */}
      <div className="px-3 py-4">
        <div className="bg-gradient-to-br from-sf-red to-sf-coral rounded-xl p-4 text-white text-center">
          <Heart size={28} className="mx-auto mb-2" />
          <h3 className="display-text text-lg mb-1">Support Our Mission</h3>
          <p className="text-white/80 text-sm mb-3">
            Help us bring world cinema to San Francisco. Your donation supports filmmakers and our community programs.
          </p>
          <button className="px-6 py-2 bg-white text-sf-red font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Donate Now
          </button>
        </div>
      </div>

      {/* Links */}
      <div className="px-3 py-3 pb-6">
        <h2 className="display-text text-lg text-sf-navy mb-3">Resources</h2>
        
        <div className="space-y-2">
          {[
            { label: 'Terms of Service', href: '#' },
            { label: 'Privacy Policy', href: '#' },
            { label: 'Accessibility', href: '#' },
            { label: 'Press & Media', href: '#' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center justify-between p-3 bg-white rounded-xl shadow-elevated"
            >
              <span className="text-sf-navy text-sm font-medium">{link.label}</span>
              <ExternalLink size={16} className="text-sf-slate" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
