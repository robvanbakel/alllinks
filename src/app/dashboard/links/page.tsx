import { DashboardPageWrapper } from "@/app/dashboard/_components/dashboard-page-wrapper";
import { ExpandableLinkCard } from "@/app/dashboard/_components/expandable-link-card";
import { db } from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

export default async function DashboardLinksPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const data = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.externalId, user.id),
    with: {
      links: true,
    },
  });

  if (!data) {
    notFound();
  }

  return (
    <DashboardPageWrapper title="Your links">
      <div className="mx-auto max-w-md space-y-4">
        {data.links.map((link) => (
          <ExpandableLinkCard link={link} key={link.id} />
        ))}
      </div>
    </DashboardPageWrapper>
  );
}
