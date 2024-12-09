import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">AllLinks page not found!</h1>
      <p>
        Please check the url or visit{" "}
        <Link href="/" className="font-semibold hover:underline">
          AllLinks.app
        </Link>{" "}
        to learn more.
      </p>
    </div>
  );
}
