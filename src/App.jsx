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

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
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
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
        setData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
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
    <div className="min-h-screen bg-ground text-ink selection:bg-ink selection:text-ground transition-colors duration-150 lg:grid lg:grid-cols-12">
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
