"use client";

import Image from "next/image";

const STATUS_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/7486/7486740.png";

export default function FloatingStatusImage({ alt }) {
  return (
    <>
      <div className="mx-auto w-fit animate-float">
        <Image
          src={STATUS_IMAGE}
          alt={alt}
          className="h-auto w-32 sm:w-44"
          width={208}
          height={208}
        />
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
    </>
  );
}
