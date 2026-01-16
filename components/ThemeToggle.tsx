"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Read from localStorage and sync component state with DOM
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const currentTheme = savedTheme || "dark";
    
    // Sync component state with what's in localStorage
    setTheme(currentTheme);
    
    // Ensure DOM matches (should already be set by script, but double-check)
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative z-10"
      aria-label="Toggle theme"
    >
      <div className="relative w-16 h-8 bg-gray-800 rounded-full p-1">
        {/* Sliding indicator - white circle that moves */}
        <div
          className={`absolute top-1 bottom-1 w-6 rounded-full bg-white transition-transform duration-300 ease-in-out ${
            theme === "dark" ? "translate-x-0" : "translate-x-8"
          }`}
        />
        
        {/* Icons container */}
        <div className="relative flex items-center justify-between h-full px-1.5">
          {/* Sun icon - larger, on the left */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-[19px] h-[19px]"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
          
          {/* Moon icon - smaller crescent, on the right */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-4 h-4"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
      </div>
    </button>
  );
}

