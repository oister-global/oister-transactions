import Link from "next/link";

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
    <Link
      href={`/card/${name}`}
      className="block rounded-lg border border-[rgb(237,238,242)] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] transition hover:-translate-y-px hover:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
      aria-label={`Open ${name}`}
    >
      <article className="p-6">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-[#28283B]">{name}</h3>
            <p className="text-sm font-normal text-[#696C7A]">{description}</p>
          </header>

          <div className="flex gap-2" aria-label="Status and type">
            <span className="rounded-sm bg-[#138808] px-2 py-1 text-sm text-white">
              {status}
            </span>
            <span className="rounded-sm bg-[#EDEEF2] px-2 py-1 text-sm font-medium text-black">
              {type}
            </span>
          </div>

          <ul className="flex gap-2">
            {[lifetime, fundSize, drawdown, hurdle].map(({ label, value }) => (
              <li className="w-1/4" key={label}>
                <div className="text-xs leading-[1.55] text-[#868e96]">
                  {label}
                </div>
                <div className="text-sm leading-[1.55] text-black">{value}</div>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Link>
  );
}
