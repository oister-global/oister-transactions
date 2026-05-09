"use client";

import { useSyncExternalStore } from "react";
import { getUserData, subscribeAuth } from "./auth";

function readInitialsFromStorage() {
  const user = getUserData();
  const fullName = user?.name;

  if (!fullName || typeof fullName !== "string") return "U";
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
}

export default function useInitialsFromUserData() {
  return useSyncExternalStore(
    (onStoreChange) => subscribeAuth(onStoreChange),
    readInitialsFromStorage,
    () => "U",
  );
}