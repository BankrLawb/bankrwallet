"use client";

import Link from "next/link";
import { WalletConnect } from "@/components/wallet/WalletConnect";

export default function NavActions() {
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
      <WalletConnect compact />
      <Link
        href="/deploy"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-brand-purple px-2.5 py-2 text-[10px] font-semibold uppercase tracking-wide text-white transition hover:bg-brand-purple-dark sm:px-6 sm:py-3 sm:text-sm sm:tracking-normal"
      >
        Launch Smart Wallet
      </Link>
    </div>
  );
}
