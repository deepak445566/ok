import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import logo from '/logo.png'

// Custom Icons - More refined
const CartIcon = () => (
  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const MenuIcon = ({ open }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
    )}
  </svg>
)

function Navbar() {
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false)
  
  const {
    user,
    setUser,
    setShowLogin,
    navigate,
    getCartCount,
    axios,
    logout: contextLogout
  } = useAppContext()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    setOpen(false)
    setMobileUserMenuOpen(false)
    setLoggingOut(true)
    
    try {
      await contextLogout();
      toast.success("Logged out successfully", {
        style: {
          background: '#10b981',
          color: '#fff',
          borderRadius: '4px',
        },
      });
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Session expired")
    } finally {
      setLoggingOut(false)
    }
  }

  const handleOrdersClick = () => {
    setOpen(false)
    setMobileUserMenuOpen(false)
    navigate('/myOrders')
  }

  const handleLoginClick = () => {
    setOpen(false)
    setMobileUserMenuOpen(false)
    setShowLogin(true)
  }

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false)
        setMobileUserMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
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

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out
        ${isScrolled 
          ? 'bg-[#e0d7b8] backdrop-blur-md shadow-sm py-4' 
          : 'bg-[#DEAD6A] backdrop-blur-sm py-6 md:py-8'
        }
      `}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between">
            
            {/* Logo - Left with image */}
           <NavLink 
  to='/' 
  className="relative group z-50 inline-block"
>
  <div className="flex items-center gap-4">
    <img 
      src={logo} 
      alt="Creation Empire" 
      className="h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
    />
    <div className="flex flex-col items-center lg:items-start">
      {/* Main Title - Now using Roboto Slab */}
      {/* Main Title - Updated with helper class */}
<span className="text-xl md:text-2xl lg:text-3xl font-light tracking-[0.2em] text-gray-900 font-roboto-slab">
  CREATION EMPIRE
</span>
      
      {/* Subtitle */}
      <div className="flex items-center w-full mt-1">
        {/* Decorative line that grows on hover */}
        <div className="h-[1px] w-4 bg-amber-600/30 transition-all duration-700 group-hover:w-8" />
        
        <span className="px-2 text-[10px] md:text-xs tracking-[0.5em] text-gray-500 font-['Poppins'] uppercase whitespace-nowrap">
          BY PRIYA
        </span>
        
        <div className="h-[1px] flex-grow bg-gray-100 group-hover:bg-amber-100 transition-all duration-700" />
      </div>
    </div>
  </div>

  {/* Refined Underline expansion from center */}
  <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-neutral-800 transition-all duration-700 ease-in-out -translate-x-1/2 group-hover:w-full opacity-50" />
</NavLink>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center space-x-12 ">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Collection' },
                { to: '/contact', label: 'Contact' },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `
                    relative text-sm tracking-wider font-light py-2
                    after:content-[''] after:absolute after:bottom-0 after:left-1/2 
                    after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-gray-600
                    after:transition-all after:duration-300
                    hover:after:w-full
                    ${isActive ? 'text-black after:w-full' : 'text-black hover:text-gray-700'}
                  `}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Right Icons - Desktop */}
            <div className="hidden md:flex items-center space-x-8 ">
              <button
                onClick={() => navigate("/cart")}
                className="relative group "
                aria-label="Shopping Bag"
              >
                <CartIcon />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 text-[10px] bg-gray-900 text-white w-4 h-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getCartCount()}
                  </span>
                )}
              </button>

              {!user ? (
                <button
                  onClick={handleLoginClick}
                  className="relative group text-black"
                  aria-label="Account"
                >
                  <UserIcon />
                </button>
              ) : (
                <div className="relative group text-black">
                  <button className="relative" aria-label="Account menu">
                    <UserIcon />
                  </button>
                  <div className="absolute right-0 top-8 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-10 transition-all duration-300">
                    <div className="bg-white shadow-xl border border-gray-100 py-2 mt-4">
                      <div className="px-5 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Welcome'}</p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{user?.email}</p>
                      </div>
                      <button onClick={handleOrdersClick} className="w-full text-left px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">My Orders</button>
                      <button onClick={handleLogout} disabled={loggingOut} className="w-full text-left px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-500 transition-colors disabled:opacity-50">
                        {loggingOut ? 'Signing out...' : 'Sign Out'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Icons */}
            <div className="flex md:hidden items-center space-x-4 z-50">
              <button onClick={() => navigate("/cart")} className="relative text-black">
                <CartIcon />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 text-[10px] bg-gray-900 text-white w-4 h-4 rounded-full flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>

              {!user ? (
                <button onClick={handleLoginClick} className="text-black">
                  <UserIcon />
                </button>
              ) : (
                <div className="relative">
                  <button onClick={() => setMobileUserMenuOpen(!mobileUserMenuOpen)} className="text-black">
                    <UserIcon />
                  </button>
                  {mobileUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setMobileUserMenuOpen(false)} />
                      <div className="absolute right-0 top-8 w-48 bg-white shadow-xl border border-gray-100 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                        </div>
                        <button onClick={handleOrdersClick} className="w-full text-left px-4 py-2 text-sm text-gray-600">My Orders</button>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500">Sign Out</button>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              <button onClick={() => setOpen(!open)} className="text-black">
                <MenuIcon open={open} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`
          fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 md:hidden z-[55]
          ${open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `} onClick={() => setOpen(false)} />

        {/* Mobile Menu Panel - Updated with white background throughout */}
        <div className={`
          fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-500 ease-out md:hidden z-[60]
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="flex flex-col h-full bg-white">
            {/* Header in side menu */}
            <div className="p-8 border-b border-gray-50 bg-white">
              <span className="text-lg font-light tracking-widest text-gray-900">MENU</span>
            </div>

            {/* Links */}
            <div className="flex-1 px-8 py-10 space-y-8 bg-white">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Collection' },
                { to: '/contact', label: 'Contact' },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `
                    block text-2xl font-extralight tracking-[0.1em] transition-all duration-300
                    ${isActive ? 'text-gray-900 translate-x-2' : 'text-gray-400 hover:text-gray-700 hover:translate-x-2'}
                  `}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Footer in side menu */}
            <div className="p-8 bg-white border-t border-gray-50">
              <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">Creation Empire By Priya</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className={`transition-all duration-700 ${isScrolled ? 'h-20' : 'h-28 md:h-32'}`} />
    </>
  )
}

export default Navbar