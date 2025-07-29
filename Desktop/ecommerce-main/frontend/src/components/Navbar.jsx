import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {

  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark",
    
  );

  const toggleColorMode = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
     
     
    } else {
      document.documentElement.classList.remove("dark");
     
      
    }
  }, [isDark]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between h-16 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase text-center bg-gradient-to-r from-cyan-400 to-red-500 text-transparent bg-clip-text">
          <Link to="/">Sahil Store 🛒</Link>
        </h1>

        <div className="flex items-center space-x-4">
          <Link to="/create">
            <button className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              <FaRegPlusSquare size={20} />
            </button>
          </Link>

          <button
            onClick={toggleColorMode}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isDark ? <MdOutlineLightMode size={20} /> : <IoMoon size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export  {Navbar};
