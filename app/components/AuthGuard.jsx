"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getUserToken, subscribeAuth } from "@/app/lib/auth";

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // Avoid accidental matches like "/foo/login-xyz".
  const isLogin = pathname === "/login" || pathname.startsWith("/login/");

  // Prevent hydration mismatch / redirects during hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (!mounted) return;

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
    return subscribeAuth(enforce);
  }, [mounted, isLogin, router]);

  return children;
}
