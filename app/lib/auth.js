"use client";

export const AUTH_TOKEN_KEY = "user-token";

export function getToken() {
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}
