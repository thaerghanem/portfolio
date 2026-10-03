import About from "@/components/about";
import LetsWorkTogether from "@/components/lets-work-together";
import Skills from "@/components/skills";

export default function AboutPage() {
    return (
        <main data-page="about">
            <Skills />
            <About />
            <LetsWorkTogether />
        </main>
    );
}