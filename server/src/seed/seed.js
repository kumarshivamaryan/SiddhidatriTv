import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']); // Fixes querySrv ECONNREFUSED on Windows/ISPs

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import Admin from '../models/Admin.js';
import Service from '../models/Service.js';
import CompanyInfo from '../models/CompanyInfo.js';
import Founder from '../models/Founder.js';
import GalleryItem from '../models/GalleryItem.js';
import Testimonial from '../models/Testimonial.js';

dotenv.config();

const servicesData = [
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    shortDesc: 'End-to-end multi-platform organic growth, campaign scheduling, and targeted audience engagement.',
    longDesc: 'Transform your brand presence across YouTube, Instagram, LinkedIn, and Facebook with custom content calendars, data-driven analytics, and community management.',
    icon: 'Share2',
    features: ['Content calendar & scheduling', 'Audience engagement & growth', 'Analytics & monthly KPI audits', 'Ad campaign management'],
    deliverables: ['Monthly content strategy', 'Weekly post scheduling', 'Performance analytics dashboard'],
    tools: ['Meta Business Suite', 'Buffer', 'Canva Pro', 'Hootsuite'],
    order: 1,
  },
  {
    slug: 'video-photo-editing',
    title: 'Video and Photo Editing',
    shortDesc: 'Cinematic color grading, fast-paced retention editing, reels, and high-resolution creative retouching.',
    longDesc: 'From high-retention short-form Reels and Shorts to full-length YouTube masterclasses, documentaries, and commercial product shoots with cinematic color grading.',
    icon: 'Video',
    features: ['4K resolution timeline grading', 'Dynamic motion graphics & sound design', 'High-retention reel/short formatting', 'Commercial photo retouching'],
    deliverables: ['Exported high-res master files', 'Platform-optimized variations', 'Project timeline backups'],
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Photoshop'],
    order: 2,
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    shortDesc: 'High-performance bespoke MERN stack applications, corporate websites, and scalable portals.',
    longDesc: 'Engineering blazing-fast, mobile-responsive web applications tailored for conversion, search engine dominance, and seamless multi-device user experiences.',
    icon: 'Code2',
    features: ['Modern React/Vite frontends', 'Custom RESTful microservice architectures', 'Advanced SEO & Core Web Vitals optimization', 'Custom admin dashboard control'],
    deliverables: ['Production-ready codebase', 'Full responsive UI/UX', 'Admin control dashboard', 'CI/CD deployment pipeline'],
    tools: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    order: 3,
  },
  {
    slug: 'website-management',
    title: 'Website Management & Maintenance',
    shortDesc: 'Continuous uptime monitoring, daily database backups, software patching, and security hardenings.',
    longDesc: 'Hands-off reliability. We monitor server uptime 24/7, patch vulnerabilities, optimize database queries, and continuously update site content.',
    icon: 'ShieldCheck',
    features: ['24/7 uptime surveillance', 'Automated nightly database backups', 'Security firewalls & SSL maintenance', 'Content & banner updates on demand'],
    deliverables: ['Monthly health reports', 'Real-time incident response', 'Automated backup archives'],
    tools: ['Cloudflare', 'Uptime Kuma', 'MongoDB Atlas Backup', 'PM2'],
    order: 4,
  },
  {
    slug: 'live-broadcast-streaming',
    title: 'Live Broadcast / Live Streaming',
    shortDesc: 'Multi-camera low-latency live streaming for corporate summits, spiritual broadcasts, and cultural events.',
    longDesc: 'Broadcast-grade multi-camera production with live graphic overlays, lower-thirds, instant replays, and synchronized multi-platform RTMP destinations.',
    icon: 'Radio',
    features: ['Multi-camera HD/4K vision mixing', 'Simultaneous multistreaming (YouTube, FB, Custom RTMP)', 'Dynamic live lower-thirds & branding graphics', 'Redundant bonded cellular internet failover'],
    deliverables: ['Raw multi-cam recordings', 'Stream archive with timestamp markers', 'Highlight reels'],
    tools: ['OBS Studio', 'vMix', 'Blackmagic ATEM', 'Restream'],
    order: 5,
  },
  {
    slug: 'podcast-production',
    title: 'Podcast Production',
    shortDesc: 'Studio-grade audio engineering, multi-angle studio capture, and viral micro-clip syndication.',
    longDesc: 'Complete studio podcast pipeline: multi-microphone acoustic mastering, noise reduction, multicam switching, intro/outro sound beds, and viral short-form cutdowns.',
    icon: 'Mic',
    features: ['Broadcast studio microphone audio mastering', 'Automated multicam switching & editing', 'Micro-content clip generation for shorts/reels', 'Spotify & Apple Podcast distribution setup'],
    deliverables: ['Mastered stereo audio (WAV/MP3)', 'Full 4K video podcast episode', '3-5 viral social clips per episode'],
    tools: ['Adobe Audition', 'Shure SM7B pipeline', 'DaVinci Resolve', 'Descript'],
    order: 6,
  },
  {
    slug: 'devops-services',
    title: 'DevOps Services',
    shortDesc: 'Production-grade CI/CD pipelines, containerization, automated testing, and zero-downtime rollouts.',
    longDesc: 'Streamlining your software delivery with automated GitLab/GitHub Actions CI/CD workflows, Docker containerization, security vulnerability scans, and Kubernetes orchestration.',
    icon: 'Terminal',
    features: ['GitLab CI & GitHub Actions automated pipelines', 'Docker container optimization & SBOM generation', 'Vulnerability scanning with Trivy/Syft', 'Kubernetes Helm deployments & zero-downtime updates'],
    deliverables: ['Custom CI/CD configuration files', 'Dockerfile and Helm chart assets', 'Pipeline documentation'],
    tools: ['Docker', 'Kubernetes', 'GitLab CI', 'GitHub Actions', 'Helm'],
    order: 7,
  },
  {
    slug: 'cloud-services',
    title: 'Cloud Services (AWS / Azure / GCP)',
    shortDesc: 'Resilient cloud architecture design, serverless deployments, cost-optimization, and VPC security.',
    longDesc: 'Architecting fault-tolerant, scalable cloud infrastructures. Complete migration, serverless API rollouts, auto-scaling clusters, and proactive cost governance across AWS and GCP.',
    icon: 'Cloud',
    features: ['AWS EC2, S3, RDS, CloudFront architectures', 'Serverless microservices & API gateways', 'VPC network isolation & firewall security', 'Cloud cost-reduction audits & monitoring'],
    deliverables: ['Infrastructure as Code (Terraform)', 'Architecture diagrams', 'Prometheus & Grafana monitoring dashboards'],
    tools: ['AWS', 'Google Cloud', 'Terraform', 'Prometheus', 'Grafana'],
    order: 8,
  },
];

const companyData = {
  companyName: 'Siddhidatri TV',
  tagline: 'Illuminating Digital Excellence: Broadcast, Production & Scalable Engineering',
  mission: 'To empower organizations, creators, and spiritual institutions with world-class digital broadcast capabilities, high-retention media, and bulletproof cloud infrastructure.',
  vision: 'To be the premier end-to-end technology and media powerhouse bridging timeless storytelling with modern cloud and web engineering.',
  story: 'Founded with a passion for high-fidelity communication and robust technological craftsmanship, Siddhidatri TV has evolved from a boutique live streaming studio into a comprehensive digital solutions powerhouse serving clients across India and globally.',
  values: [
    { title: 'Technical Mastery', description: 'From 4K multi-cam timelines to Kubernetes clusters, we write clean code and produce flawless streams.' },
    { title: 'Absolute Reliability', description: 'Zero downtime and broadcast-level redundancy are at the core of everything we deliver.' },
    { title: 'Artistic Precision', description: 'We treat every frame, audio waveform, and UI element with deliberate creative attention.' },
  ],
};

const founderData = [
  {
    name: 'Lead Director & Architect',
    role: 'Founder & Technical Director',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Software engineer and media producer with expertise in cloud systems, video broadcasting, and scalable web platforms.',
    linkedinUrl: 'https://linkedin.com',
    order: 1,
  },
];

const testimonialData = [
  {
    clientName: 'Rajesh Sharma',
    company: 'Apex Media Network',
    message: 'Siddhidatri TV executed our 3-day multi-city hybrid summit live broadcast with zero latency and studio-grade graphics. Truly professional execution.',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    isVisible: true,
  },
  {
    clientName: 'Priya Mehra',
    company: 'Vedic Wellness Foundation',
    message: 'The website development and social media strategy transformed our online reach. Our community engagement increased by 300% in 90 days.',
    rating: 5,
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    isVisible: true,
  },
];

const galleryBaselineData = [
  {
    title: 'National Spiritual Summit 4K Broadcast',
    category: 'live-broadcast-streaming',
    client: 'Dharma Media Trust',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    description: 'Turnkey 4-camera Blackmagic 4K live vision mixing with redundant cellular internet bonding, lower-third overlays, and simultaneous RTMP broadcast.',
    order: 1,
  },
  {
    title: 'Enterprise Fintech Cloud Migration & CI/CD',
    category: 'cloud-services',
    client: 'Apex Financial Services',
    year: '2026',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    description: 'Designed high-availability AWS multi-AZ infrastructure, Docker containerization, and automated GitLab CI/CD pipelines with Trivy security auditing.',
    order: 2,
  },
  {
    title: 'Cinematic Documentary Color Grade & Master',
    category: 'video-photo-editing',
    client: 'Horizon Studio Works',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    description: 'ACES DaVinci Resolve color grading, multi-track audio mastering, and motion titles for an award-winning docuseries.',
    order: 3,
  },
];

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('Missing MONGO_URI in environment variables.');
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error(
        'SECURITY HALT: ADMIN_EMAIL and ADMIN_PASSWORD must be defined in your server/.env file before running seed!'
      );
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Atlas for seeding...');

    await Admin.deleteMany();
    await Service.deleteMany();
    await CompanyInfo.deleteMany();
    await Founder.deleteMany();
    await Testimonial.deleteMany();
    await GalleryItem.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    await Admin.create({
      email: adminEmail.toLowerCase().trim(),
      passwordHash,
      role: 'admin',
    });
    console.log(`✅ Admin account successfully initialized for: ${adminEmail.toLowerCase().trim()}`);

    await Service.insertMany(servicesData);
    console.log(`✅ ${servicesData.length} Services seeded`);

    await CompanyInfo.create(companyData);
    console.log('✅ Company info seeded');

    await Founder.insertMany(founderData);
    console.log('✅ Founder profiles seeded');

    await Testimonial.insertMany(testimonialData);
    console.log('✅ Testimonials seeded');

    await GalleryItem.insertMany(galleryBaselineData);
    console.log(`✅ ${galleryBaselineData.length} Portfolio gallery items seeded`);

    console.log('🎉 Database seeding completed successfully.');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedDB();