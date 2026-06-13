'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

type FaqAccordionItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: readonly FaqAccordionItem[];
  initialExpandedIndex?: number | null;
};

export default function FaqAccordion({
  items,
  initialExpandedIndex = 0,
}: FaqAccordionProps) {
  const [expanded, setExpanded] = useState<number | null>(initialExpandedIndex);

  return (
    <div className="flex flex-col gap-3 w-full max-w-4xl mx-auto">
      {items.map((item, index) => {
        const isExpanded = expanded === index;
        const panelId = `faq-panel-${index}`;

        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-[1.5rem] transition-all duration-300 ease-in-out ${
              isExpanded
                ? 'bg-[#111827] text-white shadow-lg'
                : 'bg-[#f8fafc] text-[#0f172a] hover:bg-[#f1f5f9]'
            }`}
          >
            <button
              type="button"
              onClick={() => setExpanded(isExpanded ? null : index)}
              aria-expanded={isExpanded}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 md:px-8 md:py-6 text-left"
            >
              <h3
                className={`text-[15px] md:text-[17px] font-medium leading-snug transition-colors duration-300 ${
                  isExpanded ? 'text-white' : 'text-[#0f172a]'
                }`}
              >
                {item.question}
              </h3>
              
              <div className="shrink-0 flex items-center justify-center">
                {isExpanded ? (
                  <Minus className="h-5 w-5 text-white/70" strokeWidth={2} />
                ) : (
                  <Plus className="h-5 w-5 text-[#64748b]" strokeWidth={2} />
                )}
              </div>
            </button>

            <div
              id={panelId}
              className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-[14px] md:text-[15px] leading-[1.6] text-white/70 max-w-3xl">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
