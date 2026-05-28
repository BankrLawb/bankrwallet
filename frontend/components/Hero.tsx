"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36">
      <motion.div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-purple/20 blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute -right-32 top-32 h-80 w-80 rounded-full bg-brand-blue/15 blur-3xl"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="section-container relative"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-purple-light">
          Owned by you. Built for people + agents.
        </p>

        <h1 className="flex max-w-4xl flex-col text-[2.5875rem] font-extrabold leading-tight tracking-tight md:text-[4.3125rem] md:leading-[1.1]">
          <span className="text-brand-purple">Agentic Wallet</span>
          <span className="text-brand-purple">Framework</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
          Secure your agent. Spin up as many wallets as you want. No seed phrase.
          No KYC. Infinite Rails.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          <Link href="/deploy" className="btn-hero-primary">
            Launch a wallet
          </Link>
          <span className="btn-hero-secondary-muted" aria-disabled>
            Wallet Agent (coming soon)
          </span>
          <Link href="/docs" className="btn-hero-secondary">
            Read docs
          </Link>
        </div>

        <div className="mt-16 max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
          <motion.div
            className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 font-mono text-xs text-gray-500">bankrlawb-cli</span>
          </motion.div>
          <pre className="overflow-x-auto bg-white p-6 font-mono text-sm leading-relaxed text-gray-900">
            <code>
              <span className="text-brand-purple">$</span> connect wallet → deploy(){"\n"}
              <span className="text-gray-400"># Smart Wallet on Base, owned by you</span>{"\n"}
              <span className="text-gray-400"># optional: seed ETH in the same transaction</span>{"\n"}
              <span className="text-gray-400"># optional: do anything</span>
            </code>
          </pre>
        </div>
      </motion.div>
    </section>
  );
}
