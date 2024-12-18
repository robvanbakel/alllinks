import { LandingPageFooter } from "@/app/(landing)/_components/footer";
import NavBar from "@/app/(landing)/_components/nav-bar";
import { Outfit } from "next/font/google";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className={`${outfit.className} dark flex min-h-screen flex-col bg-background bg-[radial-gradient(circle_at_50%_0,theme(colors.indigo.950)_0%,transparent)] text-foreground`}
    >
      <header className="container">
        <NavBar />
      </header>
      <main className="container grow py-24">
        <div className="flex flex-col items-center text-center">
          <h1 className="max-w-[10ch] text-balance text-8xl font-bold">
            All your links in{" "}
            <span className="bg-gradient-to-r from-fuchsia-500 to-violet-700 bg-clip-text text-transparent">
              one place
            </span>
            .
          </h1>
          <p className="mb-24 mt-16 max-w-prose text-pretty text-2xl">
            Collect links to all your channels in your own custom page. Easy to
            share, impossible to miss. Simplify your online presence today!
          </p>
          <Link
            href="/sign-up"
            className="group relative w-fit overflow-hidden rounded-full bg-fuchsia-500 px-16 py-6 text-xl font-semibold text-white shadow-2xl shadow-violet-700/35 ring-4 ring-violet-800 ring-offset-4 ring-offset-background transition-all hover:shadow-xl hover:shadow-violet-700/50 hover:ring-offset-8 active:shadow-none active:ring-offset-4"
          >
            Claim your page!
            <div className="absolute -left-1/4 -top-1/2 h-[180%] w-12 origin-center rotate-[30deg] rounded-full bg-white opacity-60 ease-in-out group-hover:left-[125%] group-hover:transition-all group-hover:duration-500" />
          </Link>
        </div>
      </main>
      <LandingPageFooter />
    </div>
  );
}
