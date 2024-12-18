import Link from "next/link";

export const LandingPageFooter = () => {
  return (
    <footer className="p-6 text-center text-sm">
      &copy; {new Date().getFullYear()} -{" "}
      <Link
        href="/"
        className="font-semibold underline-offset-4 hover:underline"
      >
        AllLinks
      </Link>
    </footer>
  );
};
