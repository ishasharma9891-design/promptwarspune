import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useChatSession } from '../hooks/useChatSession';
import ChatHeader from './chat/ChatHeader';
import ChatMessage from './chat/ChatMessage';
import ChatInput from './chat/ChatInput';

/**
 * Main Chat Interface component. Orchestrates header, messages, and input.
 * @returns {JSX.Element}
 */
const ChatInterface = () => {
  const { 
    messages, input, setInput, userLevel, isLoading, messagesEndRef, handleSend, handleChallengeComplete 
  } = useChatSession();
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, messagesEndRef]);

  return (
    <main className="flex flex-col h-full max-w-5xl mx-auto w-full relative z-10 px-4 py-6" role="main">
      <ChatHeader userLevel={userLevel} />
      <section className="flex-1 overflow-y-auto scrollbar-hide space-y-6 pb-4" aria-label="Conversation history">
        <AnimatePresence>
          {messages.map((msg) => (
            <ChatMessage 
              key={msg.id} 
              msg={msg} 
              onChallengeComplete={handleChallengeComplete} 
            />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </section>
      <ChatInput input={input} setInput={setInput} handleSend={handleSend} isLoading={isLoading} />
    </main>
  );
};

export default ChatInterface;
