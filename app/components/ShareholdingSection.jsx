import { htmlListToHtmlArray } from "@/app/lib/htmlConversion";

export default function ShareholdingSection({ content }) {
  const points = htmlListToHtmlArray(content);
  if (points.length === 0) return null;

  return (
    <section className="section-card">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-[#28283B]">SHAREHOLDING & LAST ROUND</h2>
        <ul className="flex flex-col gap-3">
          {points.map((point, idx) => (
            <li key={idx} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#28283B]" />
              <p
                className="text-sm leading-relaxed text-[#696C7A] sm:text-base"
                dangerouslySetInnerHTML={{ __html: point }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
