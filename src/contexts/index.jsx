// context.js
import React, { createContext, useEffect, useState } from "react";

// Create the context
export const GlobalContext = createContext();

// Create a provider component
export const ProviderContext = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

    const toggleTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.classList.remove(theme);
      document.documentElement.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
      document.documentElement.classList.add(theme);
    }, [theme]);


  return (
    <GlobalContext.Provider
      value={{ isSidebarOpen, toggleSidebar, theme, toggleTheme }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
