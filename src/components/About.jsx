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

        <div className='grid md:grid-cols-3 gap-12 items-start'>
          <div className='md:col-span-2'>
            <div
              className={`${config.colors.textSecondary} text-lg leading-relaxed space-y-4`}
            >
              <p>{config.about.description}</p>

              <p>
                Before diving into web development, I explored graphic design as
                a hobby, which now helps me blend creativity with code to build
                visually appealing and user-friendly websites.
              </p>
              <p>
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

              <p>
                Here are a few technologies I've been working with recently:
              </p>
            </div>

            <div className='mt-6 grid grid-cols-2 gap-2'>
              {config.about.skills.map((skill, index) => (
                <div key={index} className='flex items-center'>
                  <span className={`${config.colors.accent} mr-3`}>▸</span>
                  <span className={`${config.colors.textSecondary} text-sm`}>
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className='relative group'>
            <div
              className={`relative z-10 ${config.colors.secondary} rounded overflow-hidden`}
            >
              <img
                src='/api/placeholder/300/300' // Replace with your photo
                alt={config.name}
                className='w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-300'
              />
            </div>
            <div
              className={`absolute top-4 left-4 w-full h-full border-2 ${config.colors.accent} rounded -z-10 group-hover:top-2 group-hover:left-2 transition-all duration-300`}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
