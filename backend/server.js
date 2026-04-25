const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const validator = require('validator');
const { initFirebase } = require('./config/firebase');
const { apiLimiter, verifyAuth, logger } = require('./middleware/security');
const { getUserProfile, updateLastInteraction } = require('./utils/db');
const { generatePrompt, streamGeminiResponse } = require('./services/aiService');

const app = express();
const db = initFirebase();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy');

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', provider: 'gemini', timestamp: new Date().toISOString() });
});

app.post('/api/chat', verifyAuth, async (req, res) => {
  const start = Date.now();
  const message = validator.escape(req.body.message || '');
  res.setHeader('Content-Type', 'text/event-stream');
  try {
    const profile = await getUserProfile(db, req.user.uid, { expertise_level: 'Intermediate' });
    const prompt = generatePrompt(message, profile.expertise_level);
    await streamGeminiResponse(genAI, prompt, res);
    
    logger.info('Chat Request', {
      user_uid: req.user.uid,
      response_time_ms: Date.now() - start,
      ai_provider: 'gemini'
    });
    updateLastInteraction(db, req.user.uid);
  } catch (err) { logger.error(`Chat Error: ${err.message}`, { uid: req.user.uid }); }
  res.end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server active on port ${PORT}`));
