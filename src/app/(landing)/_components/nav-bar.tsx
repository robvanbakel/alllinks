import Logo from "@/assets/logo";
import { buttonVariants } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  return (
    <div
      className="flex flex-col items-center justify-between gap-8 py-6
    md:flex-row"
    >
      <Link href="/">
        <Logo size={90} />
      </Link>
      <Link
        href="/sign-in"
        className={buttonVariants({
          variant: "outline",
          className:
            "py-6 gap-4 bg-transparent hover:bg-foreground/5 active:bg-foreground/10 border-white/25",
        })}
      >
        <LogIn />
        Log in
      </Link>
    </div>
  );
}
