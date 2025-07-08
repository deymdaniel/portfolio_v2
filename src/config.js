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
      title: "Portfolio Website",
      description:
        "Portfolio website showcasing my work as a frontend developer and web designer. It features a modern design, responsive layout, and highlights my skills and projects.",
      image: "/assets/portfolio.png", // Changed from /src/assets/portfolio.png
      technologies: ["React", "Tailwind CSS", "JavaScript"],
      liveUrl: "https://portfolio-v2-deymdaniels-projects.vercel.app/",
      githubUrl: "https://github.com/deymdaniel/portfolio_v2",
    },
    {
      id: 2,
      title: "School Website Prototype",
      description:
        "One of my first web projects only using HTML, CSS, and JavaScript. Now updated with a modern design and user-friendly interface.",
      image: "/assets/mapua.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://deymdaniel.github.io/Mapua-Project-Website/",
      githubUrl: "https://github.com/deymdaniel/Mapua-Project-Website",
    },
    {
      id: 3,
      title: "Upcoming E-Commerce Website Prototype",
      description:
        "Currently developing an e-commerce website prototype with a modern design and seamless user experience.",
      image: "/api/placeholder/400/300",
      technologies: ["React", "Tailwind CSS", "Responsive Design"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Coming Soon",
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
