import Link from "next/link";

export default function DeployPage() {
  return (
    <>
      <h1>Deploy Guide</h1>
      <p>
        Deploy a <strong className="text-gray-900">Coinbase Smart Wallet</strong> on
        Base by calling the official factory v1.1 from the{" "}
        <Link href="/deploy">deploy UI</Link> or any wallet. No custom helper contract
        is required.
      </p>

      <h2>Factory (v1.1)</h2>
      <p>
        Default address on Base (mainnet and Sepolia via Safe Singleton Factory):
      </p>
      <pre>
        <code>0xBA5ED110eFDBa3D005bfC882d75358ACBbB85842</code>
      </pre>

      <h2>1. Frontend setup</h2>
      <pre>
        <code>{`cd frontend
cp .env.example .env.local

NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_RPC_URL=https://sepolia.base.org
# Optional: NEXT_PUBLIC_ONCHAINKIT_API_KEY=... (Coinbase Smart Wallet connect)
# Optional: NEXT_PUBLIC_CSW_FACTORY_ADDRESS=0xBA5ED110... (override factory)`}</code>
      </pre>

      <pre>
        <code>{`npm install
npm run dev`}</code>
      </pre>

      <h2>2. Deploy your Coinbase Smart Wallet</h2>
      <ol>
        <li>Open <Link href="/deploy">/deploy</Link></li>
        <li>Connect a wallet on Base Sepolia or Base Mainnet</li>
        <li>Optionally enter seed ETH</li>
        <li>Click <strong>Deploy Coinbase Smart Wallet</strong></li>
      </ol>

      <p>
        The site calls <code>createAccount(owners, nonce)</code> on the factory. Your
        connected address is encoded as the sole owner. The app picks the next unused
        nonce automatically.
      </p>

      <h3>On-chain call (manual)</h3>
      <pre>
        <code>{`// Factory v1.1 on Base
// owners = [abi.encode(yourEOA)]
// nonce = 0 for first wallet, then 1, 2, ...

createAccount(owners, nonce);              // no seed
createAccount{value: 1 ether}(owners, nonce);  // seed new wallet`}</code>
      </pre>

      <p>
        You must sign the transaction. The returned / emitted address is your new
        Coinbase Smart Wallet — not the factory.
      </p>

      <h2>Testnet ETH</h2>
      <p>
        Base Sepolia requires test ETH for gas (and optional seed). Use a Base Sepolia
        faucet before deploying.
      </p>
    </>
  );
}
