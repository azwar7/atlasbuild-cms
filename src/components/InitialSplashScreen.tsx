'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InitialSplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(12);
  const [loadingText, setLoadingText] = useState('Preparing AtlasBuild...');

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
        const next = prev + Math.floor(Math.random() * 15) + 10;
        if (next > 40 && next < 70) {
          setLoadingText('Initializing telemetry & security protocols...');
        } else if (next >= 70) {
          setLoadingText('Loading workspace components...');
        }
        return next;
      });
    }, 80);

    // Check DOM readiness & font loading completion
    const handleComplete = async () => {
      if (typeof document !== 'undefined' && document.fonts) {
        await document.fonts.ready;
      }
      
      // Complete progress & initiate graceful fade out
      setProgress(100);
      setLoadingText('Workspace ready.');

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

          {/* Centered Brand Content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-md w-full">
            
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[#7dd3fc]/20 rounded-2xl blur-xl animate-pulse"></div>
                <div className="w-20 h-20 bg-[#0f1524] border border-[#7dd3fc]/40 rounded-2xl p-4 flex items-center justify-center shadow-[0_0_30px_rgba(125,211,252,0.2)]">
                  <img
                    src="/images/logo.png"
                    alt="AtlasBuild Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-headline font-bold tracking-tight text-white">
                  Atlas<span className="text-[#7dd3fc]">Build</span>
                </h1>
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#7dd3fc]/80 uppercase mt-1 block">
                  Enterprise Infrastructure Platform
                </span>
              </div>
            </motion.div>

            {/* Circular Spinner & Progress Bar */}
            <div className="flex flex-col items-center gap-5 w-full mt-2">
              
              {/* Construction Ring Spinner */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
                <div className="absolute inset-0 rounded-full border-2 border-t-[#7dd3fc] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping"></div>
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

              {/* Status Message */}
              <div className="flex flex-col gap-1 min-h-[40px]">
                <p className="text-xs font-semibold text-white/90 animate-pulse tracking-wide font-headline">
                  {loadingText}
                </p>
                <p className="text-[11px] font-mono text-white/50">
                  Loading workspace assets...
                </p>
              </div>

            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
