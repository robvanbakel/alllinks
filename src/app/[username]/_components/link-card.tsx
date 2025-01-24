import { formatUrl } from "@/lib/utils/formatUrl";
import { Link } from "lucide-react";

export const LinkCard = ({
  data,
}: {
  data: { id: string; name: string; url: string };
}) => {
  return (
    <a
      href={data.url}
      role="button"
      className="shadow-xs relative block overflow-hidden rounded-lg bg-slate-50 p-4 transition-all duration-300 hover:scale-[102%] hover:bg-white hover:shadow-xl"
      target="_blank"
    >
      <h3 className="text-lg font-semibold text-slate-900">{data.name}</h3>
      <p className="truncate text-sm text-slate-500 transition-colors">
        <Link className="inline size-3" /> {formatUrl(data.url)}
      </p>
    </a>
  );
};
