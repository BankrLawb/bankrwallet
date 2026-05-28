"use client";

import Link from "next/link";
import { WalletConnect } from "@/components/wallet/WalletConnect";

export default function NavActions() {
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
      <WalletConnect compact />
      <Link
        href="/deploy"
        className="btn-primary whitespace-nowrap px-3 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm"
      >
        <span className="sm:hidden">Deploy</span>
        <span className="hidden sm:inline">Deploy Wallet</span>
      </Link>
    </div>
  );
}
