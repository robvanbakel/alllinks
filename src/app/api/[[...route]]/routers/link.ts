import { auth } from "@/auth";
import { db } from "@/lib/drizzle/db";
import { LinksTable, ProfilesTable } from "@/lib/drizzle/schema";
import { zValidator } from "@hono/zod-validator";
import { asc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

export const linkRouter = new Hono()
  .get("/", async (c) => {
    const session = await auth();

    if (!session?.user?.id) {
      return c.json(undefined, 401);
    }

    const data = await db.query.ProfilesTable.findFirst({
      where: eq(ProfilesTable.userId, session.user.id),
      with: {
        links: { orderBy: asc(LinksTable.createdAt) },
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
      const session = await auth();

      if (!session?.user?.id) {
        return c.json(undefined, 401);
      }

      const data = await c.req.valid("json");

      const [newData] = await db
        .insert(LinksTable)
        .values({ ...data, profileId: session.user.id })
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
      const session = await auth();

      if (!session?.user?.id) {
        return c.json(undefined, 401);
      }

      const linkId = c.req.param("id");

      const link = await db.query.LinksTable.findFirst({
        where: eq(LinksTable.id, linkId),
      });

      if (link?.profileId !== session.user.id) {
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
  )
  .delete("/:id", async (c) => {
    const session = await auth();

    if (!session?.user?.id) {
      return c.json(undefined, 401);
    }

    const linkId = c.req.param("id");

    const link = await db.query.LinksTable.findFirst({
      where: eq(LinksTable.id, linkId),
    });

    if (link?.profileId !== session.user.id) {
      return c.json(undefined, 403);
    }

    await db.delete(LinksTable).where(eq(LinksTable.id, linkId));

    return c.json({ success: true });
  });
