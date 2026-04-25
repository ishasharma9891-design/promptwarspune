import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { User, Bot, AlertCircle } from 'lucide-react';
import ChallengeEngine from './ChallengeEngine';

/**
 * Optimized ChatMessage component using React.memo to prevent 
 * re-renders of the entire message list during streaming.
 */
const ChatMessage = memo(({ msg, onChallengeComplete }) => (
  <motion.article
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
    aria-label={`${msg.type === 'user' ? 'Your' : 'Yaris AI'} message`}
  >
    <Avatar type={msg.type} />
    <div className={`max-w-[80%] ${msg.type === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
      <MessageBubble msg={msg} />
      {msg.question && !msg.challenge && <QuestionBlock question={msg.question} />}
      {msg.challenge && <ChallengeEngine task={msg.challenge} onComplete={onChallengeComplete} />}
    </div>
  </motion.article>
));

const Avatar = ({ type }) => (
  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
    type === 'user' ? 'bg-brand-surface' : 'bg-gradient-to-tr from-brand-primary to-brand-secondary'
  }`} aria-hidden="true">
    {type === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
  </div>
);

const MessageBubble = memo(({ msg }) => (
  <div className={`p-5 rounded-2xl ${msg.type === 'user' ? 'bg-brand-primary text-white rounded-tr-sm shadow-md' : 'glass-panel rounded-tl-sm text-gray-100'}`}>
    <div className="text-[15px] leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.content }} />
    {msg.example && <AnalogyBlock example={msg.example} />}
  </div>
));

const AnalogyBlock = ({ example }) => (
  <section className="mt-4 p-4 rounded-xl bg-brand-dark/40 border border-brand-card/50">
    <p className="text-sm text-brand-accent mb-1 font-semibold flex items-center gap-1.5">
      <AlertCircle className="w-4 h-4" /> Analogy
    </p>
    <p className="text-[14.5px] text-gray-300 leading-relaxed">{example}</p>
  </section>
);

const QuestionBlock = ({ question }) => (
  <div className="mt-2 p-4 glass-panel border-brand-card/50">
    <p className="text-[15px] font-medium text-white">
      <span className="text-brand-secondary font-bold">Q: </span>{question}
    </p>
  </div>
);

export default ChatMessage;
