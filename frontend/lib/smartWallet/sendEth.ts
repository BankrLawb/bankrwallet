import {
  type Address,
  type Hash,
  type PublicClient,
  type WalletClient,
} from "viem";
import { configuredChain } from "@/lib/chains";

/** Minimal ABI for owner-direct calls (no ERC-4337 bundler). */
const executeAbi = [
  {
    type: "function",
    name: "execute",
    inputs: [
      { name: "target", type: "address" },
      { name: "value", type: "uint256" },
      { name: "data", type: "bytes" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
] as const;

export type SendFromSmartWalletResult = {
  transactionHash: Hash;
};

/**
 * Send ETH from a deployed Coinbase Smart Wallet via `execute()`.
 * The connected EOA must be an owner; it signs a normal tx (MetaMask-friendly).
 * Gas is paid by the EOA; the transfer amount comes from the smart wallet balance.
 */
export async function sendEthFromCoinbaseSmartWallet(params: {
  publicClient: PublicClient;
  walletClient: WalletClient;
  smartWalletAddress: Address;
  recipient: Address;
  amountWei: bigint;
}): Promise<SendFromSmartWalletResult> {
  const account = params.walletClient.account;
  if (!account) {
    throw new Error("Connect a wallet that can sign (e.g. MetaMask).");
  }

  const hash = await params.walletClient.writeContract({
    account,
    chain: configuredChain,
    address: params.smartWalletAddress,
    abi: executeAbi,
    functionName: "execute",
    args: [params.recipient, params.amountWei, "0x"],
  });

  await params.publicClient.waitForTransactionReceipt({ hash });

  return { transactionHash: hash };
}
