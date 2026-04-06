import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1/api/auth`,
}) as any;

export const signInWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: "google",
    callbackURL: `${process.env.NEXT_PUBLIC_CLIENT_URL}/rooms`,
    errorCallbackURL: `${process.env.NEXT_PUBLIC_CLIENT_URL}/auth`,
  });
};

export const signOutWithGoogle = async () => {
  await authClient.signOut();
};
