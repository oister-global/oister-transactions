"use client";

import { useState } from "react";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#e8eaef] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 py-4 text-left"
      >
        <span className="text-sm font-medium leading-snug text-[#28283B] sm:text-base">
          {question}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#696C7A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`size-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <p
          className="pb-4 text-sm leading-relaxed text-[#696C7A] sm:text-base"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      )}
    </div>
  );
}

export default function FAQs({ faqs }) {
  const items = Array.isArray(faqs) ? faqs : [];
  if (items.length === 0) return null;

  const half = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, half);
  const rightColumn = items.slice(half);

  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[#28283B]">
          FAQs ABOUT BOMBAY SHAVING
        </h2>
        {/* Mobile: single column */}
        <div className="divide-y divide-[#e8eaef] sm:hidden">
          {items.map((faq, idx) => (
            <FAQItem key={idx} {...faq} />
          ))}
        </div>
        {/* Desktop: two-column */}
        <div className="hidden sm:grid gap-x-8 sm:grid-cols-2">
          <div className="divide-y divide-[#e8eaef]">
            {leftColumn.map((faq, idx) => (
              <FAQItem key={idx} {...faq} />
            ))}
          </div>
          <div className="divide-y divide-[#e8eaef]">
            {rightColumn.map((faq, idx) => (
              <FAQItem key={idx} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
