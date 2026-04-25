import React from 'react';
import { BrainCircuit, Award, Activity, Lock, ChevronRight } from 'lucide-react';

const KnowledgeTree = ({ data }) => (
  <section className="glass-panel p-6" aria-labelledby="knowledge-tree-title">
    <div className="flex items-center justify-between mb-6">
      <h3 id="knowledge-tree-title" className="text-lg font-semibold text-white flex items-center gap-2">
        <BrainCircuit className="w-5 h-5 text-brand-secondary" aria-hidden="true" />
        Knowledge Tree
      </h3>
      <button 
        aria-label="View full knowledge tree"
        className="text-sm text-brand-primary hover:text-brand-secondary transition-colors flex items-center"
      >
        View All <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
    <div className="relative">
      <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-brand-card" aria-hidden="true" />
      <div className="space-y-6 relative" role="list">
        <article className={`flex gap-4 ${data.mastered_concepts?.length > 0 ? 'opacity-70' : 'opacity-30'}`} role="listitem">
          <div className="w-14 h-14 rounded-full bg-brand-dark border-2 border-brand-accent flex items-center justify-center z-10 shrink-0">
            <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-brand-accent" aria-hidden="true" />
            </div>
          </div>
          <div className="pt-2">
            <h4 className="text-white font-medium">{data.mastered_concepts?.[0] || 'Fundamentals'}</h4>
            <p className="text-sm text-text-secondary">Mastered</p>
          </div>
        </article>
        <article className="flex gap-4" role="listitem">
          <div className="w-14 h-14 rounded-full bg-brand-dark border-2 border-brand-primary flex items-center justify-center z-10 shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-brand-primary animate-pulse" aria-hidden="true" />
            </div>
          </div>
          <div className="pt-1">
            <h4 className="text-white font-medium text-lg">{data.current_module || 'Current Topic'}</h4>
            <p className="text-sm text-brand-primary">In Progress • {data.progress || 0}%</p>
          </div>
        </article>
      </div>
    </div>
  </section>
);

export default KnowledgeTree;
