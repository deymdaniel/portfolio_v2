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

  // Build list of landscape screenshots (web)
  const landscapeList = [];
  if (project.image) {
    landscapeList.push({
      asset: project.image,
      alt: `${project.title} Desktop Cover`,
    });
  }
  if (project.landscapeImages && project.landscapeImages.length > 0) {
    project.landscapeImages.forEach((img, idx) => {
      landscapeList.push({
        asset: img,
        alt: `${project.title} Desktop Screenshot ${idx + 1}`,
      });
    });
  }

  // Build list of portrait screenshots (mobile mockups)
  const portraitList = [];
  if (project.portraitImages && project.portraitImages.length > 0) {
    project.portraitImages.forEach((img, idx) => {
      portraitList.push({
        asset: img,
        alt: `${project.title} Mobile Mockup ${idx + 1}`,
      });
    });
  }

  const [activeLandscapeIdx, setActiveLandscapeIdx] = useState(0);
  const [activePortraitIdx, setActivePortraitIdx] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleNextLandscape = () => {
    if (landscapeList.length <= 1) return;
    setActiveLandscapeIdx((prev) => (prev + 1) % landscapeList.length);
  };

  const handleNextPortrait = () => {
    if (portraitList.length <= 1) return;
    setActivePortraitIdx((prev) => (prev + 1) % portraitList.length);
  };

  const getMediaUrl = (asset) => {
    if (!asset) return "";
    return typeof asset === "object" ? urlFor(asset).width(800).url() : asset;
  };

  const showSplit = landscapeList.length > 0 && portraitList.length > 0;

  return (
    <div className="py-16 lg:py-20 grid lg:grid-cols-10 gap-8 lg:gap-12 items-start">
      {/* Project Media Viewport Slot */}
      <div className="lg:col-span-6">
        {project.status === "Coming Soon" ? (
          <div className="w-full bg-surface overflow-hidden select-none h-[280px] sm:h-[340px] lg:h-[380px] flex items-center justify-center font-sans text-xs tracking-[0.2em] uppercase font-bold text-muted">
            COMING SOON
          </div>
        ) : showSplit ? (
          /* Split media view: Web (Landscape) on left, Mobile (Portrait) on right */
          <div className="flex flex-col sm:flex-row gap-6 items-stretch w-full">
            {/* Left: Landscape Website */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="w-full bg-surface flex items-center justify-center overflow-hidden h-[180px] sm:h-[220px] lg:h-[260px]">
                <img
                  src={getMediaUrl(landscapeList[activeLandscapeIdx]?.asset)}
                  alt={landscapeList[activeLandscapeIdx]?.alt}
                  onClick={handleNextLandscape}
                  className={`h-full w-auto object-contain ${landscapeList.length > 1 ? "cursor-pointer" : ""}`}
                />
              </div>
              
              {landscapeList.length > 1 && (
                <div className="flex justify-between items-center mt-2 font-sans text-[9px] tracking-widest uppercase font-bold select-none">
                  <span className="text-muted">{activeLandscapeIdx + 1} / {landscapeList.length}</span>
                  <button onClick={handleNextLandscape} className="cursor-pointer text-ink hover:underline">NEXT WEB →</button>
                </div>
              )}
            </div>

            {/* Right: Portrait Phone Mockup */}
            <div className="w-full sm:w-[38%] flex flex-col justify-between">
              <div className="w-full bg-surface flex items-center justify-center overflow-hidden h-[180px] sm:h-[220px] lg:h-[260px]">
                <img
                  src={getMediaUrl(portraitList[activePortraitIdx]?.asset)}
                  alt={portraitList[activePortraitIdx]?.alt}
                  onClick={handleNextPortrait}
                  className={`h-full w-auto object-contain ${portraitList.length > 1 ? "cursor-pointer" : ""}`}
                />
              </div>

              {portraitList.length > 1 && (
                <div className="flex justify-between items-center mt-2 font-sans text-[9px] tracking-widest uppercase font-bold select-none">
                  <span className="text-muted">{activePortraitIdx + 1} / {portraitList.length}</span>
                  <button onClick={handleNextPortrait} className="cursor-pointer text-ink hover:underline">NEXT MOBILE →</button>
                </div>
              )}
            </div>
          </div>
        ) : landscapeList.length > 0 ? (
          /* Landscape screenshot only */
          <div className="w-full flex flex-col">
            <div className="w-full bg-surface flex items-center justify-center lg:justify-start overflow-hidden select-none h-[280px] sm:h-[340px] lg:h-[380px]">
              <img
                src={getMediaUrl(landscapeList[activeLandscapeIdx]?.asset)}
                alt={landscapeList[activeLandscapeIdx]?.alt}
                onClick={handleNextLandscape}
                className={`h-full w-auto object-contain ${landscapeList.length > 1 ? "cursor-pointer" : ""}`}
              />
            </div>
            
            {landscapeList.length > 1 && (
              <div className="flex justify-between items-center mt-3 font-sans text-[9px] tracking-widest uppercase font-bold select-none">
                <span className="text-muted">{activeLandscapeIdx + 1} / {landscapeList.length}</span>
                <button onClick={handleNextLandscape} className="cursor-pointer text-ink hover:underline">NEXT IMAGE →</button>
              </div>
            )}
          </div>
        ) : (
          /* Portrait mockup only */
          <div className="flex flex-col max-w-[320px] w-full">
            <div className="w-full bg-surface flex items-center justify-center overflow-hidden select-none h-[400px] lg:h-[480px]">
              <img
                src={getMediaUrl(portraitList[activePortraitIdx]?.asset)}
                alt={portraitList[activePortraitIdx]?.alt}
                onClick={handleNextPortrait}
                className={`h-full w-auto object-contain ${portraitList.length > 1 ? "cursor-pointer" : ""}`}
              />
            </div>

            {portraitList.length > 1 && (
              <div className="flex justify-between items-center mt-3 font-sans text-[9px] tracking-widest uppercase font-bold select-none">
                <span className="text-muted">{activePortraitIdx + 1} / {portraitList.length}</span>
                <button onClick={handleNextPortrait} className="cursor-pointer text-ink hover:underline">NEXT IMAGE →</button>
              </div>
            )}
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

              {/* Opens video walkthrough in modal */}
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
    </div>
  );
};

const Projects = ({ projects }) => {
  const displayProjects = projects && projects.length > 0 ? projects : config.projects;

  return (
    <section id="projects" className="py-24 lg:py-32 px-2 md:px-4 relative overflow-hidden">
      {/* Watermark number */}
      <div className="absolute -top-8 -left-2 font-display text-[10rem] lg:text-[16rem] font-bold text-ink opacity-[0.05] dark:opacity-[0.1] leading-none select-none pointer-events-none">
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
