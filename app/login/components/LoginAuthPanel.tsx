"use client";

import { useState } from "react";
import { ChevronIcon } from "../../../public/svg";
import OTPInput from "../../components/OTPInput";
import EmailInputAndButton from "./EmailInputAndButton";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useRouter } from "next/navigation";

export default function LoginAuthPanel() {
  const [showOtp, setShowOtp] = useState(false);
  const router = useRouter();
  return (
    <div className="flex w-full max-w-[420px] flex-col items-center gap-4 px-2">
      {showOtp ? (
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <ChevronIcon onClick={() => setShowOtp(false)} />
            <div className="flex flex-col justify-center gap-4">
              <OTPInput />
              <PrimaryButton
                text="Log In"
                onClick={() => {
                  router.push("/card");
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <EmailInputAndButton onContinue={() => setShowOtp(true)} />
      )}
    </div>
  );
}
