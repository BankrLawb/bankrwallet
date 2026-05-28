"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useAccount,
  usePublicClient,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { decodeEventLog, formatEther, parseEther, type Address } from "viem";
import {
  configuredChainId,
  explorerUrl,
  isMainnet,
} from "@/lib/chains";
import SendFromWallet, {
  type SendableWallet,
} from "@/components/deploy/SendFromWallet";
import { WalletConnect } from "@/components/wallet/WalletConnect";
import {
  factoryAbi,
  getDeployCount,
  getFactoryAddress,
  getNextNonce,
  listDeployedWalletsForOwner,
  ownersForEoa,
} from "@/lib/contracts/coinbaseSmartWalletFactory";

type DeployedWallet = {
  wallet: `0x${string}`;
  seeded: bigint;
  transactionHash: `0x${string}`;
  blockNumber: bigint;
  nonce: bigint;
};

function shorten(addr: string, chars = 4) {
  return `${addr.slice(0, 6)}…${addr.slice(-chars)}`;
}

export default function DeployPanel() {
  const factoryAddress = getFactoryAddress();
  const chainLabel = isMainnet ? "Base Mainnet" : "Base Sepolia";

  const { address, isConnected, chain } = useAccount();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const publicClient = usePublicClient();

  const [seedEth, setSeedEth] = useState("");
  const [history, setHistory] = useState<DeployedWallet[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [lastDeployed, setLastDeployed] = useState<DeployedWallet | null>(null);
  const [deployCount, setDeployCount] = useState<bigint | null>(null);
  const [nextNonce, setNextNonce] = useState<bigint | null>(null);
  const [nonceLoading, setNonceLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const wrongChain = isConnected && chain?.id !== configuredChainId;

  const owners = useMemo(
    () => (address ? ownersForEoa(address as Address) : undefined),
    [address]
  );

  const refreshNonce = useCallback(async () => {
    if (!publicClient || !owners) {
      setDeployCount(null);
      setNextNonce(null);
      return;
    }
    setNonceLoading(true);
    try {
      const count = await getDeployCount(publicClient, factoryAddress, owners);
      setDeployCount(count);
      setNextNonce(count);
    } catch {
      setDeployCount(null);
      setNextNonce(null);
    } finally {
      setNonceLoading(false);
    }
  }, [publicClient, factoryAddress, owners]);

  useEffect(() => {
    void refreshNonce();
  }, [refreshNonce]);

  const {
    writeContract,
    data: txHash,
    isPending: isWriting,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({ hash: txHash });

  const fetchHistory = useCallback(async () => {
    if (!publicClient || !address || !owners) {
      setHistory([]);
      setHistoryError(null);
      return;
    }

    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const records = await listDeployedWalletsForOwner(
        publicClient,
        factoryAddress,
        owners
      );

      const rows: DeployedWallet[] = records.map((r) => ({
        wallet: r.wallet,
        seeded: r.seeded,
        transactionHash: r.transactionHash ?? ("0x" as `0x${string}`),
        blockNumber: r.blockNumber ?? 0n,
        nonce: r.nonce,
      }));

      setHistory(rows);
    } catch (err) {
      setHistory([]);
      setHistoryError(
        err instanceof Error ? err.message.split("\n")[0] : "Failed to load deployments"
      );
    } finally {
      setHistoryLoading(false);
    }
  }, [publicClient, factoryAddress, address, owners]);

  useEffect(() => {
    void fetchHistory();
  }, [fetchHistory, isConfirmed]);

  useEffect(() => {
    if (!isConfirmed || !txHash || !publicClient) return;

    void (async () => {
      const receipt = await publicClient.getTransactionReceipt({ hash: txHash });
      const tx = await publicClient.getTransaction({ hash: txHash });

      for (const log of receipt.logs) {
        if (log.address.toLowerCase() !== factoryAddress.toLowerCase()) continue;
        try {
          const decoded = decodeEventLog({
            abi: factoryAbi,
            data: log.data,
            topics: log.topics,
          });
          if (decoded.eventName !== "AccountCreated") continue;

          const row: DeployedWallet = {
            wallet: decoded.args.account as `0x${string}`,
            seeded: tx.value,
            transactionHash: txHash,
            blockNumber: receipt.blockNumber,
            nonce: decoded.args.nonce as bigint,
          };
          setLastDeployed(row);
          void fetchHistory();
          void refreshNonce();
          return;
        } catch {
          /* try next log */
        }
      }
    })();
  }, [isConfirmed, txHash, publicClient, factoryAddress, fetchHistory, refreshNonce]);

  const seedValue = useMemo(() => {
    const trimmed = seedEth.trim();
    if (!trimmed || trimmed === "0") return BigInt(0);
    try {
      return parseEther(trimmed);
    } catch {
      return null;
    }
  }, [seedEth]);

  const handleDeploy = async () => {
    if (!owners || !address || seedValue === null || !publicClient) return;
    resetWrite();
    setLastDeployed(null);

    const nonce =
      nextNonce ?? (await getNextNonce(publicClient, factoryAddress, owners));

    writeContract({
      address: factoryAddress,
      abi: factoryAbi,
      functionName: "createAccount",
      args: [owners, nonce],
      value: seedValue,
      chainId: configuredChainId,
    });
  };

  const txError = writeError ?? receiptError;
  const isDeploying = isWriting || isConfirming;

  const sendableWallets: SendableWallet[] = useMemo(() => {
    const rows: SendableWallet[] = history.map((r) => ({
      wallet: r.wallet,
      nonce: r.nonce,
    }));
    if (lastDeployed) {
      rows.push({ wallet: lastDeployed.wallet, nonce: lastDeployed.nonce });
    }
    return rows;
  }, [history, lastDeployed]);

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-surface-border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">1. Connect wallet</h2>
        <p className="mt-1 text-sm text-gray-600">
          Your connected address becomes the owner of each new Coinbase Smart Wallet.
        </p>

        <p className="mt-4 text-sm text-gray-600">
          Sign in with Coinbase Smart Wallet (email or passkey) or a browser extension.
        </p>
        <div className="mt-4">
          <WalletConnect />
        </div>
        {isConnected && (
          <p className="mt-3 font-mono text-sm text-gray-700">{shorten(address!, 6)}</p>
        )}
      </section>

      {isConnected && wrongChain && (
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm text-amber-900">
            Switch to <strong>{chainLabel}</strong> to deploy.
          </p>
          <button
            type="button"
            className="btn-primary mt-4"
            disabled={isSwitching}
            onClick={() => switchChain({ chainId: configuredChainId })}
          >
            {isSwitching ? "Switching…" : `Switch to ${chainLabel}`}
          </button>
        </section>
      )}

      {isConnected && !wrongChain && (
        <section className="rounded-xl border border-surface-border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">2. Deploy smart wallet</h2>
          <p className="mt-1 text-sm text-gray-600">
            Calls{" "}
            <code className="rounded bg-gray-100 px-1">createAccount()</code> on the
            Coinbase Smart Wallet factory (v1.1) on {chainLabel}. Optional ETH is seeded
            into the new wallet.
          </p>

          {deployCount !== null && !nonceLoading && (
            <p className="mt-3 font-mono text-xs text-gray-500">
              Your deploy count: {deployCount.toString()}
              {nextNonce !== null && ` · next nonce: ${nextNonce.toString()}`}
            </p>
          )}
          {nonceLoading && (
            <p className="mt-3 font-mono text-xs text-gray-400">Loading nonce…</p>
          )}

          <label className="mt-4 block text-sm font-medium text-gray-700">
            Seed ETH (optional)
            <input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={seedEth}
              onChange={(e) => setSeedEth(e.target.value)}
              className="mt-1 w-full max-w-xs rounded-lg border border-gray-200 px-3 py-2 font-mono text-sm focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
            />
          </label>
          {seedValue === null && seedEth.trim() !== "" && (
            <p className="mt-1 text-sm text-red-600">Invalid ETH amount</p>
          )}

          <button
            type="button"
            className="btn-primary mt-6"
            disabled={isDeploying || seedValue === null || nonceLoading}
            onClick={() => void handleDeploy()}
          >
            {isDeploying ? "Deploying…" : "Deploy Coinbase Smart Wallet"}
          </button>

          {txError && (
            <p className="mt-4 text-sm text-red-600">
              {txError.message.split("\n")[0]}
            </p>
          )}

          {txHash && (
            <p className="mt-4 text-sm text-gray-600">
              Tx:{" "}
              <a
                href={`${explorerUrl}/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-brand-purple hover:underline"
              >
                {shorten(txHash, 8)}
              </a>
              {isConfirming && " — confirming…"}
            </p>
          )}

          {isConfirmed && lastDeployed && (
            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900">
              <p className="font-semibold">Wallet deployed</p>
              <p className="mt-2 font-mono break-all">{lastDeployed.wallet}</p>
              <p className="mt-1">Seeded: {formatEther(lastDeployed.seeded)} ETH</p>
              <p className="mt-1 font-mono text-xs text-green-800">
                Nonce: {lastDeployed.nonce.toString()}
              </p>
              <a
                href={`${explorerUrl}/address/${lastDeployed.wallet}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-brand-purple hover:underline"
              >
                View on Basescan →
              </a>
            </div>
          )}
        </section>
      )}

      {isConnected && !wrongChain && (
        <section className="rounded-xl border border-surface-border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Your deployments</h2>
            <button
              type="button"
              className="text-sm text-brand-purple hover:underline"
              onClick={() => void fetchHistory()}
              disabled={historyLoading}
            >
              {historyLoading ? "Loading…" : "Refresh"}
            </button>
          </div>

          {historyError && (
            <p className="mt-4 text-sm text-red-600">{historyError}</p>
          )}

          {history.length === 0 && !historyLoading && !historyError && (
            <p className="mt-4 text-sm text-gray-500">
              {deployCount !== null && deployCount > 0n
                ? "Deployments found on-chain but could not load details. Try Refresh."
                : "No wallets deployed yet."}
            </p>
          )}

          {history.length > 0 && (
            <ul className="mt-4 divide-y divide-gray-100">
              {history.map((row) => (
                <li
                  key={`${row.wallet}-${row.nonce.toString()}`}
                  className="py-4"
                >
                  <p className="font-mono text-sm break-all text-gray-800">{row.wallet}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Nonce {row.nonce.toString()} · Seeded {formatEther(row.seeded)} ETH
                    {row.transactionHash !== "0x" && (
                      <>
                        {" · "}
                        <a
                          href={`${explorerUrl}/tx/${row.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-purple hover:underline"
                        >
                          tx
                        </a>
                      </>
                    )}
                    {" · "}
                    <a
                      href={`${explorerUrl}/address/${row.wallet}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-purple hover:underline"
                    >
                      wallet
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {isConnected && !wrongChain && (
        <SendFromWallet wallets={sendableWallets} />
      )}

      <p className="text-xs text-gray-400">
        Factory (v1.1):{" "}
        <a
          href={`${explorerUrl}/address/${factoryAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono hover:underline"
        >
          {shorten(factoryAddress, 6)}
        </a>
      </p>
    </div>
  );
}
