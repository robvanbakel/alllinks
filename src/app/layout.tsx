import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AllLinks",
  description: "All your links in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
