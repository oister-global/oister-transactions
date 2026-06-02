export default function ValuationSection({ content, disclaimer }) {
  if (!content) return null;

  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[#28283B]">VALUATION</h2>

        <div
          className="flex flex-col gap-2 text-sm leading-relaxed text-[#696C7A] sm:text-base
            [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#28283B] [&_h3]:mt-2
            [&_strong]:text-[#28283B]
            [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-1
            [&_li]:relative [&_li]:pl-5
            [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.6em]
            [&_li]:before:size-1.5 [&_li]:before:rounded-full [&_li]:before:bg-[#555573]"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {disclaimer && (
          <p className="text-xs leading-relaxed text-[#9ca3af] border-t border-[#e8eaef] pt-4 text-justify">
            <em>{disclaimer}</em>
          </p>
        )}
      </div>
    </section>
  );
}
