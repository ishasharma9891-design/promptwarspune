import React from 'react';
import { Send } from 'lucide-react';

/**
 * Renders the chat input form footer.
 * @param {Object} props - Component props.
 * @param {string} props.input - Current input value.
 * @param {function} props.setInput - Function to update input value.
 * @param {function} props.handleSend - Submit handler.
 * @param {boolean} props.isLoading - Whether AI is currently responding.
 * @returns {JSX.Element}
 */
const ChatInput = ({ input, setInput, handleSend, isLoading }) => (
  <footer className="mt-4 glass-panel p-2 flex items-center rounded-2xl relative z-20">
    <form onSubmit={handleSend} className="flex-1 flex items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your response or ask a question..."
        aria-label="Your message"
        className="flex-1 bg-transparent border-none outline-none text-white px-4 placeholder-text-secondary focus:ring-0"
      />
      <button 
        type="submit"
        aria-label="Send message"
        className="btn-primary p-3 rounded-xl disabled:opacity-50"
        disabled={!input.trim() || isLoading}
      >
        {isLoading ? <span className="animate-pulse" aria-hidden="true">...</span> : <Send className="w-5 h-5" aria-hidden="true" />}
      </button>
    </form>
  </footer>
);

export default ChatInput;
