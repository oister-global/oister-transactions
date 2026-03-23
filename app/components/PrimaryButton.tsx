const PrimaryButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-10 cursor-pointer rounded-lg bg-[#516dc9] text-base font-medium text-white transition-all duration-500 hover:bg-[#1e4be0] active:ring-1 active:ring-white"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
