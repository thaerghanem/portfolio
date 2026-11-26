import Image from "next/image";
import Link from "next/link";
import { FiAward, FiArrowUpRight } from "react-icons/fi";

export type Certification = {
    id: string;
    title: string;
    issuer: string;
    date: string;
    image?: string;
    credentialUrl?: string;
    skills: string[];
};

type CertificationsProps = {
    certifications: Certification[];
};

export default function Certifications({
    certifications,
}: CertificationsProps) {
    return (
        <section
            dir="ltr"
            aria-labelledby="certifications-title"
            className="bg-[#020f1b] px-6 py-16 text-white sm:py-20 lg:px-8"
        >
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <span
                        className="mx-auto flex h-14 w-14 items-center
                        justify-center rounded-2xl border border-sky-400/30
                        bg-sky-400/10 text-sky-400"
                    >
                        <FiAward aria-hidden="true" className="h-7 w-7" />
                    </span>

                    <h1
                        id="certifications-title"
                        className="mt-5 text-4xl font-extrabold
                        tracking-tight sm:text-5xl"
                    >
                        My <span className="text-sky-400">Certifications</span>
                    </h1>

                    <p className="mt-4 leading-relaxed text-slate-300">
                        Courses and certifications that support my journey
                        in mobile and web development.
                    </p>
                </div>

                {certifications.length === 0 ? (
                    <p
                        className="mt-12 rounded-2xl border border-sky-500/25
                        bg-[#061827] px-6 py-12 text-center text-slate-300"
                    >
                        Certifications will be added soon.
                    </p>
                ) : (
                    <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {certifications.map((certificate) => (
                            <li key={certificate.id} className="min-w-0">
                                <article
                                    className="flex h-full flex-col overflow-hidden
                                    rounded-2xl border border-sky-500/30
                                    bg-[#061827] transition-[border-color,box-shadow]
                                    hover:border-sky-400
                                    hover:shadow-[0_0_28px_rgba(14,165,233,0.12)]"
                                >
                                    <div
                                        className="relative aspect-4/3
                                        border-b border-sky-500/20 bg-[#04111e]"
                                    >
                                        {certificate.image ? (
                                            <Image
                                                src={certificate.image}
                                                alt={`${certificate.title} certificate`}
                                                fill
                                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                                className="object-contain p-4"
                                            />
                                        ) : (
                                            <div
                                                className="flex h-full items-center
                                                justify-center text-sky-400"
                                            >
                                                <FiAward
                                                    aria-hidden="true"
                                                    className="h-20 w-20"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col p-6">
                                        <div
                                            className="flex flex-wrap items-center
                                            justify-between gap-2 text-sm"
                                        >
                                            <p className="font-medium text-sky-400">
                                                {certificate.issuer}
                                            </p>

                                            <p className="text-slate-400">
                                                {certificate.date}
                                            </p>
                                        </div>

                                        <h2 className="mt-3 text-xl font-bold leading-snug">
                                            {certificate.title}
                                        </h2>

                                        {certificate.skills.length > 0 && (
                                            <ul
                                                aria-label="Skills covered"
                                                className="mt-5 flex flex-wrap gap-2"
                                            >
                                                {certificate.skills.map((skill) => (
                                                    <li
                                                        key={skill}
                                                        className="rounded-md border
                                                        border-sky-500/25 bg-sky-400/10
                                                        px-3 py-1 text-xs text-slate-200"
                                                    >
                                                        {skill}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {certificate.credentialUrl && (
                                            <div className="mt-auto pt-6">
                                                <Link
                                                    href={certificate.credentialUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    prefetch={false}
                                                    className="inline-flex items-center
                                                    gap-2 rounded text-sm font-semibold
                                                    text-sky-400 hover:text-sky-200
                                                    focus-visible:outline-2
                                                    focus-visible:outline-offset-4
                                                    focus-visible:outline-sky-400"
                                                >
                                                    View Certificate
                                                    <FiArrowUpRight
                                                        aria-hidden="true"
                                                        className="h-5 w-5"
                                                    />
                                                    <span className="sr-only">
                                                        (opens in a new tab)
                                                    </span>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}