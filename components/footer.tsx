import Link from "next/link";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiInstagram } from "react-icons/fi";
import { TbCode } from "react-icons/tb";

const links = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

// Replace these with your actual contact details.
const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com/thaerghanem",
        icon: FaGithub,
        external: true,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/thaerghanem/",
        icon: FiInstagram,
        external: true,
    },
    {
        label: "WhatsApp",
        href: "https://wa.me/963936098828",
        icon: FaWhatsapp,
        external: true,
    },
    {
        label: "Email",
        href: "mailto:thaerghanem6@gmail.com",
        icon: FiMail,
        external: false,
    },
];

export default function Footer() {
    return (
        <footer
            dir="ltr"
            className="border-t border-sky-500/10 bg-[#010b13] text-white"
        >
            <div
                className="mx-auto flex max-w-7xl flex-col items-center
          justify-between gap-7 px-6 py-7 lg:flex-row lg:px-8"
            >
                {/* Logo and name */}
                <Link
                    href="/"
                    aria-label="Thaer Ghanem — Home"
                    className="flex items-center gap-4 rounded
            focus-visible:outline-2 focus-visible:outline-offset-4
            focus-visible:outline-sky-400"
                >
                    <TbCode
                        aria-hidden="true"
                        strokeWidth={1.8}
                        className="h-11 w-11 shrink-0 text-sky-400
              drop-shadow-[0_0_10px_rgba(14,165,233,0.3)]"
                    />

                    <div>
                        <p className="text-base font-bold">
                            Thaer <span className="text-sky-400">Ghanem</span>
                        </p>

                        <p className="mt-1 text-xs text-slate-300">
                            Software Engineer
                        </p>

                    </div>
                </Link>

                {/* Navigation */}
                <nav aria-label="Footer navigation">
                    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="rounded text-sm text-slate-300
                    transition-colors hover:text-sky-400
                    focus-visible:outline-2 focus-visible:outline-offset-4
                    focus-visible:outline-sky-400"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Social links */}
                <ul className="flex items-center gap-4">
                    {socialLinks.map(({ label, href, icon: Icon, external }) => (
                        <li key={label}>
                            <Link
                                href={href}
                                target={external ? "_blank" : undefined}
                                rel={external ? "noopener noreferrer" : undefined}
                                aria-label={
                                    external ? `${label} (opens in a new tab)` : label
                                }
                                className="inline-flex rounded-lg p-2 text-slate-100
                  transition-colors hover:bg-sky-400/10 hover:text-sky-400
                  focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-sky-400"
                            >
                                <Icon aria-hidden="true" className="h-5 w-5" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}