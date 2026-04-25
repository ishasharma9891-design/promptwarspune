import DOMPurify from 'dompurify';

/**
 * Streams AI response from the backend and updates the message incrementally.
 * @param {string} message - The user input to send.
 * @param {string} token - Firebase ID token for authentication.
 * @param {function} onUpdate - Callback to update the bot message state.
 * @returns {Promise<void>}
 */
export const streamAiResponse = async (message, token, onUpdate) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) throw new Error('Streaming failed');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    
    fullText += decoder.decode(value, { stream: true });
    const content = fullText.match(/\[CONTENT\]([\s\S]*?)(?=\[|$)/);
    const example = fullText.match(/\[EXAMPLE\]([\s\S]*?)(?=\[|$)/);
    const question = fullText.match(/\[QUESTION\]([\s\S]*?)(?=\[|$)/);

    onUpdate({
      content: content ? DOMPurify.sanitize(content[1]) : '',
      example: example ? example[1] : '',
      question: question ? question[1] : '',
    });
  }
};
