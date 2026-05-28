"use client";

import { motion } from "framer-motion";

const INVESTORS = [
  { name: "Image Will Come Here 1" },
  { name: "Image Will Come Here 2" },
  { name: "Image Will Come Here 3" },
  { name: "Image Will Come Here 4" },
  { name: "Image Will Come Here 5" },
  { name: "Image Will Come Here 6" },
];

const CARD_COLORS = [
  { bg: "#C2410C" },
  { bg: "#15803D" },
  { bg: "#1D4ED8" },
  { bg: "#7E22CE" },
  { bg: "#B45309" },
  { bg: "#BE185D" },
];

function InvestorCard({ idx }) {
  const { bg } = CARD_COLORS[idx % CARD_COLORS.length];
  return (
    <motion.div
      style={{ backgroundColor: bg }}
      className="aspect-square w-full sm:w-36 sm:h-36 rounded-xl border border-[#d0d4de] shadow-[0_2px_8px_rgba(40,40,59,0.08)]"
      whileHover={{ scale: 1.1, boxShadow: "0 12px 32px rgba(0,0,0,0.2)", zIndex: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
}

export default function KeyInvestors() {
  return (
    <section>
      <h2 className="mb-4 text-base font-semibold text-[#555573] sm:text-lg">
        Key Investors
      </h2>
      <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-4">
        {INVESTORS.map((_, idx) => (
          <InvestorCard key={idx} idx={idx} />
        ))}
      </div>
    </section>
  );
}
