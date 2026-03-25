const Card = () => {
  const tile = "rounded-md border border-slate-100 bg-slate-100 p-4"
  const label = "text-[11px] font-semibold uppercase tracking-wider text-slate-500"
  const value = "mt-1.5 text-sm font-semibold text-slate-900"

  return (
    <div className=" w-full h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 sm:w-auto sm:flex-[0_0_calc(50%-0.5rem)] sm:basis-[calc(50%-0.5rem)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 "
      />

      <div className="relative flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold leading-5 text-slate-900">
            Oister Global Scheme III (Ace Fund - II)
          </p>
          <p className="text-sm leading-5 text-slate-600">
            Focused on growth to late stage equity investments in high growth
            companies who are market leaders or emerging market leaders.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center ring-0 bg-[#1f6b38] rounded-md text-white border border-slate-200  px-3 py-1 text-xs  font-semibold ">
            ACTIVE
          </div>
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-800">
            SECONDARIES
          </div>
        </div>

        <div className=" flex flex-col gap-3 sm:flex-row sm:gap-3 sm:justify-between">
          <div className={`${tile} sm:flex-1 sm:min-w-0`}>
            <div className={label}>
              lifetime
            </div>
            <div className={value}>
              5 (+1+1) yrs from First Close
            </div>
          </div>

          <div className={`${tile} sm:flex-1 sm:min-w-0`}>
            <div className={label}>
              fund size
            </div>
            <div className={value}>
              INR 200 Cr (+ INR 200 Cr green shoe option)
            </div>
          </div>

          <div className={`${tile} sm:flex-1 sm:min-w-0`}>
            <div className={label}>
              drawdown
            </div>
            <div className={value}>100%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
  