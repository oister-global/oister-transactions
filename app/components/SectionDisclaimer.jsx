import { trimHTML } from "@/app/lib/htmlConversion";

// Shared italic footnote rendered at the bottom of a section card. Renders
// nothing when there's no disclaimer text, so sections without one are unaffected.
export default function SectionDisclaimer({ text }) {
  const value = trimHTML(text);
  if (!value) return null;

  return (
    <p className="text-xs leading-relaxed text-[#9ca3af] border-t border-[#e8eaef] pt-4 text-justify">
      <em>{value}</em>
    </p>
  );
}
