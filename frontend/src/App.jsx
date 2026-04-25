import { useState, Suspense, lazy, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Sidebar from './components/Sidebar';
import Login from './components/Login';

const ChatInterface = lazy(() => import('./components/ChatInterface'));
const ProfileDashboard = lazy(() => import('./components/ProfileDashboard'));

function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [activeTab, setActiveTab] = useState('learn');

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitializing(false);
    });
  }, []);

  if (initializing) return (
    <div className="h-screen w-full bg-brand-dark flex items-center justify-center text-brand-primary font-bold">
      Initializing Yaris...
    </div>
  );

  if (!user) return <Login />;

  return (
    <div className="flex h-screen w-full bg-brand-dark overflow-hidden" role="application">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/10 via-brand-dark to-brand-dark pointer-events-none" />
        <Suspense fallback={<div className="flex items-center justify-center h-full text-brand-primary">Loading...</div>}>
          {activeTab === 'learn' ? <ChatInterface /> : <ProfileDashboard />}
        </Suspense>
      </main>
    </div>
  );
}

export default App;
