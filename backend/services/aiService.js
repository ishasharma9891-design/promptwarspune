/**
 * Generates the prompt for the adaptive learning assistant.
 * @param {string} message - Sanitized user message.
 * @param {string} level - User's expertise level.
 * @returns {string}
 */
const generatePrompt = (message, level) => {
  return `Adaptive Learning Response for ${message}. Level: ${level}. 
  [CONTENT]...[EXAMPLE]...[QUESTION]...`;
};

/**
 * Handles streaming response from Anthropic Claude.
 * @param {Object} anthropic - SDK instance.
 * @param {string} prompt - Constructed prompt.
 * @param {Object} res - Express response object.
 */
const streamClaudeResponse = async (anthropic, prompt, res) => {
  const stream = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });
  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta') res.write(chunk.delta.text);
  }
};

module.exports = { generatePrompt, streamClaudeResponse };
