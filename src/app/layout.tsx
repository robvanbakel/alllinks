import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/lib/tanstack-query";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

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
    <QueryProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </QueryProvider>
  );
}
