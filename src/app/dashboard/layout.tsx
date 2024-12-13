import ClaimUsernameBanner from "@/app/dashboard/_components/claim-username-banner";
import { NavBar } from "@/app/dashboard/_components/nav-bar";
import { Toaster } from "@/components/ui/toaster";
import { PropsWithChildren } from "react";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavBar />
      <div className="container">
        <ClaimUsernameBanner />
      </div>
      <div className="container mt-8">{children}</div>
      <Toaster />
    </>
  );
}
