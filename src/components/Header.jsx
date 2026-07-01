import React, { useState, useEffect } from "react";
import { config } from "../config";

const Header = ({ personalInfo, social, isDarkMode, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const socialLinks = [
    { name: "GITHUB", url: social?.github || config.social.github },
    { name: "LINKEDIN", url: social?.linkedin || config.social.linkedin },
    { name: "INSTAGRAM", url: social?.instagram || config.social.instagram },
    { name: "FACEBOOK", url: social?.facebook || config.social.facebook },
  ];

  useEffect(() => {
    const handleScroll = () => {

      const sections = ["about", "projects", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const isDesktop = window.innerWidth >= 1024;
      const yOffset = isDesktop ? 0 : -60;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "auto" });
    }
  };

  return (
    <header
      className={`bg-ground transition-colors duration-150 z-50
        lg:col-span-2 lg:sticky lg:top-0 lg:h-screen
        fixed top-0 left-0 w-full`}
    >
      <nav className="h-full lg:p-2 p-4 flex lg:flex-col justify-between items-center lg:items-start">
        {/* Top block */}
        <div className="">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
            className="cursor-pointer text-left block"
          >
            <span className="font-display text-base font-bold tracking-tight uppercase leading-tight">
              {config.name.split(' ').slice(0, -1).join(' ')}
            </span>
            <span className="hidden lg:block font-display text-base font-bold tracking-tight uppercase leading-tight">
              {config.name.split(' ').slice(-1)[0]}
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex flex-col space-y-4 pt-6 mt-6 w-full">
            {[
              { name: "ABOUT", id: "about" },
              { name: "PROJECTS", id: "projects" },
              { name: "CONTACT", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-display text-sm font-bold tracking-tight uppercase text-left cursor-pointer hover:underline underline-offset-4 transition-colors duration-150"
              >
                {activeSection === item.id ? `■ ${item.name}` : item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="font-display text-[11px] tracking-widest font-bold uppercase cursor-pointer"
          >
            {isMenuOpen ? "[CLOSE]" : "[MENU]"}
          </button>
        </div>

        {/* Bottom section (Desktop) */}
        <div className="hidden lg:flex lg:flex-col lg:space-y-6">
          {/* Controls */}
          <div className="flex flex-col space-y-3 font-sans text-[10px] tracking-widest uppercase">
            <button
              onClick={toggleTheme}
              className="hover:underline cursor-pointer font-bold text-left"
              aria-label="Toggle theme"
            >
              [{isDarkMode ? "LIGHT" : "DARK"}]
            </button>
            <a
              href={personalInfo?.resumeUrl || '/resume.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-bold text-left"
            >
              RESUME
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-col space-y-2 pt-6 w-full">

            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[10px] tracking-wider uppercase text-ink hover:underline"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Year */}
          <div className="font-sans text-[10px] text-muted tracking-widest">
            © {new Date().getFullYear()}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden w-full bg-ground px-4 pb-6 flex flex-col space-y-6">
          {/* Main sections */}
          <div className="flex flex-col space-y-4">
            {[
              { name: "ABOUT", id: "about" },
              { name: "PROJECTS", id: "projects" },
              { name: "CONTACT", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMenuOpen(false);
                }}
                className="font-display text-sm font-bold tracking-tight uppercase text-left cursor-pointer"
              >
                {activeSection === item.id ? `■ ${item.name}` : item.name}
              </button>
            ))}
          </div>

          {/* Controls & Resume */}
          <div className="flex flex-col space-y-3 font-sans text-[10px] tracking-widest uppercase">
            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="hover:underline cursor-pointer font-bold text-left"
              aria-label="Toggle theme"
            >
              [{isDarkMode ? "LIGHT" : "DARK"}]
            </button>
            <a
              href={personalInfo?.resumeUrl || '/resume.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-bold text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              RESUME
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-col space-y-2 pt-4 border-t border-border-light w-full">
            <span className="font-sans text-[10px] tracking-widest uppercase text-muted mb-1">CONNECT</span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[10px] tracking-wider uppercase text-ink hover:underline font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
