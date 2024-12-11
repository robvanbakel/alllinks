import { db } from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function NavBarProfile() {
  const auth = await currentUser();

  if (!auth) {
    redirect("/");
  }

  const user = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.externalId, auth.id),
  });

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex h-10 items-center gap-4 md:ml-auto">
      <div className="hidden flex-col text-right md:flex">
        <span className="text-sm font-semibold">{user.displayName}</span>
        <span className="text-xs text-muted-foreground">
          {auth.emailAddresses[0].emailAddress}
        </span>
      </div>
      <UserButton
        appearance={{
          layout: {
            shimmer: false,
          },
          elements: {
            userButtonPopoverCard: "max-md:w-full max-md:ml-4",
            userButtonAvatarBox: "size-10",
          },
        }}
      />
    </div>
  );
}
