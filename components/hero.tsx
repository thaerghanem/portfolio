import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type IconName =
    | "folder"
    | "arrow"
    | "download"
    | "phone"
    | "monitor"
    | "server"
    | "users";

function Icon({
    name,
    className = "h-6 w-6",
}: {
    name: IconName;
    className?: string;
}) {
    const paths: Record<IconName, ReactNode> = {
        folder: (
            <path d="M3 7V5a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z" />
        ),
        arrow: <path d="M4 12h16m-7-7 7 7-7 7" />,
        download: (
            <>
                <path d="M12 3v12m-5-5 5 5 5-5" />
                <path d="M4 15v5h16v-5" />
            </>
        ),
        phone: (
            <>
                <rect x="6" y="2" width="12" height="20" rx="2" />
                <path d="M10 5h4M11 18h2" />
            </>
        ),
        monitor: (
            <>
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M12 17v4M8 21h8" />
            </>
        ),
        server: (
            <>
                <rect x="3" y="3" width="18" height="7" rx="1.5" />
                <rect x="3" y="14" width="18" height="7" rx="1.5" />
                <path d="M7 6.5h.01M17 6.5h.01M7 17.5h.01M17 17.5h.01" />
            </>
        ),
        users: (
            <>
                <circle cx="12" cy="7" r="3" />
                <path d="M6 21v-3a6 6 0 0 1 12 0v3H6Z" />
                <path d="M19 4a3 3 0 0 1 0 6M5 4a3 3 0 0 0 0 6" />
                <path d="M19 14a4 4 0 0 1 3 4v3h-2M5 14a4 4 0 0 0-3 4v3h2" />
            </>
        ),
    };

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {paths[name]}
        </svg>
    );
}

const stats: { icon: IconName; value: string; label: string }[] = [
    { icon: "phone", value: "9", label: "Flutter Projects" },
    { icon: "monitor", value: "9", label: "Next.js Projects" },
    { icon: "users", value: "100%", label: "Commitment" },
];

export default function Hero() {
    return (
        <section
            id="home"
            dir="ltr"
            aria-labelledby="hero-title"
            className="relative isolate overflow-hidden bg-[#020f1b] text-white"
        >
            {/* Background image */}
            <div className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[65%]">
                <Image
                    src="/hero-image.webp"
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 65vw, 100vw"
                    className="object-cover object-center"
                />
            </div>

            {/* Dark overlays for readable text */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10
          bg-[#020f1b]/80
          lg:bg-[linear-gradient(90deg,#020f1b_0%,#020f1b_32%,rgba(2,15,27,0.85)_44%,rgba(2,15,27,0.1)_70%,rgba(2,15,27,0.15)_100%)]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(0deg,#020f1b_0%,transparent_35%)]"
            />

            <div className="mx-auto max-w-7xl px-6 pb-8 pt-12 sm:pt-16 lg:px-8 lg:pt-14">
                {/* Text and buttons */}
                <div className="max-w-2xl pb-12 lg:pb-14">
                    <p className="mb-4 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                        <span className="text-sm font-medium tracking-[0.2em] sm:text-base">
                            HI, I’M
                        </span>

                        <span className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Thaer{" "}
                            <span className="bg-gradient-to-b from-sky-300 to-blue-600 bg-clip-text text-transparent">
                                Ghanem
                            </span>
                        </span>
                    </p>

                    <h1
                        id="hero-title"
                        className="text-[clamp(2.75rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.045em]"
                    >
                        <span className="block">Software</span>

                        <span className="block bg-gradient-to-b from-sky-300 via-sky-500 to-blue-600 bg-clip-text pb-3 text-transparent">
                            Engineer
                        </span>
                    </h1>
                    <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
                        <span>Flutter</span>
                        <span className="text-sky-400">•</span>
                        <span>Next.js</span>
                        <span className="text-sky-400">•</span>
                        <span>Node.js Developer</span>
                    </p>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-300 sm:text-xl">
                        Building modern mobile and web experiences with clean code and
                        practical solutions.
                    </p>

                    <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:gap-5">
                        <Link
                            href="/projects"
                            className="inline-flex items-center justify-center gap-3
      rounded-xl bg-gradient-to-r from-sky-500 to-blue-600
      px-7 py-4 text-base font-semibold
      shadow-[0_0_28px_rgba(0,119,255,0.3)]
      transition-all hover:brightness-110
      hover:shadow-[0_0_36px_rgba(0,119,255,0.45)]
      focus-visible:outline-2 focus-visible:outline-offset-4
      focus-visible:outline-sky-400"
                        >
                            <Icon name="folder" />
                            View Projects
                            <Icon name="arrow" />
                        </Link>

                        <Link
                            href="/cv.pdf"
                            download
                            prefetch={false}
                            className="inline-flex items-center justify-center gap-3
      rounded-xl border border-sky-400 bg-[#020f1b]/50
      px-7 py-4 text-base font-semibold
      transition-colors hover:bg-sky-400/10
      focus-visible:outline-2 focus-visible:outline-offset-4
      focus-visible:outline-sky-400"
                        >
                            <Icon name="download" />
                            Download CV
                        </Link>
                    </div>
                </div>

                {/* Statistics */}
                <dl
                    className="grid grid-cols-1 overflow-hidden rounded-2xl
    border border-sky-500/70 bg-[#020f1b]/85
    backdrop-blur-md sm:grid-cols-3"
                >
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className={`relative flex flex-col items-center justify-center
        gap-3 px-3 py-6 sm:py-7 ${index > 0
                                    ? "border-t border-sky-500/30 sm:border-l sm:border-t-0"
                                    : ""
                                }`}
                        >
                            <dt className="order-2 text-center text-sm text-slate-100 sm:text-lg">
                                {stat.label}
                            </dt>

                            <dd className="order-1 flex items-center gap-3 sm:gap-5">
                                <Icon
                                    name={stat.icon}
                                    className="h-8 w-8 text-sky-400
            drop-shadow-[0_0_10px_rgba(0,149,255,0.25)]
            sm:h-10 sm:w-10"
                                />

                                <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    {stat.value}
                                </span>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}