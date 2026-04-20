"use client";

import { useState } from "react";
import { ChevronIcon } from "../../../public/svg";
import OTPInput from "../../components/OTPInput";
import EmailInputAndButton from "./EmailInputAndButton";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useRouter } from "next/navigation";
import { useVerifyOtpMutation } from "@/app/store/services/authApi";

export default function LoginAuthPanel() {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array.from({ length: 4 }, () => ""));
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [phoneAndEmail, setPhoneAndEmail] = useState({
    phone: "",
    email: "",
  });
  const router = useRouter();
  return (
    <div className="flex w-full max-w-[420px] flex-col items-center gap-4 px-2">
      {showOtp ? (
        <div className="flex flex-col gap-4">
          <div className="text-center text-xs text-white">
            <p>
              Please enter the OTP sent to Phone:{" "}
              <strong>{phoneAndEmail.phone}</strong> and <br />
              Email: <strong>{phoneAndEmail.email}</strong>
            </p>
          </div>
          <div className="flex w-full gap-4">
            <ChevronIcon onClick={() => setShowOtp(false)} />
            <div className="flex flex-col justify-center gap-4">
              <OTPInput otp={otp} setOtp={setOtp} />
              <PrimaryButton
                text="Log In"
                onClick={async () => {
                  const res = await verifyOtp({
                    email: phoneAndEmail.email,
                    otp: otp.join(""),
                  });
                  if (res?.data) {
                    const { data, token } = res.data;
                    if (token) {
                      localStorage.setItem("user-token", token);
                      localStorage.setItem(
                        "user-data",
                        JSON.stringify({
                          ...data,
                        }),
                      );
                    }
                    router.push("/card");
                  }
                }}
                isLoading={false}
              />
            </div>
          </div>
        </div>
      ) : (
        <EmailInputAndButton
          setShowOtp={setShowOtp}
          email={email}
          setPhoneAndEmail={setPhoneAndEmail}
          setEmail={setEmail}
        />
      )}
    </div>
  );
}
