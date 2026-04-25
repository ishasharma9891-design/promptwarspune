const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Generates the prompt for the adaptive learning assistant.
 * @param {string} message - Sanitized user message.
 * @param {string} level - User's expertise level.
 * @returns {string}
 */
const generatePrompt = (message, level) => {
  return `You are Yaris, an adaptive learning assistant. 
  Current user level: ${level}.
  User said: "${message}".
  
  Format your response exactly as follows:
  [CONTENT] Your explanation in HTML (p, b, i, code tags only)
  [EXAMPLE] A simple analogy or real-world example
  [QUESTION] A Socratic question to test their understanding
  
  Do not include any other text.`;
};

/**
 * Handles streaming response from Google Gemini.
 * @param {Object} model - Pre-configured Gemini model instance.
 * @param {string} prompt - Constructed prompt.
 * @param {Object} res - Express response object.
 */
const streamGeminiResponse = async (model, prompt, res) => {
  const result = await model.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    if (chunkText) {
      res.write(chunkText);
    }
  }
};

module.exports = { generatePrompt, streamGeminiResponse };
