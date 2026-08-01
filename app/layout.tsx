import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harshal Singh — Software Engineer",
  description:
    "Full-stack engineer building scalable web apps with React, Next.js & Node.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grain">
        <div className="relative min-h-screen flex flex-col">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
