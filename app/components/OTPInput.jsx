"use client";

import { useEffect, useRef, useState } from "react";

function sanitizeToDigit(input) {
  // Keep only digits; if user pastes multiple characters, take the first digit.
  return input.replace(/\D/g, "").slice(0, 1);
}

export default function OTPInput({ otp, setOtp }) {
  const length = otp.length;
  const inputRefs = useRef([]);
  const ids = otp.map((_, i) => `otp-digit-${i}`);

  useEffect(() => {
    // Focus the first input on mount.
    inputRefs.current[0]?.focus();
  }, []);

  function focusIndex(i) {
    if (i < 0 || i >= length) return;
    inputRefs.current[i]?.focus();
  }

  function handleChange(e, index) {
    const digit = sanitizeToDigit(e.target.value);

    const updated = [...otp];
    updated[index] = digit; // '' or '0'-'9'
    setOtp(updated);

    if (digit && index < length - 1) {
      focusIndex(index + 1);
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace") {
      // If current box is empty, jump back and clear previous.
      if (otp[index] === "" && index > 0) {
        const prev = index - 1;
        const updated = [...otp];
        updated[prev] = "";
        setOtp(updated);
        focusIndex(prev);
      }
    }
    if (e.key === "ArrowLeft") focusIndex(index - 1);
    if (e.key === "ArrowRight") focusIndex(index + 1);
  }

  function handlePaste(e, index) {
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
    <div className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
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
          className="h-20 w-14 rounded-lg border border-white/20 bg-[#28283d] text-center text-2xl font-semibold text-white outline-none transition focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#28283d] sm:h-24 sm:w-20 sm:text-3xl"
          onFocus={(e) => e.currentTarget.select()}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
