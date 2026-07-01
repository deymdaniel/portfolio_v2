import React, { useState } from "react";
import { config } from "../config";
import { urlFor } from "../lib/sanity";

// Helper to convert YouTube watch links to embeddable links
const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  let videoId = "";
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1);
    } else if (parsedUrl.hostname.includes("youtube.com")) {
      videoId = parsedUrl.searchParams.get("v");
      if (!videoId && parsedUrl.pathname.startsWith("/embed/")) {
        videoId = parsedUrl.pathname.split("/")[2];
      }
    }
  } catch (e) {
    console.error("Invalid YouTube URL:", url, e);
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

const Projects = ({ projects }) => {
  const displayProjects = projects && projects.length > 0 ? projects : config.projects;
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="projects" className="py-24 lg:py-32 px-2 md:px-4 relative overflow-hidden">
      {/* Watermark number */}
      <div className="absolute lg:-top-8 lg:-left-2 top-2 left-2 font-display text-[10rem] lg:text-[16rem] font-bold text-ink opacity-[0.05] dark:opacity-[0.1] leading-none select-none pointer-events-none">
        02
      </div>

      {/* Section Header */}
      <div className="mb-16 lg:mb-20">
        <div className="font-sans text-[10px] tracking-[0.3em] text-muted uppercase mb-2">
          02 — WORK
        </div>
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter uppercase text-ink">
          THINGS I'VE BUILT
        </h2>
      </div>

      {/* Project Stack */}
      <div>
        {displayProjects.map((project, index) => {
          const hasVideo = !!project.videoUrl;

          let imageUrl = "";
          if (project.image) {
            imageUrl = typeof project.image === "object"
              ? urlFor(project.image).width(800).url()
              : project.image;
          }

          return (
            <div
              key={project._id || project.id}
              className="py-16 lg:py-20 grid lg:grid-cols-10 gap-8 lg:gap-12 items-start"
            >
              {/* Project Image — full color, no effects */}
              <div className="lg:col-span-6">
                <div className="aspect-video overflow-hidden bg-surface">
                  {project.status === "Coming Soon" ? (
                    <div className="w-full h-full flex items-center justify-center font-sans text-xs tracking-[0.2em] uppercase font-bold text-muted">
                      COMING SOON
                    </div>
                  ) : (
                    <img
                      src={imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="lg:col-span-4 flex flex-col justify-start space-y-4">
                {/* Big index number */}
                <span className="font-display text-5xl lg:text-6xl font-bold text-ink opacity-10 leading-none">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase text-ink mt-1">
                  {project.title}
                </h3>

                <p className="font-sans text-xs tracking-wide leading-relaxed uppercase text-muted">
                  {project.description}
                </p>

                {/* Technologies — separated by middle dot */}
                <div className="font-sans text-[10px] tracking-wider uppercase text-muted">
                  {(project.technologies || []).join(" · ")}
                </div>

                {/* Links — no brackets */}
                <div className="flex flex-wrap gap-4 pt-2 font-sans text-xs tracking-widest uppercase font-bold">
                  {project.status !== "Coming Soon" && (
                    <>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:no-underline text-ink"
                      >
                        LIVE DEMO
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:no-underline text-ink"
                      >
                        CODE
                      </a>
                      {hasVideo && (
                        <button
                          onClick={() => setActiveVideo(getYouTubeEmbedUrl(project.videoUrl))}
                          className="underline underline-offset-4 hover:no-underline text-ink cursor-pointer"
                        >
                          VIDEO
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More */}
      <div className="mt-16 pt-16">
        <a
          href={config.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full border border-border-custom py-5 font-display text-sm tracking-wider uppercase font-bold text-ink text-center hover:bg-ink hover:text-ground transition-colors duration-150"
        >
          VIEW MORE ON GITHUB
        </a>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ground/95 p-4">
          <div className="relative w-full max-w-5xl bg-ground border border-border-custom">
            <div className="flex justify-between items-center px-4 py-3 border-b border-border-light font-sans text-[10px] tracking-widest uppercase font-bold">
              <span>PROJECT DEMO</span>
              <button
                onClick={() => setActiveVideo(null)}
                className="hover:underline cursor-pointer"
                aria-label="Close modal"
              >
                CLOSE ×
              </button>
            </div>
            <div className="relative pt-[56.25%] w-full bg-ink/5">
              <iframe
                src={activeVideo}
                className="absolute inset-0 w-full h-full border-0"
                title="Project Walkthrough Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
