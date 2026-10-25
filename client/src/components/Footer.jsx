import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

// Lightweight brand SVGs to avoid any lucide-react missing export errors
const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/siddhidatritv?psln=MmJpeDJteGkxZ3Bn',
      icon: InstagramIcon,
      hoverClass: 'hover:text-[#E4405F] hover:border-[#E4405F]/50',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/siddhidatri-tv/',
      icon: LinkedinIcon,
      hoverClass: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/50',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/share/1FWDpo27cj/',
      icon: FacebookIcon,
      hoverClass: 'hover:text-[#1877F2] hover:border-[#1877F2]/50',
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@siddhidatritv?si=W0TLJhMckrbWv4r2',
      icon: YoutubeIcon,
      hoverClass: 'hover:text-[#FF0000] hover:border-[#FF0000]/50',
    },
  ];

  const quickLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio Gallery', path: '/gallery' },
    { label: 'Contact Studio', path: '/contact' },
  ];

  const primaryServices = [
    { label: 'Live Broadcast & Streaming', slug: 'live-broadcast-streaming' },
    { label: 'Video & Photo Editing', slug: 'video-photo-editing' },
    { label: 'Website Development', slug: 'website-development' },
    { label: 'DevOps & Cloud Systems', slug: 'cloud-services' },
  ];

  return (
    <footer className="bg-[var(--surface-soft)] border-t border-[var(--line)] text-[var(--content)] transition-colors relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Socials */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ba0f18] animate-pulse" />
                Siddhidatri<span className="text-[#f5b400]">TV</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-sm">
              High-stakes multi-camera live broadcast productions, cinematic post-production, full-stack software development, and enterprise cloud operations engineered for scale.
            </p>

            {/* Social Media Icons */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                Connect With Us
              </p>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Siddhidatri TV on ${social.name}`}
                      className={`p-2.5 rounded-xl bg-[var(--card)] border border-[var(--line)] text-[var(--muted)] transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-sm ${social.hoverClass}`}
                    >
                      <Icon className="w-4 h-4 pointer-events-none" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--muted)]">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#f5b400]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Core Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--muted)]">
              {primaryServices.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    to={`/services/${svc.slug}`}
                    className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{svc.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#f5b400]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Studio Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-[var(--muted)]">
              <a
                href="mailto:info@siddhidatritv.com"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-[var(--card)] border border-[var(--line)] text-[#ba0f18]">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>info@siddhidatritv.com</span>
              </a>

              <a
                href="tel:+917300038364"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-[var(--card)] border border-[var(--line)] text-emerald-400">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 7300038364</span>
              </a>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-[var(--card)] border border-[var(--line)] text-[#f5b400] shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[var(--muted)]">
          <p>© {currentYear} Siddhidatri TV. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Broadcast • Post • Development • Cloud</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;