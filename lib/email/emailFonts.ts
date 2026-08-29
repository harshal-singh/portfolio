/**
 * Gmail-native font stacks — no @font-face or external links required.
 * Google Sans is available in Gmail; fallbacks cover other clients.
 */
export const emailFontFamilies = {
  sans:
    "'Google Sans', 'Google Sans Text', Roboto, Helvetica, Arial, sans-serif",
  heading:
    "'Google Sans', 'Google Sans Text', Roboto, Helvetica, Arial, sans-serif",
  mono: "'Google Sans', 'Google Sans Text', Roboto, Helvetica, Arial, sans-serif",
} as const;
