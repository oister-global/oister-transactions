"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getUserToken, setUserSession } from "@/app/lib/auth";
import { decodeAccessToken } from "@/app/lib/ssoToken";

// The dashboard hands over a session by linking here with the encoded access
// token in the `?tab=` query param: http://localhost:3000/?tab=<encoded> or https://dashboard.oisterglobal.com/?tab=<encoded>.
const SSO_TOKEN_PARAM = "tab";

// Decode the (unverified) claims from a JWT payload so we can populate user data
// from an SSO handoff, where only the token — not a user object — is available.
function readJwtClaims(jwt) {
  try {
    const payload = jwt.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

// Read the encoded token from the URL, decode it, persist the session, then
// strip the param so the token doesn't linger in the address bar / history.
function adoptSsoTokenFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get(SSO_TOKEN_PARAM);
  if (!encoded) return;

  const token = decodeAccessToken(encoded);
  if (token) {
    // Persist userData too — the Header only shows the Logout button when
    // userData is present, so an SSO login must seed it from the token claims.
    setUserSession({ token, userData: readJwtClaims(token) || { token } });
  }

  params.delete(SSO_TOKEN_PARAM);
  const query = params.toString();
  window.history.replaceState(
    null,
    "",
    window.location.pathname + (query ? `?${query}` : "")
  );
}

export default function AuthGuard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/login" || pathname.startsWith("/login/");

  // Adopt an SSO token from the URL synchronously on the first render — before
  // protected child queries mount and fire — so the request carries the
  // Authorization header. The initializer runs once per mount; the `?tab=`
  // param is stripped after the first read, so re-runs are no-ops.
  useState(() => {
    if (typeof window !== "undefined") adoptSsoTokenFromUrl();
  });

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
