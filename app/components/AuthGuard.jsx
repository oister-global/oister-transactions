"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken } from "@/app/lib/auth";

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname.includes("login");
  const token = getToken();

  useLayoutEffect(() => {
    if (isLogin) {
      if (token) router.replace("/card");
    } else if (!token) {
      router.replace("/login");
    }
  }, [isLogin, pathname, router, token]);

  if (!isLogin && !token) return null;
  return children;
}
