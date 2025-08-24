// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import compression from 'compression';

import connectdb from './config/mongodb.js';
import { trackAPIStats } from './middleware/statsMiddleware.js';

import propertyrouter from './routes/ProductRouter.js';
import userrouter from './routes/UserRoute.js';
import formrouter from './routes/formrouter.js';
import newsrouter from './routes/newsRoute.js';
import appointmentRouter from './routes/appointmentRoute.js';
import adminRouter from './routes/adminRoute.js';
import propertyRoutes from './routes/propertyRoutes.js';

import getStatusPage from './serverweb.js';

dotenv.config();

const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = Number(process.env.PORT) || 4000;

/* -----------------------------------------------------------------------------
 * CORS (allow common dev origins and your prod domains)
 * ----------------------------------------------------------------------------*/
const STATIC_ALLOWED = [
  process.env.FRONTEND_URL,                     // e.g. https://DreamHomes.vercel.app
  'https://DreamHomes.vercel.app',
  'https://dreamhomes-website-admin.onrender.com',
  'https://dreamhomes-website-backend-zfu7.onrender.com',
  // common Vite ports used in your project
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5180',
  'http://localhost:5181',
].filter(Boolean);

// allow any http://localhost:<port> / http://127.0.0.1:<port> in non-prod
const LOCALHOST_REGEX = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;

const corsOptions = {
  origin(origin, cb) {
    // Non-browser requests (curl/Postman) send no Origin → allow
    if (!origin) return cb(null, true);

    // In development allow any localhost port (Vite/React dev servers)
    if (NODE_ENV !== 'production' && LOCALHOST_REGEX.test(origin)) return cb(null, true);

    // Explicit allow-list
    if (STATIC_ALLOWED.includes(origin)) return cb(null, true);

    console.warn('CORS blocked:', origin);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true, // set true only if you actually use cookies
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight everywhere

// Fast-path OPTIONS so nothing else blocks it (useful behind proxies/CDNs)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

/* -----------------------------------------------------------------------------
 * Security & performance
 * ----------------------------------------------------------------------------*/
app.set('trust proxy', 1); // for rate limit / secure cookies behind proxies

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

app.use(limiter);

// Helmet with relaxed defaults; tweak CSP if you add it later
app.use(helmet());
app.use(compression());

/* -----------------------------------------------------------------------------
 * Body parsers & custom middleware
 * ----------------------------------------------------------------------------*/
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(trackAPIStats);

/* -----------------------------------------------------------------------------
 * Database
 * ----------------------------------------------------------------------------*/
connectdb()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

/* -----------------------------------------------------------------------------
 * Routes
 * ----------------------------------------------------------------------------*/
app.use('/api/products', propertyrouter);
app.use('/api/users', userrouter);
app.use('/api/forms', formrouter);
app.use('/api/news', newsrouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/admin', adminRouter);
app.use('/api', propertyRoutes);

/* -----------------------------------------------------------------------------
 * Health / status
 * ----------------------------------------------------------------------------*/
app.get('/status', (req, res) => {
  res.status(200).json({
    status: 'OK',
    time: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    environment: NODE_ENV,
    port: PORT,
  });
});

app.get('/', (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(getStatusPage());
  } catch (error) {
    console.error('Error serving home page:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* -----------------------------------------------------------------------------
 * 404
 * ----------------------------------------------------------------------------*/
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    statusCode: 404,
    timestamp: new Date().toISOString(),
  });
});

/* -----------------------------------------------------------------------------
 * Error handler
 * ----------------------------------------------------------------------------*/
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    statusCode,
    ...(NODE_ENV === 'development' && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
});

/* -----------------------------------------------------------------------------
 * Process-level safety
 * ----------------------------------------------------------------------------*/
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

/* -----------------------------------------------------------------------------
 * Start server
 * ----------------------------------------------------------------------------*/
if (NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
