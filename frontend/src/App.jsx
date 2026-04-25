import { useState, Suspense, lazy } from 'react';
import Sidebar from './components/Sidebar';

// Lazy load main components for performance efficiency
const ChatInterface = lazy(() => import('./components/ChatInterface'));
const ProfileDashboard = lazy(() => import('./components/ProfileDashboard'));

function App() {
  const [activeTab, setActiveTab] = useState('learn'); // 'learn' or 'dashboard'
  
  return (
    <div className="flex h-screen w-full bg-brand-dark overflow-hidden" role="application" aria-label="Yaris Learning Application">
      {/* Sidebar for Navigation and Streaks */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative" role="main" aria-label="Main Content Area">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/10 via-brand-dark to-brand-dark pointer-events-none" aria-hidden="true" />
        
        <Suspense fallback={<div className="flex items-center justify-center h-full text-brand-primary" aria-live="polite">Loading...</div>}>
          {activeTab === 'learn' ? (
            <ChatInterface />
          ) : (
            <ProfileDashboard />
          )}
        </Suspense>
      </main>
    </div>
  );
}

export default App;
