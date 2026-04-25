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
  message: "Too many requests"
});

/**
 * Middleware to verify Firebase ID token.
 * @param {Object} req - Request.
 * @param {Object} res - Response.
 * @param {function} next - Next.
 */
const verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).send();
  try {
    req.user = await admin.auth().verifyIdToken(authHeader.split('Bearer ')[1]);
    next();
  } catch (error) {
    res.status(401).send();
  }
};

module.exports = { apiLimiter, verifyAuth, logger };
