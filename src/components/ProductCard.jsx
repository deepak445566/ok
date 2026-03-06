import React, { useState } from "react"; 
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

// Custom Icons
const HeartIcon = ({ filled }) => (
  <svg className="w-4 h-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const QuickViewIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function ProductCard({ product, variant = 'default' }) {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();
  const currency = "₹";
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  // Check if product is in stock
  const isInStock = () => {
    if (product.sizes && product.sizes.length > 0) {
      return product.sizes.some(size => size.stock > 0);
    }
    return true;
  };

  // Get display price
  const displayPrice = product.discountPrice || product.price;
  const originalPrice = product.discountPrice ? product.price : null;
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100) 
    : 0;

  // Get image - handle both 'image' (old) and 'images' (new) formats
  const getProductImage = () => {
    if (product.images && product.images.length > 0) {
      return isHovered && product.images.length > 1 ? product.images[1] : product.images[0];
    }
    if (product.image && product.image.length > 0) {
      return product.image[0];
    }
    return null;
  };

  const productImage = getProductImage();

  // Create a data URL for a simple placeholder
  const createPlaceholderSVG = () => {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23faf9f8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Helvetica' font-size='14' fill='%23b76e79'%3ECREATION EMPIRE%3C/text%3E%3C/svg%3E`;
  };

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('.wishlist-btn')) {
      return;
    }
    navigate(`/product/${product._id}`);
    window.scrollTo(0, 0);
  };

  // Determine card size based on variant
  const cardClasses = {
    default: "max-w-[16rem]",
    expanded: "max-w-full",
    small: "max-w-[12rem]"
  };

  return product && (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group bg-white w-full ${cardClasses[variant] || cardClasses.default}
        transition-all duration-500 cursor-pointer
        ${isHovered ? 'shadow-xl' : 'shadow-sm'}
        rounded-[2rem] overflow-hidden
      `}
    >
      {/* Image Container */}
<div className="relative aspect-[3/4] bg-gradient-to-br from-[#fffaf3] to-[#f3ece2] overflow-hidden hover:shadow-md transition-all duration-500 border border-stone-100">

  {/* Soft Light Shade Overlay */}
  <div className="absolute inset-0 bg-white/30 pointer-events-none" />

  {/* Main Image */}
  <img
    className={`
      w-full h-full object-contain transition-all duration-700 mt-2
      ${isHovered ? 'scale-110 rotate-1' : 'scale-100'}
    `}
    src={imageError ? createPlaceholderSVG() : (productImage || createPlaceholderSVG())}
    alt={product.name}
    onError={() => setImageError(true)}
  />

  {/* Background Pattern on Hover */}
  <div className={`
    absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700
    bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[length:20px_20px]
  `} />

  {/* Overlay Gradient */}
  <div className={`
    absolute inset-0 bg-gradient-to-t from-amber-900/10 via-transparent to-transparent
    transition-opacity duration-500
    ${isHovered ? 'opacity-100' : 'opacity-0'}
  `} />

  {/* Out of Stock Overlay */}
  {!isInStock() && (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <span className="text-xs tracking-wider text-stone-500 bg-white/90 px-6 py-3 rounded-full border border-stone-200 shadow-lg">
        OUT OF STOCK
      </span>
    </div>
  )}
</div>

      {/* Product Info */}
<div className="pt-6 pb-5 px-4 bg-gradient-to-b from-[#fffaf3] to-[#f6efe6] rounded-b-2xl">

  {/* Brand/Category */}
  <p className="text-[10px] text-amber-400 tracking-[0.25em] uppercase mb-2 font-light text-center">
    {product.category || 'NEW ARRIVAL'}
  </p>

  {/* Product Name */}
  <h3 className="text-sm md:text-base text-stone-700 font-light text-center truncate group-hover:text-stone-900 transition-colors mb-3">
    {product.name}
  </h3>

  

  {/* Rating */}
  <div className="flex flex-col items-center mb-4">
    <div className="flex items-center gap-1">
      {Array(5).fill('').map((_, i) => (
        <img
          key={i}
          className="w-3 h-3 opacity-75"
          src={i < 4 ? assets.star_icon : assets.star_dull_icon}
          alt="star"
        />
      ))}
    </div>
    <span className="text-[10px] text-stone-400 font-light mt-1">(12)</span>
  </div>

  {/* Price + Add to Cart */}
  <div className="flex items-end justify-between pt-4 border-t border-stone-100">

    {/* Price */}
    <div>
      <p className="text-lg md:text-xl font-light text-amber-600">
        {currency}{displayPrice}
      </p>
      {originalPrice && (
        <span className="text-xs text-stone-300 line-through block font-light">
          {currency}{originalPrice}
        </span>
      )}
    </div>

    {/* Cart Button */}
    <div onClick={(e) => e.stopPropagation()} className="relative">
      {!cartItems[product._id] ? (
        <button
          className={`
            px-4 py-2 text-xs tracking-wider border rounded-full transition-all duration-300
            ${isInStock() 
              ? 'border-stone-200 text-stone-600 hover:border-amber-400 hover:bg-amber-400 hover:text-white hover:shadow-md' 
              : 'border-stone-100 text-stone-300 cursor-not-allowed'
            }
          `}
          onClick={() => addToCart(product._id)}
          disabled={!isInStock()}
        >
          {isInStock() ? 'ADD TO BAG' : 'OUT OF STOCK'}
        </button>
      ) : (
        <div className="flex items-center border border-stone-200 rounded-full overflow-hidden shadow-sm">
          <button
            onClick={() => removeFromCart(product._id)}
            className="w-8 h-8 flex items-center justify-center text-stone-400 hover:bg-stone-50 hover:text-amber-500 transition-colors"
          >
            −
          </button>
          <span className="w-8 text-center text-xs text-stone-600 font-light">
            {cartItems[product._id]}
          </span>
          <button
            onClick={() => addToCart(product._id)}
            className="w-8 h-8 flex items-center justify-center text-stone-400 hover:bg-stone-50 hover:text-amber-500 transition-colors"
          >
            +
          </button>
        </div>
      )}
    </div>

  </div>
</div>

     
    </div>
  );
}

export default ProductCard;