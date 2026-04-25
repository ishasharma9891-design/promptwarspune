import React, { useState } from 'react';
import { Trophy, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Challenge Engine UI. Renders an interactive task and handles submission.
 * @param {Object} props - Component props.
 * @param {string} props.task - The challenge description.
 * @param {function} props.onComplete - Success callback.
 * @returns {JSX.Element}
 */
const ChallengeEngine = ({ task, onComplete }) => {
  const [answer, setAnswer] = useState('');
  const [isSolved, setIsSolved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.length > 5) { // Mock validation logic
      setIsSolved(true);
      setTimeout(() => onComplete(100), 1000);
    }
  };

  if (isSolved) return (
    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="p-6 glass-panel border-green-500/50 bg-green-500/10 text-center">
      <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
      <h4 className="text-white font-bold">Challenge Mastered!</h4>
      <p className="text-sm text-green-400">+100 XP Earned</p>
    </motion.div>
  );

  return (
    <section className="p-6 glass-panel border-brand-primary/50 bg-brand-primary/5 shadow-lg relative overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h4 className="text-white font-bold">Active Challenge</h4>
      </div>
      <p className="text-[15px] text-gray-200 mb-6 leading-relaxed">{task}</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your solution..." className="flex-1 bg-brand-dark/50 border border-brand-card rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-primary transition-colors"
        />
        <button type="submit" className="bg-brand-primary hover:bg-brand-secondary text-white px-6 py-2 rounded-xl font-bold transition-all">Submit</button>
      </form>
    </section>
  );
};

export default ChallengeEngine;
