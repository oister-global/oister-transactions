import { trimHTML } from "@/app/lib/htmlConversion";
import Image from "next/image";
import backgroundImage from "@/app/lib/backgroundImage";

export default function TransactionCard({
  id,
  index,
  heading,
  subHeading,
  status,
  type,
  valuation,
  minInvestment,
  instrumentType,
  pricePerShare,
  isInterested,
}) {
  const data = [
    { label: "Valuation", value: trimHTML(valuation) },
    { label: "Min Investment", value: trimHTML(minInvestment) },
    { label: "Instrument Type", value: trimHTML(instrumentType) },
    { label: "Price Per Share", value: trimHTML(pricePerShare) },
  ];

  return (
    <a href={`/${id}`} className="card-wrapper">
      <article className="flex flex-col gap-5">
        <div className="relative w-full h-40 rounded-tl-lg rounded-tr-lg overflow-hidden">
          <Image src={backgroundImage(index)} alt={trimHTML(heading)} fill />
        </div>
        <header className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-[#2a2d36] sm:text-xl">
            {trimHTML(heading)}
          </h3>
          <p className="text-sm text-[#6b707c]">{trimHTML(subHeading)}</p>
        </header>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <span className="rounded-sm bg-[#138808] px-2 py-1 text-sm text-white">
              {trimHTML(status)}
            </span>
            <span className="rounded-sm bg-[#EDEEF2] px-2 py-1 text-sm font-medium text-black">
              {trimHTML(type)}
            </span>
          </div>
          {isInterested && (
            <span className="rounded-sm bg-[#138808] px-2 py-1 text-sm text-white">
              Shown Interest
            </span>
          )}
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {data?.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-lg border border-[#e8eaef] bg-[#f6f7f9] p-3"
            >
              <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#8f949e]">
                {label}
              </dt>
              <dd className="text-sm font-medium leading-snug text-[#2a2d36]">
                {trimHTML(value)}
              </dd>
            </div>
          ))}
        </dl>
      </article>
    </a>
  );
}
