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

const ProjectItem = ({ project, index }) => {
  const hasVideo = !!project.videoUrl;

  // Build a single combined media list for screenshots (landscape and portrait together)
  const mediaList = [];
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

  const [activeIndex, setActiveIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const currentMedia = mediaList[activeIndex];

  const handleNextMedia = () => {
    if (mediaList.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % mediaList.length);
  };

  const getMediaUrl = (asset) => {
    if (!asset) return "";
    return typeof asset === "object" ? urlFor(asset).width(800).url() : asset;
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
              src={getMediaUrl(currentMedia?.asset)}
              alt={currentMedia?.alt || project.title}
              onClick={() => setShowZoomModal(true)}
              className="h-full w-auto object-contain cursor-zoom-in"
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

              {/* Toggles video walkthrough display in a popup modal */}
              {hasVideo && (
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="underline underline-offset-4 hover:no-underline text-ink cursor-pointer"
                >
                  VIDEO DEMO
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Video Modal Overlay */}
      {showVideoModal && hasVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ground/95 p-4 transition-colors duration-150">
          <div className="relative w-full max-w-4xl bg-ground border border-border-custom flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-border-light font-sans text-[10px] tracking-widest uppercase font-bold text-ink">
              <span>PROJECT DEMO — {project.title}</span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="hover:underline cursor-pointer"
                aria-label="Close modal"
              >
                CLOSE ×
              </button>
            </div>

            {/* Modal Viewport */}
            <div className="relative pt-[56.25%] w-full bg-surface">
              <iframe
                src={getYouTubeEmbedUrl(project.videoUrl)}
                className="absolute inset-0 w-full h-full border-0"
                title={`${project.title} Walkthrough Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Modal Overlay */}
      {showZoomModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ground/95 p-4 transition-colors duration-150 cursor-zoom-out"
          onClick={() => setShowZoomModal(false)}
        >
          <img
            src={getMediaUrl(currentMedia?.asset)}
            alt={currentMedia?.alt || project.title}
            className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain select-none cursor-default"
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
