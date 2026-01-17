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
      "Firebase",
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
      title: "Ecommerce Website",
      description:
        "A website for an ecommerce store that sells jewelry. I handled the frontend development using React and Tailwind CSS.",
      image: "/assets/amrah.png", // Changed from /src/assets/portfolio.png
      technologies: ["React", "Tailwind CSS", "JavaScript"],
      liveUrl: "https://amrah-jewelry.vercel.app/",
      githubUrl: "https://github.com/deymdaniel/amrah-jewelry",
    },
    {
      id: 2,
      title: "Subscription Manager",
      description:
        "A web application that helps users manage their subscriptions and track expenses. Uses Firebase for backend services.",
      image: "/assets/subtrack.png",
      technologies: ["React", "Tailwind CSS", "JavaScript", "Firebase"],
      liveUrl: "https://subscription-manager-web-app.vercel.app/",
      githubUrl: "https://github.com/deymdaniel/subscription-manager-web-app",
    },
    {
      id: 3,
      title: "Salon Landing Page Prototype",
      description:
        "A prototype for a salon landing page featuring a modern design and user-friendly interface.",
      image: "/assets/salon.png",
      technologies: ["React", "Tailwind CSS", "Responsive Design"],
      liveUrl: "https://salon-website-prototype.vercel.app/",
      githubUrl: "https://github.com/deymdaniel/salon_website_prototype",
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
