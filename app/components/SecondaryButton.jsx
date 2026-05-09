"use client";

import { LoaderIcon } from "@/public/svg";

const SecondaryButton = ({ text, onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      className="h-10 cursor-pointer flex-nowrap rounded-lg border border-[#516dc9] px-4 text-base font-medium text-[#516dc9] transition-all duration-300 hover:bg-[#f0f3ff] bg-white min-w-40"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoaderIcon color="blue" />
        </div>
      ) : (
        <div className="text-nowrap">{text}</div>
      )}
    </button>
  );
};

export default SecondaryButton;
