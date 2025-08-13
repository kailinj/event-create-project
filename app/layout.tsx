import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist_Mono, Moderustic } from "next/font/google";
import "./globals.css";

const moderustic = Moderustic({
  variable: "--font-moderustic",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User management",
  description: "Built with Next.js, Prisma, and Tailwind CSS via shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${moderustic.variable} ${geistMono.variable} antialiased`}
      >
        <div className="container py-4 mx-auto">
          <div className="flex-1">{children}</div>
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
