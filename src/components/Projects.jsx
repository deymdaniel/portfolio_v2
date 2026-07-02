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
  const isPortrait = project.layout === "portrait";

  // Build the media list array containing all available visual assets
  const mediaList = [];

  if (project.image) {
    mediaList.push({
      type: "image",
      asset: project.image,
      alt: `${project.title} Cover`,
    });
  }

  if (project.images && project.images.length > 0) {
    project.images.forEach((img, idx) => {
      mediaList.push({
        type: "image",
        asset: img,
        alt: `${project.title} Screenshot ${idx + 1}`,
      });
    });
  }

  if (project.videoUrl) {
    mediaList.push({
      type: "video",
      url: project.videoUrl,
    });
  }

  const [activeIndex, setActiveIndex] = useState(0);
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
    <div className="py-16 lg:py-20 grid lg:grid-cols-10 gap-8 lg:gap-12 items-start">
      {/* Project Media Viewport Slot */}
      <div className="lg:col-span-6">
        <div 
          className={`overflow-hidden bg-surface relative select-none
            ${isPortrait 
              ? "aspect-[9/16] max-w-[320px] w-full" 
              : "aspect-video w-full"
            }`}
        >
          {project.status === "Coming Soon" ? (
            <div className="w-full h-full flex items-center justify-center font-sans text-xs tracking-[0.2em] uppercase font-bold text-muted">
              COMING SOON
            </div>
          ) : currentMedia?.type === "video" ? (
            <iframe
              src={getYouTubeEmbedUrl(currentMedia.url)}
              className="w-full h-full border-0 absolute inset-0"
              title={`${project.title} Walkthrough`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src={getMediaUrl(currentMedia?.asset)}
              alt={currentMedia?.alt || project.title}
              onClick={handleNextMedia}
              className={`w-full h-full object-cover ${mediaList.length > 1 ? "cursor-pointer" : ""}`}
            />
          )}

          {/* Inline cycle button (Brutalist style) */}
          {mediaList.length > 1 && (
            <button
              onClick={handleNextMedia}
              className="absolute top-3 right-3 bg-ground text-ink border border-border-custom px-2 py-1 text-[9px] font-bold tracking-widest uppercase hover:bg-ink hover:text-ground cursor-pointer transition-colors duration-150 z-10"
            >
              NEXT →
            </button>
          )}

          {/* Slide Indicator Overlay */}
          {mediaList.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-ground/85 text-ink px-2 py-1 text-[8px] font-bold tracking-widest uppercase pointer-events-none select-none">
              {activeIndex + 1} / {mediaList.length} {currentMedia?.type === "image" ? "· CLICK IMAGE" : ""}
            </div>
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

              {/* Direct jump to video in cycle if available */}
              {project.videoUrl && currentMedia?.type !== "video" && (
                <button
                  onClick={() => {
                    const videoIdx = mediaList.findIndex(m => m.type === "video");
                    if (videoIdx !== -1) setActiveIndex(videoIdx);
                  }}
                  className="underline underline-offset-4 hover:no-underline text-ink cursor-pointer"
                >
                  VIDEO DEMO
                </button>
              )}
            </>
          )}
        </div>
      </div>
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
