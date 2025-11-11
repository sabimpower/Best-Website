import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flash USDT Generator – Instant Tether Generator 2025",
  description: "Generate free USDT instantly with our Flash USDT Generator 2025. Fast, secure, and easy-to-use Tether generator tool designed for instant wallet transactions and unlimited crypto generation.",
  keywords: ["Flash USDT Generator", "Free USDT Generator", "Instant Tether Generator", "USDT Flash Tool", "Crypto USDT Generator", "Tether Generator 2025", "USDT Wallet Generator", "Flash Tether Transaction", "Generate USDT Instantly", "Free Crypto Generator"],
  authors: [{ name: "FLASH" }],
  icons: {
    icon: "https://i.postimg.cc/25yK8Hcy/1000051467-removebg-preview.png",
  },
  openGraph: {
    title: "Z.ai Code Scaffold",
    description: "AI-powered development with modern React stack",
    url: "https://chat.z.ai",
    siteName: "Z.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Z.ai Code Scaffold",
    description: "AI-powered development with modern React stack",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
