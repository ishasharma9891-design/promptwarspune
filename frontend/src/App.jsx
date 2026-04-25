import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import ProfileDashboard from './components/ProfileDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('learn'); // 'learn' or 'dashboard'
  
  return (
    <div className="flex h-screen w-full bg-brand-dark overflow-hidden">
      {/* Sidebar for Navigation and Streaks */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/10 via-brand-dark to-brand-dark pointer-events-none" />
        
        {activeTab === 'learn' ? (
          <ChatInterface />
        ) : (
          <ProfileDashboard />
        )}
      </main>
    </div>
  );
}

export default App;
