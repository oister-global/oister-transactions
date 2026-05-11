"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ButtonsGroup from "./components/ButtonsGroup";

export default function Error({ reset }) {
  const router = useRouter();

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-white px-4 mt-20">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <div className="mx-auto w-fit animate-float">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
            alt="Error Astronaut"
            className="h-auto w-32 sm:w-44"
            width={208}
            height={208}
          />
        </div>
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

      <style jsx>{`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
            100% {
              transform: translateY(0px);
            }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
    </div>
  );
}