import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

function HeroSection() {
  const { navigate } = useAppContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Collage images data (unchanged)
  const collageImages = [
    {
      id: 1,
      src: "red (1).jpeg",
      alt: "Traditional wear",
      className: "col-span-2 row-span-2",
      style: "large"
    },
    {
      id: 2,
      src: "red white1.jpeg",
      alt: "Traditional detail",
      className: "col-span-1 row-span-1",
      style: "medium"
    },
    {
      id: 3,
      src: "red with print.jpeg",
      alt: "Traditional elegance",
      className: "col-span-1 row-span-1",
      style: "medium"
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Parallax effect on mouse move
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  return (
    <section 
      className="relative w-full min-h-screen bg-gray-300 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Light, Airy Background Image Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/90 via-stone-50/95 to-stone-100" />
      </div>

      {/* Soft, Warm Lighting Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-200/30 rounded-full blur-[120px]" />

      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-px bg-stone-300 absolute left-1/3" />
        <div className="h-full w-px bg-stone-300 absolute left-2/3" />
        <div className="w-full h-px bg-stone-300 absolute top-1/3" />
        <div className="w-full h-px bg-stone-300 absolute top-2/3" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 py-4 lg:py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-center min-h-[calc(100vh-8rem)]">
          
          {/* Left Content - Editorial Typography - Now first on mobile */}
          <div className={`
            space-y-6 lg:space-y-10 order-1 lg:order-1
            transform transition-all duration-1000 delay-300
            ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
          `}>
            
            {/* Dramatic Main Heading - Light Version */}
            <h1 className="text-5xl lg:text-7xl xl:text-9xl font-light text-stone-800 leading-[0.9]">
              <span className="block text-stone-600">WHERE</span>
              <span className="block text-stone-900 font-medium mt-2 relative">
                TRADITION
                <span className="absolute -top-6 -right-12 text-[10px] text-stone-400 tracking-[0.5em] rotate-90 hidden lg:block">EST. 2024</span>
              </span>
              <span className="block text-stone-700 mt-4 text-5xl lg:text-7xl">
                MEETS MODERN
              </span>
            </h1>

            {/* Editorial Description - Light Version */}
            <p className="text-base lg:text-lg text-stone-600 max-w-lg leading-relaxed font-light tracking-wide">
              Discover our curated collection of traditional wear, where each piece tells a story of craftsmanship, culture, and contemporary grace. From timeless weaves to modern silhouettes, embrace the beauty of heritage reimagined.
            </p>

            {/* Features - Minimalist Grid - Light Version */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6 py-4 lg:py-6">
              {[
                { label: 'Handcrafted Excellence', icon: '✧' },
                { label: 'Sustainable Weaves', icon: '◈' },
                { label: 'Timeless Designs', icon: '✦' },
                { label: 'Modern Comfort', icon: '◊' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-stone-500 group hover:text-stone-800 transition-colors duration-500">
                  <span className="text-stone-400 text-xl group-hover:text-stone-700 transition-colors duration-500">{feature.icon}</span>
                  <span className="text-[10px] lg:text-[11px] uppercase tracking-wider">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons - Light Version */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4 lg:pt-6">
              <Link
                to="/products"
                className="group relative px-8 lg:px-10 py-4 lg:py-5 bg-stone-800 text-stone-50 text-sm uppercase tracking-[0.3em] overflow-hidden hover:bg-stone-700 transition-all duration-700 w-full sm:w-auto text-center"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Explore Collection
                  <svg className="w-4 h-4 ml-3 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            
            </div>

            
          </div>

          {/* Right Content - Dramatic Image Collage - Light Version - Now second on mobile */}
          <div className={`
            relative grid grid-cols-3 gap-2 lg:gap-3 h-[400px] lg:h-[700px] order-2 lg:order-2 mt-6 lg:mt-0
            transform transition-all duration-1000 delay-500
            ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}
          `}>
            {/* Large Image with Soft Overlay */}
            <div className="col-span-2 row-span-2 relative overflow-hidden group rounded-lg shadow-2xl lg:shadow-3xl">
              <img
                src={collageImages[0].src}
                alt="Traditional elegance"
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                
              />
              {/* Soft Gradient Overlay - Light Version */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-800/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              
              {/* Editorial Label Overlay - Light Version */}
              <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 text-stone-50 transform transition-transform duration-700 group-hover:translate-y-0 translate-y-4">
                <p className="text-[8px] lg:text-[10px] tracking-[0.3em] opacity-80 mb-1">HERITAGE WEAVE</p>
                <p className="text-xs lg:text-sm font-light tracking-wider">TIMELESS COLLECTION</p>
              </div>
              
              {/* Decorative Corner - Light Version */}
              <div className="absolute top-4 lg:top-6 right-4 lg:right-6 w-12 lg:w-16 h-12 lg:h-16 border-t border-r border-stone-50/40" />
              <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 w-12 lg:w-16 h-12 lg:h-16 border-b border-l border-stone-50/40" />
            </div>

            {/* Top Right Image - Light Version */}
            <div className="col-span-1 row-span-1 relative overflow-hidden group rounded-lg shadow-lg lg:shadow-xl">
              <img
                src={collageImages[1].src}
                alt="Traditional detail"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span className="absolute bottom-2 lg:bottom-3 right-2 lg:right-3 text-stone-50/70 text-base lg:text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                ✧
              </span>
            </div>

            {/* Bottom Right Image - Light Version */}
            <div className="col-span-1 row-span-1 relative overflow-hidden group rounded-lg shadow-lg lg:shadow-xl">
              <img
                src={collageImages[2].src}
                alt="Modern traditional"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span className="absolute bottom-2 lg:bottom-3 right-2 lg:right-3 text-stone-50/70 text-base lg:text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                ◈
              </span>
            </div>

            {/* Soft Spotlight Effect */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-transparent via-stone-100/20 to-transparent opacity-50 pointer-events-none" />
          </div>
        </div>

       
      </div>

      {/* Side Editorial Labels - Light Version */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block">
        <div className="relative">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-stone-300 to-transparent" />
          <div className="text-stone-300 text-[8px] rotate-90 origin-left whitespace-nowrap tracking-[0.8em] uppercase font-light transform -translate-y-1/2">
            TIMELESS
          </div>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
        <div className="relative">
          <div className="text-stone-300 text-[8px] -rotate-90 origin-right whitespace-nowrap tracking-[0.8em] uppercase font-light transform -translate-y-1/2">
            ELEGANCE
          </div>
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-stone-300 to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;