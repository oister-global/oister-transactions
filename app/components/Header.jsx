"use client";

import { OisterLogoWhiteIcon, OisterLogoWhiteSmallIcon } from "@/public/svg";
import Logout from "./Logout";
import { getUserData, subscribeAuth } from "@/app/lib/auth";
import { useEffect, useState } from "react";

export default function Header() {
  // First render matches server HTML (no localStorage access).
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    return subscribeAuth(() => setUserData(getUserData()));
  }, []);

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
