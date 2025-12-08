/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // San Francisco Film Festival Brand Colors
        'sf-red': '#C4463A',      // Golden Gate Bridge red
        'sf-coral': '#FF6B4A',    // Sunset coral
        'sf-navy': '#1E3A5F',     // Bay blue/navy
        'sf-fog': '#E8EDF2',      // Fog gray
        'sf-gold': '#D4AF37',     // Award gold
        'sf-mist': '#F5F7FA',     // Light mist background
        'sf-slate': '#64748B',    // Slate text
        'sf-charcoal': '#1A1A2E', // Dark charcoal
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Source Sans 3', 'sans-serif'],
      },
      aspectRatio: {
        'poster': '2/3',
        'landscape': '16/9',
      },
      boxShadow: {
        'elevated': '0 4px 20px rgba(0,0,0,0.08)',
        'elevated-lg': '0 8px 40px rgba(0,0,0,0.12)',
        'glow': '0 0 20px rgba(196, 70, 58, 0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shine': 'shine 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        shine: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
