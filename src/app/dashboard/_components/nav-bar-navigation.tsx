"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems: {
  label: string;
  route: string;
}[] = [
  {
    label: "Links",
    route: "/dashboard/links",
  },
];

export default function NavBarNavigation() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-8 text-center text-sm font-semibold md:flex-row md:gap-6">
      {navItems.map(({ label, route }) => (
        <li key={label}>
          <Link
            className={cn(
              "p-2.5 transition-colors ",
              pathname === route
                ? "border-b-2 border-violet-600 text-foreground"
                : "text-foreground/50 hover:text-foreground/90",
            )}
            href={route}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
