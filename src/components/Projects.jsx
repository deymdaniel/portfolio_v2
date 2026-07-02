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

  // Build the media list containing ONLY image screenshots (no video in carousel)
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

  const [activeIndex, setActiveIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
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
      {/* Project Media Viewport Slot — Constant height, no cropping */}
      <div className="lg:col-span-6">
        <div className="w-full bg-surface flex items-center justify-center lg:justify-start overflow-hidden select-none h-[280px] sm:h-[340px] lg:h-[380px]">
          {project.status === "Coming Soon" ? (
            <div className="w-full h-full flex items-center justify-center font-sans text-xs tracking-[0.2em] uppercase font-bold text-muted">
              COMING SOON
            </div>
          ) : showVideo && hasVideo ? (
            <div className="w-full h-full">
              <iframe
                src={getYouTubeEmbedUrl(project.videoUrl)}
                className="w-full h-full border-0"
                title={`${project.title} Walkthrough`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <img
              src={getMediaUrl(currentMedia?.asset)}
              alt={currentMedia?.alt || project.title}
              onClick={handleNextMedia}
              className={`h-full w-auto object-contain ${mediaList.length > 1 ? "cursor-pointer" : ""}`}
            />
          )}
        </div>

        {/* Media Controls Toolbar below the image */}
        {project.status !== "Coming Soon" && (
          <div className="flex justify-between items-center mt-3 font-sans text-[10px] tracking-widest uppercase font-bold">
            {/* Left side: State indicator */}
            <span className="text-muted text-[9px]">
              {showVideo ? (
                "VIDEO WALKTHROUGH"
              ) : mediaList.length > 1 ? (
                `${activeIndex + 1} / ${mediaList.length}`
              ) : (
                "SCREENSHOT"
              )}
            </span>

            {/* Right side: Navigation buttons */}
            <div className="flex gap-4">
              {showVideo ? (
                <button
                  onClick={() => setShowVideo(false)}
                  className="cursor-pointer underline underline-offset-4 hover:no-underline text-ink"
                >
                  SHOW SCREENSHOTS
                </button>
              ) : (
                mediaList.length > 1 && (
                  <button
                    onClick={handleNextMedia}
                    className="cursor-pointer underline underline-offset-4 hover:no-underline text-ink"
                  >
                    NEXT IMAGE →
                  </button>
                )
              )}
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

              {/* Toggles video walkthrough display in the main viewport */}
              {hasVideo && (
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="underline underline-offset-4 hover:no-underline text-ink cursor-pointer"
                >
                  {showVideo ? "VIEW IMAGES" : "VIDEO DEMO"}
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
