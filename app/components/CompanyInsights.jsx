const INSIGHTS = [
  {
    heading: "Company Overview",
    points: [
      <>
        BSC has emerged as a <strong>category disruptor</strong> across trimmers,
        razors, hair styling & beyond challenging legacy brands like Gillette &
        Philips, growing <strong>12x+ in 6 years</strong> and on track to deliver
        INR 480 Cr (83% YoY growth) in FY26E.
      </>,
      <>
        India&apos;s strongest challenger brand in trimmers (49% of revenue),
        holding <strong>~10% market share</strong> in men&apos;s (30% within quick
        commerce) and an impressive <strong>~30% in women&apos;s category</strong>.
      </>,
      <>
        Operates an <strong>omni-channel brand</strong> with strong digital roots
        - 49% revenue from online channels & 24% from D2C, powered by content-led
        marketing and influencer partnerships.
      </>,
    ],
  },
  {
    heading: "Oister's Investment Thesis",
    points: [
      <>
        <strong>Disrupting a $25 Bn Market:</strong> Actively expanding across
        adjacent grooming and personal care categories, positioning it to capture
        the larger BPC market.
      </>,
      <>
        <strong>Full-Stack Grooming Platform:</strong> With 30% quick commerce
        market share in Trimmers, BSC has expanded into razors, skincare,
        fragrances, and shave consumables - evolving into a full-stack grooming
        platform for Gen Z and urban consumers.
      </>,
      <>
        <strong>Brand Building Playbook:</strong> Bombae (women focused brand) has
        reached INR 100+ Cr ARR within months of launch - proof of a repeatable,
        capital-efficient brand-building machine ready to be deployed again.
      </>,
    ],
  },
  {
    heading: "Growth and Profitability Levers",
    points: [
      <>
        <strong>Expanding Product Portfolio:</strong> Skincare, haircare,
        hairstyling & more new categories.
      </>,
      <>
        <strong>Localising Supply Chain:</strong> Structural shift of assembly &
        production to India improving gross margin profile.
      </>,
      <>
        <strong>Increasing Brand Loyalty:</strong> Driving cross selling and repeat
        purchases across categories.
      </>,
    ],
  },
];

export default function CompanyInsights() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {INSIGHTS.map(({ heading, points }) => (
        <article
          key={heading}
          className="flex flex-col rounded-xl border border-[#eef1fb] bg-[#f8f9ff] p-4 shadow-[0_1px_2px_rgba(81,109,201,0.04)] sm:p-5"
        >
          <h3 className="mb-4 text-center text-base font-semibold text-[#516dc9] sm:text-lg">
            {heading}
          </h3>
          <ul className="flex flex-col gap-3 px-2">
            {points.map((point, idx) => (
              <li
                key={idx}
                className="list-disc pl-4 text-sm leading-relaxed text-[#28283B] marker:text-[#28283B] sm:text-base"
              >
                {point}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
