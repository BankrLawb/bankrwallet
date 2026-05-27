"use client";

import { motion } from "framer-motion";
import { CONTRACTS } from "@/lib/constants";
import Link from "next/link";

export default function ContractsTable() {
  return (
    <section className="border-t border-surface-border bg-gray-50 py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-purple-light">
            Contracts
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            On-chain on Base L2
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            One deploy helper on Base. Each deploy() spins up a Coinbase Smart
            Wallet you control.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 overflow-hidden rounded-xl border border-surface-border bg-white shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-border bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900">Contract</th>
                <th className="hidden px-6 py-4 font-medium text-gray-900 md:table-cell">
                  Description
                </th>
                <th className="px-6 py-4 font-medium text-gray-900">Address</th>
              </tr>
            </thead>
            <tbody>
              {CONTRACTS.map((contract) => (
                <tr
                  key={contract.name}
                  className="border-b border-surface-border last:border-0"
                >
                  <td className="px-6 py-4 font-mono text-brand-purple-light">
                    {contract.name}
                  </td>
                  <td className="hidden px-6 py-4 text-gray-600 md:table-cell">
                    {contract.description}
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-500">
                    {contract.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="mt-6 text-sm text-gray-500">
          <Link href="/deploy" className="text-brand-purple-dark hover:underline">
            Deploy a wallet
          </Link>
          {" · "}
          <Link href="/docs/contracts" className="text-brand-purple-dark hover:underline">
            Contract reference
          </Link>
        </p>
      </div>
    </section>
  );
}
