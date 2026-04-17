"use client";

import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function ButtonsGroup({ text, text1, onClick, onClick1 }) {
  return (
    <div className="flex flex-nowrap gap-4 p-1 bg-white rounded-lg w-fit border border-[#e8eaef]">
      <PrimaryButton text={text} onClick={onClick} isLoading={false} />
      <SecondaryButton text={text1} onClick={onClick1} />
    </div>
  );
}
