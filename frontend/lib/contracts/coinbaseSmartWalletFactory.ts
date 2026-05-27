import {
  encodeAbiParameters,
  parseAbiItem,
  type Address,
  type Hex,
  type PublicClient,
} from "viem";

const accountCreatedEvent = parseAbiItem(
  "event AccountCreated(address indexed account, bytes[] owners, uint256 nonce)"
);

/** Coinbase Smart Wallet factory v1.1 on Base (and same address on other chains via Safe Singleton Factory). */
export const CSW_FACTORY_V1_1_ADDRESS =
  "0xBA5ED110eFDBa3D005bfC882d75358ACBbB85842" as const;

export const factoryAbi = [
  {
    type: "function",
    name: "createAccount",
    inputs: [
      { name: "owners", type: "bytes[]" },
      { name: "nonce", type: "uint256" },
    ],
    outputs: [{ name: "account", type: "address" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getAddress",
    inputs: [
      { name: "owners", type: "bytes[]" },
      { name: "nonce", type: "uint256" },
    ],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "AccountCreated",
    inputs: [
      { name: "account", type: "address", indexed: true },
      { name: "owners", type: "bytes[]", indexed: false },
      { name: "nonce", type: "uint256", indexed: false },
    ],
  },
] as const;

export function getFactoryAddress(): `0x${string}` {
  const raw = process.env.NEXT_PUBLIC_CSW_FACTORY_ADDRESS?.trim();
  if (raw && /^0x[a-fA-F0-9]{40}$/.test(raw) && raw !== "0x" + "0".repeat(40)) {
    return raw as `0x${string}`;
  }
  return CSW_FACTORY_V1_1_ADDRESS;
}

/** ABI-encoded 32-byte owner for an EOA (matches Solidity abi.encode(address)). */
export function encodeEoaOwner(address: Address): Hex {
  return encodeAbiParameters([{ type: "address" }], [address]);
}

export function ownersForEoa(address: Address): readonly Hex[] {
  return [encodeEoaOwner(address)];
}

export async function getNextNonce(
  publicClient: PublicClient,
  factory: `0x${string}`,
  owners: readonly Hex[]
): Promise<bigint> {
  let nonce = 0n;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const predicted = await publicClient.readContract({
      address: factory,
      abi: factoryAbi,
      functionName: "getAddress",
      args: [owners, nonce],
    });
    const code = await publicClient.getBytecode({ address: predicted });
    if (!code || code === "0x") {
      return nonce;
    }
    nonce += 1n;
  }
}

/** Number of wallets already deployed for this owner set (equals next nonce). */
export async function getDeployCount(
  publicClient: PublicClient,
  factory: `0x${string}`,
  owners: readonly Hex[]
): Promise<bigint> {
  return getNextNonce(publicClient, factory, owners);
}

export function ownerBytesMatch(a: Hex, b: Hex): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

export type DeployedWalletRecord = {
  wallet: Address;
  nonce: bigint;
  seeded: bigint;
  transactionHash?: `0x${string}`;
  blockNumber?: bigint;
};

/**
 * Lists wallets deployed for an owner by scanning factory nonces (no wide getLogs).
 * Fetches AccountCreated per wallet using the indexed account topic (RPC-friendly).
 */
export async function listDeployedWalletsForOwner(
  publicClient: PublicClient,
  factory: `0x${string}`,
  owners: readonly Hex[]
): Promise<DeployedWalletRecord[]> {
  const count = await getDeployCount(publicClient, factory, owners);
  const rows: DeployedWalletRecord[] = [];

  for (let nonce = 0n; nonce < count; nonce++) {
    const wallet = await publicClient.readContract({
      address: factory,
      abi: factoryAbi,
      functionName: "getAddress",
      args: [owners, nonce],
    });

    const code = await publicClient.getBytecode({ address: wallet });
    if (!code || code === "0x") continue;

    let seeded = 0n;
    let transactionHash: `0x${string}` | undefined;
    let blockNumber: bigint | undefined;

    try {
      const logs = await publicClient.getLogs({
        address: factory,
        event: accountCreatedEvent,
        args: { account: wallet },
        fromBlock: 0n,
      });
      const log = logs.at(-1);
      if (log) {
        const tx = await publicClient.getTransaction({ hash: log.transactionHash });
        seeded = tx.value;
        transactionHash = log.transactionHash;
        blockNumber = log.blockNumber;
      }
    } catch {
      /* wallet exists; tx metadata optional */
    }

    rows.push({ wallet, nonce, seeded, transactionHash, blockNumber });
  }

  rows.sort((a, b) => {
    if (a.blockNumber !== undefined && b.blockNumber !== undefined) {
      return Number(b.blockNumber - a.blockNumber);
    }
    return Number(b.nonce - a.nonce);
  });

  return rows;
}
