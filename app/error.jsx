"use client";

import { useRouter } from "next/navigation";
import ButtonsGroup from "./components/ButtonsGroup";
import FloatingStatusImage from "./components/FloatingStatusImage";

export default function Error({ reset }) {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <FloatingStatusImage alt="Error Page" />
        <h1 className="text-4xl mt-4 mb-2 font-extrabold text-black sm:text-5xl">
          OOPS!
        </h1>

        <p className="text-lg font-medium text-black sm:text-2xl">
          Something went wrong!
        </p>
        <div className="mt-6 flex justify-center overflow-x-auto px-4 pb-1">
          <ButtonsGroup
            text="Retry"
            text1="Go Back"
            onClick={reset}
            onClick1={() => router.back()}
          />
        </div>
      </div>
    </div>
  );
}