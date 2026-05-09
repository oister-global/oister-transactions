"use client";

import { getUserData, subscribeAuth } from "@/app/lib/auth";
import { OisterLogoWhiteIcon, OisterLogoWhiteSmallIcon } from "@/public/svg";
import { useSyncExternalStore } from "react";
import Logout from "./Logout";

export default function Header() {
  const userData = useSyncExternalStore(subscribeAuth, getUserData, () => null);

  return (
    <header className="flex h-20 gap-px bg-white pb-px">
      <div className="flex-1 bg-[#28283d]">
        <div className="flex h-full items-center px-10">
          <OisterLogoWhiteSmallIcon />
        </div>
      </div>
      <div className="flex-1 bg-[#28283d] flex items-center justify-end">
        <div className="px-10 flex items-center gap-4">
          {userData ? <Logout /> : <OisterLogoWhiteIcon />}
        </div>
      </div>
    </header>
  );
}
