import { isMainnet } from "@/lib/chains";
import { onchainKitApiKey } from "@/lib/onchainkit";

/** CDP Node RPC for a network — also supports ERC-4337 bundler methods. */
export function getCdpRpcUrl(
  chainSlug: "base" | "base-sepolia"
): string | null {
  if (!onchainKitApiKey) return null;
  return `https://api.developer.coinbase.com/rpc/v1/${chainSlug}/${onchainKitApiKey}`;
}

/** CDP RPC for the chain selected in NEXT_PUBLIC_CHAIN_ID. */
export function getActiveCdpRpcUrl(): string | null {
  return getCdpRpcUrl(isMainnet ? "base" : "base-sepolia");
}
