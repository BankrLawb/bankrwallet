import { configuredChainId } from "@/lib/chains";
import { getActiveCdpRpcUrl } from "@/lib/cdp";

const bundlerUrlEnv = process.env.NEXT_PUBLIC_BUNDLER_URL?.trim();
const pimlicoApiKey = process.env.NEXT_PUBLIC_PIMLICO_API_KEY?.trim();

/** Pimlico bundler RPC for a chain (see dashboard.pimlico.io). */
export function getPimlicoBundlerUrl(
  chainId: number,
  apiKey: string
): string {
  return `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${encodeURIComponent(apiKey)}`;
}

/**
 * ERC-4337 bundler URL for send (UserOperations).
 * Priority: NEXT_PUBLIC_BUNDLER_URL → Pimlico API key → CDP (OnchainKit).
 */
export function getBundlerUrl(): string | null {
  if (bundlerUrlEnv) return bundlerUrlEnv;
  if (pimlicoApiKey) {
    return getPimlicoBundlerUrl(configuredChainId, pimlicoApiKey);
  }
  return getActiveCdpRpcUrl();
}

export const hasBundler = Boolean(getBundlerUrl());
