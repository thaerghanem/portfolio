import Hero from "@/components/hero";
import Skills from "@/components/skills";
import About from "@/components/about";
import WhatIDo from "@/components/what-i-do";
import LetsWorkTogether from "@/components/lets-work-together";
import FeaturedProjects from "@/components/featured-projects";

export default function Home() {
  return (
    <main data-page="home">
      <Hero />
      <Skills />
      <FeaturedProjects />
      <About />
      <WhatIDo />
      <LetsWorkTogether />
    </main>
  );
}