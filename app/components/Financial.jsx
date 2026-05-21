const ROWS = [
  {
    label: "Revenue (Rs. Cr)",
    values: ["350", "480", "750", "1,050", "1,300"],
  },
  {
    label: "Revenue Growth",
    values: ["100%", "81%", "56%", "40%", "24%"],
  },
  {
    label: "EBITDA (Rs. Cr)",
    values: ["7", "12", "41", "99", "162"],
  },
  {
    label: "EBITDA Margin",
    values: ["2%", "3%", "6%", "9%", "12%"],
  },
];

const COLUMNS = ["9MFY26A", "FY26E", "FY27E", "FY28E", "FY29E"];

const BULLET_POINTS = [
  <>
    Revenue has grown <strong>100% YoY in 9MFY26</strong>, reaching INR 350 Cr, and is projected
    to scale to <strong>INR 1,300 Cr by FY29E</strong> — a ~3.7x growth over 3 years.
  </>,
  <>
    <strong>EBITDA margins are on a strong upward trajectory</strong> — from 2% in 9MFY26 to a
    projected <strong>12% by FY29E</strong>, driven by operating leverage and improving channel mix.
  </>,
  <>
    Revenue growth is expected to moderate from <strong>81% in FY26E to 24% in FY29E</strong> as
    the business scales, reflecting a maturing but still high-growth profile.
  </>,
  <>
    EBITDA is projected to grow from <strong>INR 12 Cr in FY26E to INR 162 Cr in FY29E</strong>,
    representing a <strong>~13.5x increase</strong> over four years.
  </>,
];

export default function FinancialProjections() {
  return (
    <section className="card-wrapper">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[#28283B]">
          FINANCIAL
        </h2>
        <div className="overflow-x-auto rounded-lg border border-[#d0d4de]">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-[#555573]">
                <th className="border border-[#3f3f5c] px-4 py-5 text-left font-semibold text-white">
                  Particulars
                </th>
                {COLUMNS.map((col, i) => (
                  <th
                    key={col}
                    className="border border-[#3f3f5c] px-4 py-5 text-center font-semibold text-white"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(({ label, values }) => (
                <tr key={label} className="bg-white">
                  <td className="border border-[#d0d4de] px-4 py-5 text-[#28283B]">
                    {label}
                  </td>
                  {values.map((val, i) => (
                    <td
                      key={i}
                      className="border border-[#d0d4de] px-4 py-5 text-center text-[#28283B]"
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="flex flex-col gap-3">
          {BULLET_POINTS.map((point, idx) => (
            <li key={idx} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#28283B]" />
              <p className="text-sm leading-relaxed text-[#696C7A] sm:text-base">{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
