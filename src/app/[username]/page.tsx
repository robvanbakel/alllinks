import { LinkPageFooter } from "@/app/[username]/_components/footer";
import { LinkCard } from "@/app/[username]/_components/link-card";
import { db } from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { z } from "zod";

type PageProps = {
  params: Promise<{ username: string }>;
};

const LinkPageDataSchema = z.object({
  displayName: z.string(),
  username: z.string(),
  links: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      url: z.string().url(),
    }),
  ),
});

const fetchData = async ({
  params,
}: PageProps): Promise<z.infer<typeof LinkPageDataSchema>> => {
  const username = (await params).username;

  try {
    const data = await db.query.UsersTable.findFirst({
      where: eq(UsersTable.username, username),
      with: {
        links: true,
      },
    });

    if (!data?.links.length) throw new Error("No links found");

    const parsedData = LinkPageDataSchema.parse(data);

    return parsedData;
  } catch {
    return notFound();
  }
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const { displayName, links } = await fetchData(props);

  return {
    title: `${displayName} | AllLinks`,
    description: `Visit ${links.length} links by ${displayName}.`,
  };
};

export default async function UserPage(props: PageProps) {
  const { displayName, username, links } = await fetchData(props);

  return (
    <div className="flex min-h-svh flex-col bg-slate-200 bg-[url(/bg.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="grow">
        <div className="mx-auto max-w-xl p-4 sm:p-6 md:p-8 lg:max-w-2xl lg:p-12 xl:p-16 2xl:p-24">
          <div className="overflow-hidden rounded-xl shadow-2xl shadow-slate-900/15">
            <header className="bg-slate-800 p-8 text-center text-white backdrop-blur-2xl">
              <h1 className="text-3xl font-bold tracking-tight">
                {displayName}
              </h1>
              <h4 className="-mb-1.5 mt-1.5 font-medium text-slate-400">
                @{username}
              </h4>
            </header>
            <div className="bg-slate-100/50 p-4 backdrop-blur-2xl sm:p-6 md:p-8">
              <ul className="space-y-4 sm:space-y-6">
                {links.map((link) => (
                  <li key={link.id}>
                    <LinkCard data={link} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <LinkPageFooter />
    </div>
  );
}
