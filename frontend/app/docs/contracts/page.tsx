import { CONTRACTS } from "@/lib/constants";
import Link from "next/link";

export default function ContractsPage() {
  return (
    <>
      <h1>Contracts Reference</h1>
      <p>
        BankrLawb calls the <strong className="text-gray-900">Coinbase Smart Wallet
        factory v1.1</strong> on Base directly. No custom deploy helper is deployed by
        the app.
      </p>

      <table>
        <thead>
          <tr>
            <th>Contract</th>
            <th>Role</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {CONTRACTS.map((c) => (
            <tr key={c.name}>
              <td>
                <code>{c.name}</code>
              </td>
              <td>{c.description}</td>
              <td className="font-mono text-gray-500">{c.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Factory API (v1.1)</h2>

      <h3>Functions</h3>
      <ul>
        <li>
          <code>createAccount(bytes[] owners, uint256 nonce) payable → address</code> —
          Deploys a CSW proxy. Forwards <code>msg.value</code> to seed the new wallet.
        </li>
        <li>
          <code>getAddress(bytes[] owners, uint256 nonce) view → address</code> —
          Predicts the wallet address for given owners and nonce.
        </li>
      </ul>

      <h3>Events</h3>
      <ul>
        <li>
          <code>AccountCreated(address indexed account, bytes[] owners, uint256 nonce)</code>
        </li>
      </ul>

      <h3>Owner encoding (EOA)</h3>
      <p>
        For a connected EOA, the site passes{" "}
        <code>owners = [abi.encode(yourAddress)]</code> — a single 32-byte ABI-encoded
        address, matching Coinbase&apos;s smart-wallet spec.
      </p>

      <h2>What gets deployed</h2>
      <p>
        Each successful <code>createAccount()</code> creates a{" "}
        <strong className="text-gray-900">Coinbase Smart Wallet</strong> ERC-4337
        proxy. That address is deterministic from owner bytes, nonce, and the factory.
      </p>

      <p>
        Deploy from the site: <Link href="/deploy">/deploy</Link>. Setup:{" "}
        <Link href="/docs/deploy">Deploy Guide</Link>.
      </p>
    </>
  );
}
