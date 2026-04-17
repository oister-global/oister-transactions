"use client";

import { LoaderIcon } from "@/public/svg";

const PrimaryButton = ({
  text,
  onClick,
  isLoading = false,
}) => {
  return (
    <button
      onClick={onClick}
      className="h-10 w-full px-4 cursor-pointer rounded-lg bg-[#516dc9] text-base font-medium text-white transition-all duration-500 hover:bg-[#1e4be0]"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoaderIcon />
        </div>
      ) : (
        <div className="text-nowrap">{text}</div>
      )}
    </button>
  );
};

export default PrimaryButton;
