export function StarIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.54 5.78L7.83002 6.89001C7.38002 7.03001 7.02001 7.38002 6.89001 7.83002L5.76996 11.55L4.64996 7.83002C4.50996 7.38002 4.15996 7.02001 3.70996 6.89001L0 5.78L3.71997 4.66C4.16997 4.52 4.51997 4.17 4.65997 3.72L5.77997 0L6.89996 3.72C7.03996 4.17 7.38997 4.52 7.83997 4.66L11.54 5.78Z"
        fill="#6573E4"
      />
    </svg>
  );
}

export function ChevronIcon({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-fit h-fit items-center gap-1 rounded-md text-white/80 transition hover:bg-white/10 hover:text-white cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
        aria-hidden
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  );
}

export function SuccessIcon() {
  return (
    <svg
      className="h-8 w-8 text-green-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
