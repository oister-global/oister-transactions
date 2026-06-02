import { htmlListToHtmlArray } from "@/app/lib/htmlConversion";

// API revenue values are inconsistent ("68%" vs "16"); normalize to "N% revenue".
function formatRevenue(revenue) {
  if (!revenue) return null;
  return `${String(revenue).replace(/%\s*$/, "").trim()}% revenue`;
}

export default function BusinessSegments({ SEGMENTS, disclaimer }) {
  const segments = Array.isArray(SEGMENTS) ? SEGMENTS : [];
  if (segments.length === 0) return null;

  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[#28283B]">BUSINESS SEGMENTS</h2>
        <div className="flex flex-col divide-y divide-[#e8eaef]">
          {segments.map(({ name, revenue, segmentFor, description }, segmentIdx) => (
            <div
              key={segmentIdx}
              className="flex flex-col sm:flex-row gap-4 py-5 first:pt-0 last:pb-0"
            >
              {/* Left: company info */}
              <div className="sm:w-44 shrink-0 flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-[#28283B] leading-snug">{name}</p>
                {formatRevenue(revenue) && (
                  <p className="text-xs text-[#696C7A]">{formatRevenue(revenue)}</p>
                )}
                {segmentFor && (
                  <p className="text-xs font-medium text-[#555573]">{segmentFor}</p>
                )}
              </div>

              {/* Right: bullet points */}
              <ul className="flex-1 flex flex-col gap-2">
                {htmlListToHtmlArray(description).map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#555573]" />
                    <span
                      className="text-sm leading-relaxed text-[#696C7A]"
                      dangerouslySetInnerHTML={{ __html: point }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {disclaimer && (
          <p className="text-xs leading-relaxed text-[#9ca3af] border-t border-[#e8eaef] pt-4 text-justify">
            <em>{disclaimer}</em>
          </p>
        )}
      </div>
    </section>
  );
}
