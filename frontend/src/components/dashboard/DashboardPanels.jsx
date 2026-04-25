import React from 'react';
import { Award } from 'lucide-react';

/**
 * Renders the review areas panel.
 * @param {Object} props - Component props.
 * @param {Array} props.topics - List of struggle topics.
 * @returns {JSX.Element}
 */
export const ReviewPanel = ({ topics }) => (
  <section className="glass-panel p-6 border-orange-500/30 bg-orange-500/5">
    <h3 className="text-lg font-semibold text-white mb-4">Areas to Review</h3>
    <div className="space-y-3">
      {topics.map((topic, i) => (
        <article key={i} className="p-3 bg-brand-dark rounded-lg border border-brand-card flex justify-between items-center">
          <span className="text-sm text-white">{topic}</span>
          <button 
            aria-label={`Review ${topic}`}
            className="text-xs bg-brand-surface px-3 py-1.5 rounded hover:bg-brand-primary/20 hover:text-brand-primary transition-colors text-text-secondary"
          >
            Review
          </button>
        </article>
      ))}
    </div>
  </section>
);

/**
 * Renders the achievement badges panel.
 * @returns {JSX.Element}
 */
export const BadgesPanel = () => (
  <section className="glass-panel p-6">
    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <Award className="w-5 h-5 text-yellow-500" /> Recent Badges
    </h3>
    <div className="grid grid-cols-2 gap-4">
      <article className="flex flex-col items-center p-4 bg-brand-dark/50 rounded-xl border border-brand-card text-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center mb-2 shadow-lg shadow-orange-500/20">
          <span className="text-2xl" aria-hidden="true">🔥</span>
        </div>
        <p className="text-sm font-semibold text-white">Grit Buff</p>
      </article>
    </div>
  </section>
);
