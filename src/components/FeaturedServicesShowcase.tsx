"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SlideData {
  id: number;
  category: string;
  title: string;
  description: string;
  metric: string;
  buttonText: string;
  image: string;
  link: string;
}

const slides: SlideData[] = [
  {
    id: 0,
    category: "Commercial Construction",
    title: "Building Tomorrow's Skylines",
    description: "Delivering commercial towers, office complexes, healthcare facilities, and mixed-use developments with precision engineering.",
    metric: "350+ Commercial Projects Completed",
    buttonText: "Explore Projects",
    image: "/images/steel-framing.jpg",
    link: "/portfolio",
  },
  {
    id: 1,
    category: "Infrastructure",
    title: "Engineering Critical Infrastructure",
    description: "Roads, bridges, transportation hubs, utilities, and public works built to withstand decades of demand.",
    metric: "1,200 km Infrastructure Delivered",
    buttonText: "View Infrastructure",
    image: "/images/suspension-bridge.jpg",
    link: "/portfolio",
  },
  {
    id: 2,
    category: "Industrial",
    title: "Large Scale Industrial Facilities",
    description: "Manufacturing plants, logistics centers, warehouses, and industrial campuses designed for efficiency.",
    metric: "8 Million sq ft Built",
    buttonText: "Explore Facilities",
    image: "/images/power-plant.jpg",
    link: "/portfolio",
  },
  {
    id: 3,
    category: "Residential",
    title: "Modern Residential Communities",
    description: "Luxury apartments, gated communities, mixed-use housing, and residential developments.",
    metric: "15,000 Homes Delivered",
    buttonText: "View Communities",
    image: "/images/office-building.jpg",
    link: "/portfolio",
  },
  {
    id: 4,
    category: "Safety",
    title: "Safety Without Compromise",
    description: "Our teams maintain industry-leading safety standards through continuous monitoring and certified processes.",
    metric: "99.8% Safety Compliance",
    buttonText: "Our Standards",
    image: "/images/hero-night-construction.jpg",
    link: "/portal/proj-1/safety",
  },
];

const AUTOPLAY_DURATION = 6000; // 6 seconds

export default function FeaturedServicesShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation timer
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, AUTOPLAY_DURATION);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="group relative w-full h-full min-h-[460px] lg:min-h-[500px] rounded-[24px] overflow-hidden bg-[#0f131c]/70 backdrop-blur-[20px] border border-white/10 shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:border-white/20 flex flex-col justify-between p-8 selection:bg-primary selection:text-on-primary"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image with Zoom + Fade Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          className="absolute inset-0 z-0 overflow-hidden"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover"
          />
          {/* Dark Gradient Overlay (Darkens on Hover) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#0f131c]/80 to-black/40 transition-opacity duration-500 group-hover:opacity-95" />
        </motion.div>
      </AnimatePresence>

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-label uppercase tracking-widest text-primary font-bold">
              {currentSlide.category}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Slide Counter */}
        <div className="text-xs font-mono font-medium text-white/50 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          0{currentSlide.id + 1} / 0{slides.length}
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="relative z-10 flex flex-col gap-4 mt-auto pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-headline font-bold text-white tracking-tight leading-tight">
              {currentSlide.title}
            </h3>

            {/* Description */}
            <p className="text-sm font-body text-on-surface-variant leading-relaxed line-clamp-2 max-w-md">
              {currentSlide.description}
            </p>

            {/* Key Metric Badge */}
            <div className="flex items-center gap-2 text-xs font-label text-primary font-semibold py-1">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>{currentSlide.metric}</span>
            </div>

            {/* Action CTA Button */}
            <div className="pt-2">
              <Link
                href={currentSlide.link}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 hover:bg-primary hover:text-on-primary border border-white/20 hover:border-primary rounded-full text-xs font-label font-bold text-white transition-all duration-300 group/btn backdrop-blur-md shadow-lg"
              >
                <span>{currentSlide.buttonText}</span>
                <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1.5 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar Indicators */}
        <div className="flex items-center gap-2 pt-6">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/20 relative cursor-pointer group/nav focus:outline-none"
              title={`Go to slide ${idx + 1}: ${slide.category}`}
            >
              {idx === currentIndex ? (
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? "100%" : "100%" }}
                  transition={{
                    duration: isPaused ? 0 : AUTOPLAY_DURATION / 1000,
                    ease: "linear",
                  }}
                />
              ) : idx < currentIndex ? (
                <div className="w-full h-full bg-white/50 rounded-full" />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
