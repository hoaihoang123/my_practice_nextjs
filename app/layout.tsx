import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyNext Blog",
  description: "A modern blog built with Next.js, Tailwind CSS, and shadcn/ui.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <main>{children}</main>
      </body>
    </html>
  );
}
