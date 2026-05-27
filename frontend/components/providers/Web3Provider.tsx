"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { configuredChain, rpcUrl } from "@/lib/chains";
import { hasBundler } from "@/lib/bundler";
import {
  hasOnchainKitApiKey,
  onchainKitApiKey,
  onchainKitAppLogoUrl,
  onchainKitAppName,
} from "@/lib/onchainkit";
import { wagmiConfig } from "@/lib/wagmi";

export default function Web3Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={onchainKitApiKey}
          chain={configuredChain}
          rpcUrl={rpcUrl}
          config={{
            appearance: {
              name: onchainKitAppName,
              logo: onchainKitAppLogoUrl,
              mode: "light",
            },
            wallet: {
              display: "modal",
            },
          }}
        >
          {!hasOnchainKitApiKey &&
            !hasBundler &&
            process.env.NODE_ENV === "development" && (
              <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-900">
                Set{" "}
                <code className="rounded bg-amber-100 px-1">
                  NEXT_PUBLIC_BUNDLER_URL
                </code>{" "}
                (Pimlico) or{" "}
                <code className="rounded bg-amber-100 px-1">
                  NEXT_PUBLIC_ONCHAINKIT_API_KEY
                </code>{" "}
                in <code className="rounded bg-amber-100 px-1">.env.local</code>{" "}
                for smart-wallet sends.
              </div>
            )}
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
