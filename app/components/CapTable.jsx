import { trimHTML } from "@/app/lib/htmlConversion";

// Column header → row key. Order drives the table layout.
const COLUMNS = [
  { label: "Post Round Holding %", key: "postRoundHolding" },
  { label: "Net worth", key: "netWorth" },
  { label: "Cumulative Investment", key: "cumulativeInvestment" },
  { label: "Realised Returns", key: "realisedReturns" },
  { label: "Unrealised Returns", key: "unrealisedReturns" },
  { label: "Return Multiple", key: "returnMultiple" },
];

const cell = (value) => {
  const text = trimHTML(value);
  return text ? text : "—";
};

export default function CapTable({ heading, description, disclaimer, rows }) {
  const tableRows = Array.isArray(rows) ? rows : [];
  if (tableRows.length === 0) return null;

  const headingText = trimHTML(heading);
  const descriptionText = trimHTML(description);
  const disclaimerText = trimHTML(disclaimer);

  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        {(headingText || descriptionText) && (
          <div className="flex flex-col gap-1">
            {headingText && (
              <h2 className="text-xl font-semibold text-[#28283B]">
                {headingText.toUpperCase()}
              </h2>
            )}
            {descriptionText && (
              <p className="sm:text-base xxs:text-sm font-normal text-[#696C7A] text-justify">
                {descriptionText}
              </p>
            )}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-[#d0d4de]">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#555573] text-white">
                <th className="border border-[#3f3f5c] px-4 py-3 text-left font-semibold whitespace-nowrap sticky left-0 bg-[#555573] z-[1]">
                  Shareholders Name
                </th>
                {COLUMNS.map(({ label }) => (
                  <th
                    key={label}
                    className="border border-[#3f3f5c] px-4 py-3 text-left font-semibold whitespace-nowrap"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, rowIdx) => {
                const isTotal = trimHTML(row?.name)?.trim().toLowerCase() === "total";
                const isGroup = Boolean(row?.isGroup);

                if (isTotal) {
                  return (
                    <tr key={rowIdx} className="bg-[#555573] text-white font-semibold">
                      <td className="border border-[#3f3f5c] px-4 py-3 text-sm sticky left-0 bg-[#555573] z-[1]">
                        {cell(row?.name)}
                      </td>
                      {COLUMNS.map(({ key }) => (
                        <td
                          key={key}
                          className="border border-[#3f3f5c] px-4 py-3 text-center text-sm"
                        >
                          {cell(row?.[key])}
                        </td>
                      ))}
                    </tr>
                  );
                }

                return (
                  <tr
                    key={rowIdx}
                    className={isGroup ? "bg-[#f5f5fa] font-semibold" : "bg-white"}
                  >
                    <td
                      className={`border border-[#d0d4de] px-4 py-3 text-sm sticky left-0 z-[1] ${
                        isGroup
                          ? "bg-[#f5f5fa] text-[#28283B]"
                          : "bg-white pl-8 text-[#696C7A]"
                      }`}
                    >
                      {cell(row?.name)}
                    </td>
                    {COLUMNS.map(({ key }) => (
                      <td
                        key={key}
                        className="border border-[#d0d4de] px-4 py-3 text-center text-sm text-[#28283B]"
                      >
                        {cell(row?.[key])}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {disclaimerText && (
          <p className="text-xs leading-relaxed text-[#9ca3af] border-t border-[#e8eaef] pt-4 text-justify">
            <em>{disclaimerText}</em>
          </p>
        )}
      </div>
    </section>
  );
}
