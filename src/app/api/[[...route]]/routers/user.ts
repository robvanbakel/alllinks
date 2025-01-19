import { auth } from "@/auth";
import { db } from "@/lib/drizzle/db";
import { ProfilesTable } from "@/lib/drizzle/schema";
import { zValidator } from "@hono/zod-validator";
import { NeonDbError } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import * as validators from "@/lib/validators";

export const userRouter = new Hono()
  .get("/", async (c) => {
    const session = await auth();

    if (!session?.user?.id) {
      return c.json(undefined, 401);
    }

    const profile = await db.query.ProfilesTable.findFirst({
      where: eq(ProfilesTable.userId, session.user.id),
    });

    if (!profile) {
      return c.json(undefined, 401);
    }

    return c.json(profile);
  })
  .patch(
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

      const profile = await db.query.ProfilesTable.findFirst({
        where: eq(ProfilesTable.userId, session.user.id),
      });

      if (!profile) {
        return c.json(undefined, 401);
      }

      const data = await c.req.valid("json");

      try {
        await db
          .update(ProfilesTable)
          .set(data)
          .where(eq(ProfilesTable.userId, session.user.id));
        return c.json({ success: true });
      } catch (err) {
        if (err instanceof NeonDbError) {
          return c.json({ message: err.constraint }, { status: 409 });
        }
        throw err;
      }
    },
  );
