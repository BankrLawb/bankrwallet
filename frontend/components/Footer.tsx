import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-white py-12">
      <div className="section-container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="BankrLawb"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-semibold text-gray-900">BankrLawb</span>
        </div>

        <nav className="flex flex-wrap gap-6 text-sm text-gray-600">
          <Link href="/docs" className="transition hover:text-gray-900">
            Docs
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition hover:text-gray-900"
          >
            GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://basescan.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition hover:text-gray-900"
          >
            Basescan
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://bankr.bot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition hover:text-gray-900"
          >
            Bankr
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </nav>
      </div>

      <p className="section-container mt-8 text-center text-xs text-gray-600 md:text-left">
        Self-custodian wallets for agentic workflows on Base L2.
      </p>
    </footer>
  );
}
