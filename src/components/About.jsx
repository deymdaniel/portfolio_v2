import React from "react";
import { config } from "../config";

const About = ({ about }) => {
  const description = config.about.description;
  const skills = about?.skills || config.about.skills;

  return (
    <section id="about" className="py-24 lg:py-32 px-2 md:px-4 relative overflow-hidden">
      {/* Watermark number */}
      <div className="absolute lg:-top-8 lg:-left-2 top-2 left-2 font-display text-[10rem] lg:text-[16rem] font-bold text-ink opacity-[0.05] dark:opacity-[0.1] leading-none select-none pointer-events-none">
        01
      </div>

      {/* Section Header */}
      <div className="mb-16 lg:mb-20">
        <div className="font-sans text-[10px] tracking-[0.3em] text-muted uppercase mb-2">
          01 — ABOUT
        </div>
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter uppercase text-ink">
          ABOUT
        </h2>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-10 gap-8 lg:gap-16 items-start">
        {/* Description */}
        <div className="lg:col-span-6 font-sans text-xs sm:text-sm tracking-wide leading-relaxed uppercase text-ink">
          <p className="mb-6">{description}</p>
          <p className="mb-6">
            Before diving into web development, I explored graphic design as a
            hobby, which now helps me blend creativity with code to build
            visually appealing and user-friendly websites.
          </p>
          <p>
            When I'm not coding, you'll probably find me gaming, watching{" "}
            <a
              href="https://boxd.it/6fW5D"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:no-underline font-bold"
            >
              MOVIES
            </a>
            , or listening to{" "}
            <a
              href="https://open.spotify.com/user/deymdaniel?si=2acf08424f9c4e34"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:no-underline font-bold"
            >
              MUSIC
            </a>
            .
          </p>
        </div>

        {/* Skills */}
        <div className="lg:col-span-4">
          <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted mb-4">
            TECHNOLOGIES
          </div>
          <div>
            {skills.map((skill, index) => (
              <div
                key={index}
                className="py-3 flex items-center justify-between"
              >
                <span className="font-sans text-xs tracking-wider uppercase font-bold text-ink">
                  {skill}
                </span>
                <span className="font-sans text-[10px] text-muted font-normal">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
