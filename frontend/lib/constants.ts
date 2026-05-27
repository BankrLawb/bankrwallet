export const CONTRACTS = [
  {
    name: "Coinbase Smart Wallet Factory v1.1",
    description:
      "Official factory on Base. createAccount(owners, nonce) deploys a CSW owned by your connected address.",
    address: "0xBA5ED110eFDBa3D005bfC882d75358ACBbB85842",
  },
] as const;

export const FEATURES = [
  {
    title: "Self-Custodial",
    description:
      "You sign createAccount(). Your connected address owns each new Coinbase Smart Wallet — no third-party custody.",
    icon: "shield",
  },
  {
    title: "Unlimited Wallets",
    description:
      "Call createAccount() as many times as you want. Each call uses the next factory nonce and creates a new independent smart wallet.",
    icon: "layers",
  },
  {
    title: "Coinbase Smart Wallet",
    description:
      "Each createAccount() creates an audited ERC-4337 Coinbase Smart Wallet on Base — the wallet that holds your assets.",
    icon: "wallet",
  },
  {
    title: "Agentic by Design",
    description:
      "Humans, bots, and agents can operate the smart wallets you own. Permissions live on-chain in the CSW.",
    icon: "bot",
  },
  {
    title: "Optional Seed",
    description:
      "Send ETH with createAccount() to fund the new wallet in the same transaction. Zero is fine too.",
    icon: "zap",
  },
  {
    title: "Direct On-Chain",
    description:
      "No bot required. Deploy from our site, Basescan, or any wallet connected to Base.",
    icon: "link",
  },
] as const;

export const FLOW_STEPS = [
  {
    label: "Connect wallet",
    detail: "MetaMask, Coinbase Wallet, or any injected wallet on Base",
    type: "input" as const,
  },
  {
    label: "Call createAccount()",
    detail: "Coinbase Smart Wallet factory v1.1 on Base",
    type: "process" as const,
  },
  {
    label: "Smart wallet created",
    detail: "Coinbase Smart Wallet via factory + your nonce",
    type: "process" as const,
  },
  {
    label: "Optional seed",
    detail: "ETH forwarded into the new wallet",
    type: "process" as const,
  },
  {
    label: "Done",
    detail: "Address + Basescan link on /deploy",
    type: "output" as const,
  },
];

export const DOCS_NAV = [
  { href: "/docs", label: "Overview" },
  { href: "/docs/how-it-works", label: "How It Works" },
  { href: "/docs/contracts", label: "Contracts Reference" },
  { href: "/docs/security", label: "Security Model" },
  { href: "/docs/bot-integration", label: "Bot (Coming soon)" },
  { href: "/docs/deploy", label: "Deploy Guide" },
] as const;

export const SECURITY_GUARANTEES = [
  {
    title: "You sign every deploy",
    description:
      "Ownership is msg.sender. The helper contract cannot assign your smart wallet to someone else.",
    icon: "shield",
  },
  {
    title: "Direct factory calls",
    description:
      "The site calls Coinbase’s audited factory directly — no custom deploy helper contract required.",
    icon: "lock",
  },
  {
    title: "Audited smart wallets",
    description:
      "Assets live in Coinbase Smart Wallet proxies — the standard audited ERC-4337 stack on Base.",
    icon: "badge",
  },
  {
    title: "No bot required",
    description:
      "Custody does not depend on a relayer or Twitter bot. Deploy and interact directly on-chain.",
    icon: "link",
  },
] as const;
