const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data for User Profile
let userProfile = {
  expertise_level: 'Intermediate',
  struggle_log: [],
  mastered_concepts: ['JavaScript Fundamentals'],
  preferred_analogies: ['Food', 'Real-world operations']
};

// --- Yaris Core Tracking Engine API ---

// 1. Get Learner Profile
app.get('/api/profile', (req, res) => {
  res.json(userProfile);
});

// 2. Chat/Learning Session Endpoint
app.post('/api/chat', (req, res) => {
  const { message, context } = req.body;
  
  // MOCK AI LOGIC (Simulating Claude API)
  // In a real app, this would send prompt + profile + message to Claude
  
  // Simulate expertise inference and profile update
  if (message.toLowerCase().includes("don't get it") || message.toLowerCase().includes("confused")) {
      userProfile.struggle_log.push(context.topic || 'Unknown concept');
      // Trigger recovery protocol response
      return res.json({
        type: 'recovery',
        content: `I see this is tricky. Let's break it down. We'll look at it piece by piece. First...`,
        updatedProfile: userProfile
      });
  }

  // Standard 5-block response simulation
  const response = {
    level: userProfile.expertise_level,
    content: `<p>A simulated explanation of ${message} tailored to an ${userProfile.expertise_level} level.</p>`,
    example: `Like ordering food at a restaurant (using your preferred analogies).`,
    diagram: true,
    question: `Based on this, what do you think happens if an error occurs?`,
    updatedProfile: userProfile
  };

  res.json(response);
});

// 3. Challenge Engine Endpoint
app.post('/api/challenge/generate', (req, res) => {
  res.json({
    type: 'scenario-solving',
    scenario: "You have an API call that takes 3 seconds. How do you prevent the UI from freezing?",
    options: ["Use a synchronous request", "Use a Promise/async", "Use a timeout loop"],
    correct: 1
  });
});

app.listen(PORT, () => {
  console.log(`Yaris backend running on port ${PORT}`);
});
