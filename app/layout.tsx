import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mustakim.me"),
  title: "Shah Abdul Mustakim — Staff Software Engineer",
  description:
    "Staff Software Engineer & System Architect building high-scale distributed systems, real-time IoT pipelines and AI-driven enterprise platforms.",
  openGraph: { title: "Shah Abdul Mustakim", description: "Staff Software Engineer | System Architect | Mobile & Web Engineering Leader", url: "https://mustakim.me", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={display.variable}>{children}</body>
    </html>
  );
}
