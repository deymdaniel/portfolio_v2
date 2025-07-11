import React from "react";
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
                <div className='relative group overflow-hidden rounded-lg border-2 border-slate-600 shadow-xl bg-slate-900'>
                  {project.status === "Coming Soon" ? (
                    <div className='w-full h-64 md:h-80 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900'>
                      <div className='bg-red-500 text-white px-6 py-3 rounded-full text-lg font-medium'>
                        Coming Soon
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className='w-full object-contain transition-all duration-300 group-hover:scale-105 filter brightness-90 group-hover:brightness-75'
                      />
                      <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <div className='flex space-x-4'>
                          <a
                            href={project.liveUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-200'
                          >
                            <svg
                              className='w-5 h-5'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
                              />
                            </svg>
                          </a>
                          <a
                            href={project.githubUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-200'
                          >
                            <svg
                              className='w-5 h-5'
                              fill='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </>
                  )}
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
                  className={`flex flex-wrap gap-3 ${
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

                {/* Mobile-only buttons */}
                <div className='mt-6 flex items-center space-x-4 md:hidden'>
                  {project.status !== "Coming Soon" && (
                    <>
                      <a
                        href={project.liveUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={`${config.colors.buttonSecondary} border px-4 py-2 rounded text-xs transition-all duration-200 inline-flex items-center`}
                      >
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={`${config.colors.buttonSecondary} border px-4 py-2 rounded text-xs transition-all duration-200 inline-flex items-center`}
                      >
                        GitHub
                      </a>
                    </>
                  )}
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
