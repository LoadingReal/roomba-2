import type { SessionType, UserType } from "@/db/schema";

export type Variables = {
  Variables: {
    user: UserType | null;
    session: SessionType | null;
  };
};
