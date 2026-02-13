import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NASA Space Explorer | Real-Time Space Data Dashboard",
  description: "Explore the universe with NASA's APIs - Astronomy pictures, Mars rovers, asteroids, and more",
  keywords: ["NASA", "space", "astronomy", "Mars", "asteroids", "APOD", "space exploration"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
