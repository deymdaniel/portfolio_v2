import React, { useState } from "react";
import { config } from "../config";
import { urlFor } from "../lib/sanity";


const ProjectItem = ({ project, index }) => {
  const hasVideo = !!project.videoUrl;

  // Build a single combined media list for screenshots from the unified images field
  const mediaList = [];
  if (project.images && project.images.length > 0) {
    project.images.forEach((img, idx) => {
      mediaList.push({
        asset: img,
        alt: `${project.title} Screenshot ${idx + 1}`,
      });
    });
  } else {
    // Backward compatibility fallbacks for existing database content
    if (project.image) {
      mediaList.push({
        asset: project.image,
        alt: `${project.title} Cover`,
      });
    }
    if (project.landscapeImages && project.landscapeImages.length > 0) {
      project.landscapeImages.forEach((img, idx) => {
        mediaList.push({
          asset: img,
          alt: `${project.title} Desktop Screenshot ${idx + 1}`,
        });
      });
    }
    if (project.portraitImages && project.portraitImages.length > 0) {
      project.portraitImages.forEach((img, idx) => {
        mediaList.push({
          asset: img,
          alt: `${project.title} Mobile Mockup ${idx + 1}`,
        });
      });
    }
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const currentMedia = mediaList[activeIndex];

  const handleNextMedia = () => {
    if (mediaList.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % mediaList.length);
  };

  const getMediaUrl = (asset, width) => {
    if (!asset) return "";
    if (typeof asset === "object") {
      return width ? urlFor(asset).width(width).url() : urlFor(asset).url();
    }
    return asset;
  };

  const handleZoomClick = () => {
    if (window.innerWidth >= 1024) {
      setShowZoomModal(true);
    }
  };

  return (
    <div className="py-4 lg:py-0 grid lg:grid-cols-10 gap-8 lg:gap-12 items-start">
      {/* Project Media Viewport Slot — Centered, Constant height, no cropping */}
      <div className="lg:col-span-6">
        <div className="w-full bg-surface flex items-center justify-center overflow-hidden select-none h-[280px] sm:h-[380px] lg:h-[480px]">
          {project.status === "Coming Soon" ? (
            <div className="w-full h-full flex items-center justify-center font-sans text-xs tracking-[0.2em] uppercase font-bold text-muted">
              COMING SOON
            </div>
          ) : (
            <img
              src={getMediaUrl(currentMedia?.asset, 800)}
              alt={currentMedia?.alt || project.title}
              onClick={handleZoomClick}
              className="h-full w-auto object-contain cursor-default lg:cursor-zoom-in"
            />
          )}
        </div>

        {/* Media Controls Toolbar below the image */}
        {project.status !== "Coming Soon" && mediaList.length > 1 && (
          <div className="flex justify-between items-center mt-3 font-sans text-[10px] tracking-widest uppercase font-bold select-none">
            {/* Left side: Slide indicator */}
            <span className="text-muted text-[9px]">
              {activeIndex + 1} / {mediaList.length}
            </span>

            {/* Right side: Navigation buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleNextMedia}
                className="cursor-pointer underline underline-offset-4 hover:no-underline text-ink"
              >
                NEXT IMAGE →
              </button>
            </div>
          </div>
        )}
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

        {/* Technologies */}
        <div className="font-sans text-[10px] tracking-wider uppercase text-muted">
          {(project.technologies || []).join(" · ")}
        </div>

        {/* Dynamic / Conditional Links */}
        <div className="flex flex-wrap gap-4 pt-2 font-sans text-xs tracking-widest uppercase font-bold">
          {project.status !== "Coming Soon" && (
            <>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:no-underline text-ink"
                >
                  LIVE DEMO
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:no-underline text-ink"
                >
                  CODE
                </a>
              )}

              {/* Opens video walkthrough directly in a new tab */}
              {hasVideo && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:no-underline text-ink"
                >
                  VIDEO DEMO
                </a>
              )}
            </>
          )}
        </div>
      </div>


      {/* Zoom Modal Overlay */}
      {showZoomModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ground/95 p-4 transition-colors duration-150 cursor-zoom-out"
          onClick={() => setShowZoomModal(false)}
        >
          <img
            src={getMediaUrl(currentMedia?.asset)}
            alt={currentMedia?.alt || project.title}
            className="max-w-[98vw] max-h-[98vh] w-auto h-auto object-contain select-none cursor-default"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

const Projects = ({ projects }) => {
  const displayProjects = projects && projects.length > 0 ? projects : config.projects;

  return (
    <section id="projects" className="py-24 lg:py-32 px-2 md:px-4 relative overflow-hidden">
      {/* Watermark number */}
      <div className="absolute lg:-top-8 lg:-left-2 top-2 left-2 font-display text-[10rem] lg:text-[16rem] font-bold text-ink opacity-[0.05] dark:opacity-[0.1] leading-none select-none pointer-events-none">
        02
      </div>

      {/* Section Header */}
      <div className="mb-0 lg:mb-20">
        <div className="font-sans text-[10px] tracking-[0.3em] text-muted uppercase mb-2">
          02 — WORK
        </div>
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter uppercase text-ink">
          THINGS I'VE BUILT
        </h2>
      </div>

      {/* Project Stack */}
      <div>
        {displayProjects.map((project, index) => (
          <ProjectItem
            key={project._id || project.id}
            project={project}
            index={index}
          />
        ))}
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
    </section>
  );
};

export default Projects;
