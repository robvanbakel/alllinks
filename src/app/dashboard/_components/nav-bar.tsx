import NavBarNavigation from "@/app/dashboard/_components/nav-bar-navigation";
import NavBarProfile from "@/app/dashboard/_components/nav-bar-profile";
import Logo from "@/assets/logo";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="container flex flex-col items-center gap-12 py-6 md:flex-row md:gap-16">
      <Link href="/dashboard">
        <Logo className="text-foreground" size={80} />
      </Link>
      <NavBarNavigation />
      <NavBarProfile />
    </nav>
  );
};
