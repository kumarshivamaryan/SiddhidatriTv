import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';

const Navbar = ({ services = [], onOpenQuote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleMobileQuote = () => {
    setIsOpen(false);
    if (onOpenQuote) onOpenQuote();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--line)] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Siddhidatri TV"
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--surface-soft)] border border-[var(--line)] p-1.5 rounded-full shadow-xs">
            <Link
              to="/"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                isActive('/') 
                  ? 'bg-[var(--card)] text-[var(--content)] shadow-sm font-semibold' 
                  : 'text-[var(--muted)] hover:text-[var(--content)] hover:bg-[var(--card-hover)]'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
                  location.pathname.startsWith('/services')
                    ? 'text-[#ba0f18] font-semibold'
                    : 'text-[var(--muted)] hover:text-[var(--content)] hover:bg-[var(--card-hover)]'
                }`}
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-[#ba0f18]' : ''}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-[var(--card)] border border-[var(--line)] shadow-xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-[var(--line)] mb-1">
                    <p className="text-[11px] font-bold tracking-wider uppercase text-[#f5b400]">
                      Specialized Offerings
                    </p>
                  </div>
                  <div className="max-h-96 overflow-y-auto space-y-0.5">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="group flex flex-col px-3.5 py-2.5 rounded-xl hover:bg-[var(--surface-soft)] transition-colors"
                      >
                        <span className="text-sm font-medium text-[var(--content)] group-hover:text-[#ba0f18] transition-colors">
                          {service.title}
                        </span>
                        <span className="text-xs text-[var(--muted)] line-clamp-1">
                          {service.shortDesc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/gallery"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                isActive('/gallery') 
                  ? 'bg-[var(--card)] text-[var(--content)] shadow-sm font-semibold' 
                  : 'text-[var(--muted)] hover:text-[var(--content)] hover:bg-[var(--card-hover)]'
              }`}
            >
              Portfolio
            </Link>

            <Link
              to="/contact"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                isActive('/contact') 
                  ? 'bg-[var(--card)] text-[var(--content)] shadow-sm font-semibold' 
                  : 'text-[var(--muted)] hover:text-[var(--content)] hover:bg-[var(--card-hover)]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white bg-[#ba0f18] hover:bg-[#e22630] active:bg-[#85070d] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-sm"
            >
              <Sparkles className="w-4 h-4 text-[#f5b400]" />
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] text-[var(--content)]"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-5 h-5 text-[#ba0f18]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[var(--card)] border-b border-[var(--line)] px-5 py-6 space-y-4 shadow-xl">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-base font-semibold text-[var(--content)] hover:text-[#ba0f18]"
          >
            Home
          </Link>
          <div>
            <span className="block text-xs uppercase font-bold tracking-wider text-[#f5b400] mb-2">Our Services</span>
            <div className="pl-3 space-y-2 border-l-2 border-[#ba0f18]/30">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-[var(--muted)] hover:text-[var(--content)]"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
          <Link
            to="/gallery"
            onClick={() => setIsOpen(false)}
            className="block text-base font-semibold text-[var(--content)] hover:text-[#ba0f18]"
          >
            Portfolio
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block text-base font-semibold text-[var(--content)] hover:text-[#ba0f18]"
          >
            Contact
          </Link>

          <button
            onClick={handleMobileQuote}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-white bg-[#ba0f18] hover:bg-[#e22630] shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#f5b400]" />
            Get a Quote
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;