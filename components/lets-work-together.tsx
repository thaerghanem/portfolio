import Link from "next/link";
import { FiMail, FiSend, FiArrowRight } from "react-icons/fi";

export default function LetsWorkTogether() {
    return (
        <section
            dir="ltr"
            aria-labelledby="work-together-title"
            className="bg-[#020f1b] pb-12 pt-4 text-white"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div
                    className="relative isolate overflow-hidden rounded-2xl
            border border-sky-400/70
            bg-gradient-to-r from-[#043052] via-[#031c36] to-[#0638a8]
            px-6 py-8 sm:px-8 lg:px-10"
                >
                    {/* Background glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-16 -top-24
              -z-10 h-72 w-72 rounded-full bg-blue-600/25 blur-3xl"
                    />

                    <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                        {/* Icon and text */}
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
                            <FiMail
                                aria-hidden="true"
                                strokeWidth={1.8}
                                className="h-16 w-16 shrink-0 text-sky-400
                  drop-shadow-[0_0_15px_rgba(14,165,233,0.6)]
                  sm:h-20 sm:w-20"
                            />

                            <div>
                                <p className="text-xs font-semibold tracking-[0.15em] text-sky-400 sm:text-sm">
                                    LET&apos;S WORK TOGETHER
                                </p>

                                <h2
                                    id="work-together-title"
                                    className="mt-2 text-2xl leading-tight tracking-tight sm:text-3xl"
                                >
                                    Have a{" "}
                                    <span className="font-extrabold">
                                        Project in Mind?
                                    </span>
                                </h2>

                                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200">
                                    I&apos;m always open to discussing new opportunities
                                    and interesting projects.
                                </p>
                            </div>
                        </div>

                        {/* Contact link */}
                        <Link
                            href="/contact"
                            className="group inline-flex shrink-0 items-center
                justify-center gap-3 self-start rounded-xl
                bg-gradient-to-r from-sky-500 to-blue-600
                px-7 py-4 text-sm font-semibold
                shadow-[0_0_25px_rgba(0,119,255,0.3)]
                transition-shadow hover:shadow-[0_0_35px_rgba(0,149,255,0.5)]
                focus-visible:outline-2 focus-visible:outline-offset-4
                focus-visible:outline-sky-300
                lg:self-auto"
                        >
                            <FiSend aria-hidden="true" className="h-5 w-5" />

                            Let&apos;s Talk

                            <FiArrowRight
                                aria-hidden="true"
                                className="h-5 w-5 motion-safe:transition-transform
                  motion-safe:group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}