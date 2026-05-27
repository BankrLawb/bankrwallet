"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants";
import {
  Shield,
  Layers,
  Wallet,
  Bot,
  Zap,
  Link2,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  layers: Layers,
  wallet: Wallet,
  bot: Bot,
  zap: Zap,
  link: Link2,
};

export default function Features() {
  return (
    <section className="border-t border-surface-border bg-gray-50 py-24">
      <motion.div
        className="section-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-purple-light">
          Platform
        </p>
        <h2 className="flex flex-col text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          <span>Owned by you.</span>
          <span>Built for people + agents.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-gray-600">
          Deploy Coinbase Smart Wallets on Base from your browser. One helper
          contract, unlimited wallets, full self-custody.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? Shield;
            return (
              <motion.div
                key={feature.title}
                className="rounded-2xl border border-surface-border bg-white p-6 shadow-sm transition hover:border-brand-purple/30 hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <motion.div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-purple/15"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="h-5 w-5 text-brand-purple-light" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
