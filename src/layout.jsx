import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

const Layout = () => {
  return (
    <>
      {/* <MyProvider> */}
      <Header />
      <div className="md:hidden block">
        <Sidebar />
      </div>
      <div className="bg-white dark:bg-[rgb(27,28,30)] min-h-[calc(100vh-80px)] flex justify-center items-center">
        <Outlet />
      </div>
      {/* </MyProvider> */}
    </>
  );
};

export default Layout;
