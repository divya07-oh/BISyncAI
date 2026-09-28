import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CommandPalette from "@/components/CommandPalette";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "BIS AI - Intelligent Gateway to Indian Standards",
  description: "Search, understand, verify and analyze BIS standards using an AI-powered professional workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Toaster position="top-right" />
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
