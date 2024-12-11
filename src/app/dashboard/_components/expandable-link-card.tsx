"use client";

import { LinkCardForm } from "@/app/dashboard/_components/link-card-form";
import { cn, formatUrl } from "@/lib/utils";
import { Link } from "lucide-react";
import { useState } from "react";

export const ExpandableLinkCard = ({
  link,
}: {
  link: { id: string; name: string; url: string };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [optimisticData, setOptimisticData] = useState<{
    name: string;
    url: string;
  }>();

  const afterSubmit = (formData: { name: string; url: string }) => {
    setOptimisticData(formData);
    setIsOpen(false);
  };

  const displayedData = optimisticData ?? link;

  return (
    <div className="rounded-lg bg-white shadow-lg shadow-slate-600/5">
      <div
        role="button"
        className="select-none p-4"
        onClick={() => setIsOpen((v) => !v)}
      >
        <h3 className="text-lg font-semibold text-slate-900">
          {displayedData.name}
        </h3>
        <p className="truncate text-sm text-slate-500 transition-colors">
          <Link className="inline size-3" /> {formatUrl(displayedData.url)}
        </p>
      </div>
      <div
        className={cn(
          "grid transition-all duration-200",
          isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden px-4">
          <div className="border-t border-slate-200 pt-4 text-sm/6 text-slate-800">
            <LinkCardForm link={link} afterSubmit={afterSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
