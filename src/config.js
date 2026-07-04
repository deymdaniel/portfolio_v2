// Portfolio Configuration
// Edit this file to customize your portfolio content and colors

export const config = {
  // Personal Information
  name: "Daniel Biacan III",
  title: "Full-Stack Web & App developer",
  email: "danielbiacaniii@gmail.com",
  location: "Manila, Philippines",
  web3FormsKey: "YOUR_ACCESS_KEY_HERE", // Paste your key here from web3forms.com

  // About section
  about: {
    description: `I'm a web developer and designer based in Manila, Philippines, currently pursuing a BS Computer Science degree at CIIT College of Arts and Technology. I specialize in creating modern, responsive websites for businesses and have experience in both frontend and backend development.`,
    skills: [
      "React 19 & TypeScript",
      "Tailwind CSS & CSS3",
      "Flutter & Dart",
      "Firebase & Supabase",
      "Git & GitHub Actions (CI/CD)",
      "MySQL & SQLite",
      "Agentic AI & MCP Workflows",
      "APIs & Cloud Integrations",
    ],
  },

  // Social media links
  social: {
    github: "https://github.com/deymdaniel",
    linkedin: "https://www.linkedin.com/in/danielbiacan/",
    instagram: "https://www.instagram.com/danielb.iii/",
    facebook: "https://www.facebook.com/danieliii.biacan",
  },

  // Color scheme - easily customizable
  colors: {
    // Primary colors
    primary: "bg-ground text-ink", // Main background
    secondary: "bg-surface", // Secondary background
    accent: "text-ink", // Accent color for highlights

    // Text colors
    textPrimary: "text-ink", // Main text color
    textSecondary: "text-muted", // Secondary text color
    textMuted: "text-muted", // Muted text color

    // Interactive elements
    linkHover: "hover:underline",
    buttonPrimary: "bg-ink text-ground hover:bg-muted transition-colors duration-200",
    buttonSecondary:
      "border border-border-custom text-ink hover:bg-ink hover:text-ground transition-all duration-200",

    // Borders and dividers
    border: "border-border-custom",
    borderLight: "border-border-light",
  },
};
