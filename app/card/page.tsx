import TransactionCard from "../components/TransactionCard";

const cardData = [
  {
    name: "Oister Global Scheme III (Ace Fund - II)",
    description:
      "Focused on growth to late stage equity investments in high growth companies who are market leaders or emerging market leaders.",
    status: "Active",
    type: "Secondaries",
    lifetime: { label: "Lifetime", value: "5 (+1+1) yrs from First Close" },
    drawdown: { label: "Drawdown%", value: "100%" },
    hurdle: { label: "Hurdle%", value: "12.50%" },
    fundSize: {
      label: "Fund Size",
      value: "INR 200 Cr (+ INR 200 Cr green shoe option)",
    },
  },
  {
    name: "Oister Global Scheme III (Ace Fund - II)",
    description:
      "Focused on growth to late stage equity investments in high growth companies who are market leaders or emerging market leaders.",
    status: "Active",
    type: "Secondaries",
    lifetime: { label: "Lifetime", value: "5 (+1+1) yrs from First Close" },
    drawdown: { label: "Drawdown%", value: "100%" },
    hurdle: { label: "Hurdle%", value: "12.50%" },
    fundSize: {
      label: "Fund Size",
      value: "INR 200 Cr (+ INR 200 Cr green shoe option)",
    },
  },
  {
    name: "Oister Global Scheme III (Ace Fund - II)",
    description:
      "Focused on growth to late stage equity investments in high growth companies who are market leaders or emerging market leaders.",
    status: "Active",
    type: "Secondaries",
    lifetime: { label: "Lifetime", value: "5 (+1+1) yrs from First Close" },
    drawdown: { label: "Drawdown%", value: "100%" },
    hurdle: { label: "Hurdle%", value: "12.50%" },
    fundSize: {
      label: "Fund Size",
      value: "INR 200 Cr (+ INR 200 Cr green shoe option)",
    },
  },
  {
    name: "Oister Global Scheme III (Ace Fund - II)",
    description:
      "Focused on growth to late stage equity investments in high growth companies who are market leaders or emerging market leaders.",
    status: "Active",
    type: "Secondaries",
    lifetime: { label: "Lifetime", value: "5 (+1+1) yrs from First Close" },
    drawdown: { label: "Drawdown%", value: "100%" },
    hurdle: { label: "Hurdle%", value: "12.50%" },
    fundSize: {
      label: "Fund Size",
      value: "INR 200 Cr (+ INR 200 Cr green shoe option)",
    },
  },
  {
    name: "Oister Global Scheme III (Ace Fund - II)",
    description:
      "Focused on growth to late stage equity investments in high growth companies who are market leaders or emerging market leaders.",
    status: "Active",
    type: "Secondaries",
    lifetime: { label: "Lifetime", value: "5 (+1+1) yrs from First Close" },
    drawdown: { label: "Drawdown%", value: "100%" },
    hurdle: { label: "Hurdle%", value: "12.50%" },
    fundSize: {
      label: "Fund Size",
      value: "INR 200 Cr (+ INR 200 Cr green shoe option)",
    },
  },
  {
    name: "Oister Global Scheme III (Ace Fund - II)",
    description:
      "Focused on growth to late stage equity investments in high growth companies who are market leaders or emerging market leaders.",
    status: "Active",
    type: "Secondaries",
    lifetime: { label: "Lifetime", value: "5 (+1+1) yrs from First Close" },
    drawdown: { label: "Drawdown%", value: "100%" },
    hurdle: { label: "Hurdle%", value: "12.50%" },
    fundSize: {
      label: "Fund Size",
      value: "INR 200 Cr (+ INR 200 Cr green shoe option)",
    },
  },
  {
    name: "Oister Global Scheme III (Ace Fund - II)",
    description:
      "Focused on growth to late stage equity investments in high growth companies who are market leaders or emerging market leaders.",
    status: "Active",
    type: "Secondaries",
    lifetime: { label: "Lifetime", value: "5 (+1+1) yrs from First Close" },
    drawdown: { label: "Drawdown%", value: "100%" },
    hurdle: { label: "Hurdle%", value: "12.50%" },
    fundSize: {
      label: "Fund Size",
      value: "INR 200 Cr (+ INR 200 Cr green shoe option)",
    },
  },
  {
    name: "Oister Global Scheme III (Ace Fund - II)",
    description:
      "Focused on growth to late stage equity investments in high growth companies who are market leaders or emerging market leaders.",
    status: "Active",
    type: "Secondaries",
    lifetime: { label: "Lifetime", value: "5 (+1+1) yrs from First Close" },
    drawdown: { label: "Drawdown%", value: "100%" },
    hurdle: { label: "Hurdle%", value: "12.50%" },
    fundSize: {
      label: "Fund Size",
      value: "INR 200 Cr (+ INR 200 Cr green shoe option)",
    },
  },
  {
    name: "Oister Global Scheme III (Ace Fund - II)",
    description:
      "Focused on growth to late stage equity investments in high growth companies who are market leaders or emerging market leaders.",
    status: "Active",
    type: "Secondaries",
    lifetime: { label: "Lifetime", value: "5 (+1+1) yrs from First Close" },
    drawdown: { label: "Drawdown%", value: "100%" },
    hurdle: { label: "Hurdle%", value: "12.50%" },
    fundSize: {
      label: "Fund Size",
      value: "INR 200 Cr (+ INR 200 Cr green shoe option)",
    },
  },
];

export default function Card() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {cardData?.map((props, index) => {
        return <TransactionCard key={index} {...props} />;
      })}
    </div>
  );
}
