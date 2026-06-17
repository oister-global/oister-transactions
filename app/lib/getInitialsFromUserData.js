"use client";

import { useSyncExternalStore } from "react";
import { getUserData } from "./auth";

function readInitialsFromStorage() {
  const user = getUserData();
  // The session JWT carries an `email` but no `name`, so derive the initials
  // from the email local-part (e.g. "abhinav.kumar" -> "AK").
  const source =
    (typeof user?.name === "string" && user.name) ||
    (typeof user?.email === "string" && user.email.split("@")[0]) ||
    "";

  const parts = source.trim().split(/[\s._-]+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
}

export default function useInitialsFromUserData() {
  return useSyncExternalStore(
    () => () => { },
    readInitialsFromStorage,
    () => "U",
  );
}