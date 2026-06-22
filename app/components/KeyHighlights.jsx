import { StarIcon } from "@/public/svg";
import SectionDisclaimer from "./SectionDisclaimer";

export default function KeyHighlights({ listData = [], bulletListData = [], disclaimer }) {
    const cards = (Array.isArray(listData) ? listData : []).filter(
        (item) => item && (item.title || item.value)
    );
    const bullets = (Array.isArray(bulletListData) ? bulletListData : []).filter(
        (item) => typeof item === "string" && item.trim()
    );

    if (cards.length === 0 && bullets.length === 0) return null;

    return (
        <section className="section-card">
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-semibold text-[#28283B]">KEY HIGHLIGHTS</h2>
                {cards.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {cards.map(({ title, value }, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col gap-2 rounded-lg border border-[#d0d4de] bg-white p-5 shadow-[0_2px_8px_rgba(40,40,59,0.06)] overflow-hidden relative before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[#555573]"
                            >
                                {title && (
                                    <p className="text-sm font-bold leading-snug text-[#28283B] sm:text-base">
                                        {title}
                                    </p>
                                )}
                                {value && (
                                    <p className="text-sm font-normal leading-relaxed text-[#696C7A]">
                                        {value}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {bullets.length > 0 && (
                    <ul className="flex flex-col gap-3">
                        {bullets.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <span className="text-sm shrink-0"><StarIcon /></span>
                                <span
                                    className="text-base font-normal leading-[1.55] text-[#696C7A]"
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            </li>
                        ))}
                    </ul>
                )}
                <SectionDisclaimer text={disclaimer} />
            </div>
        </section>
    );
}
