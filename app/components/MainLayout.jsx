"use client";

import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/login" || pathname.startsWith("/login/");

  const marginClass = isLogin ? "mt-20" : "m-20 mt-28";

  return (
    <div className={`flex min-h-0 flex-1 flex-col ${marginClass}`}>
      {children}
    </div>
  );
}
