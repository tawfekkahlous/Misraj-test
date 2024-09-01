import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts";
import { CiMenuFries, CiSearch } from "react-icons/ci";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Header = () => {
  const { toggleSidebar } = useContext(GlobalContext);

  // const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // useEffect(() => {
  //   document.documentElement.classList.add(theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);

  // const toggleTheme = () => {
  //   setTheme(theme === "light" ? "dark" : "light");
  //   document.documentElement.classList.remove(theme);
  // };
 const { theme, toggleTheme } = useContext(GlobalContext);
  return (
    <div className="h-[80px] bg-white dark:bg-[rgb(27,28,30)] flex justify-between items-center md:px-28 px-4  ">
      <h1 className="font-[700] text-[20px] sm:text-[22px] text-slate-800 dark:text-white">
        SHAHADA
      </h1>
      <ul className=" hidden md:flex text-slate-800 dark:text-white">
        <li className="px-[16px]  font-[600] cursor-pointer">Home</li>
        <li className="px-[16px]   font-[600] cursor-pointer">About Us</li>
        <li className="px-[16px]  font-[600] cursor-pointer">Blog</li>
        <li className="px-[16px]  font-[600] cursor-pointer">Contact</li>
      </ul>
      <div className="flex gap-[20px] items-center text-slate-800 dark:text-white">
        {/* <MdOutlineDarkMode
          onClick={toggleTheme}
          className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"
        />
        <MdOutlineLightMode /> */}
        {theme === "light" ? (
          <MdOutlineDarkMode
            onClick={toggleTheme}
            className="w-[22px] h-[22px] md:w-[30px] md:h-[30px] cursor-pointer"
          />
        ) : (
          <MdOutlineLightMode
            onClick={toggleTheme}
            className="w-[22px] h-[22px] md:w-[30px] md:h-[30px] cursor-pointer"
          />
        )}
        <CiSearch className="w-[22px] h-[22px] md:w-[30px] md:h-[30px] " />
        <CiMenuFries
          className="w-[22px] h-[22px] md:w-[30px] md:h-[30px] md:hidden block cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>
    </div>
  );
};

export default Header;
