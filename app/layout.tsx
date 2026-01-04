import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Josh Earle",
  description: "Personal website and portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}

