import React from 'react';
import { Sparkles, LogOut } from 'lucide-react';
import { auth } from '../../firebase';

/**
 * Renders the top header bar for the chat session with user info.
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
      <p className="text-sm text-text-secondary">Level: {userLevel} • {auth.currentUser?.displayName}</p>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 bg-brand-dark/50 px-3 py-1.5 rounded-full border border-brand-card">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs text-text-secondary font-medium">Yaris AI Active</span>
      </div>
      <button 
        onClick={() => auth.signOut()}
        className="p-2 hover:bg-red-500/10 rounded-lg text-text-secondary hover:text-red-400 transition-colors"
        aria-label="Sign out"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  </header>
);

export default ChatHeader;
