import React from "react";
import { config } from "../config";

const About = () => {
  return (
    <section id='about' className={`py-20 ${config.colors.primary} px-6`}>
      <div className='max-w-6xl mx-auto'>
        <div className='flex items-center mb-12'>
          <h2
            className={`${config.colors.textPrimary} text-2xl md:text-3xl font-bold`}
          >
            <span className={`${config.colors.accent} mr-3`}>01.</span>
            About Me
          </h2>
          <div
            className={`ml-8 h-px ${config.colors.border} border-t flex-1 max-w-xs`}
          ></div>
        </div>

        <div className='max-w-4xl space-y-6'>
          <p
            className={`${config.colors.textSecondary} text-lg leading-relaxed`}
          >
            {config.about.description}
          </p>

          <p
            className={`${config.colors.textSecondary} text-lg leading-relaxed`}
          >
            Before diving into web development, I explored graphic design as a
            hobby, which now helps me blend creativity with code to build
            visually appealing and user-friendly websites.
          </p>

          <p
            className={`${config.colors.textSecondary} text-lg leading-relaxed`}
          >
            When I'm not coding, you'll probably find me gaming, watching{" "}
            <a
              href='https://boxd.it/6fW5D'
              target='_blank'
              rel='noopener noreferrer'
              className={`${config.colors.accent} ${config.colors.linkHover} transition-colors duration-200 underline`}
            >
              movies
            </a>
            , or listening to{" "}
            <a
              href='https://open.spotify.com/user/deymdaniel?si=2acf08424f9c4e34'
              target='_blank'
              rel='noopener noreferrer'
              className={`${config.colors.accent} ${config.colors.linkHover} transition-colors duration-200 underline`}
            >
              music
            </a>
            .
          </p>

          <div className='mt-8'>
            <h3
              className={`${config.colors.textPrimary} text-xl font-semibold mb-6`}
            >
              Technologies I work with:
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              {config.about.skills.map((skill, index) => (
                <div
                  key={index}
                  className={`flex items-center ${config.colors.textSecondary}`}
                >
                  <span className={`${config.colors.accent} mr-3`}>▹</span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
