"use client";

import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";

export default function ButtonsGroup({
  text,
  text1,
  onClick,
  onClick1,
}: {
  text: string;
  text1: string;
  onClick: () => void;
  onClick1: () => void;
}) {
  return (
    <div className="flex flex-nowrap gap-4 p-1 bg-white rounded-lg w-fit border border-[#e8eaef]">
      <PrimaryButton text={text} onClick={onClick} />
      <SecondaryButton text={text1} onClick={onClick1} />
    </div>
  );
}
