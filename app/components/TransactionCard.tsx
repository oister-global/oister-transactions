export default function TransactionCard({
  name,
  description,
  status,
  type,
  lifetime,
  drawdown,
  hurdle,
  fundSize,
}: {
  name: string;
  description: string;
  status: string;
  type: string;
  lifetime: { label: string; value: string };
  drawdown: { label: string; value: string };
  hurdle: { label: string; value: string };
  fundSize: { label: string; value: string };
}) {
  return (
    <a href="/transactions" className="card-wrapper">
      <article className="flex flex-col gap-5">
        <header className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-[#2a2d36] sm:text-xl">
            {name}
          </h3>
          <p className="text-sm text-[#6b707c]">{description}</p>
        </header>

        <div className="flex gap-2">
          <span className="rounded-sm bg-[#138808] px-2 py-1 text-sm text-white">
            {status}
          </span>
          <span className="rounded-sm bg-[#EDEEF2] px-2 py-1 text-sm font-medium text-black">
            {type}
          </span>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[lifetime, fundSize, drawdown, hurdle].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-lg border border-[#e8eaef] bg-[#f6f7f9] p-3"
            >
              <dt className="mb-1 text-[10px] font-semibold uppercase text-[#8f949e]">
                {label}
              </dt>
              <dd className="text-sm font-medium leading-snug text-[#2a2d36]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </article>
    </a>
  );
}
