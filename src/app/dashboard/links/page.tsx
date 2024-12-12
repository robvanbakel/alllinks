"use client";

import { DashboardPageWrapper } from "@/app/dashboard/_components/dashboard-page-wrapper";
import { ExpandableLinkCard } from "@/app/dashboard/_components/expandable-link-card";
import { NewLinkCard } from "@/app/dashboard/_components/new-link-card";
import { client } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function DashboardLinksPage() {
  const { data: links, isLoading } = useQuery({
    queryKey: ["links-list"],
    queryFn: async () => {
      const res = await client.link.$get();
      const data = await res.json();
      return data;
    },
  });

  return (
    <DashboardPageWrapper title="Your links">
      <div className="mx-auto max-w-md space-y-4">
        {isLoading ? (
          <Loader2 className="mx-auto animate-spin text-violet-600" />
        ) : (
          <>
            {links?.map((link) => (
              <ExpandableLinkCard link={link} key={link.id} />
            ))}
            <NewLinkCard />
          </>
        )}
      </div>
    </DashboardPageWrapper>
  );
}
