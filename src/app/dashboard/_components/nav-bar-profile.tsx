import { auth } from "@/auth";
import { db } from "@/lib/drizzle/db";
import { ProfilesTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { User2 } from "lucide-react";
import { redirect } from "next/navigation";

export default async function NavBarProfile() {
  const session = await auth();

  const profile = await db.query.ProfilesTable.findFirst({
    where: eq(ProfilesTable.userId, session?.user?.id ?? ""),
  });

  if (!profile) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-10 items-center gap-4 md:ml-auto">
      <div className="hidden flex-col text-right md:flex">
        <span className="text-sm font-semibold">{profile.displayName}</span>
        <span className="text-xs text-muted-foreground">
          {session?.user?.email}
        </span>
      </div>
      <div className="flex size-10 items-center justify-center rounded-full bg-slate-200 text-slate-600">
        <User2 className="size-5" />
      </div>
    </div>
  );
}
