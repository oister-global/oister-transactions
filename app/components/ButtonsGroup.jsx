"use client";

import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function ButtonsGroup({
  text,
  text1,
  onClick,
  onClick1,
  hideButton1,
  isLoading1,
}) {
  return (
    <div className="flex flex-nowrap gap-2 p-1 bg-white rounded-lg w-fit border border-[#e8eaef]">
      <PrimaryButton text={text} onClick={onClick} isLoading={false} />
      {!hideButton1 && (
        <SecondaryButton
          text={text1}
          onClick={onClick1}
          isLoading={isLoading1}
        />
      )}
    </div>
  );
}
