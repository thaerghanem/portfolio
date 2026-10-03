import {
    TbDeviceMobile,
    TbDeviceDesktop,
    TbServer,
} from "react-icons/tb";

const services = [
    {
        title: "Mobile App Development",
        description:
            "Cross-platform apps with Flutter and modern UI/UX.",
        icon: TbDeviceMobile,
    },
    {
        title: "Web Development",
        description:
            "Modern web apps with Next.js and responsive design.",
        icon: TbDeviceDesktop,
    },
    {
        title: "Backend Development",
        description:
            "Scalable APIs with Node.js, Express and PostgreSQL.",
        icon: TbServer,
    },
];

export default function WhatIDo() {
    return (
        <section
            id="services"
            dir="ltr"
            aria-labelledby="services-title"
            className="bg-[#020f1b] py-12 text-white sm:py-16"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Heading */}
                <div className="mb-6">
                    <h2
                        id="services-title"
                        className="text-3xl font-extrabold tracking-tight sm:text-4xl"
                    >
                        What <span className="text-sky-400">I Do</span>
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                        From mobile apps to web platforms, I build complete solutions
                    </p>
                </div>

                {/* Services */}
                <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                    {services.map(({ title, description, icon: Icon }) => (
                        <li
                            key={title}
                            className="group flex items-center gap-5 rounded-xl
                border border-sky-500/40
                bg-gradient-to-br from-[#061b2c] to-[#020c15]
                p-6
                motion-safe:transition-all motion-safe:duration-300
                motion-safe:hover:-translate-y-1
                hover:border-sky-400
                hover:shadow-[0_0_25px_rgba(14,165,233,0.15)]"
                        >
                            <Icon
                                aria-hidden="true"
                                strokeWidth={1.7}
                                className="h-12 w-12 shrink-0 text-sky-400
                  drop-shadow-[0_0_12px_rgba(14,165,233,0.4)]
                  motion-safe:transition-transform
                  motion-safe:duration-300
                  motion-safe:group-hover:scale-110"
                            />

                            <div className="min-w-0">
                                <h3 className="text-base font-bold">
                                    {title}
                                </h3>

                                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                                    {description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}