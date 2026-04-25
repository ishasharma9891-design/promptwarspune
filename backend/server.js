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

const Anthropic = require('@anthropic-ai/sdk');

// ... (keep previous config code) ...

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// --- Yaris Core Tracking Engine API ---

// 1. Get Learner Profile
app.get('/api/profile', (req, res) => {
  res.json(userProfile);
});

// 2. Chat/Learning Session Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;
  
  try {
    const prompt = `
      You are Yaris, an intelligent adaptive learning assistant.
      The user's current expertise level is: ${userProfile.expertise_level}.
      They prefer analogies related to: ${userProfile.preferred_analogies.join(', ')}.
      
      Respond to the user's message using the strict 5-block structure:
      1. Core Explanation (tailored to their level)
      2. Contextual Example/Analogy
      3. System Diagram description (if applicable)
      4. Socratic Question to test understanding
      
      Format the output as a JSON object with keys: content (HTML string for explanation), example (string), diagram (boolean), question (string). 
      If the user expresses confusion, set type to 'recovery'.
      
      User message: "${message}"
    `;

    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229", // Use an appropriate model
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }]
    });
    
    // In a production app, you would carefully parse the JSON response here.
    // For now, we'll try to extract what we can or fall back to mock structure if parsing fails.
    let aiData = {};
    try {
        // Attempt to extract JSON if Claude wrapped it in text
        const textContent = response.content[0].text;
        const jsonMatch = textContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            aiData = JSON.parse(jsonMatch[0]);
        }
    } catch (e) {
        console.error("Failed to parse Claude JSON response:", e);
    }

    const finalResponse = {
      level: userProfile.expertise_level,
      content: aiData.content || `<p>${response.content[0].text.replace(/\n/g, '<br/>')}</p>`,
      example: aiData.example || "",
      diagram: aiData.diagram || false,
      question: aiData.question || "",
      updatedProfile: userProfile
    };

    res.json(finalResponse);

  } catch (error) {
    console.error("Error communicating with Anthropic:", error);
    res.status(500).json({ error: "Failed to generate AI response" });
  }
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
