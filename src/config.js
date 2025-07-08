// Portfolio Configuration
// Edit this file to customize your portfolio content and colors

export const config = {
  // Personal Information
  name: "Daniel Biacan III",
  title: "Frontend Developer & Web Designer",
  email: "danielbiacaniii@gmail.com",
  location: "Manila, Philippines",

  // About section
  about: {
    description: `I'm a web developer and designer based in Manila, Philippines, currently
        pursuing a BS Computer Science degree at CIIT College of Arts and Technology. 
        I specialize in creating modern, responsive websites for businesses and have 
        experience in both frontend and backend development.`,
    skills: [
      "JavaScript",
      "React",
      "HTML & CSS",
      "Tailwind CSS",
      "Git",
      "MySQL",
    ],
  },

  // Social media links
  social: {
    github: "https://github.com/deymdaniel",
    linkedin: "https://www.linkedin.com/in/danielbiacan/",
    instagram: "https://www.instagram.com/danielb.iii/",
    facebook: "https://www.facebook.com/danieliii.biacan",
  },

  // Projects
  projects: [
    {
      id: 1,
      title: "Project One",
      description:
        "A brief description of your first project. Explain what technologies you used and what problems it solves.",
      image: "/api/placeholder/400/300", // Replace with your project image
      technologies: ["React", "Tailwind CSS", "JavaScript"],
      liveUrl: "https://your-project-live-url.com",
      githubUrl: "https://github.com/yourusername/project-one",
    },
    {
      id: 2,
      title: "Project Two",
      description:
        "Description of your second project. Highlight the key features and your role in developing it.",
      image: "/api/placeholder/400/300", // Replace with your project image
      technologies: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://your-project-live-url.com",
      githubUrl: "https://github.com/yourusername/project-two",
    },
    {
      id: 3,
      title: "Project Three",
      description:
        "Your third project description. Mention any challenges you overcame and what you learned.",
      image: "/api/placeholder/400/300", // Replace with your project image
      technologies: ["React", "API Integration", "Responsive Design"],
      liveUrl: "https://your-project-live-url.com",
      githubUrl: "https://github.com/yourusername/project-three",
    },
  ],

  // Color scheme - easily customizable
  colors: {
    // Primary colors
    primary: "bg-stone-800", // Main background
    secondary: "bg-stone-700", // Secondary background
    accent: "text-red-500", // Accent color for highlights

    // Text colors
    textPrimary: "text-slate-200", // Main text color
    textSecondary: "text-slate-400", // Secondary text color
    textMuted: "text-slate-500", // Muted text color

    // Interactive elements
    linkHover: "hover:text-red-500",
    buttonPrimary: "bg-red-600 hover:bg-red-700",
    buttonSecondary:
      "border-red-300 text-red-300 hover:bg-red-300 hover:text-slate-900",

    // Borders and dividers
    border: "border-slate-700",
    borderLight: "border-slate-600",
  },
};
