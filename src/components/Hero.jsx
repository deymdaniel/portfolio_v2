import React from "react";
import { config } from "../config";

const Hero = () => {
  const name = config.name;
  const title = config.title;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const isDesktop = window.innerWidth >= 1024;
      const yOffset = isDesktop ? 0 : -60;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "auto" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-end px-2 md:px-4 pb-8 pt-24 relative overflow-hidden">
      {/* Corner index watermark */}
      <div className="absolute top-8 right-2 md:right-4 font-display text-[8rem] md:text-[12rem] font-bold text-ink opacity-[0.05] dark:opacity-[0.1] leading-none select-none pointer-events-none">
        001
      </div>

      <div>
        {/* Massive name */}
        <h1 className="font-display text-[6rem] sm:text-[6rem] lg:text-[10rem] xl:text-[12rem] font-bold tracking-tighter uppercase leading-[0.85] text-ink select-none">
          {name}
        </h1>

        {/* Tiny role — extreme contrast */}
        <h2 className="font-sans text-xs tracking-[0.3em] uppercase font-normal text-muted mt-4">
          {title}
        </h2>

        <p className="font-sans text-[11px] tracking-wide leading-relaxed uppercase text-muted max-w-md mt-8">
          Full-stack web and mobile developer with experience building responsive web platforms and cross-platform mobile apps using React, Flutter, Supabase, and Firebase. I use modern developer tools like AI agents and Model Context Protocol (MCP) servers as force multipliers to speed up coding, debugging, and testing, allowing me to build and ship high-quality software quickly.
        </p>

        {/* CTA */}
        <button
          onClick={() => scrollToSection('projects')}
          className="mt-12 mb-4 font-sans text-xs tracking-widest uppercase font-bold text-ink underline underline-offset-4 hover:no-underline cursor-pointer text-left"
        >
          VIEW PROJECTS →
        </button>
      </div>
    </section>
  );
};

export default Hero;
