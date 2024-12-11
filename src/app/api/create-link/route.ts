import { db } from "@/lib/drizzle/db";
import { LinksTable, UsersTable } from "@/lib/drizzle/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const auth = await currentUser();

  if (!auth) {
    return NextResponse.json(null, { status: 401 });
  }

  const user = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.externalId, auth.id),
  });

  if (!user) {
    return NextResponse.json(null, { status: 401 });
  }

  const data = await request.json();

  await db
    .insert(LinksTable)
    .values({ name: data.name, url: data.url, userId: user.id });

  return NextResponse.json(null);
};
