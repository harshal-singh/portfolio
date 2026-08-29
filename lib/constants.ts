/** Only this Google account can access /admin and write to the sheet. Set ADMIN_EMAIL in .env.local. */
export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ?? "harshal8828984985@gmail.com";

/** Cache tag — invalidated on every admin save for instant public updates. */
export const CONTENT_CACHE_TAG = "portfolio-content";
