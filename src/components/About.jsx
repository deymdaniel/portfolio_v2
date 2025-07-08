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

        <div className='max-w-4xl'>
          <p
            className={`${config.colors.textSecondary} text-lg leading-relaxed mb-8`}
          >
            {config.about.description}
          </p>

          <div>
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
