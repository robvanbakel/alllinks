import Link from "next/link";

export const LinkPageFooter = () => {
  return (
    <Link href="/" className="group">
      <footer className="bg-slate-800 p-4 text-center text-sm font-semibold text-white">
        &copy; {new Date().getFullYear()} AllLinks –{" "}
        <span className="group-hover:underline">Create your own page now!</span>
      </footer>
    </Link>
  );
};
