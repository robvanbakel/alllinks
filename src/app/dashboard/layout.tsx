import { NavBar } from "@/app/dashboard/_components/nav-bar";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavBar />
      <div className="container mt-8">{children}</div>
    </>
  );
}
