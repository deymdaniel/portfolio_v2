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

  if (data.loading) {
    return (
      <div className="min-h-screen bg-stone-800 flex items-center justify-center text-slate-200">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-stone-800'>
      <Header personalInfo={data.personalInfo} />
      <main>
        <Hero personalInfo={data.personalInfo} social={data.social} />
        <About about={data.about} />
        <Projects projects={data.projects} />
        <Contact personalInfo={data.personalInfo} />
      </main>
      <Footer personalInfo={data.personalInfo} social={data.social} />
    </div>
  );
}

export default App;
