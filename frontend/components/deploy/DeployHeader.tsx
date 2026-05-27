"use client";

import Image from "next/image";
import Link from "next/link";
import { WalletConnect } from "@/components/wallet/WalletConnect";

export default function DeployHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-white/90 backdrop-blur-md">
      <div className="section-container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="BankrLawb"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            BankrLawb
          </span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link
            href="/docs"
            className="hidden text-sm text-gray-600 transition hover:text-gray-900 sm:block"
          >
            Docs
          </Link>
          <Link
            href="/"
            className="hidden text-sm text-gray-600 transition hover:text-gray-900 sm:block"
          >
            Home
          </Link>
          <WalletConnect />
        </nav>
      </div>
    </header>
  );
}
