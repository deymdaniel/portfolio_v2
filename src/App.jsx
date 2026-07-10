import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { client } from "./lib/sanity";
import "./App.css";

function App() {
  const [data, setData] = useState({
    personalInfo: null,
    about: null,
    social: null,
    projects: [],
    loading: true,
  });

  const [debugInfo, setDebugInfo] = useState({
    error: null,
    status: "idle",
    projectsLength: 0,
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) {
        return saved === "dark";
      }
    } catch (e) {
      console.warn("localStorage is not available:", e);
    }
    return false; // Default to light mode
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personalInfo, about, social, projects] = await Promise.all([
          client.fetch(`*[_type == "personalInfo"][0] { ..., "resumeUrl": resume.asset->url }`),
          client.fetch(`*[_type == "about"][0]`),
          client.fetch(`*[_type == "social"][0]`),
          client.fetch(`*[_type == "project"] | order(order asc)`),
        ]);

        setData({
          personalInfo,
          about,
          social,
          projects: projects || [],
          loading: false,
        });

        setDebugInfo({
          error: null,
          status: "success",
          projectsLength: projects ? projects.length : 0,
        });
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
        setData((prev) => ({ ...prev, loading: false }));
        setDebugInfo({
          error: error.message || String(error),
          status: "error",
          projectsLength: 0,
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (e) {
        console.warn("Unable to save theme preference:", e);
      }
    } else {
      root.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch (e) {
        console.warn("Unable to save theme preference:", e);
      }
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  if (data.loading) {
    return (
      <div className="min-h-screen bg-ground flex items-center justify-center text-ink font-display tracking-tighter text-4xl font-bold select-none">
        ...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ground text-ink selection:bg-ink selection:text-ground transition-colors duration-150 lg:grid lg:grid-cols-12 relative">
      {debugInfo.status === "error" && (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white text-[10px] p-3 text-center uppercase tracking-widest font-bold">
          API Error: {debugInfo.error}
        </div>
      )}
      {debugInfo.status === "success" && debugInfo.projectsLength === 0 && (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-yellow-600 text-black text-[10px] p-3 text-center uppercase tracking-widest font-bold">
          API Success but 0 projects returned from Sanity.
        </div>
      )}
      <Header
        personalInfo={data.personalInfo}
        social={data.social}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="lg:col-span-10 lg:col-start-3 flex flex-col min-w-0">
        <main className="flex-1">
          <Hero />
          <About about={data.about} />
          <Projects projects={data.projects} />
          <Contact personalInfo={data.personalInfo} />
        </main>
        <Footer personalInfo={data.personalInfo} social={data.social} />
      </div>
    </div>
  );
}

export default App;
