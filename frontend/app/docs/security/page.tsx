import Link from "next/link";

export default function SecurityPage() {
  return (
    <>
      <h1>Security Model</h1>
      <p>
        The BankrWallet protocol separates a small <strong className="text-gray-900">deploy
        helper</strong> from the <strong className="text-gray-900">Coinbase Smart
        Wallet</strong> that holds assets. Threat modeling should cover both.
      </p>

      <h2>Helper contract (BankrWallet.sol)</h2>
      <ul>
        <li>
          <strong className="text-gray-900">Ownership is caller-bound</strong> —{" "}
          Only <code>msg.sender</code> is encoded as the CSW owner. The helper
          cannot redirect ownership to a third party.
        </li>
        <li>
          <strong className="text-gray-900">Minimal surface</strong> — One external
          function (<code>deploy</code>), a nonce mapping, and a factory call. No
          admin keys, no upgrade hook on the helper.
        </li>
        <li>
          <strong className="text-gray-900">ETH forwarding</strong> —{" "}
          <code>msg.value</code> is passed into the factory for seeding; the helper
          does not implement a separate withdrawal path.
        </li>
      </ul>

      <h2>Coinbase Smart Wallet (your wallet)</h2>
      <p>
        Security of balances and operations follows the{" "}
        <a
          href="https://github.com/coinbase/smart-wallet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Coinbase Smart Wallet
        </a>{" "}
        design (ERC-4337, multi-owner, passkey or EOA owners). Review their docs for
        UserOperations, owners, and recovery.
      </p>

      <h2>What we do not claim today</h2>
      <ul>
        <li>No gasless relayer or EIP-2771 forwarder in this repo</li>
        <li>No soul-bound NFT credential contract</li>
        <li>No module system (escrow, swap router) in the helper</li>
        <li>
          No Twitter bot custody path — see{" "}
          <Link href="/docs/bot-integration">Bot (Coming soon)</Link>
        </li>
      </ul>

      <h2>Operational hygiene</h2>
      <ul>
        <li>Verify the helper address on Basescan before use</li>
        <li>Use Sepolia for testing; double-check chain id in the app env</li>
        <li>Confirm deployed wallet addresses from <code>WalletDeployed</code> events</li>
      </ul>

      <p>
        Deploy from the site: <Link href="/deploy">/deploy</Link>. Contract API:{" "}
        <Link href="/docs/contracts">Contracts Reference</Link>.
      </p>
    </>
  );
}
