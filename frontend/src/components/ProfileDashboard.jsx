import React from 'react';
import { Target, Award, BrainCircuit, Activity, ChevronRight, Lock } from 'lucide-react';

const ProfileDashboard = () => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide p-8 relative z-10">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Your Dashboard</h1>
          <p className="text-text-secondary">Track your progress, review concepts, and tackle new challenges.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass-panel px-4 py-2 flex items-center gap-2">
            <span className="text-sm text-text-secondary">Total XP</span>
            <span className="text-lg font-bold text-brand-secondary">1,240</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Progress & Streaks */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Main Progress Card */}
          <div className="glass-panel p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-all duration-500 -mr-20 -mt-20" />
            
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-accent" />
              Current Module: React Hooks Deep Dive
            </h3>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">Progress</span>
              <span className="text-sm text-brand-accent font-bold">68%</span>
            </div>
            <div className="w-full h-3 bg-brand-dark rounded-full overflow-hidden mb-6">
              <div className="h-full bg-gradient-to-r from-brand-primary to-brand-accent w-[68%] rounded-full relative">
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-brand-dark/50 rounded-xl p-4 border border-brand-card">
                <p className="text-xs text-text-secondary mb-1">Pace</p>
                <p className="text-lg font-semibold text-white">Optimal</p>
              </div>
              <div className="bg-brand-dark/50 rounded-xl p-4 border border-brand-card">
                <p className="text-xs text-text-secondary mb-1">Style</p>
                <p className="text-lg font-semibold text-white">Visual / Practical</p>
              </div>
              <div className="bg-brand-dark/50 rounded-xl p-4 border border-brand-card">
                <p className="text-xs text-text-secondary mb-1">Assessment Score</p>
                <p className="text-lg font-semibold text-white">85/100</p>
              </div>
            </div>
          </div>

          {/* Journey Map (Skill Tree) */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-brand-secondary" />
                Knowledge Tree
              </h3>
              <button className="text-sm text-brand-primary hover:text-brand-secondary transition-colors flex items-center">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-brand-card" />
              
              <div className="space-y-6 relative">
                {/* Mastered Node */}
                <div className="flex gap-4 opacity-70">
                  <div className="w-14 h-14 rounded-full bg-brand-dark border-2 border-brand-accent flex items-center justify-center z-10 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center">
                      <Award className="w-5 h-5 text-brand-accent" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-white font-medium">JavaScript Fundamentals</h4>
                    <p className="text-sm text-text-secondary">Mastered • 450 XP</p>
                  </div>
                </div>

                {/* Current Node */}
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full bg-brand-dark border-2 border-brand-primary flex items-center justify-center z-10 shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-brand-primary animate-pulse" />
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-white font-medium text-lg">Asynchronous JS</h4>
                    <p className="text-sm text-brand-primary">In Progress • 68%</p>
                    <div className="mt-2 text-xs text-text-secondary flex gap-2">
                      <span className="bg-brand-surface px-2 py-1 rounded">Promises</span>
                      <span className="bg-brand-surface px-2 py-1 rounded">Async/Await</span>
                    </div>
                  </div>
                </div>

                {/* Locked Node */}
                <div className="flex gap-4 opacity-50">
                  <div className="w-14 h-14 rounded-full bg-brand-dark border-2 border-brand-card flex items-center justify-center z-10 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-brand-surface flex items-center justify-center">
                      <Lock className="w-5 h-5 text-text-secondary" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-white font-medium">React Hooks</h4>
                    <p className="text-sm text-text-secondary">Locked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Badges & Review */}
        <div className="space-y-6">
          
          {/* Needs Review */}
          <div className="glass-panel p-6 border-orange-500/30 bg-orange-500/5">
            <h3 className="text-lg font-semibold text-white mb-4">Areas to Review</h3>
            <p className="text-sm text-text-secondary mb-4">Based on your recent struggles, we suggest reviewing these concepts:</p>
            <div className="space-y-3">
              <div className="p-3 bg-brand-dark rounded-lg border border-brand-card flex justify-between items-center">
                <span className="text-sm text-white">Event Loop</span>
                <button className="text-xs bg-brand-surface px-3 py-1.5 rounded hover:bg-brand-primary/20 hover:text-brand-primary transition-colors text-text-secondary">Review</button>
              </div>
              <div className="p-3 bg-brand-dark rounded-lg border border-brand-card flex justify-between items-center">
                <span className="text-sm text-white">Closure Scope</span>
                <button className="text-xs bg-brand-surface px-3 py-1.5 rounded hover:bg-brand-primary/20 hover:text-brand-primary transition-colors text-text-secondary">Review</button>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Recent Badges
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-brand-dark/50 rounded-xl border border-brand-card text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center mb-2 shadow-lg shadow-orange-500/20">
                  <span className="text-2xl">🔥</span>
                </div>
                <p className="text-sm font-semibold text-white">Grit Buff</p>
                <p className="text-[10px] text-text-secondary mt-1">3-day streak</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-brand-dark/50 rounded-xl border border-brand-card text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-secondary to-purple-500 flex items-center justify-center mb-2 shadow-lg shadow-purple-500/20">
                  <span className="text-2xl">💡</span>
                </div>
                <p className="text-sm font-semibold text-white">Ah-haaa Seer</p>
                <p className="text-[10px] text-text-secondary mt-1">Recovery win</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-brand-dark/50 rounded-xl border border-brand-card text-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-help">
                <div className="w-12 h-12 rounded-full bg-brand-surface flex items-center justify-center mb-2 border-2 border-dashed border-brand-card">
                  <Lock className="w-5 h-5 text-text-secondary" />
                </div>
                <p className="text-sm font-semibold text-white">Locked In</p>
                <p className="text-[10px] text-text-secondary mt-1">Master a module</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
