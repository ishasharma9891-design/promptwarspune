const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const Anthropic = require('@anthropic-ai/sdk');
const validator = require('validator');
const { initFirebase } = require('./config/firebase');
const { apiLimiter, verifyAuth, logger } = require('./middleware/security');
const { getUserProfile, updateLastInteraction } = require('./utils/db');
const { generatePrompt, streamClaudeResponse } = require('./services/aiService');

const app = express();
const db = initFirebase();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || 'dummy' });
const DEFAULT_PROFILE = { expertise_level: 'Intermediate', preferred_analogies: ['Food'] };

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
    logger.error(err);
    res.status(500).send();
  }
});

app.post('/api/chat', verifyAuth, async (req, res) => {
  const message = validator.escape(req.body.message || '');
  res.setHeader('Content-Type', 'text/event-stream');
  try {
    const profile = await getUserProfile(db, req.user.uid, DEFAULT_PROFILE);
    const prompt = generatePrompt(message, profile.expertise_level);
    await streamClaudeResponse(anthropic, prompt, res);
    updateLastInteraction(db, req.user.uid);
  } catch (err) { logger.error(err); }
  res.end();
});

app.listen(process.env.PORT || 5000, () => logger.info('Started'));
