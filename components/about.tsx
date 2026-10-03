import {
    TbSchool,
    TbCode,
    TbRocket,
    TbUsers,
} from "react-icons/tb";

const features = [
    {
        title: "Problem Solver",
        description:
            "I enjoy breaking down complex problems into simple, effective solutions.",
        icon: TbSchool,
    },
    {
        title: "Clean Code",
        description:
            "I write maintainable, scalable, and efficient code.",
        icon: TbCode,
    },
    {
        title: "Fast Learner",
        description:
            "I'm always exploring new technologies and improving my skills.",
        icon: TbRocket,
    },
    {
        title: "Team Player",
        description:
            "I enjoy collaborating and building great products together.",
        icon: TbUsers,
    },
];

export default function About() {
    return (
        <section
            id="about"
            dir="ltr"
            aria-labelledby="about-title"
            className="bg-[#020f1b] py-12 text-white sm:py-16"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Title */}
                <h2
                    id="about-title"
                    className="text-3xl font-extrabold tracking-tight sm:text-4xl"
                >
                    About <span className="text-sky-400">Me</span>
                </h2>

                {/* Introduction */}
                <p className="mt-4 max-w-5xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-8">
                    I&apos;m Thaer Ghanem, a Software Engineer passionate about
                    building modern mobile and web applications. I specialize in
                    Flutter for mobile development, Next.js for modern web apps,
                    and Node.js for backend solutions. I enjoy turning ideas into
                    real products with clean code, modern design, and great user
                    experiences.
                </p>

                {/* Strengths */}
                <ul className="mt-9 grid grid-cols-1 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map(({ title, description, icon: Icon }, index) => (
                        <li
                            key={title}
                            className={`px-0
                ${index % 2 === 1
                                    ? "sm:border-l sm:border-sky-500/25 sm:pl-7"
                                    : ""
                                }
                ${index > 0
                                    ? "lg:border-l lg:border-sky-500/25 lg:pl-8"
                                    : ""
                                }
                sm:pr-7 lg:pr-8`}
                        >
                            <div className="flex items-center gap-4">
                                <Icon
                                    aria-hidden="true"
                                    strokeWidth={1.7}
                                    className="h-10 w-10 shrink-0 text-sky-400
                    drop-shadow-[0_0_10px_rgba(14,165,233,0.25)]"
                                />

                                <h3 className="max-w-24 text-base font-medium leading-snug">
                                    {title}
                                </h3>
                            </div>

                            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300">
                                {description}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}