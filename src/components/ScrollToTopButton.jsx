import React, { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollY / docHeight) * 100;
      setScrollPercent(scrolled);
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle values
  const radius = 18;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

return (
  <button
    onClick={scrollToTop}
    className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl 
                transition-all duration-500 ease-in-out hover:from-indigo-500 hover:to-blue-700 transform hover:scale-110
                flex items-center justify-center
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    aria-label="Scroll to top"
  >
    <svg className="absolute w-full h-full rotate-[-90deg]" viewBox="0 0 40 40">
      <defs>
      <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stopColor="#fbbf24" /> {/* amber-400 */}
  <stop offset="50%" stopColor="#f59e0b" /> {/* amber-500 */}
  <stop offset="100%" stopColor="#ea580c" /> {/* orange-600 */}
</linearGradient>

      </defs>
      <circle
        cx="20"
        cy="20"
        r={normalizedRadius}
        stroke="url(#scrollGradient)"
        strokeWidth={stroke}
        fill="none"
        className="transition-all duration-300"
        style={{
          strokeDasharray: circumference,
          strokeDashoffset,
        }}
      />
    </svg>
    <svg className="h-5 w-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  </button>
);

}
