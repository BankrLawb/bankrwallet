import Link from "next/link";

export default function DocsOverviewPage() {
  return (
    <>
      <h1>BnkLab Documentation</h1>
      <p>
        <strong className="text-gray-900">BnkLab</strong> is the app and docs for
        deploying <strong className="text-gray-900">Coinbase Smart Wallets</strong> on
        Base. You connect a wallet, call the official factory{" "}
        <code>createAccount()</code>, and receive a new smart wallet owned by your
        address. The factory does not hold your funds — your smart wallet does.
      </p>

      <h2>What makes it different</h2>
      <ul>
        <li>
          <strong className="text-gray-900">Self-custodied</strong> — You sign every
          deploy. Ownership is your connected address encoded as factory owner bytes.
        </li>
        <li>
          <strong className="text-gray-900">Agentic wallets</strong> — Deploy many
          Coinbase Smart Wallets; agents and bots can operate wallets you own.
        </li>
        <li>
          <strong className="text-gray-900">Unlimited wallets</strong> — Each{" "}
          <code>createAccount()</code> uses the next nonce and creates a new address.
        </li>
        <li>
          <strong className="text-gray-900">No helper contract</strong> — Calls go
          straight to Coinbase&apos;s audited factory v1.1 on Base.
        </li>
      </ul>

      <h2>Quick start</h2>
      <pre>
        <code>{`1. cp frontend/.env.example frontend/.env.local
2. Set NEXT_PUBLIC_CHAIN_ID (84532 = Base Sepolia)
3. Open /deploy → connect wallet → deploy`}</code>
      </pre>

      <p>
        See the <Link href="/docs/deploy">Deploy Guide</Link> and{" "}
        <Link href="/deploy">deploy UI</Link>.
      </p>

      <h2>Assets</h2>
      <p>
        Deployment only creates wallets and optionally seeds native ETH. Holding ETH,
        ERC-20s, and other assets happens inside each{" "}
        <strong className="text-gray-900">Coinbase Smart Wallet</strong> (standard CSW
        capabilities on Base).
      </p>

      <h2>Network</h2>
      <p>
        Designed for <strong className="text-gray-900">Base</strong> (mainnet chain id
        8453, Sepolia 84532). When using the site, your connected wallet pays gas. A
        Twitter bot relayer is <Link href="/docs/bot-integration">planned</Link>, not
        required today.
      </p>
    </>
  );
}
