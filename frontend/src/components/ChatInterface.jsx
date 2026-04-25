import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_MESSAGES = [
  {
    id: 1,
    type: 'bot',
    level: 'Intermediate',
    content: `Welcome back! We left off discussing closures yesterday, and you did great. Ready to dive into something new today, or review?`,
    isGreeting: true,
  },
  {
    id: 2,
    type: 'user',
    content: `Let's learn about promises in javascript.`,
  },
  {
    id: 3,
    type: 'bot',
    level: 'Intermediate',
    content: `
      <p>A Promise in JavaScript is an object representing the eventual completion (or failure) of an asynchronous operation.</p>
      <p>Instead of passing callbacks into a function, a promise allows you to attach callbacks to the returned object, making async code much cleaner and easier to chain.</p>
    `,
    example: `Imagine ordering food at a restaurant. You pay and get a receipt with an order number (the Promise). You can't eat the receipt, but it represents the food that will eventually be ready. While you wait (Pending), you can do other things. When your number is called, the promise is either 'Fulfilled' (you get your food) or 'Rejected' (they ran out of ingredients).`,
    diagram: true,
    question: `If you have multiple asynchronous tasks that don't depend on each other, how might you use Promises to run them concurrently rather than one after another?`,
  }
];

const ChatInterface = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://isha12345-761085713268.asia-south1.run.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input, context: {} }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        level: data.level || 'Intermediate',
        content: data.content || `<p>Sorry, I couldn't generate a response.</p>`,
        example: data.example || null,
        diagram: data.diagram || null,
        question: data.question || null,
      }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        content: `<p class="text-red-400">Sorry, there was an error connecting to the AI brain.</p>`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full relative z-10 px-4 py-6">
      {/* Chat Header */}
      <div className="flex items-center justify-between mb-6 glass-panel px-6 py-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-secondary" />
            Learning Session
          </h2>
          <p className="text-sm text-text-secondary">Topic: JavaScript Promises</p>
        </div>
        <div className="flex items-center gap-2 bg-brand-dark/50 px-3 py-1.5 rounded-full border border-brand-card">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-text-secondary font-medium">Yaris AI Active</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-6 pb-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                msg.type === 'user' 
                  ? 'bg-brand-surface border border-brand-card text-white' 
                  : 'bg-gradient-to-tr from-brand-primary to-brand-secondary text-white'
              }`}>
                {msg.type === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Content */}
              <div className={`max-w-[80%] ${msg.type === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                {msg.type === 'bot' && msg.level && !msg.isGreeting && (
                  <div className="flex items-center gap-1.5 mb-2 ml-1">
                    <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
                    <span className="text-[10px] uppercase tracking-widest text-brand-secondary font-bold">
                      {msg.level} Explanation
                    </span>
                  </div>
                )}
                
                <div className={`p-5 rounded-2xl ${
                  msg.type === 'user'
                    ? 'bg-brand-primary text-white rounded-tr-sm shadow-md shadow-brand-primary/20'
                    : 'glass-panel rounded-tl-sm'
                }`}>
                  {/* Core Explanation */}
                  <div 
                    className="text-[15px] leading-relaxed text-gray-100"
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                  />

                  {/* Contextual Example */}
                  {msg.example && (
                    <div className="mt-4 p-4 rounded-xl bg-brand-dark/40 border border-brand-card/50">
                      <p className="text-sm text-brand-accent mb-1 font-semibold flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" /> Analogy
                      </p>
                      <p className="text-[14.5px] text-gray-300 leading-relaxed">{msg.example}</p>
                    </div>
                  )}

                  {/* Visual Diagram Placeholder */}
                  {msg.diagram && (
                    <div className="mt-4 p-4 rounded-xl bg-brand-dark/40 border border-brand-card/50 flex flex-col items-center justify-center min-h-[120px]">
                      <p className="text-xs text-text-secondary mb-2 uppercase tracking-widest">System Diagram</p>
                      <div className="flex items-center gap-4 text-brand-primary">
                        <div className="p-3 border border-brand-card rounded-lg bg-brand-surface">Pending</div>
                        <div className="w-8 h-[2px] bg-brand-card relative">
                           <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-brand-card transform rotate-45" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="p-3 border border-green-500/30 rounded-lg bg-green-500/10 text-green-400">Fulfilled</div>
                          <div className="p-3 border border-red-500/30 rounded-lg bg-red-500/10 text-red-400">Rejected</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Socratic Question */}
                  {msg.question && (
                    <div className="mt-5 pt-4 border-t border-brand-card/50">
                      <p className="text-[15px] font-medium text-white">
                        <span className="text-brand-secondary font-bold">Q: </span>
                        {msg.question}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-4 glass-panel p-2 flex items-center rounded-2xl relative z-20">
        <form onSubmit={handleSend} className="flex-1 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your response or ask a question..."
            className="flex-1 bg-transparent border-none outline-none text-white px-4 placeholder-text-secondary"
          />
          <button 
            type="submit"
            className="p-3 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? <span className="animate-pulse">...</span> : <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
