"use client";

import Link from "next/link";
import { useRef } from "react";

type MobileMenuProps = {
    links: {
        label: string;
        href: string;
    }[];
};

export default function MobileMenu({ links }: MobileMenuProps) {
    const menuRef = useRef<HTMLDetailsElement>(null);

    function closeMenu() {
        if (menuRef.current) {
            menuRef.current.open = false;
        }
    }

    return (
        <details ref={menuRef} className="group md:hidden">
            <summary
                className="cursor-pointer list-none rounded-lg
          border border-sky-400/40 p-2 text-sky-400
          transition-colors hover:bg-sky-400/10
          [&::-webkit-details-marker]:hidden"
            >
                <span className="sr-only">Navigation menu</span>

                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="h-6 w-6 group-open:hidden"
                    aria-hidden="true"
                >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>

                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="hidden h-6 w-6 group-open:block"
                    aria-hidden="true"
                >
                    <path d="m6 6 12 12M6 18 18 6" />
                </svg>
            </summary>

            <nav
                aria-label="Mobile navigation"
                className="absolute inset-x-0 top-full
          border-t border-sky-400/20 bg-[#020f1b]
          px-6 py-4 shadow-xl"
            >
                <ul className="space-y-1">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                data-nav-link
                                onClick={closeMenu}
                                className="block rounded-lg px-4 py-3
                  text-base font-medium text-slate-100
                  transition-colors hover:bg-sky-400/10
                  hover:text-sky-400"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </details>
    );
}