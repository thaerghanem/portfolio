import Link from "next/link";
import MobileMenu from "./mobile-menu";

const links = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    return (
        <header
            dir="ltr"
            className="relative z-50 w-full bg-[#020f1b]/90 text-white"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
                {/* Logo */}
                <Link
                    href="/"
                    aria-label="Thaer Ghanem — Home"
                    className="text-blue-500 drop-shadow-[0_0_14px_rgba(59,130,246,0.5)]"
                >
                    <svg
                        width="64"
                        height="52"
                        viewBox="0 0 64 52"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        aria-hidden="true"
                    >
                        <path d="M18 13 5 26l13 13M46 13l13 13-13 13" />
                        <path d="m38 5-12 42" />
                    </svg>
                </Link>

                {/* Desktop navigation */}
                <nav
                    aria-label="Main navigation"
                    className="hidden items-center gap-8 md:flex lg:gap-12"
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            data-nav-link

                            className="relative py-3 text-base font-medium
                text-slate-100 transition-colors
                after:absolute after:bottom-0 after:left-0
                after:h-0.5 after:w-full after:origin-left
                after:scale-x-0 after:bg-sky-400
                after:transition-transform after:content-['']
                hover:text-sky-400 hover:after:scale-x-100
                focus-visible:text-sky-400
                focus-visible:after:scale-x-100"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Contact button */}
                <Link
                    href="/contact"
                    className="hidden items-center gap-3 rounded-xl
            border border-sky-400 px-6 py-3 text-base font-medium
            shadow-[0_0_20px_rgba(0,149,255,0.08)]
            transition-all hover:bg-sky-400/10
            hover:shadow-[0_0_24px_rgba(0,149,255,0.2)]
            md:inline-flex"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-sky-400"
                        aria-hidden="true"
                    >
                        <path d="m22 2-7 20-4-9-9-4 20-7Z" />
                        <path d="M22 2 11 13" />
                    </svg>

                    Let’s Talk
                </Link>

                <MobileMenu links={links} />
            </div>
        </header>
    );
}