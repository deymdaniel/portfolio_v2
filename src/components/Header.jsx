import React, { useState, useEffect } from "react";
import { config } from "../config";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Get all sections
      const sections = ["about", "projects", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset for header height

      // Find which section is currently in view
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

      // If we're at the top of the page, clear active section
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
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? `${config.colors.secondary} backdrop-blur-sm shadow-lg ${config.colors.border} border-b`
          : "bg-transparent"
      }`}
    >
      <nav className='max-w-6xl mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className={`font-bold text-xl ${config.colors.accent}`}>DB</div>

          <div className='hidden md:flex space-x-8'>
            {[
              { name: "About", id: "about" },
              { name: "Projects", id: "projects" },
              { name: "Contact", id: "contact" },
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors duration-300 font-medium focus:outline-none ${
                  activeSection === item.id
                    ? config.colors.accent
                    : `${config.colors.textSecondary} ${config.colors.linkHover}`
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <a
            href='/resume.pdf' // Add your resume file to public folder
            target='_blank'
            rel='noopener noreferrer'
            className={`border ${config.colors.buttonSecondary} px-4 py-2 rounded transition-all duration-200 font-medium`}
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
