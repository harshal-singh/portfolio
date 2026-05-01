import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harshal Singh — Software Engineer",
  description:
    "Full-stack engineer with 4+ years building scalable web apps. React, Next.js & Node.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grain">
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-16 overflow-x-clip">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
