import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

export const defaultServicesData = [
  {
    slug: 'live-broadcast-streaming',
    title: 'Live Broadcast / Streaming',
    icon: 'Radio',
    shortDesc: 'Multi-cam 4K production, redundant cellular bonding, and zero-latency multistreaming to YouTube, Facebook, and custom CDNs.',
    longDesc: 'Complete turnkey broadcasting solutions for high-stakes corporate summits, live stage performances, sports tournaments, and spiritual gatherings. We deploy multi-cam Blackmagic setups with hardware video mixing, redundant internet bonding, and dedicated sound engineering.',
    features: [
      'Multi-camera 4K & 1080p 60fps vision mixing',
      'Dual-carrier 4G/5G bonded internet failover',
      'Simultaneous multi-platform RTMP restreaming',
      'Broadcast-grade lower-thirds, animated scoreboards & live overlays',
      'Multi-track master audio capture & noise elimination'
    ],
    deliverables: [
      'Live stream broadcast feed without frame drops',
      'Complete raw 4K camera ISO recordings',
      'Edited full-length broadcast master file',
      'Audience engagement analytics report'
    ],
    tools: ['Blackmagic ATEM Mini Extreme ISO', 'Sony FX3 & FX30', 'OBS Studio', 'vMix 4K', 'Dejero LivePlus', 'Sennheiser Wireless Mics']
  },
  {
    slug: 'video-photo-editing',
    title: 'Video and Photo Editing',
    icon: 'Video',
    shortDesc: 'Cinematic color grading, audio master sweetening, fast-paced retention cuts, and commercial product retouching.',
    longDesc: 'Post-production designed to maximize audience watch time and convey cinematic authority. We turn raw rushes into compelling narrative films, social ads, docuseries, and high-conversion commercial reels.',
    features: [
      'Dynamic retention-focused pacing and sound design',
      'ACES & DaVinci Resolve cinematic color grading',
      'Motion graphics, subtitles and kinetic typography',
      'High-resolution portrait retouching & studio lighting balance'
    ],
    deliverables: [
      'Master video export in 4K ProRes & H.265/H.264',
      'Aspect ratio cuts (16:9 widescreen, 9:16 vertical reels, 1:1 square)',
      'High-resolution retouched stills gallery',
      'Project archive backup'
    ],
    tools: ['Adobe Premiere Pro', 'DaVinci Resolve Studio', 'After Effects', 'Photoshop', 'Lightroom Classic']
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    icon: 'Code',
    shortDesc: 'Bespoke MERN stack applications, responsive agency portfolios, and enterprise portals engineered for speed and SEO.',
    longDesc: 'Modern custom web engineering built on clean architecture. We build responsive, fast-loading, secure web applications that convert traffic into loyal clients with seamless microservice integrations.',
    features: [
      'Modern React (Vite) & Next.js responsive frontends',
      'Robust Node.js & Express REST/GraphQL APIs',
      'MongoDB Atlas schema modeling and indexed querying',
      '100/100 Core Web Vitals optimization and SEO structuring',
      'Granular Role-Based Access Control (RBAC) admin dashboards'
    ],
    deliverables: [
      'Production-ready, thoroughly tested source code',
      'Admin management portal for content & queries',
      'Docker containerized deployment setup',
      'API documentation & technical documentation'
    ],
    tools: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB Atlas', 'Postman', 'Git']
  },
  {
    slug: 'website-management-maintenance',
    title: 'Website Management & Maintenance',
    icon: 'Shield',
    shortDesc: 'Continuous uptime monitoring, automated database backups, security patch hardening, and performance audits.',
    longDesc: 'Dedicated website operations and site reliability maintenance. We ensure your digital web platform stays online 24/7, completely updated, defended against vulnerabilities, and optimized for speed.',
    features: [
      '24/7/365 uptime monitoring with automated SMS/email alerts',
      'Daily encrypted off-site database & assets backups',
      'Core package security patch updates & dependency audits',
      'SSL certificate renewals & CDN caching configuration'
    ],
    deliverables: [
      'Monthly uptime & traffic audit report',
      'Guaranteed 2-hour emergency bug fix response window',
      'Regular security vulnerability scanning reports'
    ],
    tools: ['Prometheus', 'Grafana', 'Cloudflare', 'GitHub Actions', 'UptimeRobot', 'AWS CloudWatch']
  },
  {
    slug: 'podcast-production',
    title: 'Podcast Production',
    icon: 'Mic',
    shortDesc: 'Multi-track studio audio capture, automated video switching, short-form viral clip cutting, and RSS distribution.',
    longDesc: 'Turnkey studio podcast workflows for founders, executives, creators, and public figures. We manage studio acoustic capture, multi-angle camera switching, and post-production publishing.',
    features: [
      'Broadcast broadcast condenser microphones with zero noise floor',
      'Multi-camera visual switching focused on speakers',
      'Extraction of viral vertical shorts with burnt-in captions',
      'Full metadata tagging & distribution to Spotify and Apple Podcasts'
    ],
    deliverables: [
      'High-bitrate mastered WAV/MP3 audio files',
      'Full 4K multicam YouTube video podcast episode',
      '3-5 short-form vertical reels per episode',
      'Show notes & timestamp markers'
    ],
    tools: ['Shure SM7B', 'Rodecaster Pro II', 'Blackmagic Pocket Cinema 4K', 'Audition', 'Descript']
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    icon: 'Share2',
    shortDesc: 'End-to-end multi-platform content scheduling, high-retention reel publishing, analytics tracking, and community growth.',
    longDesc: 'Strategic social presence management that drives brand authority and qualified inquiries across YouTube, Instagram, LinkedIn, and Facebook.',
    features: [
      'Monthly content calendar planning & hook scripting',
      'High-retention vertical short video production & posting',
      'Community engagement & inbound DM response management',
      'Competitor trend analysis and viral hook research'
    ],
    deliverables: [
      'Comprehensive monthly content calendar',
      '15–30 scheduled multi-platform posts and reels per month',
      'Monthly performance analytics & reach growth breakdown'
    ],
    tools: ['Meta Business Suite', 'Buffer', 'Canva Pro', 'CapCut Pro', 'Notion']
  },
  {
    slug: 'devops-services',
    title: 'DevOps Services',
    icon: 'GitBranch',
    shortDesc: 'Docker containerization, Kubernetes orchestration, GitLab CI/CD pipelines, and automated SBOM security vulnerability scans.',
    longDesc: 'Accelerate your software engineering release cycles with hardened DevOps automation. We build resilient deployment pipelines with infrastructure as code, automated testing, container security, and telemetry.',
    features: [
      'GitLab CI/CD and GitHub Actions pipeline automation',
      'Docker image minification & multi-stage build optimization',
      'Kubernetes cluster manifests & Helm package configurations',
      'Supply chain security with Syft SBOM generation & Trivy scanning'
    ],
    deliverables: [
      'Production-tested CI/CD pipeline configuration files',
      'Helm charts & Kubernetes deployment YAMLs',
      'Container security compliance & SBOM vulnerability audit'
    ],
    tools: ['Docker', 'Kubernetes', 'Helm', 'GitLab CI', 'GitHub Actions', 'Trivy', 'Syft', 'Prometheus']
  },
  {
    slug: 'cloud-services',
    title: 'Cloud Services (AWS / Azure / GCP)',
    icon: 'Cloud',
    shortDesc: 'High-availability architecture design, serverless microservice deployments, cost optimization, and multi-region failovers.',
    longDesc: 'Robust cloud infrastructure engineered for zero downtime and cost efficiency. We architect cloud topologies with auto-scaling, VPC security, load balancing, and automated failover.',
    features: [
      'AWS / Azure / GCP infrastructure architecture & provisioning',
      'VPC networking, NAT gateways, and firewall security rules',
      'Auto-scaling EC2 instances & serverless Lambda architectures',
      'Cloud billing optimization reducing monthly cloud expenses'
    ],
    deliverables: [
      'Cloud architecture blueprint diagram & documentation',
      'Terraform / CloudFormation Infrastructure-as-Code files',
      'Disaster recovery & backup automation playbooks'
    ],
    tools: ['AWS EC2', 'AWS S3', 'AWS RDS', 'Google Cloud Run', 'Terraform', 'Cloudflare CDN', 'Nginx']
  }
];

// ---- Public Content Fetchers ----
export const fetchServices = async () => {
  try {
    const res = await API.get('/services');
    if (res.data?.data && res.data.data.length > 0) {
      return res.data.data;
    }
    return defaultServicesData;
  } catch (err) {
    return defaultServicesData;
  }
};

export const fetchServiceBySlug = async (slug) => {
  try {
    const res = await API.get(`/services/${slug}`);
    if (res.data?.data) return res.data.data;
    const match = defaultServicesData.find((s) => s.slug === slug);
    return match || defaultServicesData[0];
  } catch (err) {
    const match = defaultServicesData.find((s) => s.slug === slug);
    return match || defaultServicesData[0];
  }
};

export const fetchCompanyInfo = () => API.get('/content/company').then((res) => res.data.data).catch(() => null);
export const fetchFounders = () => API.get('/content/founders').then((res) => res.data.data).catch(() => []);
export const fetchTestimonials = () => API.get('/content/testimonials').then((res) => res.data.data).catch(() => []);

// ---- Portfolio / Gallery ----
export const fetchGallery = (category) => {
  const url = category && category !== 'all' ? `/gallery?category=${category}` : '/gallery';
  return API.get(url).then((res) => res.data.data).catch(() => []);
};
export const createGalleryItemApi = (formData) =>
  API.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((res) => res.data.data || res.data);
export const deleteGalleryItemApi = (id) => API.delete(`/gallery/${id}`).then((res) => res.data);

// ---- Admin Service Management ----
export const fetchAdminServices = async () => {
  try {
    const res = await API.get('/services');
    return Array.isArray(res.data?.data) ? res.data.data : [];
  } catch (error) {
    console.error('fetchAdminServices error:', error.response?.data || error.message);
    return [];
  }
};
export const createServiceApi = (data) => API.post('/services', data).then((res) => res.data.data || res.data);
export const updateServiceApi = (id, data) => API.put(`/services/${id}`, data).then((res) => res.data.data || res.data);
export const deleteServiceApi = (id) => API.delete(`/services/${id}`).then((res) => res.data);

// ---- Lead Inquiries & CRM ----
export const submitEnquiry = (data) => API.post('/queries', data).then((res) => res.data);
export const fetchAdminQueries = async (status) => {
  try {
    const url = status && status !== 'all' ? `/queries?status=${status}` : '/queries';
    const res = await API.get(url);
    if (Array.isArray(res.data?.data)) return res.data.data;
    if (Array.isArray(res.data?.queries)) return res.data.queries;
    if (Array.isArray(res.data)) return res.data;
    return [];
  } catch (error) {
    console.error('fetchAdminQueries error:', error.response?.data || error.message);
    return [];
  }
};

export const updateQueryStatus = (id, status) => API.put(`/queries/${id}`, { status }).then((res) => res.data);
export const deleteQueryApi = (id) => API.delete(`/queries/${id}`).then((res) => res.data);

// ---- Admin Authentication ----
export const adminLogin = (credentials) => API.post('/auth/login', credentials).then((res) => res.data);
export const adminLogout = () => API.post('/auth/logout').then((res) => res.data);
export const fetchAdminMe = () => API.get('/auth/me').then((res) => res.data);
export const updateAdminProfileApi = (data) => API.put('/auth/update-profile', data).then((res) => res.data);

export default API;