import About from "@/components/about";
import LetsWorkTogether from "@/components/lets-work-together";
import Skills from "@/components/skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Thaer Ghanem",
    description:
        "Get to know Thaer Ghanem, a web developer passionate about programming, creative problem-solving, and building thoughtful digital experiences.",
};

export default function AboutPage() {
    return (
        <main data-page="about">
            <Skills />
            <About />
            <LetsWorkTogether />
        </main>
    );
}