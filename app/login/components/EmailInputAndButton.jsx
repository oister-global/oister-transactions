"use client";

import { useSendOtpMutation } from "@/app/store/services/authApi";
import PrimaryButton from "../../components/PrimaryButton";
import toast from "react-hot-toast";

export default function EmailInputAndButton({
  setShowOtp,
  email,
  setEmail,
  setPhoneAndEmail,
}) {
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  return (
    <div className="flex w-[300px] flex-col gap-4">
      <div className="text-white text-center text-xs">
        Explore standout secondary opportunities, handpicked by Oister
      </div>
      <input
        type="text"
        placeholder="Enter your Email Address"
        className="rounded-lg border border-white bg-white px-4 py-3 text-black placeholder:text-gray-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PrimaryButton
        text="Continue"
        onClick={async () => {
          const data = await sendOtp({ email });
          if (data?.data?.data?.phone) {
            setPhoneAndEmail({
              phone: data.data.data.phone,
              email,
            });
            setShowOtp(true);
          }
        }}
        isLoading={isLoading}
      />
    </div>
  );
}
