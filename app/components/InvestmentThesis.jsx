import { htmlListToHtmlArray } from "@/app/lib/htmlConversion";
import SectionDisclaimer from "./SectionDisclaimer";

export default function InvestmentThesis({ thesis, disclaimer }) {
  const items = Array.isArray(thesis) ? thesis : [];
  if (items.length === 0) return null;

  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[#28283B]">INVESTMENT THESIS</h2>
        <div className="flex flex-col gap-6">
          {items.map(({ heading, bullets }, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h3 className="text-base font-semibold text-[#28283B]">{heading}</h3>
              <ul className="flex flex-col gap-2">
                {htmlListToHtmlArray(bullets).map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-[#555573] sm:mt-[10px]" />
                    <span
                      className="text-sm leading-relaxed text-[#696C7A] sm:text-base"
                      dangerouslySetInnerHTML={{ __html: point }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <SectionDisclaimer text={disclaimer} />
      </div>
    </section>
  );
}
