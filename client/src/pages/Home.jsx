import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  X,
  Cpu,
  Target,
  Compass
} from 'lucide-react';
import ServiceIcon from '../components/ServiceIcon';

// High-fidelity fallback list for all 8 services
const defaultServices = [
  {
    slug: 'live-broadcast-streaming',
    title: 'Live Broadcast / Streaming',
    icon: 'Radio',
    shortDesc: 'Multi-cam 4K production, redundant cellular bonding, and zero-latency multistreaming to YouTube, Facebook, and custom CDNs.'
  },
  {
    slug: 'video-photo-editing',
    title: 'Video and Photo Editing',
    icon: 'Video',
    shortDesc: 'Cinematic color grading, audio master sweetening, fast-paced retention cuts, and commercial product retouching.'
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    icon: 'Code',
    shortDesc: 'Bespoke MERN stack applications, responsive agency portfolios, and enterprise portals engineered for speed and SEO.'
  },
  {
    slug: 'website-management-maintenance',
    title: 'Website Management & Maintenance',
    icon: 'Shield',
    shortDesc: 'Continuous uptime monitoring, automated database backups, security patch hardening, and performance audits.'
  },
  {
    slug: 'podcast-production',
    title: 'Podcast Production',
    icon: 'Mic',
    shortDesc: 'Multi-track studio audio capture, automated video switching, short-form viral clip cutting, and RSS distribution.'
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    icon: 'Share2',
    shortDesc: 'End-to-end multi-platform content scheduling, high-retention reel publishing, analytics tracking, and community growth.'
  },
  {
    slug: 'devops-services',
    title: 'DevOps Services',
    icon: 'GitBranch',
    shortDesc: 'Docker containerization, Kubernetes orchestration, GitLab CI/CD pipelines, and automated SBOM security vulnerability scans.'
  },
  {
    slug: 'cloud-services',
    title: 'Cloud Services (AWS / Azure / GCP)',
    icon: 'Cloud',
    shortDesc: 'High-availability architecture design, serverless microservice deployments, cost optimization, and multi-region failovers.'
  }
];

const defaultValues = [
  {
    title: 'Broadcast Precision',
    description: 'From 4K multi-cam timelines to low-latency stream servers, we treat every single frame with meticulous attention.'
  },
  {
    title: 'Cloud-Native Resilience',
    description: 'We architect software platforms with containerized microservices and automated failover pipelines to guarantee 99.99% uptime.'
  },
  {
    title: 'Transparent Execution',
    description: 'No hidden clauses or technical jargon. We provide direct project dashboards, real-time feedback, and clear milestones.'
  }
];

const Home = ({ services = [], companyInfo = {}, onOpenQuote }) => {
  const [showreelOpen, setShowreelOpen] = useState(false);

  const activeServices = (services && services.length > 0) ? services : defaultServices;
  const values = companyInfo?.values?.length > 0 ? companyInfo.values : defaultValues;
  const missionText = companyInfo?.mission || 'To empower organizations, creators, and spiritual institutions with world-class digital broadcast capabilities, high-retention media, and bulletproof cloud infrastructure.';
  const visionText = companyInfo?.vision || 'To be the premier end-to-end technology and media powerhouse bridging timeless storytelling with modern cloud and web engineering.';
  const storyText = companyInfo?.story || 'Founded with a passion for high-fidelity communication and robust technological craftsmanship, Siddhidatri TV has evolved from a boutique live streaming studio into a comprehensive digital solutions powerhouse serving clients across India and globally.';

  return (
    <div className="relative bg-[var(--surface)] text-[var(--content)] min-h-screen">
      
      {/* Subtle Ambient Scene Mesh */}
      <div className="ambient-scene-glow" />

      {/* ================= 1. TWO-COLUMN HERO SECTION ================= */}
      <section className="relative min-h-[80vh] flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          
          {/* Centered on mobile, left-aligned on desktop */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6">
            
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-[11px] sm:text-xs font-semibold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Broadcast Media & Cloud Engineering</span>
            </div>

            {/* Centered Heading on Mobile */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--content)] leading-[1.18] sm:leading-[1.15] max-w-lg lg:max-w-none">
              Scale Your Vision with <br className="hidden sm:inline" />
              <span className="brand-headline-gradient block sm:inline">
                Siddhidatri TV
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-[var(--muted)] leading-relaxed max-w-xl font-normal">
              {companyInfo?.tagline || 'End-to-end multi-cam live broadcast, high-retention video production, bespoke full-stack applications, and resilient cloud architecture.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
              <button
                onClick={() => onOpenQuote && onOpenQuote()}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-[#ba0f18] hover:bg-[#e22630] active:bg-[#85070d] shadow-sm hover:shadow-md transition-all cursor-pointer text-sm sm:text-base"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4 text-[#f5b400]" />
              </button>

              <Link
                to="/gallery"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[var(--content)] bg-[var(--card)] hover:bg-[var(--surface-soft)] border border-[var(--line)] hover:border-[var(--line-strong)] shadow-xs transition-all text-sm sm:text-base text-center"
              >
                View Our Work
              </Link>
            </div>

            {/* Client Avatar Proof Strip - Centered on Mobile */}
            <div className="pt-2 sm:pt-4 flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-[var(--muted)]">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[var(--surface)] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                  alt="Client avatar 1"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[var(--surface)] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                  alt="Client avatar 2"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[var(--surface)] object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop"
                  alt="Client avatar 3"
                />
              </div>
              <p className="leading-snug text-left sm:text-center lg:text-left">
                Trusted by <strong className="text-[var(--content)] font-semibold">50+ media clients & brands</strong> across India
              </p>
            </div>

          </div>

          {/* Right Column: Showreel Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--card)] shadow-lg hover:shadow-xl transition-shadow group">
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop"
                alt="Siddhidatri TV Live Broadcast Showreel"
                className="w-full aspect-[4/3] object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-between p-5 sm:p-6">
                <span className="self-start text-[11px] font-bold px-3 py-1 rounded-full bg-[#ba0f18] text-white uppercase tracking-wider shadow-sm">
                  Showreel 2026
                </span>

                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-white font-bold text-base sm:text-lg">Broadcast Excellence</h3>
                    <p className="text-gray-300 text-xs mt-0.5">Multi-cam 4K Live Production</p>
                  </div>

                  <button
                    onClick={() => setShowreelOpen(true)}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#f5b400] hover:bg-amber-400 text-black flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer shrink-0"
                    aria-label="Play showreel"
                  >
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Showreel Modal */}
      {showreelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[var(--card)] border border-[var(--line)] p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--line)]">
              <h4 className="font-bold text-lg text-[var(--content)]">Siddhidatri TV Showreel Showcase</h4>
              <button 
                onClick={() => setShowreelOpen(false)} 
                className="p-1.5 rounded-lg hover:bg-[var(--surface-soft)] text-[var(--muted)] hover:text-[var(--content)] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-black rounded-xl flex items-center justify-center text-gray-400">
              <p className="text-sm">Video showreel embed placeholder</p>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. STATS SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10 relative">
        <div className="rounded-2xl bg-[var(--card)] border border-[var(--line)] shadow-sm grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--line)] overflow-hidden">
          <div className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-4xl font-bold text-[#ba0f18]">100+</p>
            <p className="text-xs sm:text-sm font-medium text-[var(--muted)] mt-1 whitespace-nowrap">Projects Delivered</p>
          </div>
          <div className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-4xl font-bold text-[#f5b400]">50+</p>
            <p className="text-xs sm:text-sm font-medium text-[var(--muted)] mt-1 whitespace-nowrap">Happy Clients</p>
          </div>
          <div className="p-4 sm:p-6 text-center border-t md:border-t-0">
            <p className="text-2xl sm:text-4xl font-bold text-[var(--content)]">8</p>
            <p className="text-xs sm:text-sm font-medium text-[var(--muted)] mt-1 whitespace-nowrap">Core Agency Services</p>
          </div>
          <div className="p-4 sm:p-6 text-center">
            <p className="text-2xl sm:text-4xl font-bold text-emerald-400">24/7</p>
            <p className="text-xs sm:text-sm font-medium text-[var(--muted)] mt-1 whitespace-nowrap">Live Operations Support</p>
          </div>
        </div>
      </section>

      {/* ================= 3. SERVICES SECTION ================= */}
      <section className="py-16 sm:py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#f5b400] uppercase bg-[var(--badge-bg)] px-3.5 py-1.5 rounded-full border border-[var(--badge-border)]">
            What We Deliver
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[var(--content)]">
            Full-Spectrum Digital Services
          </h2>
          <p className="text-xs sm:text-base text-[var(--muted)]">
            High-fidelity media broadcast alongside bespoke full-stack and cloud engineering.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {activeServices.map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl bg-[var(--card)] border border-[var(--line)] hover:border-[#ba0f18]/40 p-5 sm:p-6 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--surface-soft)] border border-[var(--line)] flex items-center justify-center text-[#ba0f18] mb-5">
                <ServiceIcon name={service.icon} className="w-6 h-6" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[var(--content)] mb-2 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem]">
                {service.title}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--muted)] line-clamp-3 mb-6 leading-relaxed">
                {service.shortDesc}
              </p>

              <div className="pt-4 border-t border-[var(--line)] mt-auto flex items-center justify-between">
                <Link
                  to={`/services/${service.slug}`}
                  className="text-xs font-semibold text-[#ba0f18] hover:text-[#e22630] inline-flex items-center gap-1"
                >
                  Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => onOpenQuote && onOpenQuote(service.title)}
                  className="px-3 py-1.5 rounded-full bg-[var(--surface-soft)] hover:bg-[#ba0f18] hover:text-white border border-[var(--line)] text-[var(--muted)] text-xs font-medium transition-colors cursor-pointer"
                >
                  Quick Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 4. ABOUT & VALUES ================= */}
      <section className="py-16 sm:py-20 md:py-28 bg-[var(--surface-soft)] border-y border-[var(--line)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            
            {/* Story & Mission/Vision */}
            <div className="space-y-5 sm:space-y-6 text-left">
              <span className="text-xs font-bold tracking-widest text-[#f5b400] uppercase">
                About Siddhidatri TV
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[var(--content)]">
                Crafting High-Fidelity Broadcasts & Bulletproof Systems
              </h2>
              <p className="text-xs sm:text-base text-[var(--muted)] leading-relaxed">
                {storyText}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 sm:p-5 rounded-2xl bg-[var(--card)] border border-[var(--line)] shadow-xs">
                  <h4 className="text-[#f5b400] font-bold text-sm mb-1.5 flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#ba0f18]" /> Our Mission
                  </h4>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{missionText}</p>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-[var(--card)] border border-[var(--line)] shadow-xs">
                  <h4 className="text-[#f5b400] font-bold text-sm mb-1.5 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#ba0f18]" /> Our Vision
                  </h4>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{visionText}</p>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="space-y-3.5 sm:space-y-4 text-left">
              {values.map((v, i) => (
                <div key={i} className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-[var(--card)] border border-[var(--line)] shadow-xs">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--surface-soft)] text-[#ba0f18] flex items-center justify-center shrink-0 border border-[var(--line)]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[var(--content)] font-bold text-sm">{v.title}</h4>
                    <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= 5. FINAL AGENCY CTA BANNER ================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[#85070D] via-[#BA0F18] to-[#14141E] border border-[#F5B400]/40 p-8 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#f5b400]/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to Broadcast & Engineer Without Limits?
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto text-xs sm:text-base leading-relaxed">
            Reach out today to discuss live streaming production, high-retention video pipelines, or custom web platform development.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenQuote && onOpenQuote()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold bg-white text-black hover:bg-gray-100 transition-colors shadow-2xl cursor-pointer text-sm"
            >
              Get in Touch Today <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/917999237528?text=Hi%20Siddhidatri%20TV!%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors text-sm"
            >
              Direct WhatsApp (+91 79992 37528)
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;