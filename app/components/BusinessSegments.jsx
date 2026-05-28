const SEGMENTS = [
  {
    name: "Bombay Shaving Company",
    revenue: "68% revenue",
    brand: "Mens' Brand",
    points: [
      <>Largest challenger brand in <strong>men's grooming</strong> with the strongest brand equity, especially among Gen Z consumers (highest share of voice rose to 52% from 0% over 3–4 years)</>,
      <>The revenue from D2C is as high as <strong>24%</strong> for the company of which a considerable portion is from organic growth, reflecting strong brand equity.</>,
      <><strong>188%</strong> YoY growth in trimmers (9MFY26)</>,
      <><strong>30%</strong> Market Share in Qcomm in trimmers</>,
      <>Fragrances growing at <strong>44% YoY</strong> (9MFY26)</>,
    ],
    highlight: false,
  },
  {
    name: "Bombae",
    revenue: "16% revenue",
    brand: "Womens' Brand",
    points: [
      <>Bombae started scaling ~12 months ago and is on INR 100 Cr ARR with <strong>55% gross margin</strong> & is already tracking at <strong>1% adjusted EBITDA Margin</strong> in 9MFY26. This strongly reflects the company's ability to build profitable brands & has been achieved by the cross-team collaboration across Bombae × BSC teams & the combined strength of franchise playing out.</>,
      <>Leadership in <strong>trimmers</strong> with 30% market share</>,
    ],
    highlight: false,
  },
  {
    name: "100 Days",
    revenue: "16% revenue",
    brand: null,
    points: [
      <>In 2022, the company started <strong>100days.com</strong>, a service business that helps large organizations win online — a world of D2C/e-com/q-com that is fast being disrupted by younger brands. BSC provides these large incumbent brands unlock and scale digital commerce potential.</>,
      <>In 9MFY26, the company witnessed <strong>100%+ revenue growth</strong> and is operating at <strong>13.4% adjusted EBITDA Margin</strong>.</>,
    ],
    highlight: false,
  },
  {
    name: "Distribution Channel",
    revenue: null,
    brand: null,
    points: [
      <>BSC's product business operates as an omnichannel consumer brand with strong digital roots — <strong>49% revenue coming from D2C channels & 24% from D2C Channel</strong>, supported by content-led digital marketing, influencer partnerships.</>,
      <>They also have presence across <strong>GT, MT & B2B Channels</strong> which contribute 3%, 6%, & 3% respectively to the total product revenue.</>,
    ],
    highlight: true,
  },
];

export default function BusinessSegments() {
  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[#28283B]">BUSINESS SEGMENTS</h2>
        <div className="flex flex-col divide-y divide-[#e8eaef]">
          {SEGMENTS.map(({ name, revenue, brand, points, highlight }) => (
            <div
              key={name}
              className={`flex flex-col sm:flex-row gap-4 py-5 first:pt-0 last:pb-0 ${highlight ? "rounded-lg bg-[#eef4fb] px-4 -mx-4" : ""}`}
            >
              {/* Left: company info */}
              <div className="sm:w-44 shrink-0 flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-[#28283B] leading-snug">{name}</p>
                {revenue && (
                  <p className="text-xs text-[#696C7A]">{revenue}</p>
                )}
                {brand && (
                  <p className="text-xs font-medium text-[#555573]">{brand}</p>
                )}
              </div>

              {/* Right: bullet points */}
              <ul className="flex-1 flex flex-col gap-2">
                {points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#555573]" />
                    <span className="text-sm leading-relaxed text-[#696C7A]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-xs leading-relaxed text-[#9ca3af] border-t border-[#e8eaef] pt-4 text-justify">
          <em>Disclaimer: Informational only, not financial advice. May contain forward-looking statements — no assurances. Based on company material and other 3rd party data; please do your own research.</em>
        </p>
      </div>
    </section>
  );
}
