import React from 'react';
import { BookOpen, LayoutDashboard, Zap, Shield, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 h-full bg-brand-surface/50 border-r border-brand-card p-6 flex flex-col justify-between backdrop-blur-xl relative z-10" role="complementary" aria-label="Main Navigation">
      <section>
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/30" aria-hidden="true">
            <Zap className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-text-secondary">Yaris</h1>
        </div>

        <nav className="space-y-3" aria-label="Primary tabs">
          <button
            onClick={() => setActiveTab('learn')}
            aria-label="Learning Mode"
            aria-pressed={activeTab === 'learn'}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === 'learn' 
                ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-inner' 
                : 'text-text-secondary hover:bg-brand-card hover:text-white'
            }`}
          >
            <BookOpen className="w-5 h-5" aria-hidden="true" />
            <span className="font-medium">Learn</span>
            {activeTab === 'learn' && (
              <motion.div layoutId="indicator" className="absolute left-0 w-1 h-8 bg-brand-primary rounded-r-full" aria-hidden="true" />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('dashboard')}
            aria-label="User Dashboard"
            aria-pressed={activeTab === 'dashboard'}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === 'dashboard' 
                ? 'bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20 shadow-inner' 
                : 'text-text-secondary hover:bg-brand-card hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" aria-hidden="true" />
            <span className="font-medium">Dashboard</span>
            {activeTab === 'dashboard' && (
              <motion.div layoutId="indicator" className="absolute left-0 w-1 h-8 bg-brand-secondary rounded-r-full" aria-hidden="true" />
            )}
          </button>
        </nav>
      </section>

      <section className="space-y-4" aria-label="User Stats">
        {/* Streak Component */}
        <article className="glass-panel p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center" aria-hidden="true">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold">Current Streak</p>
            <p className="text-xl font-bold text-white">4 Days</p>
          </div>
        </article>

        {/* Level Component */}
        <article className="glass-panel p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-accent" aria-hidden="true" />
              <span className="text-sm font-medium text-white">Intermediate</span>
            </div>
            <span className="text-xs text-brand-accent font-bold">Lvl 12</span>
          </div>
          <div 
            className="w-full h-2 bg-brand-dark rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow="70"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Level progress"
          >
            <div className="h-full bg-gradient-to-r from-brand-primary to-brand-accent" style={{ width: '70%' }} />
          </div>
          <p className="text-xs text-text-secondary mt-2 text-right">350 / 500 XP</p>
        </article>
      </section>
    </aside>
  );
};

export default Sidebar;
