const PrimaryButton = ({ text }: { text: string }) => {
  return (
    <button className="hover:bg-[#1e4be0] active:ring-1 active:ring-white rounded-lg h-10 font-medium text-base text-white cursor-pointer bg-[#516dc9] transition-all duration-500">
      {text}
    </button>
  );
};

export default PrimaryButton;
