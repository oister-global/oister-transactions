"use client";

import { useState } from "react";
import OTPInput from "../../components/OTPInput";
import EmailInputAndButton from "./EmailInputAndButton";
import Chevron from "@/app/components/Chevron";

export default function LoginAuthPanel() {
  const [showOtp, setShowOtp] = useState(false);

  return (
    <div className="flex w-full max-w-[420px] flex-col items-center gap-4 px-2">
      {showOtp ? (
        <div className="flex items-center w-full gap-4">
          <Chevron onClick={() => setShowOtp(false)} />
          <OTPInput />
        </div>
      ) : (
        <EmailInputAndButton onContinue={() => setShowOtp(true)} />
      )}
    </div>
  );
}
