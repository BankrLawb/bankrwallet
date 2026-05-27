"use client";

import { motion } from "framer-motion";
import { SECURITY_GUARANTEES } from "@/lib/constants";
import Link from "next/link";
import { Shield, Lock, BadgeCheck, Link2, LucideIcon } from "lucide-react";

const securityIconMap: Record<string, LucideIcon> = {
  shield: Shield,
  lock: Lock,
  badge: BadgeCheck,
  link: Link2,
};

export default function SecuritySection() {
  return (
    <section className="border-t border-surface-border py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-purple-light">
            Security
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Self-custody by design
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            You sign every deploy. Assets sit in Coinbase Smart Wallets you own —
            not in a shared bot wallet.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {SECURITY_GUARANTEES.map((item, i) => {
            const Icon = securityIconMap[item.icon] ?? Shield;
            return (
            <motion.div
              key={item.title}
              className="rounded-xl border border-surface-border bg-white p-6 shadow-sm"
              initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-purple/15">
                <Icon className="h-4 w-4 text-brand-purple-light" />
              </div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>
            </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Full security model in the{" "}
          <Link href="/docs/security" className="text-brand-purple-dark hover:underline">
            docs
          </Link>
          . Contracts verified on Basescan with MIT license.
        </motion.p>
      </div>
    </section>
  );
}
