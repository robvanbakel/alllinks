import { auth } from "@/auth";

export default auth((req) => {
  if (req.nextUrl.pathname !== "/dashboard") return;

  const newUrl = new URL("/dashboard/links", req.nextUrl.origin);
  return Response.redirect(newUrl);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
