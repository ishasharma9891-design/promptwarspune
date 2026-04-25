const admin = require('firebase-admin');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const { LoggingWinston } = require('@google-cloud/logging-winston');

const loggingWinston = new LoggingWinston();
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    loggingWinston,
  ],
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  handler: (req, res) => {
    logger.warn(`Rate limit: ${req.ip}`);
    res.status(429).json({ error: "Too many requests" });
  }
});

const verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: "Unauthorized" });
  
  const token = authHeader.split('Bearer ')[1];
  try {
    req.user = (token === 'mock-token' && process.env.NODE_ENV !== 'production') 
      ? { uid: 'mock-user', email: 'demo@yaris.ai' }
      : await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    logger.error(`Auth failed: ${error.message}`);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { apiLimiter, verifyAuth, logger };
