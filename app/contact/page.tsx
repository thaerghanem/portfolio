import type { Metadata } from "next";
import Link from "next/link";
import {
    FiArrowUpRight,
    FiGithub,
    FiMail,
    FiInstagram,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Get in touch with Thaer Ghanem to discuss your next mobile or web project.",
};

// Replace these with your actual details.
const contact = {
    email: "thaerghanem6@gmail.com",
    github: "https://github.com/thaerghanem",
    instagram: "https://www.instagram.com/thaerghanem/",
    whatsapp: "963936098828",
};

const channels = [
    {
        title: "Email",
        description: "Have a project or a question? Drop me a message.\nthaerghanem6@gmail.com",
        label: "Send an email",
        href: `mailto:${contact.email}`,
        icon: FiMail,
        external: false,
    },
    {
        title: "GitHub",
        description: "Explore my code, projects, and what I'm building.",
        label: "View GitHub",
        href: contact.github,
        icon: FiGithub,
        external: true,
    },
    {
        title: "WhatsApp",
        description: "Have a project in mind? Let's chat on WhatsApp.",
        label: "Chat on WhatsApp",
        href: `https://wa.me/${contact.whatsapp}`,
        icon: FaWhatsapp,
        external: true,
    },
    {
        title: "Instagram",
        description: "Have an idea? Send me a direct message on Instagram.",
        label: "Connect on Instagram",
        href: contact.instagram,
        icon: FiInstagram,
        external: true,
    },
];

export default function ContactPage() {


    return (
        <main
            data-page="contact"
            dir="ltr"
            className="relative isolate overflow-hidden bg-[#020f1b] text-white"
        >
            {/* Background glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 left-1/2
          -z-10 h-96 w-96 -translate-x-1/2 rounded-full
          bg-blue-600/15 blur-3xl"
            />

            <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                {/* Introduction */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-semibold tracking-[0.2em] text-sky-400">
                        LET&apos;S WORK TOGETHER
                    </p>

                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
                        Get in <span className="text-sky-400">Touch</span>
                    </h1>

                    <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
                        Have an idea for a mobile app or a website? Let&apos;s talk
                        about your project and how we can bring it to life.
                    </p>
                </div>

                {/* Contact channels */}
                <ul className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {channels.map(
                        ({ title, description, label, href, icon: Icon, external }) => (
                            <li key={title}>
                                <Link
                                    href={href}
                                    target={external ? "_blank" : undefined}
                                    rel={external ? "noopener noreferrer" : undefined}
                                    className="group flex h-full flex-col rounded-2xl
                    border border-sky-500/30
                    bg-linear-to-br from-[#071e30] to-[#020f1b]
                    p-7
                    motion-safe:transition-all motion-safe:duration-300
                    motion-safe:hover:-translate-y-1
                    hover:border-sky-400
                    hover:shadow-[0_0_30px_rgba(14,165,233,0.12)]
                    focus-visible:outline-2 focus-visible:outline-offset-4
                    focus-visible:outline-sky-400"
                                >
                                    <div
                                        className="flex h-14 w-14 items-center justify-center
                      rounded-xl border border-sky-400/20
                      bg-sky-400/10 text-sky-400"
                                    >
                                        <Icon aria-hidden="true" className="h-7 w-7" />
                                    </div>

                                    <h2 className="mt-6 text-xl font-bold">{title}</h2>

                                    <p className="mt-3 flex-1 whitespace-pre-line wrap-break-words text-sm leading-relaxed text-slate-300">
                                        {description}
                                    </p>

                                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-sky-400">
                                        {label}

                                        <FiArrowUpRight
                                            aria-hidden="true"
                                            className="h-5 w-5 motion-safe:transition-transform
                        motion-safe:group-hover:-translate-y-0.5
                        motion-safe:group-hover:translate-x-0.5"
                                        />
                                    </span>

                                    {external && (
                                        <span className="sr-only">Opens in a new tab</span>
                                    )}
                                </Link>
                            </li>
                        ),
                    )}
                </ul>

            </div>
        </main>
    );
}