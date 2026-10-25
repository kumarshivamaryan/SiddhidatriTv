import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchServiceBySlug, defaultServicesData } from '../services/api';
import ServiceIcon from '../components/ServiceIcon';
import { 
  CheckCircle2, 
  ArrowRight, 
  Wrench, 
  PackageCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft
} from 'lucide-react';

// Dedicated FAQs for every individual service domain
const serviceFaqs = {
  'live-broadcast-streaming': [
    { 
      q: 'What camera setups and hardware switchers do you use?', 
      a: 'We deploy multi-camera 4K & 1080p 60fps rigs powered by Blackmagic Design ATEM Mini Extreme ISO switchers with hardware failover and clean SDI/HDMI feeds.' 
    },
    { 
      q: 'Can you stream to multiple destinations simultaneously?', 
      a: 'Yes, we perform redundant RTMP multistreaming to YouTube, Facebook, Twitch, LinkedIn, and private custom enterprise CDNs without latency penalty.' 
    },
    { 
      q: 'How do you prevent broadcast dropouts if venue Wi-Fi fails?', 
      a: 'We provide multi-carrier 4G/5G cellular bonded routers (Airtel + Jio) paired with studio Ethernet lines to guarantee uninterrupted connectivity.' 
    },
    { 
      q: 'Do we get full uncompressed master recordings after the event?', 
      a: 'Yes, we deliver complete raw camera ISO recordings alongside the final switched live broadcast master in high-bitrate ProRes and H.264.' 
    }
  ],
  'video-photo-editing': [
    { 
      q: 'What is your turnaround time for commercial video editing?', 
      a: 'Standard video projects are delivered within 48 to 72 hours. Rush 24-hour delivery is available for time-sensitive social reels and events.' 
    },
    { 
      q: 'Which color grading workflows do you support?', 
      a: 'We work inside DaVinci Resolve Studio utilizing ACES color management for filmic saturation, clean skin tones, and consistent multi-camera matching.' 
    },
    { 
      q: 'Do you create vertical 9:16 cuts for Instagram Reels and YouTube Shorts?', 
      a: 'Yes, every project includes custom aspect ratio exports (16:9 widescreen, 9:16 vertical reels with burned-in dynamic captions, and 1:1 square).' 
    },
    { 
      q: 'How many revision rounds are included in a standard edit?', 
      a: 'All project packages include two comprehensive revision cycles using timestamped Frame.io review links for precise feedback.' 
    }
  ],
  'website-development': [
    { 
      q: 'What technology stack do you use for web development?', 
      a: 'We engineer using the modern MERN stack (React, Vite, Node.js, Express, MongoDB) styled with modern Tailwind CSS and secured with JWT role-based access control.' 
    },
    { 
      q: 'Will the website be optimized for mobile screens and Core Web Vitals?', 
      a: 'Yes, every web application is designed mobile-first, semantic HTML5 compliant, and tuned to score 90+ on Google PageSpeed and Core Web Vitals.' 
    },
    { 
      q: 'Do you build custom administrative dashboards to manage content?', 
      a: 'Yes, we provide custom administrative portals allowing non-technical team members to manage leads, portfolio media, and inquiries in real time.' 
    },
    { 
      q: 'Do you provide source code ownership upon delivery?', 
      a: 'Yes, upon final handover, 100% of the repository source code and intellectual property belongs entirely to you.' 
    }
  ],
  'website-management-maintenance': [
    { 
      q: 'What does your 24/7 uptime monitoring include?', 
      a: 'We run continuous ping and API health checks every 60 seconds with automated instant alerts on downtime or latency anomalies.' 
    },
    { 
      q: 'How frequently are database backups performed?', 
      a: 'We execute automated daily encrypted backups of your database records and uploaded media assets stored across isolated cloud locations.' 
    },
    { 
      q: 'What is your response time for emergency critical bugs?', 
      a: 'Our maintenance retainer guarantees a 2-hour response window for critical outages and security vulnerabilities.' 
    },
    { 
      q: 'Do you handle SSL certificate renewals and security patching?', 
      a: 'Yes, all SSL renewals, firewall updates, package dependency patching, and vulnerability scans are managed proactively.' 
    }
  ],
  'podcast-production': [
    { 
      q: 'What studio audio equipment do you utilize?', 
      a: 'We record with broadcast Shure SM7B dynamic microphones, Cloudlifters, and multi-track Rodecaster Pro II consoles for studio warmth.' 
    },
    { 
      q: 'Do you provide multi-camera video recording for YouTube?', 
      a: 'Yes, we shoot with synchronized multi-camera setups (guest, host, and wide) with automated or manual live switching.' 
    },
    { 
      q: 'Will you extract short viral clips with kinetic subtitles?', 
      a: 'Yes, we extract 3 to 5 high-impact vertical shorts per episode with animated subtitles, sound effects, and branded visual hooks.' 
    },
    { 
      q: 'Can you handle publishing to Spotify and Apple Podcasts?', 
      a: 'We handle master audio exports, metadata tagging, show notes formatting, and direct RSS feed distribution across all major podcast directories.' 
    }
  ],
  'social-media-management': [
    { 
      q: 'Which platforms do you manage?', 
      a: 'We manage and optimize profiles across YouTube, Instagram, LinkedIn, and Facebook with platform-specific content strategies.' 
    },
    { 
      q: 'Do you script the content or do we need to provide scripts?', 
      a: 'We offer full-service scripting including audience hook research, storytelling blueprints, and call-to-actions tailored to your niche.' 
    },
    { 
      q: 'How many posts and reels are scheduled per month?', 
      a: 'Depending on the tier chosen, schedules range from 15 high-retention reels and posts to daily publication with active story sequences.' 
    },
    { 
      q: 'Do you provide monthly analytical reports on audience growth?', 
      a: 'Yes, you receive transparent monthly performance reviews detailing impressions, follower growth, engagement rates, and lead conversions.' 
    }
  ],
  'devops-services': [
    { 
      q: 'Which CI/CD platforms and automation tools do you configure?', 
      a: 'We build automated pipelines with GitLab CI/CD, GitHub Actions, Docker multi-stage builds, and Kubernetes Minikube/production manifests.' 
    },
    { 
      q: 'Do you run container vulnerability auditing and SBOM generation?', 
      a: 'Yes, we integrate Syft for automated Software Bill of Materials (SBOM) generation and Trivy to scan image vulnerabilities on every commit.' 
    },
    { 
      q: 'Can you deploy telemetry dashboards for system monitoring?', 
      a: 'We configure Prometheus counter metrics and Grafana dashboards for granular CPU, memory, and API endpoint throughput monitoring.' 
    },
    { 
      q: 'Do you assist with zero-downtime rolling deployments?', 
      a: 'Yes, we implement rolling updates, blue/green deployments, and automated rollback triggers to prevent production interruptions.' 
    }
  ],
  'cloud-services': [
    { 
      q: 'Which cloud hyperscalers do you support?', 
      a: 'We architect and manage cloud environments natively across Amazon Web Services (AWS), Google Cloud Platform (GCP), and Microsoft Azure.' 
    },
    { 
      q: 'Can you help audit and reduce our monthly cloud bills?', 
      a: 'Yes, we perform FinOps architectural audits, identify idle instances, rightsizing workloads, and configure reserved instances to reduce spend by 20% to 40%.' 
    },
    { 
      q: 'How do you design high-availability and disaster recovery?', 
      a: 'We configure auto-scaling groups, application load balancers, multi-AZ database replication, and automated cross-region snapshots.' 
    },
    { 
      q: 'Do you provision infrastructure using Infrastructure-as-Code (IaC)?', 
      a: 'Yes, all infrastructure is codified using Terraform or AWS CloudFormation for reproducible, version-controlled cloud environments.' 
    }
  ]
};

const defaultFaqs = [
  { q: 'How quickly can your team begin onboarding?', a: 'Following your initial consultation and scope sign-off, our team typically kicks off production within 48 to 72 hours.' },
  { q: 'Do you offer ongoing post-delivery support?', a: 'Yes, all our services come with dedicated SLA options, live monitoring, and ongoing maintenance retainers.' },
  { q: 'How is payment structured?', a: 'We structure projects in milestones: an initial deposit upon project kick-off, milestone reviews, and final sign-off balance.' },
];

const ServiceDetail = ({ onOpenQuote }) => {
  const { slug } = useParams();
  const [service, setService] = useState(() => {
    return defaultServicesData.find((s) => s.slug === slug) || defaultServicesData[0];
  });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetchServiceBySlug(slug)
      .then((data) => {
        if (data) setService(data);
      })
      .catch(() => {
        const fallback = defaultServicesData.find((s) => s.slug === slug) || defaultServicesData[0];
        setService(fallback);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading && !service) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#BA0F18] border-t-[#F5B400] rounded-full animate-spin" />
      </div>
    );
  }

  // Get service-specific FAQs with clean fallback
  const currentFaqs = serviceFaqs[service.slug] || defaultFaqs;

  return (
    <div className="relative min-h-screen bg-[var(--surface)] text-[var(--content)] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      
      {/* Breadcrumb / Back Link */}
      <div>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[#f5b400] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Services
        </Link>
      </div>

      {/* Hero Header Area */}
      <div className="relative text-center max-w-3xl mx-auto space-y-6 pt-2">
        
        {/* Layered Icon & Badge Container */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#ba0f18]/30 to-[#f5b400]/30 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-300" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#14141e] border border-[#f5b400]/40 flex items-center justify-center text-[#f5b400] shadow-xl">
              <ServiceIcon name={service.icon} className="w-8 h-8 sm:w-10 sm:h-10 text-[#f5b400]" />
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#f5b400]/10 border border-[#f5b400]/30 text-[#f5b400] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Service Capability
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
          <span className="bg-gradient-to-r from-white via-[#f8fafc] to-gray-300 bg-clip-text text-transparent drop-shadow-sm">
            {service.title}
          </span>
        </h1>

        {/* Lead Paragraph */}
        <p className="text-sm sm:text-base lg:text-lg text-[var(--muted)] leading-relaxed max-w-2xl mx-auto font-normal">
          {service.longDesc || service.shortDesc}
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => onOpenQuote && onOpenQuote(service.title)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-[#ba0f18] hover:bg-[#e22630] active:bg-[#85070d] shadow-lg shadow-[#ba0f18]/35 transition-all cursor-pointer text-sm sm:text-base"
          >
            <Sparkles className="w-4 h-4 text-[#f5b400]" />
            Request a Quote for {service.title}
          </button>
        </div>
      </div>

      {/* Grid: Capabilities & Deliverables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Key Features */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--line)] space-y-5">
          <div className="flex items-center gap-3 text-[#f5b400] font-bold text-base sm:text-lg">
            <Sparkles className="w-5 h-5 shrink-0" />
            <h3>Key Capabilities</h3>
          </div>
          <ul className="space-y-3.5">
            {service.features?.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#f5b400] shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverables */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--line)] space-y-5">
          <div className="flex items-center gap-3 text-emerald-400 font-bold text-base sm:text-lg">
            <PackageCheck className="w-5 h-5 shrink-0" />
            <h3>Client Deliverables</h3>
          </div>
          <ul className="space-y-3.5">
            {service.deliverables?.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Tools & Hardware Stack */}
      {service.tools?.length > 0 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--line)] text-center space-y-5">
          <div className="flex items-center justify-center gap-2 text-gray-400 font-semibold text-xs uppercase tracking-wider">
            <Wrench className="w-4 h-4 text-[#f5b400]" />
            <span>Technologies & Hardware Employed</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {service.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-[var(--surface-soft)] text-gray-200 font-medium text-xs border border-[var(--line)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Service-Specific FAQ Accordion */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--line)] space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
          <p className="text-xs text-[var(--muted)]">Common questions regarding {service.title}</p>
        </div>

        <div className="divide-y divide-[var(--line)]">
          {currentFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex justify-between items-center text-left text-sm font-semibold text-gray-200 hover:text-[#f5b400] transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#f5b400] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--muted)] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-[var(--muted)] leading-relaxed animate-in fade-in duration-200">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Final Action Card */}
      <div className="rounded-3xl bg-gradient-to-r from-[#85070D] via-[#BA0F18] to-[#14141E] border border-[#F5B400]/40 p-8 sm:p-12 text-center space-y-5 shadow-xl">
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          Ready to Deploy {service.title}?
        </h3>
        <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto leading-relaxed">
          Contact our technical team to review recording dates, tech specifications, and custom pricing.
        </p>
        <div>
          <button
            onClick={() => onOpenQuote && onOpenQuote(service.title)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold bg-white text-black hover:bg-gray-100 transition-colors shadow-xl cursor-pointer text-sm"
          >
            Start Project Discussion <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ServiceDetail;