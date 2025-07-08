import React from "react";
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { config } from "../config";

const Projects = () => {
  return (
    <section id='projects' className={`py-20 ${config.colors.primary} px-6`}>
      <div className='max-w-6xl mx-auto'>
        <div className='flex items-center mb-12'>
          <h2
            className={`${config.colors.textPrimary} text-2xl md:text-3xl font-bold`}
          >
            <span className={`${config.colors.accent} mr-3`}>02.</span>
            Things I've Built
          </h2>
          <div
            className={`ml-8 h-px ${config.colors.border} border-t flex-1 max-w-xs`}
          ></div>
        </div>

        <div className='space-y-20'>
          {config.projects.map((project, index) => (
            <div
              key={project.id}
              className={`grid md:grid-cols-12 gap-6 items-center ${
                index % 2 === 0 ? "" : "md:grid-flow-col-dense"
              }`}
            >
              {/* Project Image */}
              <div
                className={`md:col-span-7 ${
                  index % 2 === 0 ? "" : "md:col-start-6"
                }`}
              >
                <div className='relative group'>
                  <div
                    className={`${config.colors.secondary} rounded overflow-hidden`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className='w-full h-64 md:h-80 object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300'
                    />
                  </div>
                  <div
                    className={`absolute inset-0 bg-red-300 mix-blend-multiply group-hover:mix-blend-normal transition-all duration-300`}
                  ></div>
                </div>
              </div>

              {/* Project Content */}
              <div
                className={`md:col-span-5 ${
                  index % 2 === 0 ? "" : "md:col-start-1 md:row-start-1"
                } ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
              >
                <p className={`${config.colors.accent} text-sm mb-2`}>
                  Featured Project
                </p>

                <h3
                  className={`${config.colors.textPrimary} text-2xl font-bold mb-4`}
                >
                  {project.title}
                </h3>

                <div
                  className={`${config.colors.secondary} p-6 rounded shadow-lg mb-4`}
                >
                  <p
                    className={`${config.colors.textSecondary} leading-relaxed`}
                  >
                    {project.description}
                  </p>
                </div>

                <div
                  className={`flex flex-wrap gap-3 mb-6 ${
                    index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`${config.colors.textSecondary} text-sm`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div
                  className={`flex space-x-4 ${
                    index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  <a
                    href={project.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`${config.colors.textSecondary} ${config.colors.linkHover} transition-colors duration-200`}
                    aria-label='GitHub Repository'
                  >
                    <CodeBracketIcon className='w-6 h-6' />
                  </a>
                  <a
                    href={project.liveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`${config.colors.textSecondary} ${config.colors.linkHover} transition-colors duration-200`}
                    aria-label='Live Demo'
                  >
                    <ArrowTopRightOnSquareIcon className='w-6 h-6' />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center mt-16'>
          <a
            href={config.social.github}
            target='_blank'
            rel='noopener noreferrer'
            className={`${config.colors.buttonSecondary} border px-8 py-4 rounded text-sm transition-all duration-200 inline-block`}
          >
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
