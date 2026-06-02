import { htmlListToHtmlArray } from "@/app/lib/htmlConversion";

export default function FinancialProjections({ columns, rows, bullets }) {
  const cols = Array.isArray(columns) ? columns : [];
  const tableRows = Array.isArray(rows) ? rows : [];
  if (tableRows.length === 0) return null;

  const bulletPoints = htmlListToHtmlArray(bullets);

  return (
    <section className="section-card">
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
                {cols.map(({ label }, i) => (
                  <th
                    key={i}
                    className="border border-[#3f3f5c] px-4 py-5 text-center font-semibold text-white"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map(({ particular, values = [] }, rowIdx) => (
                <tr key={rowIdx} className="bg-white">
                  <td className="border border-[#d0d4de] px-4 py-5 text-[#28283B]">
                    {particular}
                  </td>
                  {values.map(({ value }, i) => (
                    <td
                      key={i}
                      className="border border-[#d0d4de] px-4 py-5 text-center text-[#28283B]"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {bulletPoints.length > 0 && (
          <ul className="flex flex-col gap-3">
            {bulletPoints.map((point, idx) => (
              <li key={idx} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#28283B]" />
                <p
                  className="text-sm leading-relaxed text-[#696C7A] sm:text-base"
                  dangerouslySetInnerHTML={{ __html: point }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
