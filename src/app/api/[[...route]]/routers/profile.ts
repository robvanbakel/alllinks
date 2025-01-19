import { auth } from "@/auth";
import { db } from "@/lib/drizzle/db";
import { ProfilesTable } from "@/lib/drizzle/schema";
import { zValidator } from "@hono/zod-validator";
import { NeonDbError } from "@neondatabase/serverless";
import { Hono } from "hono";
import { z } from "zod";
import * as validators from "@/lib/validators";

export const profileRouter = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      displayName: validators.profileDisplayName,
      username: validators.profileUsername,
    }),
  ),
  async (c) => {
    const session = await auth();

    if (!session?.user?.id) {
      return c.json(undefined, 401);
    }

    const { displayName, username } = c.req.valid("json");

    try {
      await db.insert(ProfilesTable).values({
        userId: session.user.id,
        displayName,
        username,
      });

      return c.json({ success: true });
    } catch (err) {
      if (err instanceof NeonDbError) {
        return c.json({ message: err.constraint }, { status: 409 });
      }
      throw err;
    }
  },
);
