"use client";

import { trimHTML } from "@/app/lib/htmlConversion";
import { useGetTransactionsQuery } from "@/app/store/services/transactionsApi";
import { useMemo, useState } from "react";

// Deterministic sample so the related list is stable across re-renders (pure —
// no Math.random during render). Seeded by the current transaction id.
function sampleStable(items, count, seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return items
    .map((item, idx) => {
      hash = (hash * 1103515245 + 12345) & 0x7fffffff;
      return { item, rank: hash ^ idx };
    })
    .sort((a, b) => a.rank - b.rank)
    .slice(0, count)
    .map(({ item }) => item);
}

function AccordionItem({ _id, heading, subHeading, status, type, valuation, minInvestment, instrumentType, pricePerShare }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#e8eaef] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 py-4 text-left"
      >
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="font-semibold text-[#516dc9] text-sm sm:text-base hover:underline">
            {trimHTML(heading)}
          </span>
          {subHeading && !open && (
            <span className="text-xs text-[#696C7A] truncate">{trimHTML(subHeading)}</span>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#696C7A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`size-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="pb-4 flex flex-col gap-3">
          {subHeading && (
            <p className="text-sm leading-relaxed text-[#696C7A]">{trimHTML(subHeading)}</p>
          )}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              { label: "Status", value: trimHTML(status) },
              { label: "Type", value: trimHTML(type) },
              { label: "Valuation", value: trimHTML(valuation) },
              { label: "Min Investment", value: trimHTML(minInvestment) },
              { label: "Instrument Type", value: trimHTML(instrumentType) },
              { label: "Price Per Share", value: trimHTML(pricePerShare) },
            ].filter(({ value }) => value).map(({ label, value }) => (
              <div key={label} className="rounded-lg border border-[#e8eaef] bg-[#f6f7f9] p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8f949e] mb-1">{label}</p>
                <p className="text-sm font-medium text-[#28283B]">{value}</p>
              </div>
            ))}
          </div>
          <a
            href={`/${_id}`}
            className="self-start text-xs font-semibold text-[#516dc9] hover:underline"
          >
            View details →
          </a>
        </div>
      )}
    </div>
  );
}

export default function RelatedTransactions({ currentId }) {
  const { data, isLoading } = useGetTransactionsQuery();

  const related = useMemo(() => {
    const all = Array.isArray(data?.data) ? data.data : [];
    const others = all.filter((t) => t && t._id && t._id !== currentId);
    return sampleStable(others, 3, String(currentId ?? ""));
  }, [data, currentId]);

  if (isLoading || related.length === 0) return null;

  return (
    <section className="section-card">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-[#28283B]">
          Explore our other Transactions
        </h2>
        <hr className="border-[#e8eaef]" />
        <div>
          {related.map((transaction) => (
            <AccordionItem key={transaction._id} {...transaction} />
          ))}
        </div>
      </div>
    </section>
  );
}
