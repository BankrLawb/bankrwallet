"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="border-t border-surface-border py-24">
      <motion.div
        className="section-container"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-brand-purple/20 bg-gradient-to-br from-brand-purple/10 to-brand-blue/5 px-8 py-16 text-center md:px-16">
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(155,92,246,0.15),transparent_50%)]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Deploy your first Coinbase Smart Wallet.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-600">
              Connect any wallet on Base and call deploy(). You own the smart wallet;
              deploy as many as you need.
            </p>
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4"
              whileHover={{ scale: 1.02 }}
            >
              <Link href="/deploy" className="btn-primary">
                Get Started
              </Link>
              <Link href="/docs/how-it-works" className="btn-secondary">
                See the Flow
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
