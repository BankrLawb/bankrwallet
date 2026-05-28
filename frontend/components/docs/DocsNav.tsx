import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function DocsNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="BnkLab"
            width={28}
            height={28}
            className="rounded-md"
          />
          <span className="text-sm font-semibold text-gray-900">BnkLab</span>
          <span className="text-gray-400">/</span>
          <span className="text-sm text-gray-600">Docs</span>
        </Link>
        <a
          href="https://github.com/BankrLawb/bankrwallet"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-gray-600 transition hover:text-gray-900"
        >
          GitHub
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}
