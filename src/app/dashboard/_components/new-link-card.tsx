"use client";

import { LinkCardForm } from "@/app/dashboard/_components/link-card-form";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";

export const NewLinkCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const afterSubmit = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={cn(
        "rounded-lg  border-dashed border-slate-300 transition-all",
        isOpen ? "bg-white shadow-lg shadow-slate-600/5" : "border",
      )}
    >
      <div
        role="button"
        className="group flex h-20 select-none items-center justify-center p-4"
        onClick={() => setIsOpen((v) => !v)}
      >
        <Plus
          className={cn(
            "size-6  transition-all duration-200 text-slate-400 group-hover:text-slate-600",
            { "rotate-45": isOpen },
          )}
        />
      </div>
      <div
        className={cn(
          "grid transition-all duration-200",
          isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden px-4">
          <div className="border-t border-slate-200 pt-4 text-sm/6 text-slate-800">
            <LinkCardForm afterSubmit={afterSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
