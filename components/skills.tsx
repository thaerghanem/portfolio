import {
    SiFlutter,
    SiDart,
    SiNextdotjs,
    SiReact,
    SiNodedotjs,
    SiExpress,
    SiPostgresql,
    SiFirebase,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

const skills = [
    { name: "Flutter", icon: SiFlutter, color: "text-[#29B6F6]" },
    { name: "Dart", icon: SiDart, color: "text-[#00B4AB]" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
    { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
    { name: "Node.js", icon: SiNodedotjs, color: "text-[#65C95B]" },
    { name: "Express.js", icon: SiExpress, color: "text-white" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#699ECA]" },
    { name: "Firebase", icon: SiFirebase, color: "text-[#FFCA28]" },
    { name: "REST API", icon: TbApi, color: "text-white" },
];

export default function Skills() {
    return (
        <section
            id="skills"
            dir="ltr"
            aria-labelledby="skills-title"
            className="bg-[#020f1b] py-12 text-white sm:py-16"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Heading */}
                <div className="mb-8 text-center">
                    <h2
                        id="skills-title"
                        className="text-3xl font-extrabold tracking-tight sm:text-4xl"
                    >
                        Sk<span className="text-sky-400">ills</span>
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                        Tools and technologies I use to turn ideas into real products
                    </p>
                </div>

                {/* Skill cards */}
                <ul className="grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-5 lg:grid-cols-9">
                    {skills.map(({ name, icon: Icon, color }) => (
                        <li
                            key={name}
                            className="group flex min-w-0 flex-col items-center
                justify-center gap-4 rounded-xl border border-sky-500/40
                bg-gradient-to-b from-[#061827] to-[#020c15]
                px-2 py-6
                motion-safe:transition-all motion-safe:duration-300
                motion-safe:hover:-translate-y-1
                hover:border-sky-400
                hover:shadow-[0_0_24px_rgba(14,165,233,0.18)]"
                        >
                            <Icon
                                aria-hidden="true"
                                className={`h-11 w-11 shrink-0
                  motion-safe:transition-transform motion-safe:duration-300
                  motion-safe:group-hover:scale-110
                  sm:h-12 sm:w-12 ${color}`}
                            />

                            <span className="text-center text-xs font-semibold sm:text-sm">
                                {name}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}