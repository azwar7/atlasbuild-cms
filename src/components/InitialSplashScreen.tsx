'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InitialSplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    // Prevent scrolling during initial load
    document.body.style.overflow = 'hidden';

    // Simulate smooth progress increment during asset & font hydration
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.floor(Math.random() * 15) + 10;
      });
    }, 80);

    // Check DOM readiness & font loading completion
    const handleComplete = async () => {
      if (typeof document !== 'undefined' && document.fonts) {
        await document.fonts.ready;
      }
      
      // Complete progress & initiate graceful fade out
      setProgress(100);

      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 350);
    };

    if (document.readyState === 'complete') {
      handleComplete();
    } else {
      window.addEventListener('load', handleComplete);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleComplete);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[99999] bg-[#0a0e1a] flex flex-col items-center justify-center overflow-hidden select-none pointer-events-auto"
        >
          {/* Ambient Background Glows */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#7dd3fc]/10 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#f59e0b]/5 rounded-full blur-[120px] pointer-events-none"></div>

          {/* Centered Animated Loader Only */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            
            {/* Construction Ring Spinner */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
              <div className="absolute inset-0 rounded-full border-2 border-t-[#7dd3fc] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-ping"></div>
            </div>

            {/* Glowing Sleek Progress Bar */}
            <div className="w-56 sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5 relative p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#7dd3fc] via-[#38bdf8] to-[#f59e0b] rounded-full shadow-[0_0_12px_rgba(125,211,252,0.8)]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.15 }}
              />
            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
