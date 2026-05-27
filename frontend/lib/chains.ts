import { base, baseSepolia } from "viem/chains";

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? "84532");

export const configuredChain =
  chainId === base.id ? base : chainId === baseSepolia.id ? baseSepolia : baseSepolia;

export const configuredChainId = configuredChain.id;

export const isMainnet = configuredChainId === base.id;

export const explorerUrl = isMainnet
  ? "https://basescan.org"
  : "https://sepolia.basescan.org";

export const defaultRpcUrl = isMainnet
  ? "https://mainnet.base.org"
  : "https://sepolia.base.org";

export const rpcUrl =
  process.env.NEXT_PUBLIC_RPC_URL?.trim() || defaultRpcUrl;
