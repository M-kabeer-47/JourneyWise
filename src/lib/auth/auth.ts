import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import send_email from "./sendEmail";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  user,
  account,
  session,
  verification,
  twoFactor,
} from "../../../auth-schema";
import { admin, twoFactor as two_factor_plugin } from "better-auth/plugins";
import { eq } from "drizzle-orm";
dotenv.config();

const db = drizzle(process.env.DATABASE_URL!);

export const auth = betterAuth({
  appName: "Better-Auth",
  rateLimit: {
    window: 60,
    max: 100,
    customRules: {
      "/sign-in": {
        window: 10,
        max: 3,
      },
      "/two-factor/*": {
        window: 10,
        max: 3,
      },
    },
  },

  plugins: [
    two_factor_plugin({
      skipVerificationOnEnable: true,
      otpOptions: {
        async sendOTP({ user, otp }, request) {
          await send_email({
            to: user.email,
            subject: "Two Factor Authentication",
            text: `Your OTP is: ${otp}`,
          });
        },
      },
    }),
    admin(),
  ],
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  user: {
    additionalFields: {
      country: {
        type: "string",
        required: true,
      },
      phoneNumber: {
        type: "string",
        required: true,
      },
      dob: {
        type: "string",
        required: true,
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg", //@ts-ignore
    schema: {
      user,
      account,
      session,
      verification,
      twoFactor,
    },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, //@ts-ignore
      mapProfileToUser: async (profile) => {
        let User = await db
          .select()
          .from(user)
          .where(eq(user.email, profile.email));
        if (User.length > 0) {
          if (User[0].image) {
            return {
              email: profile.email,
              name: profile.name,
              country: "",
              phoneNumber: "",
              dob: null,
            };
          }
        }
      },
    },
  },

  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({ user, url, token }, request) => {
      await send_email({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
});
