import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <>
      <h1>How It Works</h1>
      <p>
        Deployment is wallet-first: you connect on Base, sign{" "}
        <code>createAccount()</code> on the Coinbase Smart Wallet factory (v1.1), and
        own the resulting smart wallet. Roughly a few seconds on Base.
      </p>

      <h2>The pipeline (site)</h2>
      <ol>
        <li>
          <strong className="text-gray-900">Connect</strong> — Injected wallet or
          Coinbase Smart Wallet (OnchainKit) on Base Mainnet or Sepolia
        </li>
        <li>
          <strong className="text-gray-900">createAccount()</strong> — Payable call on
          factory <code>0xBA5ED110…</code>; optional ETH seeds the new CSW
        </li>
        <li>
          <strong className="text-gray-900">Coinbase Smart Wallet</strong> — Factory
          deploys proxy; your connected address is the encoded owner
        </li>
        <li>
          <strong className="text-gray-900">Receipt</strong> — Address, seeded amount,
          and Basescan links on <Link href="/deploy">/deploy</Link>
        </li>
      </ol>

      <h2>Via the site</h2>
      <p>
        Open <Link href="/deploy">/deploy</Link>, connect, and click deploy. Your
        connected address must match the chain configured in{" "}
        <code>NEXT_PUBLIC_CHAIN_ID</code>.
      </p>

      <h2>Via wallet directly</h2>
      <pre>
        <code>{`// Coinbase Smart Wallet factory v1.1
createAccount{value: 0.01 ether}(owners, nonce);`}</code>
      </pre>
      <p>
        Addresses are deterministic from <code>owners</code> + <code>nonce</code>. Use
        factory <code>getAddress(owners, nonce)</code> to predict the next wallet
        before sending a transaction.
      </p>

      <h2>Multi-wallet model</h2>
      <p>
        Each <code>createAccount()</code> uses the next factory nonce for your owner
        bytes and mints a <strong className="text-gray-900">new</strong> Coinbase Smart
        Wallet. Ten deploys means ten independent CSWs, all owned by you.
      </p>

      <h2>Coming soon: Twitter / bot</h2>
      <p>
        A <Link href="/docs/bot-integration">bot integration</Link> is planned for
        commands like <code>@bankrbot</code>. It is not live: you must sign{" "}
        <code>createAccount()</code> yourself today.
      </p>
    </>
  );
}
