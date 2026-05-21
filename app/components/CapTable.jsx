import { Fragment } from "react";
import ComponentWrapper from "./ComponentWrapper";

const GROUPS = [
  {
    name: "Founder",
    holding: "18.33%",
    netWorth: "174Cr",
    cumulative: "0",
    realised: "44,887,785",
    unrealised: "8,19,625",
    multiple: "5.19x",
    members: [
      { name: "Shantanu Deshpande", holding: "12.50%", netWorth: "119Cr", cumulative: "0", realised: "30,000,000", unrealised: "5,00,000", multiple: "4.8x" },
      { name: "Deepak Gupta", holding: "5.83%", netWorth: "55Cr", cumulative: "0", realised: "14,887,785", unrealised: "3,19,625", multiple: "3.9x" },
    ],
  },
  {
    name: "Fund",
    holding: "31.81%",
    netWorth: "301Cr",
    cumulative: "17,81,510",
    realised: "44,98,711",
    unrealised: "44,88,711",
    multiple: "5.46x",
    members: [
      { name: "Sixth Sense Ventures", holding: "12.00%", netWorth: "114Cr", cumulative: "6,00,000", realised: "18,00,000", unrealised: "17,00,000", multiple: "6.2x" },
      { name: "Patni Financial Advisors", holding: "8.50%", netWorth: "80Cr", cumulative: "5,00,000", realised: "12,00,000", unrealised: "12,50,000", multiple: "5.8x" },
      { name: "Alteria Capital", holding: "6.31%", netWorth: "60Cr", cumulative: "4,00,000", realised: "8,98,711", unrealised: "8,88,711", multiple: "4.5x" },
      { name: "Malabar Investments", holding: "5.00%", netWorth: "47Cr", cumulative: "2,81,510", realised: "6,00,000", unrealised: "6,50,000", multiple: "4.1x" },
    ],
  },
  {
    name: "Enterprise",
    holding: "22.74%",
    netWorth: "215Cr",
    cumulative: "17,81,510",
    realised: "34,98,711",
    unrealised: "34,88,711",
    multiple: "4.46x",
    members: [],
  },
  {
    name: "Angel",
    holding: "18.00%",
    netWorth: "170Cr",
    cumulative: "14,81,510",
    realised: "24,98,711",
    unrealised: "24,88,711",
    multiple: "3.46x",
    members: [],
  },
  {
    name: "Other People",
    holding: "0.28%",
    netWorth: "2.63Cr",
    cumulative: "1,81,510",
    realised: "1,98,711",
    unrealised: "1,88,711",
    multiple: "2.65x",
    members: [],
  },
  {
    name: "ESOP Pool",
    holding: "8.84%",
    netWorth: "83.7Cr",
    cumulative: "0",
    realised: "0",
    unrealised: "0",
    multiple: "—",
    members: [],
  },
];

const COLS = [
  "Shareholders Name",
  "Post Round Holding %",
  "Net worth",
  "Cumulative Investment",
  "Realised Returns",
  "Unrealised Returns",
  "Return Multiple",
];

function Cell({ value, align = "center", className = "" }) {
  return (
    <td className={`border border-[#d0d4de] px-4 py-3 text-sm text-[#28283B] text-${align} ${className}`}>
      {value}
    </td>
  );
}

export default function CapTable() {
  return (
    <ComponentWrapper
      heading="Bombay Shaving's Latest cap tables and shareholding"
      subHeading="Founders own 18.33%, Funds (largest shareholder) own 31.81%, Enterprises own 22.74% and Angels own 18.00%. The net worth of Bombay Shaving's founders is INR 174Cr as of Nov 20, 2025."
    >
      <div className="overflow-x-auto rounded-lg border border-[#d0d4de]">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#555573] text-white">
              {COLS.map((col) => (
                <th
                  key={col}
                  className="border border-[#3f3f5c] px-4 py-3 text-left font-semibold whitespace-nowrap first:sticky first:left-0 first:bg-[#555573] first:z-[1]"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GROUPS.map(({ name, holding, netWorth, cumulative, realised, unrealised, multiple, members }) => (
              <Fragment key={name}>
                <tr className="bg-[#f5f5fa] font-semibold">
                  <td className="border border-[#d0d4de] px-4 py-3 text-sm text-[#28283B] sticky left-0 bg-[#f5f5fa] z-[1]">
                    {name}
                  </td>
                  <Cell value={holding} />
                  <Cell value={netWorth} />
                  <Cell value={cumulative} />
                  <Cell value={realised} />
                  <Cell value={unrealised} />
                  <Cell value={multiple} />
                </tr>
                {members.map((m) => (
                  <tr key={m.name} className="bg-white">
                    <td className="border border-[#d0d4de] px-4 py-3 pl-8 text-sm text-[#696C7A] sticky left-0 bg-white z-[1]">
                      {m.name}
                    </td>
                    <Cell value={m.holding} />
                    <Cell value={m.netWorth} />
                    <Cell value={m.cumulative} />
                    <Cell value={m.realised} />
                    <Cell value={m.unrealised} />
                    <Cell value={m.multiple} />
                  </tr>
                ))}
              </Fragment>
            ))}
            <tr className="bg-[#555573] text-white font-semibold">
              <td className="border border-[#3f3f5c] px-4 py-3 text-sm sticky left-0 bg-[#555573] z-[1]">Total</td>
              <td className="border border-[#3f3f5c] px-4 py-3 text-center text-sm">100.00%</td>
              <td className="border border-[#3f3f5c] px-4 py-3 text-center text-sm">947Cr</td>
              <td className="border border-[#3f3f5c] px-4 py-3 text-center text-sm">52,24,540</td>
              <td className="border border-[#3f3f5c] px-4 py-3 text-center text-sm">5,30,83,918</td>
              <td className="border border-[#3f3f5c] px-4 py-3 text-center text-sm">5,30,83,918</td>
              <td className="border border-[#3f3f5c] px-4 py-3 text-center text-sm">5.81x</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ComponentWrapper>
  );
}
