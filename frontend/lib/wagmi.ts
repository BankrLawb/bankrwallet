import { createConfig, http } from "wagmi";
import { coinbaseWallet, injected } from "@/lib/connectors";
import { base, baseSepolia } from "viem/chains";
import { getCdpRpcUrl } from "@/lib/cdp";
import {
  configuredChain,
  configuredChainId,
  defaultRpcUrl,
  isMainnet,
  rpcUrl,
} from "@/lib/chains";
import { onchainKitAppLogoUrl, onchainKitAppName } from "@/lib/onchainkit";

const mainnetRpc =
  getCdpRpcUrl("base") ??
  (isMainnet && process.env.NEXT_PUBLIC_RPC_URL?.trim()
    ? rpcUrl
    : "https://mainnet.base.org");

const sepoliaRpc =
  getCdpRpcUrl("base-sepolia") ??
  (!isMainnet && process.env.NEXT_PUBLIC_RPC_URL?.trim()
    ? rpcUrl
    : defaultRpcUrl);

const activeRpc = configuredChainId === base.id ? mainnetRpc : sepoliaRpc;

export const wagmiConfig = createConfig({
  chains: [configuredChain],
  connectors: [
    coinbaseWallet({
      appName: onchainKitAppName,
      appLogoUrl: onchainKitAppLogoUrl,
      preference: "all",
    }),
    injected(),
  ],
  transports: {
    [base.id]: http(mainnetRpc),
    [baseSepolia.id]: http(sepoliaRpc),
    [configuredChain.id]: http(activeRpc),
  },
  ssr: true,
});
