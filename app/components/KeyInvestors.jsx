"use client";

import { motion } from "framer-motion";

// CMS logo URLs come from arbitrary hosts, so use a plain <img> (not next/image,
// which would require every host in next.config remotePatterns). Field name varies.
function getLogo(investor) {
  if (!investor || typeof investor !== "object") return "";
  return investor.logo || investor.image || investor.logoUrl || investor.url || investor.icon || "";
}

function InvestorCard({ name, logo }) {
  return (
    <motion.div
      className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-[#d0d4de] bg-white shadow-[0_2px_8px_rgba(40,40,59,0.08)] sm:h-36 sm:w-36"
      whileHover={{ scale: 1.1, boxShadow: "0 12px 32px rgba(0,0,0,0.2)", zIndex: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={name || "Investor"}
          className="h-full w-full object-cover"
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
  const items = (Array.isArray(investors) ? investors : []).filter(
    (investor) => investor && typeof investor === "object" && (investor.name || getLogo(investor))
  );
  if (items.length === 0) return null;

  return (
    <section>
      <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-4">
        {items.map((investor, idx) => (
          <InvestorCard
            key={investor.name || idx}
            name={investor.name}
            logo={getLogo(investor)}
          />
        ))}
      </div>
    </section>
  );
}
