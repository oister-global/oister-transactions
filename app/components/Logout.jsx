"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import getInitialsFromUserData from "../lib/getInitialsFromUserData";
import { clearUserSession } from "../lib/auth";
import { SignOutIcon } from "@/public/svg";

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-[#28283d] font-semibold text-white transition hover:opacity-90 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {getInitialsFromUserData()}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-20 min-w-[170px] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[16px] font-medium text-[#28283d] transition hover:bg-gray-100 cursor-pointer"
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
