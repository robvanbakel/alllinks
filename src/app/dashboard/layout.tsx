import ClaimUsernameBanner from "@/app/dashboard/_components/claim-username-banner";
import { NavBar } from "@/app/dashboard/_components/nav-bar";
import { Toaster } from "@/components/ui/toaster";
import { db } from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const auth = await currentUser();

  if (!auth) {
    redirect("/sign-in");
  }

  const user = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.externalId, auth.id),
  });

  return (
    <>
      <NavBar />
      {!user?.username && (
        <div className="container">
          <ClaimUsernameBanner />
        </div>
      )}
      <div className="container mt-8">{children}</div>
      <Toaster />
    </>
  );
}
