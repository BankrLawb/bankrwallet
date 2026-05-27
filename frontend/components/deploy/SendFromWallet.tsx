"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import {
  formatEther,
  isAddress,
  parseEther,
  type Address,
} from "viem";
import { explorerUrl } from "@/lib/chains";
import { sendEthFromCoinbaseSmartWallet } from "@/lib/smartWallet/sendEth";

export type SendableWallet = {
  wallet: Address;
  nonce: bigint;
};

function shorten(addr: string, chars = 4) {
  return `${addr.slice(0, 6)}…${addr.slice(-chars)}`;
}

type Props = {
  wallets: SendableWallet[];
};

export default function SendFromWallet({ wallets }: Props) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [selectedWallet, setSelectedWallet] = useState<Address | "">("");
  const [recipient, setRecipient] = useState("");
  const [amountEth, setAmountEth] = useState("");
  const [balance, setBalance] = useState<bigint | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [lastSendTx, setLastSendTx] = useState<`0x${string}` | null>(null);

  const walletOptions = useMemo(() => {
    const seen = new Set<string>();
    return wallets.filter((w) => {
      const key = w.wallet.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [wallets]);

  useEffect(() => {
    if (walletOptions.length === 0) {
      setSelectedWallet("");
      return;
    }
    const stillValid = walletOptions.some(
      (w) => w.wallet.toLowerCase() === selectedWallet.toLowerCase()
    );
    if (!selectedWallet || !stillValid) {
      setSelectedWallet(walletOptions[0].wallet);
    }
  }, [walletOptions, selectedWallet]);

  const selected = walletOptions.find(
    (w) => w.wallet.toLowerCase() === selectedWallet.toLowerCase()
  );

  const refreshBalance = useCallback(async () => {
    if (!publicClient || !selectedWallet || !isAddress(selectedWallet)) {
      setBalance(null);
      return;
    }
    setBalanceLoading(true);
    try {
      const bal = await publicClient.getBalance({
        address: selectedWallet as Address,
      });
      setBalance(bal);
    } catch {
      setBalance(null);
    } finally {
      setBalanceLoading(false);
    }
  }, [publicClient, selectedWallet]);

  useEffect(() => {
    void refreshBalance();
  }, [refreshBalance]);

  const amountWei = useMemo(() => {
    const trimmed = amountEth.trim();
    if (!trimmed) return null;
    try {
      return parseEther(trimmed);
    } catch {
      return null;
    }
  }, [amountEth]);

  const handleSend = async () => {
    if (
      !publicClient ||
      !walletClient ||
      !selected ||
      !recipient ||
      amountWei === null ||
      amountWei <= 0n
    ) {
      return;
    }
    if (!isAddress(recipient)) {
      setSendError("Invalid recipient address");
      return;
    }

    setSending(true);
    setSendError(null);
    setLastSendTx(null);

    try {
      const result = await sendEthFromCoinbaseSmartWallet({
        publicClient,
        walletClient,
        smartWalletAddress: selected.wallet,
        recipient: recipient as Address,
        amountWei,
      });
      setLastSendTx(result.transactionHash);
      setAmountEth("");
      void refreshBalance();
    } catch (err) {
      setSendError(
        err instanceof Error ? err.message.split("\n")[0] : "Send failed"
      );
    } finally {
      setSending(false);
    }
  };

  if (walletOptions.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-surface-border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        3. Send from smart wallet
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Transfer ETH from a deployed Coinbase Smart Wallet. Your connected wallet
        (the owner) signs a normal transaction; network gas is paid from that
        wallet, and the ETH amount is sent from the smart wallet balance.
      </p>

      <label className="mt-4 block text-sm font-medium text-gray-700">
        From (smart wallet)
        <select
          value={selectedWallet}
          onChange={(e) => setSelectedWallet(e.target.value as Address)}
          className="mt-1 w-full max-w-md rounded-lg border border-gray-200 px-3 py-2 font-mono text-sm focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
        >
          {walletOptions.map((w) => (
            <option key={`${w.wallet}-${w.nonce}`} value={w.wallet}>
              {shorten(w.wallet, 6)} (nonce {w.nonce.toString()})
            </option>
          ))}
        </select>
      </label>

      {balanceLoading && (
        <p className="mt-2 text-xs text-gray-400">Loading balance…</p>
      )}
      {balance !== null && !balanceLoading && (
        <p className="mt-2 font-mono text-xs text-gray-500">
          Balance: {formatEther(balance)} ETH
        </p>
      )}

      <label className="mt-4 block text-sm font-medium text-gray-700">
        To (recipient)
        <input
          type="text"
          placeholder="0x…"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 w-full max-w-md rounded-lg border border-gray-200 px-3 py-2 font-mono text-sm focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
        />
      </label>

      <label className="mt-4 block text-sm font-medium text-gray-700">
        Amount (ETH)
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.001"
          value={amountEth}
          onChange={(e) => setAmountEth(e.target.value)}
          className="mt-1 w-full max-w-xs rounded-lg border border-gray-200 px-3 py-2 font-mono text-sm focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple"
        />
      </label>
      {amountWei === null && amountEth.trim() !== "" && (
        <p className="mt-1 text-sm text-red-600">Invalid amount</p>
      )}

      <button
        type="button"
        className="btn-primary mt-6"
        disabled={
          sending ||
          !walletClient ||
          amountWei === null ||
          amountWei <= 0n ||
          !isAddress(recipient)
        }
        onClick={() => void handleSend()}
      >
        {sending ? "Sending…" : "Send ETH from smart wallet"}
      </button>

      {sendError && (
        <p className="mt-4 text-sm text-red-600">{sendError}</p>
      )}

      {lastSendTx && (
        <p className="mt-4 text-sm text-green-800">
          Sent.{" "}
          <a
            href={`${explorerUrl}/tx/${lastSendTx}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-brand-purple hover:underline"
          >
            {shorten(lastSendTx, 8)}
          </a>
        </p>
      )}
    </section>
  );
}
