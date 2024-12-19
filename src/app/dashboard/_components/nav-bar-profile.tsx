import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { db } from "@/lib/drizzle/db";
import { ProfilesTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { LogOut, User2 } from "lucide-react";
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
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <div className="flex size-10 items-center justify-center rounded-full bg-slate-200 text-slate-600">
            <User2 className="size-5" />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="mt-2 w-36 p-2">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button variant="ghost" className="w-full" type="submit">
              <LogOut />
              Sign Out
            </Button>
          </form>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
