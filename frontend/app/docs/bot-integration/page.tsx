import Link from "next/link";

export default function BotIntegrationPage() {
  return (
    <>
      <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-950">
        <p className="font-semibold">Coming soon</p>
        <p className="mt-1 text-sm leading-relaxed">
          Twitter / bankr webhook + intent parsing is planned but not wired to the
          current contract. <strong>Today:</strong> deploy via{" "}
          <Link href="/deploy" className="text-brand-purple-dark underline">
            /deploy
          </Link>{" "}
          and sign <code>BankrWallet.deploy()</code> yourself.
        </p>
      </div>

      <h1>Bot Integration</h1>
      <p>
        The repo includes a sketch bot service under <code>protocol/bot/</code>{" "}
        (not connected to the live helper ABI). The goal is a Node.js relayer that
        parses social commands and helps users interact with wallets — without taking
        custody.
      </p>

      <h2>Why it is deferred</h2>
      <p>
        The shipped contract only exposes <code>deploy()</code>, and ownership is{" "}
        <code>msg.sender</code>. A bot that pays gas and calls{" "}
        <code>deploy()</code> would own the new Coinbase Smart Wallet, not the user.
        A future bot must either:
      </p>
      <ul>
        <li>Send the user a link to sign in their wallet, or</li>
        <li>Integrate with a meta-transaction / session model the CSW supports, or</li>
        <li>Wait for contract extensions that support delegated deploy on behalf of a named owner</li>
      </ul>

      <h2>Planned inputs (aspirational)</h2>
      <ul>
        <li>
          <strong className="text-gray-900">Twitter</strong> — mentions via @bankrbot
          webhook
        </li>
        <li>
          <strong className="text-gray-900">Bankr API</strong> — resolve handle →
          wallet address, post replies
        </li>
      </ul>

      <h2>Planned processing (aspirational)</h2>
      <ol>
        <li>Verify webhook signature</li>
        <li>Resolve user identity</li>
        <li>Parse natural language → structured intent (e.g. Claude Haiku)</li>
        <li>Trigger user-signed deploy or other CSW actions</li>
        <li>Reply with tx hash and Basescan link</li>
      </ol>

      <h2>Example commands (not live)</h2>
      <pre>
        <code>{`@bankrbot create wallet "project"
@bankrbot create wallet "agent" seed 0.5 ETH
@bankrbot show wallets`}</code>
      </pre>
      <p className="text-sm text-gray-500">
        These match the README vision and <code>protocol/bot/</code> scaffolding, not
        the current <code>BankrWallet.sol</code> API.
      </p>

      <h2>What works now</h2>
      <p>
        <Link href="/deploy">/deploy</Link> — connect wallet, call{" "}
        <code>deploy()</code>, optional seed ETH. See{" "}
        <Link href="/docs/how-it-works">How It Works</Link>.
      </p>
    </>
  );
}
