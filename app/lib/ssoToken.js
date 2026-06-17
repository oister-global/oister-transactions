/**
 * Encode/decode the access token for carrying in a URL when handing the session
 * to another Oister portal. The token is XOR-ciphered with a shared secret and
 * then URL-safe base64-encoded, so it can only be recovered by code that knows
 * the key (i.e. decodeAccessToken) — a plain base64 decoder yields garbage.
 *
 * The SAME key must be used by both portals. Caveat: this raises the bar but is
 * not true encryption — client-side code (key included) can be reverse-engineered.
 */
const TOKEN_CIPHER_KEY = "oister-sso-9f3c-2026";

const xorCipher = (input, key) => {
  let out = "";
  for (let i = 0; i < input.length; i++) {
    out += String.fromCharCode(
      input.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return out;
};

export const encodeAccessToken = (token) => {
  if (!token) return "";
  return btoa(xorCipher(token, TOKEN_CIPHER_KEY))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const decodeAccessToken = (encoded) => {
  if (!encoded) return "";
  try {
    let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    return xorCipher(atob(base64), TOKEN_CIPHER_KEY);
  } catch {
    return "";
  }
};
