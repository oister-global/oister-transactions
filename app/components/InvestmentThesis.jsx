const THESIS = [
  {
    title: "Large Market Opportunity",
    points: [
      "BSC has actively focused on expanding across product categories over last few years. They have a strong presence across Razors, trimmers and Men's grooming. Looking forward they also intend to expand their portfolio of BSC & Bombae into skincare, fragrances, haircare, hairstyling & more.",
      "This expansion into various product categories with its focus on male & female grooming is expected to be larger than $25.8Bn by 2029 across their product categories.",
      "The online sub-market growing is expected to grow at ~25% CAGR over the next 3 years.",
    ],
  },
  {
    title: "Strong Revenue Growth & Margin Expansion",
    points: [
      "For HYF26, they generated INR 221 Cr of revenue, 109% YoY growth and is projected to deliver INR 480 Cr of revenue in FY26 (91% YoY growth).",
      "FY26 growth is largely driven by trimmers as a product category. Trimmers in D2C are projected to grow at ~95% CAGR (Next Year).",
      "They have efficiently reduced their marketing & brand spends in FY25 which is resulting in better margins.",
      "Overall, the company closed at a gross margin of 52% & EBITDA margin of -9% in FY25. In FY26, the company has achieved profitable Q2 and generated 2-3% EBITDA Margin.",
    ],
  },
  {
    title: "Captured a Strong Brand Equity Within Its 10 Years",
    points: [
      "BSC has found its foothold in the Gen Z customer base early, using trimmers as the gateway to their incoming households and is now repeating this playbook in other categories on the back of strength in modern commerce and digital tech engagement, particularly on platforms where Gen Z prefers to shop.",
      "They stand as the biggest new-age player in the trimmers category, holding a 30% share within Quick Commerce.",
      "BSC has a 52% share of voice in digital grooming, making it the most recalled brand among its category peers.",
    ],
  },
];

export default function InvestmentThesis() {
  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[#28283B]">INVESTMENT THESIS</h2>
        <div className="flex flex-col gap-6">
          {THESIS.map(({ title, points }) => (
            <div key={title} className="flex flex-col gap-3">
              <h3 className="text-base font-semibold text-[#28283B]">{title}</h3>
              <ul className="flex flex-col gap-2">
                {points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-[6px] size-1.5 shrink-0 rounded-full bg-[#555573]" />
                    <span className="text-sm leading-relaxed text-[#696C7A] sm:text-base">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
