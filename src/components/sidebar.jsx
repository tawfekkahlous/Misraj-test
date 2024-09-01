import { useContext } from "react";
import { GlobalContext } from "../contexts";

const Sidebar = () => {
  const { isSidebarOpen } = useContext(GlobalContext);

  console.log(isSidebarOpen);

  return (
    <div
      className="w-[150px] md:w-[250px]  absolute left-0 top-0 h-full text-slate-800 bg-white dark:bg-black  dark:text-white shadow-xl p-[15px]"
      style={{ display: isSidebarOpen ? "block" : "none" }}
    >
      <h1 className="font-[700] text-[18px] md:text-[22px] mb-[30px]">
        SHAHADA
      </h1>
      <ul className="text-[14px] sm:text-[16px]">
        <li className=" py-[20px] font-[600] cursor-pointer ">Home</li>
        <li className="  py-[20px] font-[600] cursor-pointer ">About Us</li>
        <li className=" py-[20px] font-[600] cursor-pointer ">Blog</li>
        <li className="py-[20px] font-[600] cursor-pointer ">Contact</li>
      </ul>
    </div>
  );
};

export default Sidebar;
