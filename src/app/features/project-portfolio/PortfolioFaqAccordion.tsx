'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const PORTFOLIO_FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is construction project portfolio software?',
    answer:
      'Construction project portfolio software is a specialized platform that allows general contractors, civil engineers, and commercial builders to organize, manage, and present their completed and active construction projects online. Unlike generic photo galleries, it includes structured construction data such as sector classifications, completion percentages, square footage, budget parameters, and milestone progress.',
  },
  {
    id: 'faq-2',
    question: 'Why does a construction company need a dedicated project portfolio?',
    answer:
      'A dedicated construction portfolio provides proof of past performance to project owners, developers, and public procurement boards. It demonstrates specific sector capabilities, engineering scale, and safety credentials, helping contractors qualify for high-value tenders and commercial bids.',
  },
  {
    id: 'faq-3',
    question: 'Can AtlasBuild showcase both active and completed construction projects?',
    answer:
      'Yes. AtlasBuild supports real-time project status indicators (Active, Completed, Planning) with percentage completion progress bars, structural sector categorization, and high-resolution site photography.',
  },
  {
    id: 'faq-4',
    question: 'Can projects be filtered by construction sector and location?',
    answer:
      'Yes. The public project registry supports multi-sector filtering across Commercial, Residential, Civil, Infrastructure, Healthcare, and Education builds, as well as keyword searching by project location and title.',
  },
  {
    id: 'faq-5',
    question: 'Can I connect my project portfolio directly to my construction company website?',
    answer:
      'Yes. AtlasBuild is a unified construction CMS where your project portfolio is natively integrated into your company website, eliminating the need for disconnected portfolio plugins or separate hosting.',
  },
  {
    id: 'faq-6',
    question: 'Can visitors submit an RFP or project bid inquiry after reviewing portfolio projects?',
    answer:
      'Yes. Visitors can transition directly from exploring your project portfolio to submitting project scopes, target budgets, and CAD drawings through the integrated RFP quote intake wizard.',
  },
  {
    id: 'faq-7',
    question: 'Is AtlasBuild a construction portfolio website builder or a CMS?',
    answer:
      'AtlasBuild is an integrated construction website builder and CMS. It combines public marketing websites and dynamic project showcases with authenticated client project workspaces for document distribution and milestone schedules.',
  },
];

export default function PortfolioFaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(PORTFOLIO_FAQ_DATA[0].id);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {PORTFOLIO_FAQ_DATA.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-[#0f131c]/70 backdrop-blur-[20px] overflow-hidden transition-colors hover:border-primary/40 shadow-lg"
          >
            <button
              onClick={() => toggleFaq(item.id)}
              aria-expanded={isOpen}
              aria-controls={`portfolio-faq-answer-${item.id}`}
              id={`portfolio-faq-question-${item.id}`}
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
                  id={`portfolio-faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`portfolio-faq-question-${item.id}`}
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
