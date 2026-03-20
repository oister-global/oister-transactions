"use client";

import { useEffect, useRef } from "react";

export type OTPInputProps = {
  otp: string[];
  setOtp: (otp: string[]) => void;
};

function sanitizeToDigit(input: string) {
  // Keep only digits; if user pastes multiple characters, take the first digit.
  return input.replace(/\D/g, "").slice(0, 1);
}

export default function OTPInput({ otp, setOtp }: OTPInputProps) {
  const length = otp.length;
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const ids = otp.map((_, i) => `otp-digit-${i}`);

  useEffect(() => {
    // Focus the first input on mount.
    inputRefs.current[0]?.focus();
  }, []);

  function focusIndex(i: number) {
    if (i < 0 || i >= length) return;
    inputRefs.current[i]?.focus();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const digit = sanitizeToDigit(e.target.value);

    const updated = [...otp];
    updated[index] = digit; // '' or '0'-'9'
    setOtp(updated);

    if (digit && index < length - 1) {
      focusIndex(index + 1);
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (e.key === "Backspace") {
      // If current box is empty, jump back and clear previous.
      if (otp[index] === "" && index > 0) {
        e.preventDefault();
        const prev = index - 1;
        const updated = [...otp];
        updated[prev] = "";
        setOtp(updated);
        focusIndex(prev);
      }
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusIndex(index - 1);
      return;
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusIndex(index + 1);
      return;
    }
  }

  function handlePaste(
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text");
    const digits = pasted.replace(/\D/g, "").slice(0, length - index);
    if (digits.length === 0) return;

    const updated = [...otp];
    digits.split("").forEach((d, offset) => {
      updated[index + offset] = d;
    });
    setOtp(updated);

    const next = index + digits.length;
    // If we filled until the end, keep focus on the last filled input.
    focusIndex(next < length ? next : length - 1);
  }

  return (
    <div className="flex flex-row items-center justify-center gap-3">
      {otp.map((value, index) => (
        <input
          key={ids[index] ?? index}
          id={ids[index] ?? undefined}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          inputMode="numeric"
          type="text"
          autoComplete="one-time-code"
          maxLength={1}
          className="h-16 w-14 rounded-lg border border-white/20 bg-[#28283d] text-center text-3xl font-semibold text-white outline-none transition focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#28283d]"
          onFocus={(e) => e.currentTarget.select()}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
