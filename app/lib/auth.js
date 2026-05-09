"use client";

const USER_TOKEN = "user-token";
const USER_DATA = "user-data";
const AUTH_CHANGE_EVENT = "oister:auth-change";

function notifyAuthChange() {
  if (typeof window === "undefined") return null;
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function getUserData() {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(USER_DATA);
  return stored ? JSON.parse(stored) : null;
}

export function getUserToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(USER_TOKEN);
}

export function setUserSession({ token, userData }) {
  if (typeof window === "undefined") return null;
  if (token) window.localStorage.setItem(USER_TOKEN, token);
  if (userData) window.localStorage.setItem(USER_DATA, JSON.stringify(userData));
  notifyAuthChange();
}

export function clearUserSession() {
  if (typeof window === "undefined") return null;
  window.localStorage.removeItem(USER_TOKEN);
  window.localStorage.removeItem(USER_DATA);
  notifyAuthChange();
}

export function subscribeAuth(listener) {
  if (typeof window === "undefined") return () => { };
  const wrapped = () => listener?.();
  window.addEventListener("storage", wrapped);
  window.addEventListener(AUTH_CHANGE_EVENT, wrapped);
  return () => {
    window.removeEventListener("storage", wrapped);
    window.removeEventListener(AUTH_CHANGE_EVENT, wrapped);
  };
}
