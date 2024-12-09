import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function NavBarProfile() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex h-10 items-center gap-4 md:ml-auto">
      <div className="hidden flex-col text-right md:flex">
        <span className="text-sm font-semibold">{user.fullName}</span>
        <span className="text-xs text-muted-foreground">
          {user.emailAddresses[0].emailAddress}
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
