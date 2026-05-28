"use client";

import { Avatar, Name } from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";

type WalletConnectProps = {
  /** Tighter layout for the main nav on small screens */
  compact?: boolean;
  /** Purple CTA styling (deploy page) */
  variant?: "default" | "purple";
};

export function WalletConnect({
  compact = false,
  variant = "default",
}: WalletConnectProps) {
  const buttonClass = compact
    ? "!min-w-0 rounded-md px-3 py-2 text-xs font-semibold sm:px-4 sm:py-2.5 sm:text-sm"
    : "!min-w-0 rounded-md px-4 py-2.5 text-sm font-semibold";

  const variantClass =
    variant === "purple"
      ? "!border-0 !bg-brand-purple !text-white hover:!bg-brand-purple-dark"
      : "";

  return (
    <Wallet>
      <ConnectWallet
        className={[buttonClass, variantClass].filter(Boolean).join(" ")}
        disconnectedLabel={
          compact ? (
            <>
              <span className="sm:hidden">Connect</span>
              <span className="hidden sm:inline">Connect wallet</span>
            </>
          ) : (
            "Connect wallet"
          )
        }
      >
        <Avatar className={compact ? "h-5 w-5 sm:h-6 sm:w-6" : "h-6 w-6"} />
        <Name
          className={
            compact
              ? "hidden max-w-[5.5rem] truncate sm:inline sm:max-w-[7rem]"
              : undefined
          }
        />
      </ConnectWallet>
      <WalletDropdown>
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  );
}
