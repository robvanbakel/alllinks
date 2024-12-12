import { db } from "@/lib/drizzle/db";
import { LinksTable, UsersTable } from "@/lib/drizzle/schema";
import { currentUser } from "@clerk/nextjs/server";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

export const linkRouter = new Hono()
  .get("/", async (c) => {
    const user = await currentUser();

    if (!user) {
      return c.json(undefined, 401);
    }

    const data = await db.query.UsersTable.findFirst({
      where: eq(UsersTable.externalId, user.id),
      with: {
        links: true,
      },
    });

    if (!data) {
      return c.json(undefined, 404);
    }

    return c.json(data.links);
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string().min(1),
        url: z.string().url(),
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

      const [newData] = await db
        .insert(LinksTable)
        .values({ ...data, userId: user.id })
        .returning();

      return c.json(newData);
    },
  )
  .patch(
    "/:id",
    zValidator(
      "json",
      z.object({
        name: z.string().min(1),
        url: z.string().url(),
      }),
    ),
    async (c) => {
      const auth = await currentUser();

      if (!auth) {
        return c.json(undefined, 401);
      }

      const linkId = c.req.param("id");

      const link = await db.query.LinksTable.findFirst({
        where: eq(LinksTable.id, linkId),
        with: { user: true },
      });

      if (link?.user.externalId !== auth.id) {
        return c.json(undefined, 403);
      }

      const data = await c.req.valid("json");

      const [newData] = await db
        .update(LinksTable)
        .set(data)
        .where(eq(LinksTable.id, linkId))
        .returning();

      return c.json(newData);
    },
  );
