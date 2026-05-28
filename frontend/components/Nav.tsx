import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import NavActions from "@/components/NavActions";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-white/90 backdrop-blur-md">
      <div className="section-container flex h-16 items-center justify-between gap-2">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
          <Image
            src="/logo.png"
            alt="BnkLab"
            width={36}
            height={36}
            className="h-8 w-8 shrink-0 rounded-lg sm:h-9 sm:w-9"
          />
          <span className="hidden truncate text-lg font-semibold tracking-tight text-gray-900 sm:inline">
            BnkLab
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/docs"
            className="text-sm text-gray-600 transition hover:text-gray-900"
          >
            Docs
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-600 transition hover:text-gray-900"
          >
            GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </nav>

        <NavActions />
      </div>
    </header>
  );
}
