"use client";

import PrimaryButton from "../../components/PrimaryButton";

export default function EmailInputAndButton({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <div className="flex w-[300px] flex-col gap-4">
      <input
        type="text"
        placeholder="Enter your Email Address"
        className="rounded-lg border border-white bg-white px-4 py-3 text-black placeholder:text-gray-400"
        required
      />
      <PrimaryButton text="Continue" onClick={onContinue} />
    </div>
  );
}
