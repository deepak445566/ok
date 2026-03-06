import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

// Custom Icons
const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg className={`w-5 h-5 transition-colors ${filled ? 'fill-rose-500 stroke-rose-500' : 'stroke-stone-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const QuickViewIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

function FeaturedCollection() {
  const { navigate } = useAppContext();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const productRefs = useRef([]);

  const featuredProducts = [
  { 
    id: 1, 
    name: 'Red Floral Silk', 
    brand: 'ESSENTIALS', 
    price: 6999, 
    originalPrice: 8999,
    image: './red with print.jpeg', 
    hoverImage: './red with print.jpeg',
    size: 'large',
    color: 'Crimson',
    isNew: true 
  },
  { 
    id: 2, 
    name: 'Crimson Contrast', 
    brand: 'COLLECTION', 
    price: 6999, 
    originalPrice: 8999,
    image: './red white1.jpeg', 
    hoverImage: './red white1.jpeg',
    size: 'small',
    color: 'Scarlet',
    isNew: false 
  },
  { 
    id: 3, 
    name: 'Red Velvate', 
    brand: 'COLLECTION', 
    price: 6999, 
    originalPrice: 8999,
    image: './red (1).jpeg', 
    hoverImage: './red (1).jpeg',
    size: 'medium',
    color: 'Burgundy',
    isNew: true 
  },
  { 
    id: 4, 
    name: 'Ivory Satin', 
    brand: 'EDIT', 
    price: 6999, 
    originalPrice: 8999,
    image: './white.jpeg', 
    hoverImage: './white.jpeg',
    size: 'medium',
    color: 'Ivory',
    isNew: false 
  },
  { 
    id: 5, 
    name: 'Cream Luxe Knit', 
    brand: 'LUXE', 
    price: 6999, 
    originalPrice: 8999,
    image: './red (5).jpeg', 
    hoverImage: './red (5).jpeg',
    size: 'small',
    color: 'Champagne',
    isNew: false 
  },
  { 
    id: 6, 
    name: 'Scarlet Print', 
    brand: 'BASIC', 
    price: 6999, 
    originalPrice: 8999,
    image: './red with print.jpeg', 
    hoverImage: './red with print.jpeg',
    size: 'medium',
    color: 'Scarlet',
    isNew: true 
  }
];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add a subtle parallax effect
          document.addEventListener('scroll', handleParallax);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      observer.disconnect();
      document.removeEventListener('scroll', handleParallax);
    };
  }, []);

  const handleParallax = () => {
    if (!sectionRef.current) return;
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    sectionRef.current.style.backgroundPositionY = `${rate}px`;
  };

  const handleProductClick = (productId) => {
    navigate(`/products`);
  };

  const handleLike = (e, productId) => {
    e.stopPropagation();
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleQuickView = (e, productId) => {
    e.stopPropagation();
    // Implement quick view modal logic here
    console.log('Quick view:', productId);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollPosition = scrollContainerRef.current.scrollLeft;
    const itemWidth = scrollContainerRef.current.offsetWidth * 0.8; // 80vw
    const newIndex = Math.round(scrollPosition / itemWidth);
    setActiveIndex(newIndex);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 bg-gradient-to-b from-stone-50 via-white to-stone-50 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 px-6 md:px-12 lg:px-8">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-[2px] bg-amber-300"></span>
              <span className="text-xs tracking-[0.3em] uppercase text-stone-400 font-light">
                Curated Selection
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-800 mb-3 tracking-tight">
              Featured
              <span className="block text-amber-800/70 font-serif italic text-3xl md:text-4xl mt-2">
                Collection
              </span>
            </h2>
            
            <p className="text-stone-500 text-sm max-w-md mt-4 font-light leading-relaxed">
              Discover our handpicked selection of timeless pieces, 
              where contemporary design meets enduring elegance.
            </p>
          </div>
          
          <Link 
            to="/collection" 
            className="group hidden md:flex items-center gap-3 px-6 py-3 border border-stone-200 hover:border-stone-800 rounded-full transition-all duration-500 hover:bg-stone-800 hover:text-white mt-8 md:mt-0"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Explore Collection</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </Link>
        </div>

        {/* Featured Products Grid - Desktop */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              ref={el => productRefs.current[index] = el}
              className={`group transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative mb-6">
                {/* Image Container */}
                <div 
                  className="relative aspect-[3/4] overflow-hidden rounded-[4rem] bg-gradient-to-br from-stone-100 to-[#FFF2D0] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-700"
                  onClick={() => handleProductClick(product.id)}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                  </div>

                  {/* Product Image */}
                  <img
                    src={hoveredProduct === product.id ? product.hoverImage : product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full p-8 object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-amber-900 text-white text-[10px] tracking-widest px-3 py-1.5 rounded-full uppercase shadow-lg">
                        New Arrival
                      </span>
                    )}
                  </div>

                  
                </div>

                {/* Product Info */}
                <div className="mt-6 text-center transform group-hover:translate-y-[-4px] transition-transform duration-500">
                  <p className="text-[10px] tracking-[0.25em] text-stone-400 mb-2 font-light">
                    {product.brand}
                  </p>
                  <h3 className="text-sm font-medium text-stone-800 mb-2 tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 mb-2 font-light">
                    {product.color}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base font-light text-stone-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xs text-stone-400 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-amber-700 font-medium">
                          -{Math.round((1 - product.price/product.originalPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Scroll with Indicators */}
        <div className="md:hidden">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 px-4 pb-12 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScroll}
          >
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[85vw] snap-center"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="group relative">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] bg-gradient-to-br from-stone-100 to-[#FFF2D0] mb-5 shadow-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full p-8 object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Mobile Badges */}
                    <div className="absolute top-4 left-4">
                      {product.isNew && (
                        <span className="bg-amber-900 text-white text-[8px] tracking-widest px-2 py-1 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>

                    
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] tracking-widest text-stone-400 mb-1">
                      {product.brand}
                    </p>
                    <h3 className="text-sm font-medium text-stone-800 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm font-light text-stone-900">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-stone-800' 
                    : 'w-2 bg-stone-300'
                }`}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const itemWidth = scrollContainerRef.current.offsetWidth * 0.85;
                    scrollContainerRef.current.scrollTo({
                      left: index * (itemWidth + 24), // 24 is gap
                      behavior: 'smooth'
                    });
                  }
                }}
                aria-label={`Go to item ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Featured Note with Animation */}
        <div className="mt-20 text-center max-w-2xl mx-auto px-6">
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="relative">
              <span className="text-6xl text-amber-200/50 font-serif absolute -top-8 left-0">"</span>
              <p className="text-lg md:text-xl text-stone-600 italic leading-relaxed font-light px-12">
                Thoughtfully selected pieces that bridge the gap between 
                contemporary design and timeless elegance, each telling its own story.
              </p>
              <span className="text-6xl text-amber-200/50 font-serif absolute -bottom-12 right-0">"</span>
            </div>
            
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-stone-300"></div>
              <span className="text-xs tracking-[0.3em] text-stone-400 uppercase">
                Curated with care
              </span>
              <div className="w-12 h-[1px] bg-stone-300"></div>
            </div>
          </div>
        </div>

        {/* Mobile Explore Button */}
        <div className="md:hidden mt-10 text-center">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-stone-800 text-white rounded-full text-xs uppercase tracking-widest hover:bg-stone-900 transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            Explore Full Collection
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollection;