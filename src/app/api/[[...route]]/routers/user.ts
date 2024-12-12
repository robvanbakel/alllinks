import { db } from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { currentUser } from "@clerk/nextjs/server";
import { zValidator } from "@hono/zod-validator";
import { NeonDbError } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

export const userRouter = new Hono()
  .get("/", async (c) => {
    const auth = await currentUser();

    if (!auth) {
      return c.json(undefined, 401);
    }

    const user = await db.query.UsersTable.findFirst({
      where: eq(UsersTable.externalId, auth.id),
    });

    if (!user) {
      return c.json(undefined, 401);
    }

    return c.json(user);
  })
  .patch(
    "/",
    zValidator(
      "json",
      z.object({
        displayName: z.string().min(2),
        username: z.string().min(2),
      }),
    ),
    async (c) => {
      const auth = await currentUser();

      if (!auth) {
        return c.json(undefined, 401);
      }

      const user = await db.query.UsersTable.findFirst({
        where: eq(UsersTable.externalId, auth.id),
      });

      if (!user) {
        return c.json(undefined, 401);
      }

      const data = await c.req.valid("json");

      try {
        await db.update(UsersTable).set(data).where(eq(UsersTable.id, user.id));
        return c.json({ success: true });
      } catch (err) {
        if (err instanceof NeonDbError) {
          return c.json({ message: err.constraint }, { status: 409 });
        }
        throw err;
      }
    },
  );
