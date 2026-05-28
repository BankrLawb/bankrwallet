import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import { OnchainKitStyles } from "@/components/OnchainKitStyles";
import Web3Provider from "@/components/providers/Web3Provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "BankrLawb - Agentic Wallet Framework",
  description:
    "Secure your agent. Spin up as many Smart Wallets as you want on Base. Self-custodied, no seed phrase, Infinite Rails.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "BankrLawb - Agentic Wallet Framework",
    description:
      "Deploy Smart Wallets on Base. Self-custodied, agentic, Infinite Rails.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <head>
        <OnchainKitStyles />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
