"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getUserToken } from "@/app/lib/auth";

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/login" || pathname.startsWith("/login/");

  useEffect(() => {
    const enforce = () => {
      // localStorage is the source of truth for auth.
      const hasUserToken = Boolean(getUserToken());
      if (isLogin && hasUserToken) {
        router.replace("/");
      } else if (!isLogin && !hasUserToken) {
        router.replace("/login");
      }
    };

    enforce();
  }, [isLogin, router]);

  return children;
}
