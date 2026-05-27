"use client";

import { motion } from "framer-motion";
import { FLOW_STEPS } from "@/lib/constants";
import { ArrowDown } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-surface-border py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-brand-purple-light">
            How it works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            One command. On-chain in seconds.
          </h2>
          <p className="mt-4 max-w-2xl text-gray-600">
            Connect your wallet on Base, call deploy(), and get a new Coinbase
            Smart Wallet in one transaction.
          </p>
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-0">
          {FLOW_STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              className="flex w-full max-w-xl flex-col items-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <motion.div
                className={`w-full rounded-xl border px-6 py-4 ${
                  step.type === "input"
                    ? "border-brand-purple/50 bg-brand-purple/10"
                    : step.type === "output"
                      ? "border-green-500/30 bg-green-500/5"
                      : "border-surface-border bg-surface-card"
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <p className="font-mono text-xs uppercase tracking-wider text-gray-500">
                  {step.label}
                </p>
                <p className="mt-1 font-mono text-sm text-gray-900">{step.detail}</p>
              </motion.div>
              {i < FLOW_STEPS.length - 1 && (
                <ArrowDown className="my-2 h-5 w-5 text-surface-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
