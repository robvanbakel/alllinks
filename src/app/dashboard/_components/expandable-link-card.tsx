"use client";

import { LinkCardForm } from "@/app/dashboard/_components/link-card-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/api";
import { cn } from "@/lib/utils";
import { formatUrl } from "@/lib/utils/formatUrl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, Loader2, Trash } from "lucide-react";
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

  const queryClient = useQueryClient();

  const { mutate: deleteLink, isPending: isDeletePending } = useMutation({
    mutationFn: () => client.link[":id"].$delete({ param: { id: link.id } }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["links-list"] });

      toast({
        title: "Link deleted",
        description: `${link.name} has been successfully deleted!`,
      });
    },
  });

  const afterSubmit = (formData: { name: string; url: string }) => {
    setOptimisticData(formData);
    setIsOpen(false);
  };

  const displayedData = optimisticData ?? link;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg shadow-slate-600/5">
      <div
        role="button"
        className="group flex cursor-pointer select-none items-center justify-between p-4 transition-all"
        onClick={() => setIsOpen((v) => !v)}
      >
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {displayedData.name}
          </h3>
          <p className="truncate text-sm text-slate-500 transition-colors">
            <Link className="inline size-3" /> {formatUrl(displayedData.url)}
          </p>
        </div>
        <div
          className={cn("space-x-2", { "hidden group-hover:block": !isOpen })}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              deleteLink();
            }}
            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
            size="icon"
            variant="ghost"
          >
            {isDeletePending ? <Loader2 className="animate-spin" /> : <Trash />}
          </Button>
        </div>
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
