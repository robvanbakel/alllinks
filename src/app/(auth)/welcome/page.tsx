import { WelcomeForm } from "@/app/(auth)/welcome/_components/welcome-form";
import Logo from "@/assets/logo";
import { auth } from "@/auth";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/drizzle/db";
import { ProfilesTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function WelcomePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const profile = await db.query.ProfilesTable.findFirst({
    where: eq(ProfilesTable.userId, session.user.id),
  });

  if (profile) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Logo size={120} />
      <p className="mt-6 max-w-prose text-balance text-center">
        Almost done! To create your page, enter your name and a username. After
        saving, you can start adding links.
      </p>
      <Card className="mt-12 w-full max-w-sm p-8">
        <WelcomeForm />
      </Card>
    </div>
  );
}
