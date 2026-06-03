"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function InvestorCard({ name, logo }) {
  return (
    <motion.div
      className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-[#d0d4de] bg-white p-3 shadow-[0_2px_8px_rgba(40,40,59,0.08)] sm:h-36 sm:w-36"
      whileHover={{ scale: 1.1, boxShadow: "0 12px 32px rgba(0,0,0,0.2)", zIndex: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {logo ? (
        <Image
          src={logo}
          alt={name || "Investor"}
          fill
          className="object-contain p-3"
          sizes="144px"
        />
      ) : (
        <span className="px-2 text-center text-sm font-semibold text-[#555573]">
          {name}
        </span>
      )}
    </motion.div>
  );
}

export default function KeyInvestors({ investors }) {
  const items = Array.isArray(investors) ? investors : [];
  if (items.length === 0) return null;

  return (
    <section>
      <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-4">
        {items.map(({ name, logo }, idx) => (
          <InvestorCard key={name || idx} name={name} logo={logo} />
        ))}
      </div>
    </section>
  );
}
