export default function KeyHighlights({ listData }) {
    return (
        <section className="card-wrapper">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {listData.map(({ title, subtitle }) => (
                    <div
                        key={title}
                        className="flex min-h-[88px] flex-col justify-center rounded-lg border border-[#d0d4de] bg-white p-3 shadow-[0_2px_8px_rgba(40,40,59,0.08)] sm:p-4"
                    >
                        <p className="text-sm font-semibold leading-snug text-[#28283B]">
                            {title}
                        </p>
                        <p className="mt-1 text-xs font-normal leading-snug text-[#696C7A] sm:text-sm">
                            {subtitle}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}