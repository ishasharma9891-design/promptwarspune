import React from 'react';
import { Target } from 'lucide-react';

const ProgressCard = ({ data }) => (
  <section className="glass-panel p-6 relative overflow-hidden group" aria-labelledby="current-module-title">
    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-all duration-500 -mr-20 -mt-20" aria-hidden="true" />
    <h3 id="current-module-title" className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
      <Target className="w-5 h-5 text-brand-accent" aria-hidden="true" />
      Current Module: {data.current_module || 'React Hooks Deep Dive'}
    </h3>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-white">Progress</span>
      <span className="text-sm text-brand-accent font-bold">{data.progress || 0}%</span>
    </div>
    <div 
      className="w-full h-3 bg-brand-dark rounded-full overflow-hidden mb-6"
      role="progressbar"
      aria-valuenow={data.progress || 0}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Module completion progress"
    >
      <div className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full relative" style={{ width: `${data.progress || 0}%` }}>
        <div className="absolute inset-0 bg-white/20 animate-pulse" aria-hidden="true" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <article className="bg-brand-dark/50 rounded-xl p-4 border border-brand-card text-center">
        <p className="text-xs text-text-secondary mb-1">Pace</p>
        <p className="text-lg font-semibold text-white">{data.stats?.pace || 'Optimal'}</p>
      </article>
      <article className="bg-brand-dark/50 rounded-xl p-4 border border-brand-card text-center">
        <p className="text-xs text-text-secondary mb-1">Style</p>
        <p className="text-lg font-semibold text-white">{data.stats?.style || 'Visual'}</p>
      </article>
      <article className="bg-brand-dark/50 rounded-xl p-4 border border-brand-card text-center">
        <p className="text-xs text-text-secondary mb-1">Score</p>
        <p className="text-lg font-semibold text-white">{data.stats?.score || '0/100'}</p>
      </article>
    </div>
  </section>
);

export default ProgressCard;
