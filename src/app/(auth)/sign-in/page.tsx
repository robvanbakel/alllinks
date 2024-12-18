import Logo from "@/assets/logo";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Logo size={120} />
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button variant="outline" className="mt-12">
          Login with Google
        </Button>
      </form>
    </div>
  );
}
