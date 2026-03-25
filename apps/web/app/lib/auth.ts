import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
}) as any;

export const signInWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: "google",
    callbackURL: process.env.NEXT_PUBLIC_CLIENT_URL,
    errorCallbackURL: process.env.NEXT_PUBLIC_CLIENT_URL,
  });
};

export const signOutWithGoogle = async () => {
  await authClient.signOut();
};