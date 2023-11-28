// components/Layout.js
import React from "react";
import Sidebar from "../pages/components/Sidebar";
import Header from "../pages/components/header";

const Layout = ({ children }) => {
  return (
    <div className="theme-indigo" id="mytask-layout">
      <Sidebar />
      <div className="main px-lg-4 px-md-4">
        <Header/>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
