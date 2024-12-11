import { PropsWithChildren } from "react";

export const DashboardPageWrapper = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <>
      <header>
        <h1 className="text-3xl font-bold">{title}</h1>
      </header>
      <main className="mt-6 rounded-xl bg-slate-100 p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </>
  );
};
