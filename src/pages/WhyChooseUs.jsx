import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

// Custom Icons
const HeartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ScissorsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
  </svg>
);

const LeafIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const InfinityIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M7.5 7.5h9M7.5 16.5h9" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

function WhyChooseUs() {
  const { navigate } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  // Brand story data
  const brandStory = {
    founder: "Priya",
    story: "What began as a small atelier in 2015 has grown into Creation Empire—a sanctuary for women who seek clothing that tells their story. Every stitch carries intention, every silhouette celebrates the feminine form, and every collection is born from the desire to make women feel powerful yet graceful.",
    philosophy: "We believe fashion should be an extension of your spirit, not a costume you wear. Our designs are crafted for the woman who commands rooms with quiet confidence, who appreciates subtle luxury, and who understands that true elegance never shouts.",
    signature: "Creation Empire by Priya"
  };

  // Features data
  const features = [
    {
      id: 1,
      title: "Handcrafted with Intention",
      description: "Each piece is meticulously crafted by master artisans who pour their soul into every stitch. We believe in slow fashion—where quality triumphs over quantity, and every garment carries the warmth of human touch.",
      icon: <HeartIcon />,
      accent: "rose",
      stats: "5000+ hours of craftsmanship"
    },
    {
      id: 2,
      title: "Exclusive, Limited Editions",
      description: "We never mass-produce. Each design is released in limited quantities, ensuring you wear something truly unique. When a piece sells out, it becomes a memory—a treasure for those who found it first.",
      icon: <SparklesIcon />,
      accent: "amber",
      stats: "50 pieces per design"
    },
    {
      id: 3,
      title: "Sustainable Luxury",
      description: "We honor our planet by using eco-conscious fabrics, minimizing waste, and creating pieces designed to last beyond seasons. Luxury shouldn't cost the earth—it should celebrate it.",
      icon: <LeafIcon />,
      accent: "emerald",
      stats: "100% sustainable fabrics"
    },
    {
      id: 4,
      title: "Designed for Real Women",
      description: "Our fits are perfected on real bodies, not just mannequins. We celebrate diverse silhouettes, ensuring every woman feels confident, comfortable, and beautiful in Creation Empire.",
      icon: <ScissorsIcon />,
      accent: "blue",
      stats: "8 sizes, 3 fits per design"
    }
  ];

  // Statistics data
  const statistics = [
    { id: 1, value: "10K+", label: "Happy Clients", suffix: "K+" },
    { id: 2, value: "500+", label: "Unique Designs", suffix: "+" },
    { id: 3, value: "8", label: "Years of Excellence", suffix: "" },
    { id: 4, value: "100%", label: "Client Satisfaction", suffix: "%" }
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      text: "Wearing Creation Empire feels like wearing art. The attention to detail, the way the fabric moves—it's unlike anything I've ever owned. Priya doesn't just design clothes; she designs confidence.",
      author: "Ananya Sharma",
      location: "Mumbai",
      rating: 5
    },
    {
      id: 2,
      text: "I've never received so many compliments. The fit is perfection, and knowing it's sustainably made makes me love it even more. Creation Empire is my go-to for everything special.",
      author: "Riya Kapoor",
      location: "Delhi",
      rating: 5
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 bg-gradient-to-b from-stone-50 via-white to-stone-50 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-rose-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto">
        
        {/* Section Header - Brand Intro */}
        <div className={`
          text-center max-w-3xl mx-auto mb-16 md:mb-24 px-6 md:px-12 lg:px-8
          transform transition-all duration-1000
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 h-[2px] bg-rose-300"></span>
            <span className="text-xs tracking-[0.3em] uppercase text-stone-400 font-light">
              Creation Empire by Priya
            </span>
            <span className="w-12 h-[2px] bg-amber-300"></span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-800 mb-6 leading-tight tracking-tight">
            Crafted with <span className="italic font-serif text-rose-600">Love</span>
            <br />Worn with <span className="italic font-serif text-amber-700">Confidence</span>
          </h2>
          
          <div className="w-24 h-[2px] bg-gradient-to-r from-rose-300 via-amber-300 to-emerald-300 mx-auto mb-8"></div>
          
          <p className="text-stone-600 text-lg leading-relaxed font-light max-w-2xl mx-auto">
            {brandStory.story}
          </p>
        </div>

        {/* Founder's Note - Featured Story */}
        <div className={`
          relative mb-20 md:mb-28 px-6 md:px-12 lg:px-8
          transform transition-all duration-1000 delay-200
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white/80 backdrop-blur-sm rounded-[4rem] p-8 md:p-12 shadow-xl border border-stone-100">
            
            {/* Founder Image Placeholder */}
            <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-amber-200 shadow-2xl flex-shrink-0 group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EFE1B5] to-[#bc8244] flex items-center justify-center text-black text-7xl font-light transition-transform duration-700 group-hover:scale-110">
                P
              </div>
            </div>

            {/* Quote */}
            <div className="flex-1 relative">
              <span className="text-8xl text-amber-200/50 font-serif absolute -top-12 -left-6">"</span>
              <p className="text-xl md:text-2xl text-stone-700 italic mb-6 relative z-10 leading-relaxed font-light">
                {brandStory.philosophy}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="text-lg font-medium text-stone-900">— Priya</h4>
                  <p className="text-sm text-stone-500 font-light">Founder & Creative Director</p>
                </div>
                <span className="text-[10px] tracking-wider text-amber-700 uppercase border border-amber-200 px-4 py-2 rounded-full bg-amber-50/50">
                  {brandStory.signature}
                </span>
              </div>
              <span className="text-8xl text-amber-200/50 font-serif absolute -bottom-16 -right-6">"</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 mb-20 md:mb-28 px-6 md:px-12 lg:px-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`
                group relative overflow-hidden rounded-[3rem] bg-white shadow-lg hover:shadow-2xl transition-all duration-700
                transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
              `}
              style={{ transitionDelay: `${index * 150 + 400}ms` }}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <div className="flex items-start gap-6 mb-6">
                  <div className={`
                    p-4 rounded-2xl bg-gradient-to-br from-${feature.accent}-50 to-${feature.accent}-100/50 text-stone-700
                    transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg
                  `}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-stone-800 mb-3 tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Feature Stats */}
                <div className="mt-6 pt-6 border-t border-stone-100">
                  <span className={`
                    text-xs font-light text-${feature.accent}-700 bg-${feature.accent}-50/80 px-4 py-2 rounded-full
                    inline-flex items-center gap-2
                  `}>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    {feature.stats}
                  </span>
                </div>

                {/* Decorative Corner */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className={`text-${feature.accent}-200 text-6xl font-thin`}>✦</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div 
          ref={statsRef}
          className={`
            grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-28 px-6 md:px-12 lg:px-8
            transform transition-all duration-1000 delay-600
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
          `}
        >
          {statistics.map((stat, index) => (
            <div key={stat.id} className="text-center group">
              <div className="relative inline-block mb-4">
                <div className="text-4xl md:text-5xl text-stone-700 group-hover:scale-110 transition-transform duration-500">
                  {index === 0 && "❤️"}
                  {index === 1 && "✂️"}
                  {index === 2 && "⭐"}
                  {index === 3 && "💫"}
                </div>
                <div className="absolute -inset-3 bg-gradient-to-r from-rose-200/0 via-amber-200/50 to-emerald-200/0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="text-3xl md:text-4xl font-light text-stone-800 mb-2">
                {stat.value}
              </div>
              <p className="text-xs uppercase tracking-wider text-stone-400 font-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className={`
          grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-6 md:px-12 lg:px-8 mb-20 md:mb-28
          transform transition-all duration-1000 delay-800
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="relative bg-white/70 backdrop-blur-sm rounded-[2.5rem] p-8 shadow-lg hover:shadow-xl transition-all border border-stone-100 group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Quote Mark */}
              <span className="text-6xl text-amber-200/30 font-serif absolute top-4 right-8">"</span>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-stone-600 mb-6 leading-relaxed italic font-light relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-stone-800">{testimonial.author}</h4>
                  <p className="text-xs text-stone-400 font-light">{testimonial.location}</p>
                </div>
                
                {/* Decorative Element */}
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-amber-400 text-xl">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`
          mt-20 text-center px-6 md:px-12 lg:px-8
          transform transition-all duration-1000 delay-1000
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
        `}>
          <Link
            to="/collections/signature"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-stone-800 text-white text-xs uppercase tracking-[0.2em] hover:bg-stone-900 transition-all duration-500 rounded-full shadow-lg hover:shadow-xl"
          >
            <span>Discover the Collection</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRightIcon />
            </span>
          </Link>
          
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-stone-200"></div>
            <p className="text-xs text-stone-400 font-light">
              Join 10,000+ women who've found their signature style
            </p>
            <div className="w-12 h-[1px] bg-stone-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;