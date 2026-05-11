"use client";

import FloatingStatusImage from "./components/FloatingStatusImage";

export default function Loading() {
  return (
    <div className="mt-10 flex min-h-[calc(100vh-5rem)] items-center justify-center bg-white px-4">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <FloatingStatusImage alt="Loading" />
        <h1 className="mt-4 text-4xl font-extrabold text-black sm:text-5xl">
          Loading
        </h1>
        <p className="mt-2 text-lg font-medium text-black sm:text-2xl">
          Please wait a moment...
        </p>
        <p className="mt-2 max-w-md text-sm text-[#5f6368] sm:text-base">
          We are getting everything ready for you.
        </p>
        <div
          className="mt-6 flex items-center gap-3 rounded-full border border-[#e8eaef] px-5 py-3 text-sm font-medium text-[#5f6368] sm:text-base"
          role="status"
          aria-live="polite"
        >
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-[#d9dce3] border-t-black"
            aria-hidden="true"
          />
          Fetching the latest details
        </div>
      </div>
    </div>
  );
}
