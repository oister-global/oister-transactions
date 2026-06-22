import { htmlListToHtmlArray } from "@/app/lib/htmlConversion";
import SectionDisclaimer from "./SectionDisclaimer";

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

  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[#28283B]">BUSINESS SEGMENTS</h2>
        <div className="flex flex-wrap gap-4">
          {segments.map(({ name, revenue, segmentFor }, segmentIdx) => {
            const revenueText = formatRevenue(revenue);
            const hasInfo = name || revenueText || segmentFor;
            if (!hasInfo) return null;

            return (
              <div
                key={segmentIdx}
                className="flex flex-1 basis-40 flex-col gap-0.5 rounded-lg border border-[#e8eaef] bg-[#f6f7f9] p-3"
              >
                {name && (
                  <p className="text-lg font-semibold text-[#28283B] leading-snug">{name}</p>
                )}
                {revenueText && (
                  <p className="text-base text-[#696C7A]">{revenueText}</p>
                )}
                {segmentFor && (
                  <p className="text-base font-medium text-[#555573]">{segmentFor}</p>
                )}
              </div>
            );
          })}
        </div>
        <SectionDisclaimer text={disclaimer} />
      </div>
    </section>
  );
}
