import Logo from "@/assets/logo";
import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/welcome");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Logo size={120} />
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/welcome" });
        }}
      >
        <Button variant="outline" className="mt-12">
          Sign in with Google
        </Button>
      </form>
    </div>
  );
}
