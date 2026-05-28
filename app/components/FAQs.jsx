"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "When was Bombay Shaving founded?",
    answer:
      "Bombay Shaving Company was founded in 2016 by Shantanu Deshpande, with a mission to build premium grooming products tailored for Indian consumers.",
  },
  {
    question: "What does Bombay Shaving do?",
    answer:
      "Bombay Shaving Company designs and sells premium grooming products including trimmers, razors, skincare, haircare, and fragrances, primarily through D2C and quick commerce channels.",
  },
  {
    question: "Where is Bombay Shaving located?",
    answer:
      "Bombay Shaving Company is headquartered in Mumbai, Maharashtra, India, with operations and distribution across the country.",
  },
  {
    question: "Who is the current CEO of Bombay Shaving?",
    answer:
      "Shantanu Deshpande is the founder and CEO of Bombay Shaving Company. He leads the company's vision of becoming India's leading full-stack grooming brand.",
  },
  {
    question: "Which legal entities is Bombay Shaving associated with?",
    answer:
      "Bombay Shaving Company operates under Visage Lines Personal Care Pvt. Ltd., the parent legal entity behind both the Bombay Shaving Company and Bombae brands.",
  },
  {
    question: "How many employees does Bombay Shaving have?",
    answer:
      "Bombay Shaving Company employs over 500 professionals across product development, marketing, supply chain, and technology functions.",
  },
  {
    question: "Is Bombay Shaving a funded company?",
    answer:
      "Yes, Bombay Shaving Company is a venture-backed company that has raised multiple rounds of funding from marquee institutional and strategic investors.",
  },
  {
    question: "How much is Bombay Shaving worth?",
    answer:
      "Bombay Shaving Company is currently in its pre-IPO phase. The company's valuation reflects its rapid growth trajectory, with INR 480 Cr in projected FY26 revenue and 83% YoY growth.",
  },
  {
    question: "When was the latest funding round of Bombay Shaving?",
    answer:
      "The latest capital raise is a pre-IPO secondary transaction currently being facilitated by Oister Global, allowing investors early access ahead of the company's planned public listing.",
  },
  {
    question: "What is the annual revenue of Bombay Shaving?",
    answer:
      "Bombay Shaving Company is on track to deliver INR 480 Cr in FY26, representing 83% YoY growth and a 12x increase in revenue over the past six years.",
  },
  {
    question: "Where does Bombay Shaving rank among its competitors?",
    answer:
      "Bombay Shaving Company holds ~10% overall market share in men's trimmers and ~30% share within quick commerce, making it the fastest-growing challenger to legacy brands like Gillette and Philips.",
  },
  {
    question: "Who are the top competitors of Bombay Shaving?",
    answer:
      "The key competitors include Gillette (P&G), Philips, and other emerging D2C grooming brands. Bombay Shaving has consistently outpaced these incumbents in quick commerce and digital-first channels.",
  },
];

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
        <p className="pb-4 text-sm leading-relaxed text-[#696C7A] sm:text-base">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function FAQs() {
  const half = Math.ceil(FAQS.length / 2);
  const leftColumn = FAQS.slice(0, half);
  const rightColumn = FAQS.slice(half);

  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[#28283B]">
          FAQs ABOUT BOMBAY SHAVING
        </h2>
        {/* Mobile: single column */}
        <div className="divide-y divide-[#e8eaef] sm:hidden">
          {FAQS.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
        {/* Desktop: two-column */}
        <div className="hidden sm:grid gap-x-8 sm:grid-cols-2">
          <div className="divide-y divide-[#e8eaef]">
            {leftColumn.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
          <div className="divide-y divide-[#e8eaef]">
            {rightColumn.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
