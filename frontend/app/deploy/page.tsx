import type { Metadata } from "next";
import DeployHeader from "@/components/deploy/DeployHeader";
import DeployPanel from "@/components/deploy/DeployPanel";
import { configuredChain, isMainnet } from "@/lib/chains";

export const metadata: Metadata = {
  title: "Deploy Smart Wallet - BnkLab",
  description:
    "Deploy a Smart Wallet on Base owned by your connected address.",
};

export default function DeployPage() {
  const chainLabel = isMainnet ? "Base Mainnet" : "Base Sepolia";

  return (
    <>
      <DeployHeader />

      <main className="section-container py-16 md:py-24">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-purple-light">
          {chainLabel}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Deploy a Smart Wallet
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600">
          Connect your wallet and call{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">
            createAccount()
          </code>{" "}
          on the Smart Wallet factory (v1.1). You own the new smart wallet on{" "}
          {configuredChain.name}; optional ETH seeds it in the same transaction. Send
          ETH from a deployed wallet in step 3 (owner signs via MetaMask).
        </p>

        <div className="mt-12 max-w-2xl">
          <DeployPanel />
        </div>
      </main>
    </>
  );
}
