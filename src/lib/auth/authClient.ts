import { twoFactorClient } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/two-factor"; // Handle the 2FA verification redirect
      },
    }),
    adminClient(),
  ],
  // the base url of your auth server
});
