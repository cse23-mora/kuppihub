import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft, Code, Users, Sparkles, Zap, Cpu, Database } from 'lucide-react';

const NotFound = () => {
  const [particles, setParticles] = useState([]);
  const [floatingElements, setFloatingElements] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Initialize particles
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 1,
        color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]
      });
    }
    setParticles(newParticles);

    // Initialize floating elements
    const icons = [<Code key="code" />, <Cpu key="cpu" />, <Database key="db" />, <Zap key="zap" />];
    const newFloatingElements = [];
    for (let i = 0; i < 8; i++) {
      newFloatingElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        icon: icons[Math.floor(Math.random() * icons.length)]
      });
    }
    setFloatingElements(newFloatingElements);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.vy + window.innerHeight) % window.innerHeight
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGoHome = () => {
    // In a real app, this would navigate to home
    window.history.back();
  };

  const glitchText = "404";
  const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-blue-950 to-purple-700 overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full opacity-30 animate-pulse"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              transform: `translate(-50%, -50%)`
            }}
          />
        ))}
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map(element => (
          <div
            key={element.id}
            className="absolute text-blue-400/20 animate-bounce"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
              animationDelay: `${element.id * 0.5}s`,
              animationDuration: `${3 + element.id * 0.2}s`
            }}
          >
            {element.icon}
          </div>
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Mouse Glow Effect */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        
        {/* CSE23 Badge */}
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 font-mono text-sm animate-pulse">
            <Users className="w-4 h-4" />
            <span>CSE23 Batch</span>
            <span className="text-blue-200">•</span>
            <span>University of Moratuwa</span>
          </div>
        </div>

        {/* Animated 404 Text */}
        <div className="mb-8 relative">
          <h1 
            className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-pulse select-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {glitchText.split('').map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-300 ${
                  isHovering ? 'animate-bounce' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  transform: isHovering ? `rotate(${Math.random() * 20 - 10}deg)` : 'none'
                }}
              >
                {char}
              </span>
            ))}
          </h1>
          
          {/* Glitch Effect Overlay */}
          <div className="absolute inset-0 text-8xl md:text-9xl font-black text-red-500/30 animate-pulse pointer-events-none">
            <span className="animate-ping">4⚡4</span>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-12 max-w-2xl animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-bounce">
            Oops! You've found a bug in the matrix! 🐛
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
            Even the best <span className="text-blue-400 font-semibold">CSE23</span> developers 
            couldn't find this page. It might be lost in the void of <span className="text-purple-400">infinite loops</span>.
          </p>
          <div className="flex items-center justify-center gap-2 text-cyan-400 font-mono">
            <Code className="w-5 h-5 animate-spin" />
            <span>// TODO: Fix this 404 error</span>
          </div>
        </div>

        {/* Animated Stats */}
        <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl">
          {[
            { label: 'Coffee Cups', value: '2023', icon: '☕' },
            { label: 'Lines of Code', value: '∞', icon: '💻' },
            { label: 'Debug Hours', value: '404', icon: '🐛' },
            { label: 'Team Spirit', value: '100%', icon: '🚀' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:rotate-1"
            >
              <div className="text-2xl mb-2 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white animate-pulse">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
          <button
            onClick={handleGoHome}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
              Go Back Home
            </div>
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              Try Again
            </div>
          </button>
        </div>

        {/* Footer Message */}
  
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default NotFound;