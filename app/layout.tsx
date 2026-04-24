import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Qoves — Personalised facial analysis",
  description:
    "Understand your facial features and start your glow-up today with a proven action plan, no plastic surgery needed.",
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
