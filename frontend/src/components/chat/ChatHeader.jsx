import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Renders the top header bar for the chat session.
 * @param {Object} props - Component props.
 * @param {string} props.userLevel - The expertise level of the user.
 * @returns {JSX.Element}
 */
const ChatHeader = ({ userLevel }) => (
  <header className="flex items-center justify-between mb-6 glass-panel px-6 py-4" role="banner">
    <div>
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-brand-secondary" aria-hidden="true" />
        Learning Session
      </h2>
      <p className="text-sm text-text-secondary">Level: {userLevel}</p>
    </div>
    <div className="flex items-center gap-2 bg-brand-dark/50 px-3 py-1.5 rounded-full border border-brand-card" aria-label="Status: Yaris AI Active">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
      <span className="text-xs text-text-secondary font-medium">Yaris AI Active</span>
    </div>
  </header>
);

export default ChatHeader;
