const INVESTORS = [
  { name: "Image Will Come Here 1" },
  { name: "Image Will Come Here 2" },
  { name: "Image Will Come Here 3" },
  { name: "Image Will Come Here 4" },
  { name: "Image Will Come Here 5" },
  { name: "Image Will Come Here 6" },
];

export default function KeyInvestors() {
  return (
    <section>
      <h2 className="mb-4 text-base font-semibold text-[#516dc9] sm:text-lg">
        Key Investors
      </h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {INVESTORS.map(({ name }) => (
          <div
            key={name}
            className="flex aspect-square items-center justify-center rounded-xl border border-[#d0d4de] bg-white p-3 shadow-[0_2px_8px_rgba(40,40,59,0.08)] text-center"
          >
            <p className="text-xs font-semibold leading-snug text-[#28283B] sm:text-sm">
              {name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
