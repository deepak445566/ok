import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import logo from '/logofinal.png'

// Enhanced Icons
const CartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const MenuIcon = ({ open }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
    )}
  </svg>
)

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

function Navbar() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  
  const {
    user,
    setShowLogin,
    navigate,
    getCartCount,
    logout: contextLogout
  } = useAppContext()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const handleLogout = async () => {
    try {
      await contextLogout();
      toast.success("Logged out successfully");
      setMobileUserMenuOpen(false);
    } catch (error) {
      toast.error("Error logging out");
    }
  }

  const cartCount = getCartCount ? getCartCount() : 0

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-white py-2'
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo with hover effect */}
           <NavLink 
  to="/" 
  className="h-23 w-30"
>
  <img 
    src={logo} 
    alt="Brand Logo"
    className="w-full h-full object-contain  "
  />

 
</NavLink>
 <span className="text-2xl uppercase lg:text-4xl text-black font-semibold leading-6 big px-6 py-4 rounded-3xl ">
    Creation Empire
  </span>
            {/* Desktop Navigation with hover effects */}
          

            {/* Right Icons with improved styling */}
            <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-1">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Shop' },
                { to: '/contact', label: 'Contact' },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    relative px-4 py-2 text-md font-medium exo transition-all duration-300
                    ${isActive 
                      ? 'text-black' 
                      : 'text-gray-600 hover:text-black'
                    }
                    group
                  `}
                >
                  {item.label}
                  <span className={`
                    absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-black 
                    transition-all duration-300 group-hover:w-1/2
                  `} />
                </NavLink>
              ))}
            </div>
              {/* Cart with animation */}
              <button 
                onClick={() => navigate("/cart")} 
                className="relative p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-300 group"
              >
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-black text-white text-xs rounded-full flex items-center justify-center px-1 group-hover:scale-110 transition-transform duration-300">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {!user ? (
                <button 
                  onClick={() => setShowLogin(true)} 
                  className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-300"
                >
                  <UserIcon />
                </button>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setMobileUserMenuOpen(!mobileUserMenuOpen)} 
                    className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-300 relative"
                  >
                    <UserIcon />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  </button>
                  
                  {mobileUserMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setMobileUserMenuOpen(false)} 
                      />
                      
                      <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-slideDown">
                        {/* User Info */}
                        <div className="px-4 py-4 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate mt-1">{user.email}</p>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="py-2">
                         
                          
                          <button 
                            onClick={() => { 
                              setMobileUserMenuOpen(false); 
                              navigate('/myOrders'); 
                            }} 
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            My Orders
                          </button>
                          
                       
                        </div>
                        
                        {/* Divider */}
                        <div className="border-t border-gray-100 my-1" />
                        
                        {/* Sign Out */}
                        <button 
                          onClick={handleLogout} 
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Mobile menu button */}
              <button 
                onClick={() => setOpen(!open)} 
                className="md:hidden p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-300"
              >
                <MenuIcon open={open} />
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar (expands when search is clicked) */}
        <div className={`
          absolute left-0 right-0 bg-white border-t border-gray-100 transition-all duration-500 overflow-hidden
          ${searchOpen ? 'max-h-20 py-4' : 'max-h-0'}
        `}>
          <div className="max-w-3xl mx-auto px-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
              />
              <SearchIcon />
            </div>
          </div>
        </div>

        {/* Mobile Menu with improved design and X button */}
        <div className={`
          fixed inset-0 bg-white/95 backdrop-blur-md z-40 transition-transform duration-500 md:hidden
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}>
          {/* Close button at the top right */}
          <button 
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 p-3 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-all duration-300 z-50"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col h-full pt-20 px-6">
            {/* Mobile Menu Header */}
            <div className="mb-8 flex justify-between items-center">
              <h3 className="text-xs font-semibold text-gray-400 tracking-wider">MENU</h3>
            </div>
            
            {/* Navigation Links */}
            <div className="flex-1 space-y-1">
              {[
                { to: '/', label: 'Home', icon: '🏠' },
                { to: '/products', label: 'Shop', icon: '🛍️' },
                { to: '/contact', label: 'Contact', icon: '📞' },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-4 py-4 px-4 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-black text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-lg font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="py-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">
                © 2024 Your Brand. All rights reserved.
              </p>
            </div>
          </div>

          {/* Optional: Tap outside to close (semi-transparent overlay) */}
          {open && (
            <div 
              className="absolute inset-0 bg-black/5 -z-10"
              onClick={() => setOpen(false)}
            />
          )}
        </div>
      </nav>

      {/* Spacer with smooth transition */}
      <div className={`transition-all duration-500 ${isScrolled ? 'h-16' : 'h-16'}`} />
    </>
  )
}

export default Navbar