import { useState, useRef, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { db, auth } from '../firebase';
import { doc, onSnapshot, getDoc, updateDoc } from 'firebase/firestore';
import { streamAiResponse } from '../utils/chatApi';

/**
 * Custom hook to manage chat state and interactions.
 * @returns {Object} Chat state and handlers.
 */
export const useChatSession = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userLevel, setUserLevel] = useState('Intermediate');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    return onSnapshot(doc(db, "users", "mock-user"), (doc) => {
      if (doc.exists()) setUserLevel(doc.data().expertise_level || 'Intermediate');
    });
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 1, type: 'bot', level: userLevel, isGreeting: true,
        content: DOMPurify.sanitize(`Welcome back! I see you're currently at the ${userLevel} level.`)
      }]);
    }
  }, [userLevel, messages.length]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const botId = Date.now() + 1;
    setMessages(p => [...p, { id: Date.now(), type: 'user', content: input }, { id: botId, type: 'bot', level: userLevel, content: '', isLoading: true }]);
    setInput('');
    setIsLoading(true);
    try {
      const token = auth.currentUser ? await auth.currentUser.getIdToken() : 'mock-token';
      await streamAiResponse(input, token, (data) => {
        setMessages(prev => prev.map(m => m.id === botId ? { ...m, ...data, isLoading: false } : m));
      });
    } catch (err) { 
      console.error(err);
      setMessages(prev => prev.map(m => m.id === botId ? { 
        ...m, 
        content: DOMPurify.sanitize(`<p class="text-red-400"><b>Connection Error:</b> I couldn't reach the AI brain. Please check your internet or try again.</p>`),
        isLoading: false 
      } : m));
    }
    finally { setIsLoading(false); }
  };

  const handleChallengeComplete = async (xpAmount) => {
    try {
      const userRef = doc(db, "users", "mock-user");
      const docSnap = await getDoc(userRef);
      const currentXp = docSnap.exists() ? docSnap.data().total_xp : 0;
      await updateDoc(userRef, { total_xp: currentXp + xpAmount });
      setMessages(prev => [...prev, {
        id: Date.now(), type: 'bot',
        content: DOMPurify.sanitize(`<p>Success! <b>+${xpAmount} XP</b> awarded.</p>`)
      }]);
    } catch (err) { console.error(err); }
  };

  return { messages, input, setInput, userLevel, isLoading, messagesEndRef, handleSend, handleChallengeComplete };
};
