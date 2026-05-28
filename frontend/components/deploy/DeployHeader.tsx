"use client";

import Image from "next/image";
import Link from "next/link";
import { WalletConnect } from "@/components/wallet/WalletConnect";

export default function DeployHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-white/90 backdrop-blur-md">
      <div className="section-container flex h-16 items-center justify-between">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
          <Image
            src="/logo.png"
            alt="BnkLab"
            width={36}
            height={36}
            className="h-8 w-8 shrink-0 rounded-lg sm:h-9 sm:w-9"
          />
          <span className="truncate text-base font-semibold tracking-tight text-gray-900 sm:text-lg">
            BnkLab
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
          <WalletConnect variant="purple" />
        </nav>
      </div>
    </header>
  );
}
