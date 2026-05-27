"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAV } from "@/lib/constants";

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-surface-border pb-6 md:w-56 md:border-b-0 md:border-r md:pb-0 md:pr-8">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-brand-purple-light">
        Documentation
      </p>
      <nav className="flex flex-col gap-1">
        {DOCS_NAV.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/docs" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-brand-purple/15 font-medium text-brand-purple-dark"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
