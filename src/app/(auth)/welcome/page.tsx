import { db } from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function WelcomePage() {
  const authUser = await currentUser();

  if (!authUser) {
    redirect("/");
  }

  const foundUser = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.externalId, authUser.id),
  });

  if (foundUser) {
    redirect("/dashboard");
  }

  await db.insert(UsersTable).values({
    externalId: authUser.id,
  });

  redirect("/dashboard");
}
