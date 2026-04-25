import React, { useState, useEffect, Suspense, lazy } from 'react';
import { db } from '../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { getProfileCached, updateProfileCache } from '../utils/profileCache';
import { ReviewPanel, BadgesPanel } from './dashboard/DashboardPanels';

const ProgressCard = lazy(() => import('./dashboard/ProgressCard'));
const KnowledgeTree = lazy(() => import('./dashboard/KnowledgeTree'));

/**
 * Learner Profile Dashboard. Root component for user stats and progress.
 * @returns {JSX.Element}
 */
const ProfileDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const data = await getProfileCached(async () => {
          const docSnap = await getDoc(doc(db, "users", "mock-user"));
          return docSnap.exists() ? docSnap.data() : null;
        });
        if (data) setProfile(data);
      } catch (err) {
        console.error("Firestore connectivity error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitial();
    try {
      return onSnapshot(doc(db, "users", "mock-user"), (doc) => {
        if (doc.exists()) {
          setProfile(doc.data());
          updateProfileCache(doc.data());
        }
      }, (err) => console.error("Snapshot error:", err));
    } catch (e) { console.error("Listener failed:", e); }
  }, []);

  if (loading) return <div className="p-8 text-white">Loading journey...</div>;
  const data = profile || { stats: {}, struggle_log: [], total_xp: 0 };

  return (
    <main className="flex-1 overflow-y-auto scrollbar-hide p-8 relative z-10">
      <header className="mb-8 flex items-end justify-between">
        <h1 className="text-3xl font-bold text-white">Your Dashboard</h1>
        <div className="glass-panel px-4 py-2 flex items-center gap-2">
          <span className="text-sm text-text-secondary">Total XP</span>
          <span className="text-lg font-bold text-brand-secondary">{data.total_xp.toLocaleString()}</span>
        </div>
      </header>
      <Suspense fallback={<div className="text-white">Loading panels...</div>}>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <ProgressCard data={data} />
            <KnowledgeTree data={data} />
          </div>
          <div className="space-y-6">
            <ReviewPanel topics={data.struggle_log} />
            <BadgesPanel />
          </div>
        </section>
      </Suspense>
    </main>
  );
};

export default ProfileDashboard;
