const POINTS = [
  <>
    Since inception, <strong>the company has raised ~INR 355 cr</strong> including{" "}
    <strong>INR 94 cr in the recently concluded round</strong>. The round saw participation
    from Sixth Sense, Alteria Capital, Patni Family, GII & IYA Ventures
  </>,
  <>
    Key institutional investors in the company include{" "}
    <strong>Sixth Sense Ventures (~20%)</strong>, <strong>GII (~8%)</strong>,{" "}
    <strong>Singularity Ventures (~1%)</strong> &{" "}
    <strong>Malabar India Fund (~8%)</strong>.
  </>,
  <>
    The company is also supported by strategic investors such as{" "}
    <strong>Yolgate (~11%)</strong> & <strong>Ratan Tata/Blackriver (~8%)</strong>
  </>,
  <>
    The promoter and management hold ~27% stake in the company. This gives us confidence
    that the founders and management have high alignment of interest in company&apos;s growth.
  </>,
  <>
    The last round was signed in <strong>Apr-25</strong> at{" "}
    <strong>INR 945 Cr</strong> post-money valuation at a revenue multiple of{" "}
    <strong>3.6x basis FY25 financials</strong>
  </>,
  <>
    The revenue from 9MFY25 to 9MFY26 has grown ~<strong>100%</strong> &{" "}
    <strong>EBITDA Margin has improved from -15% to 2%.</strong>
  </>,
];

export default function ShareholdingSection() {
  return (
    <section className="card-wrapper">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-[#28283B]">SHAREHOLDING & LAST ROUND</h2>
        <ul className="flex flex-col gap-3">
          {POINTS.map((point, idx) => (
            <li key={idx} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#28283B]" />
              <p className="text-sm leading-relaxed text-[#696C7A] sm:text-base">{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
