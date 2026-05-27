"use client";

import Link from "next/link";
import { WalletConnect } from "@/components/wallet/WalletConnect";

export default function NavActions() {
  return (
    <div className="flex items-center gap-3">
      <WalletConnect />
      <Link href="/deploy" className="btn-primary text-xs md:text-sm">
        Deploy Wallet
      </Link>
    </div>
  );
}
