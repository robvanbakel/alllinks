import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle/db";
import { eq } from "drizzle-orm";
import { LinksTable } from "@/lib/drizzle/schema";

export const PATCH = async (request: NextRequest) => {
  const linkId = request.nextUrl.pathname.split("/").at(-1);

  if (!linkId) {
    return NextResponse.json(null, { status: 404 });
  }

  const user = await currentUser();

  if (!user) {
    return NextResponse.json(null, { status: 401 });
  }

  const link = await db.query.LinksTable.findFirst({
    where: eq(LinksTable.id, linkId),
    with: { user: { columns: { externalId: true } } },
  });

  if (link?.user.externalId !== user.id) {
    return NextResponse.json(null, { status: 401 });
  }

  const data = await request.json();

  await db
    .update(LinksTable)
    .set({ name: data.name, url: data.url })
    .where(eq(LinksTable.id, linkId));

  return NextResponse.json(null);
};
