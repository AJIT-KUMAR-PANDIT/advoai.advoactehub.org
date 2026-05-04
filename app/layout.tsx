import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdvoAI",
  description: "A Next.js legal AI assistant wrapper for Duck.ai."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
