"use client";

import { useRouter } from "next/navigation";
import ButtonsGroup from "./components/ButtonsGroup";
import FloatingStatusImage from "./components/FloatingStatusImage";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-white px-4 mt-10">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <FloatingStatusImage alt="Page not found" />
        <h1 className="mt-4 text-4xl font-extrabold text-black sm:text-5xl">
          404
        </h1>
        <p className="mt-2 text-lg font-medium text-black sm:text-2xl">
          Page not found!
        </p>
        <p className="mt-2 max-w-md text-sm text-[#5f6368] sm:text-base">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-6 flex justify-center overflow-x-auto px-4 pb-1">
          <ButtonsGroup
            text="Go to dashboard"
            text1="Go Back"
            onClick={() => router.push("/")}
            onClick1={() => router.back()}
          />
        </div>
      </div>
    </div>
  );
}
