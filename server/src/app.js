import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

// Route Imports
import queryRoutes from './routes/queryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';

const app = express();

// Trust reverse proxy (Render, Vercel, Railway, Cloudflare)
app.set('trust proxy', 1);

// Configure allowed frontend origins (handles both root & www in production + local dev)
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

// Automatically add or remove 'www' variant if client URL is provided
if (process.env.CLIENT_URL) {
  try {
    const parsed = new URL(process.env.CLIENT_URL);
    if (parsed.hostname.startsWith('www.')) {
      allowedOrigins.push(`${parsed.protocol}//${parsed.hostname.replace('www.', '')}`);
    } else {
      allowedOrigins.push(`${parsed.protocol}//www.${parsed.hostname}`);
    }
  } catch (err) {
    console.warn('Warning: Could not parse CLIENT_URL:', err.message);
  }
}

// Security Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allows Cloudinary & static images
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, server-to-server, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    },
    credentials: true,
  })
);

// Body Parsing & Cookie Handling
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sanitize MongoDB operators on all incoming payloads
app.use((req, res, next) => {
  if (req.body) mongoSanitize.sanitize(req.body);
  if (req.params) mongoSanitize.sanitize(req.params);
  next();
});

// Strict CSRF/Origin Guard for mutations (POST, PUT, DELETE, PATCH)
app.use('/api', (req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const origin = req.get('origin');
  const referer = req.get('referer');
  let requestOrigin = origin;

  if (!requestOrigin && referer) {
    try {
      requestOrigin = new URL(referer).origin;
    } catch {
      return res.status(403).json({ success: false, message: 'Request origin is not allowed' });
    }
  }

  if (requestOrigin && !allowedOrigins.includes(requestOrigin)) {
    return res.status(403).json({ success: false, message: 'Request origin is not allowed' });
  }

  next();
});

// General API Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { error: 'Too many requests from this IP, please try again later.' },
});
app.use('/api', globalLimiter);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Siddhidatri TV API', timestamp: new Date() });
});

// Mount Routes (All routes mounted cleanly after middleware)
app.use('/api/queries', queryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/gallery', galleryRoutes);

// Central Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;