"use client";

import { ExternalLinkIcon, SignOutIcon } from "@/public/svg";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { clearUserSession, getUserToken } from "../lib/auth";
import useInitialsFromUserData from "../lib/getInitialsFromUserData";
import { encodeAccessToken } from "../lib/ssoToken";

// The dashboard ("Oister Experience") reads the handed-over session from the
// `?tab=` query param, mirroring how this app adopts it in AuthGuard. We land on
// the authenticated `/home` route directly so its auth guard doesn't bounce to
// `/login` before the token is adopted.
const OISTER_EXPERIENCE_URL = process.env.NODE_ENV === "production" ? "https://pre-investment-platform-git-staging-oister.vercel.app/home" : "http://localhost:5173/home";

export default function Logout() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (!dropdownRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const handleLogout = () => {
    clearUserSession();
    setIsOpen(false);
    router.replace("/login");
  };

  const handleGoToExperience = () => {
    const token = getUserToken();
    if (!token) return;
    setIsOpen(false);
    // Hand the session to the dashboard via an encoded token in the URL.
    const url = `${OISTER_EXPERIENCE_URL}?tab=${encodeAccessToken(token)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-[#28283d] font-semibold text-white transition hover:opacity-90 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {useInitialsFromUserData()}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-20 min-w-[210px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-base font-medium text-[#28283d] transition hover:bg-gray-100 cursor-pointer"
            onClick={handleGoToExperience}
          >
            <ExternalLinkIcon />
            Oister Experience
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-base font-medium text-[#28283d] transition hover:bg-gray-100 cursor-pointer"
            onClick={handleLogout}
          >
            <SignOutIcon />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
