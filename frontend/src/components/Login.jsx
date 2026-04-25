import React from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Zap, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Login component with Google Sign-In.
 * @returns {JSX.Element}
 */
const Login = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) { console.error("Login failed", err); }
  };

  return (
    <main className="h-screen w-full flex items-center justify-center bg-brand-dark p-4">
      <motion.section 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-12 max-w-md w-full text-center space-y-8 border-brand-primary/20"
      >
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-2xl shadow-brand-primary/40">
          <Zap className="text-white w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white tracking-tight">Yaris AI</h1>
          <p className="text-text-secondary text-lg">Your Adaptive Learning Companion</p>
        </div>
        <button 
          onClick={handleLogin}
          className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-3 text-lg font-semibold"
          aria-label="Sign in with Google"
        >
          <LogIn className="w-6 h-6" />
          Continue with Google
        </button>
        <p className="text-xs text-text-secondary">By continuing, you agree to our Terms of Service</p>
      </motion.section>
    </main>
  );
};

export default Login;
