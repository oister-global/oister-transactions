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

export function LinkedinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={21}
      viewBox="0 0 24 24"
    >
      <path
        fill={"#6573E4"}
        d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z"
      />
    </svg>
  );
}

export function TwitterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <rect width="32" height="32" rx="16" />
      <rect
        x="5.33301"
        y="5.33398"
        width="21.3333"
        height="21.3333"
        fill="url(#pattern0_6741_101)"
      />
      <defs>
        <pattern
          id="pattern0_6741_101"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_6741_101" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0_6741_101"
          width="100"
          height="100"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M8.4452 3.8894H19.5563C22.0723 3.8894 24.1119 5.929 24.1119 8.44496V19.5561C24.1119 22.072 22.0723 24.1116 19.5563 24.1116H8.4452C5.92924 24.1116 3.88965 22.072 3.88965 19.5561V8.44496C3.88965 5.929 5.92924 3.8894 8.4452 3.8894Z"
        stroke={"#6573E4"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.4492 13.3003C18.5863 14.2251 18.4284 15.1695 17.9978 15.9992C17.5673 16.829 16.886 17.5019 16.051 17.9222C15.216 18.3425 14.2697 18.4888 13.3468 18.3403C12.4238 18.1917 11.5712 17.756 10.9102 17.095C10.2491 16.4339 9.81337 15.5813 9.66485 14.6583C9.51633 13.7354 9.66262 12.7891 10.0829 11.9541C10.5032 11.1191 11.1761 10.4378 12.0059 10.0073C12.8356 9.57672 13.7801 9.41877 14.7048 9.55589C15.648 9.69576 16.5213 10.1353 17.1955 10.8096C17.8698 11.4838 18.3093 12.3571 18.4492 13.3003Z"
        stroke={"#6573E4"}
        strokeWidth="2.13333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.1113 7.8894H20.1224"
        stroke={"#6573E4"}
        strokeWidth="2.22222"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M4.72334 19.8322C4.57931 19.6882 4.47365 19.5105 4.41581 19.3155C3.6778 15.8103 3.6778 12.1897 4.41581 8.68451C4.47365 8.48947 4.57931 8.31182 4.72334 8.16778C4.86289 8.02823 5.03399 7.92471 5.22188 7.86579C11.0349 6.90932 16.9651 6.90932 22.7781 7.86579C22.966 7.92471 23.1371 8.02823 23.2767 8.16778C23.4207 8.31182 23.5264 8.48948 23.5842 8.68453C24.3222 12.1897 24.3222 15.8102 23.5842 19.3155C23.5264 19.5105 23.4207 19.6882 23.2767 19.8322C23.1371 19.9718 22.966 20.0753 22.7781 20.1342C16.9652 21.0909 11.0349 21.0909 5.2219 20.1342C5.034 20.0753 4.86289 19.9718 4.72334 19.8322Z"
        stroke={"#6573E4"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7783 17.3327L17.3339 13.9993L11.7783 10.666V17.3327Z"
        fill={"#6573E4"}
      />
    </svg>
  );
}
