"use client";

import { useEffect } from "react";
import { SuccessIcon } from "@/public/svg";
import PrimaryButton from "./PrimaryButton";

type ModalProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  show: boolean;
  setShowModal: (show: boolean) => void;
};

export default function Modal({
  title = "",
  description = "",
  show = false,
  setShowModal,
}: ModalProps) {
  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-[500px] rounded-2xl bg-white p-8 text-center shadow-xl mx-auto">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <SuccessIcon />
          </div>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-gray-800">{title}</h2>
        <p className="mb-6 text-sm leading-relaxed text-gray-500">
          {description}
        </p>
        <PrimaryButton
          text="Go back to Dashboard"
          onClick={() => setShowModal(false)}
        />
      </div>
    </div>
  );
}
