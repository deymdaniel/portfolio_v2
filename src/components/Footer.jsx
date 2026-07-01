import React from "react";
import { config } from "../config";

const Footer = ({ personalInfo, social }) => {
  const name = personalInfo?.name || config.name;
  const socials = {
    GITHUB: social?.github || config.social.github,
    LINKEDIN: social?.linkedin || config.social.linkedin,
    INSTAGRAM: social?.instagram || config.social.instagram,
    FACEBOOK: social?.facebook || config.social.facebook,
  };

  return (
    <footer className="py-6 px-2 md:px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Left — Name */}
        <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-ink">
          {name.toUpperCase()}
        </span>

        {/* Right — Socials + Year */}
        <div className="flex items-center gap-3 font-sans text-[10px] tracking-wider uppercase">
          {Object.entries(socials).map(([platform, url], index) => (
            <React.Fragment key={platform}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-ink transition-colors duration-150"
                aria-label={platform}
              >
                {platform}
              </a>
              {index < Object.keys(socials).length - 1 && (
                <span className="text-muted/50 select-none">/</span>
              )}
            </React.Fragment>
          ))}
          <span className="text-muted ml-2">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
