"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClaimUsernameBanner() {
  const pathname = usePathname();

  if (pathname === "/dashboard/settings") return null;

  return (
    <div className="rounded-xl bg-violet-600 p-4 text-primary-foreground md:p-6 lg:p-8">
      <h4 className="font-bold">Finalize your registration</h4>
      <p className="mt-1 text-sm">
        Create your own AllLinks page by creating a unique username.
      </p>
      <Link
        href="/dashboard/settings"
        className={cn(buttonVariants({ className: "dark" }), "mt-6 group")}
      >
        Settings <ChevronRight className="transition-all group-hover:-ml-1" />
      </Link>
    </div>
  );
}
