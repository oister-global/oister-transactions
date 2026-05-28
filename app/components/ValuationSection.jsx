const COMPARABLE_MULTIPLES = [
  { company: "Gillette", detail: "9.9x Revenue (FY25) & 8.6x Revenue (3 year median)" },
  { company: "Honasa", detail: "4.4x Revenue (FY25) & 6.6x Revenue (3 year median)" },
  { company: "Minimalist", detail: "7x revenue" },
];

const EXPANSION_POINTS = [
  { label: "Revenue Expansion", text: "Growing at 40% CAGR over next 3 years" },
  { label: "Margin Expansion", text: "EBITDA growing from 3% to 12% by FY29E" },
  {
    label: "Multiple Expansion",
    text: "Discounted entry revenue multiple leaving scope for multiple expansion (3.6–4x entry multiple vs 4–5x industry average)",
  },
];

const IPO_POINTS = [
  <>IPO expectation: <strong>3–4 years</strong></>,
  <>Expected numbers in FY29 (company projections): <strong>INR 1,300 cr</strong> revenue and <strong>INR 162 cr EBITDA</strong></>,
  <>At <strong>30x–35x EBITDA</strong> and <strong>3.8x–4.3x</strong> Revenue at the time of IPO, this can be a ~INR 5,000–5,600 cr valuation in that time period</>,
];

export default function ValuationSection() {
  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-[#28283B]">VALUATION</h2>
          <p className="text-sm text-[#696C7A] sm:text-base">
            Current valuation at <strong className="text-[#28283B]">3.6x–4.0x current FY revenue</strong>
          </p>
        </div>

        {/* Comparable multiples */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-[#28283B]">Similar companies multiples</h3>
          <ul className="flex flex-col gap-2">
            {COMPARABLE_MULTIPLES.map(({ company, detail }) => (
              <li key={company} className="flex items-start gap-2">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#555573]" />
                <span className="text-sm leading-relaxed text-[#696C7A] sm:text-base">
                  <strong className="text-[#28283B]">{company}:</strong> {detail}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Valuation expansion */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-[#28283B]">Valuation Expansion Over Next 3 Years</h3>
          <ul className="flex flex-col gap-2">
            {EXPANSION_POINTS.map(({ label, text }) => (
              <li key={label} className="flex items-start gap-2">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#555573]" />
                <span className="text-sm leading-relaxed text-[#696C7A] sm:text-base">
                  <strong className="text-[#28283B]">{label}:</strong> {text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* IPO expectations */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-[#28283B]">IPO Expectations</h3>
          <ul className="flex flex-col gap-2">
            {IPO_POINTS.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#555573]" />
                <span className="text-sm leading-relaxed text-[#696C7A] sm:text-base">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs leading-relaxed text-[#9ca3af] border-t border-[#e8eaef] pt-4 text-justify">
          <em>Disclaimer: Informational only, not financial advice. May contain forward-looking statements — no assurances. Based on company material and other 3rd party data; please do your own research.</em>
        </p>
      </div>
    </section>
  );
}
