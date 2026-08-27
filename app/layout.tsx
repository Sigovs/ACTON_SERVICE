import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tire & Wheel Service in Acton, MA | Acton Autowerks",
  description:
    "Tire replacement, mounting, balancing, repair, and wheel alignment in Acton, MA for daily drivers and the European and performance vehicles we specialize in. Call (978) 429-8913.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
