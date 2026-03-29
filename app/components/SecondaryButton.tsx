"use client";

const SecondaryButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="h-10 cursor-pointer flex-nowrap rounded-lg border border-[#516dc9] px-4 text-base font-medium text-[#516dc9] transition-all duration-300 hover:bg-[#f0f3ff] bg-white"
    >
      <div className="text-nowrap">{text}</div>
    </button>
  );
};

export default SecondaryButton;
