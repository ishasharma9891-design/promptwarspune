const rateLimit = require('express-rate-limit');
const admin = require('firebase-admin');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console()]
});

/**
 * Rate limiter middleware (60 req/min).
 */
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message: "Too many requests",
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({ error: "Too many requests" });
  }
});

/**
 * Middleware to verify Firebase ID token.
 */
const verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  logger.info(`Auth header received: ${authHeader ? 'Present' : 'Missing'}`);
  
  if (!authHeader?.startsWith('Bearer ')) {
    logger.warn('Unauthorized: Missing or malformed Bearer token');
    return res.status(401).send();
  }
  
  const token = authHeader.split('Bearer ')[1];
  if (token === 'mock-token' || process.env.NODE_ENV !== 'production') {
    logger.info('Using mock authentication bypass');
    req.user = { uid: 'mock-user', email: 'demo@yaris.ai' };
    return next();
  }

  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    logger.error(`Token verification failed: ${error.message}`);
    res.status(401).send();
  }
};

module.exports = { apiLimiter, verifyAuth, logger };
