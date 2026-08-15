'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is a construction website builder?',
    answer:
      'A construction website builder is a specialized Content Management System (CMS) designed specifically for general contractors, civil engineering firms, and commercial builders. Unlike generic website builders, it provides native data structures for construction project portfolios, sector categorization, CAD blueprint distribution, and RFP quote intake.',
  },
  {
    id: 'faq-2',
    question: 'Why should a construction company use a specialized website builder instead of a generic one?',
    answer:
      'Generic website builders provide basic digital brochures that require numerous unmaintained third-party plugins to handle project galleries, document downloads, and lead intake. A specialized construction CMS like AtlasBuild provides built-in support for civil engineering metrics, EMR safety score badges, bonding capacities, and client project workspaces out of the box.',
  },
  {
    id: 'faq-3',
    question: 'Can AtlasBuild showcase both completed and active construction projects?',
    answer:
      'Yes. AtlasBuild allows construction teams to create dynamic project showcases categorized by sector (Commercial, Residential, Civil, Infrastructure, Healthcare, Education). Each project can display square footage, budget parameters, completion percentages, milestone timelines, and high-resolution site photography.',
  },
  {
    id: 'faq-4',
    question: 'Can construction companies capture RFPs and project bids through their website?',
    answer:
      'Yes. AtlasBuild includes a built-in RFP and quote request intake engine. Prospective clients can submit project scope parameters, budget ranges, and attach CAD drawing files, allowing estimators to review and evaluate opportunities directly in the admin dashboard.',
  },
  {
    id: 'faq-5',
    question: 'Is AtlasBuild a CMS, a website builder, or a client portal?',
    answer:
      'AtlasBuild is an integrated construction platform that combines all three. It provides a high-performance public marketing website CMS, an interactive project showcase, and secure client project workspaces where stakeholders can view milestone schedules and download authorized blueprints.',
  },
  {
    id: 'faq-6',
    question: 'Who is AtlasBuild designed for?',
    answer:
      'AtlasBuild is designed for commercial general contractors, heavy civil engineering firms, industrial builders, infrastructure development teams, and specialty subcontractors who require a professional, high-performance web presence connected to real project workflows.',
  },
];

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {FAQ_DATA.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-[#0f131c]/70 backdrop-blur-[20px] overflow-hidden transition-colors hover:border-primary/40 shadow-lg"
          >
            <button
              onClick={() => toggleFaq(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              id={`faq-question-${item.id}`}
              className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary select-none"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20">
                  0{index + 1}
                </span>
                <h3 className="text-base sm:text-lg font-headline font-bold text-white tracking-tight">
                  {item.question}
                </h3>
              </div>
              <div
                className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-primary bg-white/5 transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? 'rotate-180 bg-primary/20 border-primary/40' : ''
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">expand_more</span>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 text-sm text-on-surface-variant font-body leading-relaxed border-t border-white/5">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
