import { htmlListToHtmlArray } from "@/app/lib/htmlConversion";

// API revenue values are inconsistent ("68%" vs "16"); normalize to "N% revenue".
function formatRevenue(revenue) {
  if (revenue === null || revenue === undefined) return null;
  const text = String(revenue).replace(/%\s*$/, "").trim();
  return text ? `${text}% revenue` : null;
}

// `description` may arrive as an HTML <li> list, a plain/<p> HTML string, or an
// array. Normalize to a list of non-empty HTML strings so nothing is silently
// dropped when the API doesn't send a proper <ul>/<li> structure.
function descriptionToBullets(description) {
  const items = htmlListToHtmlArray(description).filter(
    (item) => typeof item === "string" && item.trim()
  );
  if (items.length > 0) return items;
  if (typeof description === "string" && description.trim()) {
    return [description.trim()];
  }
  return [];
}

// A segment is renderable only if it's an object with at least one piece of content.
function normalizeSegments(SEGMENTS) {
  if (!Array.isArray(SEGMENTS)) return [];
  return SEGMENTS.filter(
    (segment) =>
      segment &&
      typeof segment === "object" &&
      (segment.name ||
        formatRevenue(segment.revenue) ||
        segment.segmentFor ||
        descriptionToBullets(segment.description).length > 0)
  );
}

export default function BusinessSegments({ SEGMENTS, disclaimer }) {
  const segments = normalizeSegments(SEGMENTS);
  if (segments.length === 0) return null;

  const disclaimerText = typeof disclaimer === "string" ? disclaimer.trim() : "";

  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[#28283B]">BUSINESS SEGMENTS</h2>
        <div className="flex flex-col divide-y divide-[#e8eaef]">
          {segments.map(({ name, revenue, segmentFor, description }, segmentIdx) => {
            const revenueText = formatRevenue(revenue);
            const bullets = descriptionToBullets(description);
            const hasInfo = name || revenueText || segmentFor;

            return (
              <div
                key={segmentIdx}
                className="flex flex-col sm:flex-row gap-4 py-5 first:pt-0 last:pb-0"
              >
                {/* Left: company info — only when there's something to show */}
                {hasInfo && (
                  <div className="sm:w-44 shrink-0 flex flex-col gap-0.5">
                    {name && (
                      <p className="text-sm font-semibold text-[#28283B] leading-snug">{name}</p>
                    )}
                    {revenueText && (
                      <p className="text-xs text-[#696C7A]">{revenueText}</p>
                    )}
                    {segmentFor && (
                      <p className="text-xs font-medium text-[#555573]">{segmentFor}</p>
                    )}
                  </div>
                )}

                {/* Right: bullet points */}
                {bullets.length > 0 && (
                  <ul className="flex-1 flex flex-col gap-2">
                    {bullets.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#555573]" />
                        <span
                          className="text-sm leading-relaxed text-[#696C7A]"
                          dangerouslySetInnerHTML={{ __html: point }}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
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
