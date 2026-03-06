import React, { useEffect, useState, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

// Custom Icons
const GridIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Premium animated counter component
const AnimatedCounter = ({ count }) => {
  return (
    <span className="inline-flex items-center justify-center min-w-[2rem] h-6 bg-amber-50 rounded-full px-2 text-xs text-amber-600">
      {count}
    </span>
  );
};

function AllProduct() {
  const { products, search, loading } = useAppContext();
  const [filterProducts, setFilterProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    console.log("Products from context:", products);
    
    if (products && products.length > 0) {
      let filtered = products;
      
      if (search && search.length > 0) {
        filtered = products.filter((product) =>
          product.name?.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      setFilterProducts(filtered);
    } else {
      setFilterProducts([]);
    }
  }, [products, search]);

  // Handle sort
  const getSortedProducts = () => {
    let sorted = [...filterProducts];
    
    switch(sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      default:
        return sorted;
    }
  };

  const displayedProducts = getSortedProducts();

  if (loading.products) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-stone-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-2 border-amber-400 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm text-stone-400 tracking-wider mt-6 font-light">CURATING COLLECTION</p>
      </div>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-stone-100 to-[#FFF2D0] overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-[2px] bg-amber-300"></span>
              <span className="text-xs tracking-[0.3em] uppercase text-stone-400 font-light">
                Collection
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-800 mb-3 tracking-tight">
              All
              <span className="block text-amber-800/70 font-serif italic text-3xl md:text-4xl mt-2">
                Products
              </span>
            </h2>
            
            <p className="text-stone-500 text-sm max-w-md mt-4 font-light leading-relaxed">
              Discover our complete collection of thoughtfully designed pieces, 
              each crafted to celebrate your unique style.
            </p>

            {/* Subtitle with count */}
            <p className="text-sm text-stone-400 mt-6">
              <span className="font-medium text-stone-700">{displayedProducts.length}</span> styles available
              {search && (
                <span className="text-stone-300 ml-2">
                  • searching "{search}"
                </span>
              )}
            </p>
          </div>

          
        </div>

        {/* Active Filters */}
        {search && (
          <div className={`mb-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-400 font-light">FILTER:</span>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-50 rounded-full text-xs text-amber-700">
                <span className="font-light">"{search}"</span>
                <button 
                  onClick={() => window.location.reload()} 
                  className="hover:text-amber-900 transition-colors"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {displayedProducts.length === 0 ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center py-16">
            <div className="w-24 h-24 mb-6 opacity-20">
              <svg className="w-full h-full text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-light text-stone-700 mb-2">No products found</h3>
            <p className="text-sm text-stone-400 mb-6 max-w-md font-light">
              We couldn't find any products matching your criteria. Try adjusting your search or browse our collection.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="group px-8 py-4 bg-stone-800 text-white text-xs uppercase tracking-wider hover:bg-stone-900 transition-all duration-500 rounded-full shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                VIEW ALL PRODUCTS
                <ArrowRightIcon />
              </span>
            </button>
          </div>
        ) : (
          <>
            {/* Collection Stats */}
            <div className={`mb-8 text-right transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <p className="text-xs text-stone-400 font-light">
                Showing <span className="text-stone-700 font-medium">1-{displayedProducts.length}</span> of {products.length} products
              </p>
            </div>

            {/* Product Grid */}
            <div className={`
              grid gap-6 md:gap-8
              ${viewMode === 'grid' 
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                : 'grid-cols-1 md:grid-cols-2'
              }
            `}>
              {displayedProducts.map((product, index) => (
                <div 
                  key={product._id || index}
                  className={`
                    transform transition-all duration-1000
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                    ${viewMode === 'expanded' && index === 0 ? 'md:col-span-2' : ''}
                  `}
                  style={{ transitionDelay: `${index * 100 + 800}ms` }}
                >
                  <ProductCard 
                    product={product}
                    variant={viewMode === 'expanded' ? 'expanded' : 'default'}
                  />
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className={`mt-20 text-center transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <button className="group px-10 py-4 border border-stone-200 text-stone-600 text-xs uppercase tracking-wider hover:border-amber-400 hover:bg-amber-400 hover:text-white transition-all duration-500 rounded-full">
                <span className="relative inline-block">
                  LOAD MORE
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700"></span>
                </span>
              </button>
            </div>
          </>
        )}

        {/* Decorative Note */}
        <div className={`mt-24 text-center max-w-xl mx-auto transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="relative">
            <span className="text-6xl text-amber-200/50 font-serif absolute -top-8 left-0">"</span>
            <p className="text-sm text-stone-400 italic leading-relaxed font-light px-12">
              Each piece is thoughtfully designed to become a cherished part of your wardrobe, 
              celebrating the beauty of timeless elegance.
            </p>
            <span className="text-6xl text-amber-200/50 font-serif absolute -bottom-12 right-0">"</span>
          </div>
          <div className="mt-6 w-8 h-[1px] bg-stone-200 mx-auto"></div>
        </div>
      </div>
    </section>
  )
}

export default AllProduct;