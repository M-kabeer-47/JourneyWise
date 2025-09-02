;
import { createAuthClient } from "better-auth/react";
import { adminClient,twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    twoFactorClient(),
    adminClient(),
    

  ],
  // the base url of your auth server
});
