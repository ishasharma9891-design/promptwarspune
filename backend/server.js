const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const validator = require('validator');
const { initFirebase } = require('./config/firebase');
const { apiLimiter, verifyAuth, logger } = require('./middleware/security');
const { getUserProfile, updateLastInteraction } = require('./utils/db');
const { generatePrompt, streamGeminiResponse } = require('./services/aiService');

const app = express();
const db = initFirebase();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy');
const DEFAULT_PROFILE = { expertise_level: 'Intermediate', total_xp: 0 };

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10kb' }));
app.use(compression());
app.use('/api/', apiLimiter);

app.get('/api/profile', verifyAuth, async (req, res) => {
  try {
    const profile = await getUserProfile(db, req.user.uid, DEFAULT_PROFILE);
    res.json(profile);
  } catch (err) {
    logger.error(`Profile fetch error: ${err.message}`);
    res.status(500).send();
  }
});

app.post('/api/chat', verifyAuth, async (req, res) => {
  const message = validator.escape(req.body.message || '');
  res.setHeader('Content-Type', 'text/event-stream');
  try {
    const profile = await getUserProfile(db, req.user.uid, DEFAULT_PROFILE);
    const prompt = generatePrompt(message, profile.expertise_level);
    await streamGeminiResponse(genAI, prompt, res);
    updateLastInteraction(db, req.user.uid);
  } catch (err) { logger.error(`Gemini error: ${err.message}`); }
  res.end();
});

app.listen(process.env.PORT || 5000, () => logger.info(`Server listening on port ${process.env.PORT || 5000}`));
